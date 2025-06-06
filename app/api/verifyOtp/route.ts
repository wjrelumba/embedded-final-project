// app/api/fetchData/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '../dbConnect/dbConnect';

export async function POST(req: NextRequest) {
  if(req.method == 'POST'){
    const dataReceived = await req.json();

    console.log(dataReceived);

    if(dataReceived.otpValue){
      try{
        const [fetchDataResult] = await pool.query(
          `SELECT otp_value FROM otp WHERE otp_value = '${dataReceived.otpValue}'`,
        );

        if(fetchDataResult){
            await pool.query(
              `DELETE FROM otp WHERE otp_value = ${dataReceived.otpValue}`,
            );
            return NextResponse.json({success: true})
        };

        return NextResponse.json(fetchDataResult);
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