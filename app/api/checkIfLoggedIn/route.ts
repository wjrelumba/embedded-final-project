// app/api/fetchData/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '../dbConnect/dbConnect';

export async function POST(req: NextRequest) {
  try {
    const dataReceived = await req.json();

    const { user_id } = dataReceived;

    const [userQuery]:any[] = await pool.query(`SELECT * FROM users WHERE user_id = '${user_id}'`);

    console.log(userQuery);

    if(userQuery && userQuery.length > 0){
      return NextResponse.json({success: true});
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
