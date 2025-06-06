// app/api/fetchData/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '../dbConnect/dbConnect';

export async function POST(req: NextRequest) {
  if(req.method == 'POST'){
    const dataReceived = await req.json();
    if(dataReceived.year && dataReceived.month && dataReceived.day){
      try{
        const dateString = `${dataReceived.year}-${dataReceived.month}-${dataReceived.day}`;
        const [fetchDataResult] = await pool.query(
          `SELECT * FROM reading_data WHERE DATE(reading_data.date_collected) = ? AND reading_data.humid_value IS NOT NULL ORDER BY date_collected DESC`,
          [dateString]
        );
        return NextResponse.json(fetchDataResult);
      } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
      }
    }
    else{
      try{
        const [fetchDataResult] = await pool.query(
          `SELECT * FROM reading_data WHERE reading_data.humid_value IS NOT NULL ORDER BY date_collected DESC`
        );
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