import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      investmentType, 
      amountInvested, 
      investmentDate, 
      platform, 
      expectedROI, 
      maturityDate 
    } = body;

    // TODO: Add your database storage logic here
    // For demo purposes, we'll just return success

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save investment details' },
      { status: 400 }
    );
  }
}