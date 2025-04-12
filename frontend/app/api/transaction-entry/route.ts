import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      amount,
      date,
      category,
      type,
      paymentMethod,
      note 
    } = body;

    // TODO: Add your database storage logic here
    // For demo purposes, we'll just return success

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save transaction' },
      { status: 400 }
    );
  }
}