// app/api/fetchData/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '../dbConnect/dbConnect';
import { decrypt } from '@/app/lib/encryption';

export async function POST(req: NextRequest) {
  try {
    const dataReceived = await req.json();

    const { password, email } = dataReceived;

    if (!password || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const [passwordQuery]:any[] = await pool.query(`SELECT * FROM users WHERE email = '${dataReceived.email}'`);

    if(passwordQuery && passwordQuery.length > 0){
      const decryptedPass = decrypt(passwordQuery[0].password); // Decrypt the password

      if(dataReceived.password == decryptedPass){
          return NextResponse.json({user_id: passwordQuery[0].user_id, username: passwordQuery[0].username, access_level: passwordQuery[0].access_level});
      }
      else return NextResponse.json({error: 'Invalid credentials'});
    }
    else return NextResponse.json({error: 'User not found'});

    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Server error or malformed JSON body' },
      { status: 500 }
    );
  }
}
