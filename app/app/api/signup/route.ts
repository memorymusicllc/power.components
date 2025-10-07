
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // In a real app, you would save to database
    // For demo purposes, we'll just return success
    const user = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      hashedPassword
    };

    return NextResponse.json({
      message: 'User created successfully',
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
