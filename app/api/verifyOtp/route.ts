// app/api/fetchData/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '../dbConnect/dbConnect';

export async function POST(req: NextRequest) {
  if(req.method == 'POST'){
    const dataReceived = await req.json();

    console.log(dataReceived);

    const {username, encryptedPass, email, uuid} = dataReceived.userMetadata;


    if(dataReceived.otpValue){
      try{
        await pool.query(
          `INSERT INTO users(username, password, email, user_id) VALUES (?, ?, ?, ?)`,
          [username, encryptedPass, email, uuid]
        );

        const [fetchDataResult] = await pool.query(
          `SELECT otp_value FROM otp WHERE otp_value = '${dataReceived.otpValue}'`,
        );

        if(fetchDataResult){
            await pool.query(
              `DELETE FROM otp WHERE otp_value = ${dataReceived.otpValue}`,
            );
            return NextResponse.json({user_id: uuid, username: username, access_level: 1})
        };

        return NextResponse.json({user_id: uuid, username: username, access_level: 1});
      } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
      }
    }
  }
  else{
    return NextResponse.json({error: 'Method not allowed'}, {status: 404})
  }
}