import nodemailer from 'nodemailer'

// Transporter will be created on first use
let transporter = null;

// Function to create/get transporter (lazy initialization)
const getTransporter = () => {
  if (!transporter) {
    // Debug: Log environment variables
    console.log('📧 Creating Email Transporter:');
    console.log('EMAIL_HOST:', process.env.EMAIL_HOST || 'NOT SET');
    console.log('EMAIL_PORT:', process.env.EMAIL_PORT || 'NOT SET');
    console.log('EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? `SET (${process.env.EMAIL_PASS.length} chars)` : 'NOT SET');
    console.log('---');

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('EMAIL_USER and EMAIL_PASS must be set in .env file');
    }

    // Create transporter with explicit configuration
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify transporter configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.error('❌ Email transporter verification failed:', error.message);
        console.error('Please check your EMAIL_USER and EMAIL_PASS in .env file');
      } else {
        console.log('✅ Email server is ready to send messages');
      }
    });
  }
  
  return transporter;
};

// Email templates
const emailTemplates = {
  reminder: (userName, habitTitle, reminderTime) => ({
    subject: `🌱 Time for your eco-habit: ${habitTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f0fdf4;">
        <h2 style="color: #166534;">Hi ${userName}! 🌿</h2>
        <p style="font-size: 16px; color: #374151;">
          This is a friendly reminder to complete your eco-habit: <strong>${habitTitle}</strong>
        </p>
        <p style="font-size: 14px; color: #6b7280;">
          Scheduled time: ${reminderTime}
        </p>
        <p style="font-size: 14px; color: #6b7280;">
          Keep up your green routine and make a positive impact on the planet! 🌍
        </p>
        <a href="${process.env.FRONTEND_URL}/habits" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #16a34a; color: white; text-decoration: none; border-radius: 6px;">
          Mark as Complete
        </a>
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #d1d5db;" />
        <p style="font-size: 12px; color: #9ca3af;">
          Green Routine Builder | Building sustainable habits, one day at a time
        </p>
      </div>
    `
  }),

  streakMilestone: (userName, habitTitle, streakCount) => ({
    subject: `🎉 Streak Milestone Reached: ${streakCount} days!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fef3c7;">
        <h2 style="color: #92400e;">Congratulations ${userName}! 🏆</h2>
        <p style="font-size: 16px; color: #374151;">
          You've maintained a <strong>${streakCount}-day streak</strong> for your habit: <strong>${habitTitle}</strong>!
        </p>
        <p style="font-size: 14px; color: #6b7280;">
          Your dedication to sustainability is inspiring. Keep going! 🌱
        </p>
        <a href="${process.env.FRONTEND_URL}/dashboard" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #f59e0b; color: white; text-decoration: none; border-radius: 6px;">
          View Your Progress
        </a>
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #fbbf24;" />
        <p style="font-size: 12px; color: #9ca3af;">
          Green Routine Builder | Building sustainable habits, one day at a time
        </p>
      </div>
    `
  }),

  challengeJoined: (userName, challengeTitle, durationDays) => ({
    subject: `🚀 You joined: ${challengeTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #eff6ff;">
        <h2 style="color: #1e40af;">Welcome to the challenge, ${userName}! 💪</h2>
        <p style="font-size: 16px; color: #374151;">
          You've successfully joined: <strong>${challengeTitle}</strong>
        </p>
        <p style="font-size: 14px; color: #6b7280;">
          Duration: ${durationDays} days
        </p>
        <p style="font-size: 14px; color: #6b7280;">
          Stay committed, log your progress daily, and make a difference! 🌍
        </p>
        <a href="${process.env.FRONTEND_URL}/challenges" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px;">
          View Challenge Details
        </a>
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #bfdbfe;" />
        <p style="font-size: 12px; color: #9ca3af;">
          Green Routine Builder | Building sustainable habits, one day at a time
        </p>
      </div>
    `
  }),

  challengeCompleted: (userName, challengeTitle) => ({
    subject: `🎊 Challenge Completed: ${challengeTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f0fdf4;">
        <h2 style="color: #166534;">Amazing work, ${userName}! 🌟</h2>
        <p style="font-size: 16px; color: #374151;">
          You've successfully completed the challenge: <strong>${challengeTitle}</strong>!
        </p>
        <p style="font-size: 14px; color: #6b7280;">
          Your commitment to sustainability is making a real impact. Check your dashboard for your new badge! 🏅
        </p>
        <a href="${process.env.FRONTEND_URL}/profile" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #16a34a; color: white; text-decoration: none; border-radius: 6px;">
          View Your Badges
        </a>
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #d1d5db;" />
        <p style="font-size: 12px; color: #9ca3af;">
          Green Routine Builder | Building sustainable habits, one day at a time
        </p>
      </div>
    `
  })
}

// Send email function
export const sendEmail = async (to, templateType, templateData) => {
  try {
    // Get transporter (will create if not exists)
    const transporter = getTransporter();

    const template = emailTemplates[templateType]
    if (!template) {
      throw new Error(`Email template '${templateType}' not found`)
    }

    const { subject, html } = template(...Object.values(templateData))

    const mailOptions = {
      from: `"Green Routine Builder" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    }

    console.log(`📧 Attempting to send email to: ${to}`)
    const info = await transporter.sendMail(mailOptions)
    console.log(`✅ Email sent successfully: ${info.messageId}`)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('❌ Email sending error:', error.message)
    console.error('Full error:', error)
    return { success: false, error: error.message }
  }
}

// Verify email configuration
export const verifyEmailConfig = async () => {
  try {
    await transporter.verify()
    console.log('Email service is ready to send emails')
    return true
  } catch (error) {
    console.error('Email service configuration error:', error)
    return false
  }
}

export default { sendEmail, verifyEmailConfig }
