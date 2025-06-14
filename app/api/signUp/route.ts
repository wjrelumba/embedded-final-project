import { NextRequest, NextResponse } from 'next/server';
import pool from '../dbConnect/dbConnect';
import { encrypt } from '@/app/lib/encryption';
import { randomUUID } from 'crypto';

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const dataReceived = await req.json();
    const { username, password, email } = dataReceived;

    if (!username || !password || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const uuid = randomUUID();
    const otpValue = generateOTP();
    const encryptedPass = encrypt(password);

    const [checkIfExistsQuery]:any[] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);

    if (checkIfExistsQuery && checkIfExistsQuery.length > 0) {
      return NextResponse.json({ error: 'User already exists' });
    } else {
      const [otpQuery] = await pool.query(
        `INSERT INTO otp(user_id, otp_value) VALUES (?, ?)`,
        [uuid, otpValue]
      );

      if (otpQuery) {
        const sendEmail = async () => {
          const response = await fetch('http://localhost:3000/api/sendEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: email,
              subject: `${otpValue} - OTP for AMACE Monitoring`,
              body: `${email}'s OTP is ${otpValue}`,
            })
          });

          const result = await response.json();
          console.log(result);

          return NextResponse.json({user_id: uuid, username: username, access_level: 1, user_metadata: {
            username,
            encryptedPass,
            email,
            uuid,
          }});
        };

        return await sendEmail(); // ⬅️ fix: ensure response is returned
      }

      // ⬇️ fallback response in case otpQuery fails silently
      return NextResponse.json({ error: 'Failed to generate OTP' }, { status: 500 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Server error or malformed JSON body' },
      { status: 500 }
    );
  }
}
