import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

import { sendEmail } from './services/emailService.js';

console.log('🧪 Testing Email Configuration...');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✓ Set' : '✗ Missing');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? `✓ Set (${process.env.EMAIL_PASS.length} chars)` : '✗ Missing');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('---');

const testEmailSend = async () => {
  try {
    console.log('Sending test email...');
    const result = await sendEmail(
      process.env.EMAIL_USER, // Send to yourself
      'reminder',
      {
        userName: 'Test User',
        habitTitle: 'Test Habit',
        reminderTime: '09:00'
      }
    );

    if (result.success) {
      console.log('✅ Test email sent successfully!');
      console.log('Message ID:', result.messageId);
    } else {
      console.error('❌ Test email failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
  
  process.exit(0);
};

// Wait a moment for transporter verification
setTimeout(testEmailSend, 2000);
