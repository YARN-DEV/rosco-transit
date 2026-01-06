import { NextResponse } from 'next/server';

// API route for contact form submissions
// This is a placeholder for future backend integration

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Future integrations
    // 1. Send email via SendGrid/Mailgun/Resend
    // 2. Save to database (PostgreSQL, MongoDB, etc.)
    // 3. Send notification to Slack/Discord
    // 4. Create ticket in support system

    // For now, just log and return success
    console.log('Contact form submission:', { name, email, message });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message received. We will get back to you soon.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Prevent GET requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
