const EcoDoodles = ({ variant = 'landing' }) => {
  const doodleVariants = {
    landing: (
      <>
        {/* Top row - spread across */}
        <svg className="absolute top-[8%] left-[10%] w-6 h-6 text-eco-green-500 opacity-50 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l.29-1.29c.42-.82.85-1.68 1.33-2.5C10.08 19.22 13.17 19 16 17.1c4-2.7 3.1-7 2.1-9.1c-.6-1.2-1.1-1.7-1.1-2z"/>
        </svg>
        
        <svg className="absolute top-[12%] left-[25%] w-6 h-6 text-blue-400 opacity-50 animate-sway" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66c3.12 3.12 3.12 8.19 0 11.31-3.12 3.12-8.19 3.12-11.31 0-3.12-3.12-3.12-8.19 0-11.31L12 2.69z"/>
        </svg>
        
        <svg className="absolute top-[10%] left-[40%] w-6 h-6 text-green-500 opacity-50 animate-pulse-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        <svg className="absolute top-[8%] left-[55%] w-6 h-6 text-eco-green-600 opacity-50 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c-1.1 0-2-.9-2-2v-2h4v2c0 1.1-.9 2-2 2zm-5-5c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1H7zm5-3c-2.76 0-5-2.24-5-5 0-4 5-10 5-10s5 6 5 10c0 2.76-2.24 5-5 5z"/>
        </svg>
        
        <svg className="absolute top-[12%] left-[70%] w-6 h-6 text-teal-400 opacity-50 animate-sway" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
        </svg>
        
        <svg className="absolute top-[10%] left-[85%] w-6 h-6 text-eco-green-500 opacity-50 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l.29-1.29c.42-.82.85-1.68 1.33-2.5C10.08 19.22 13.17 19 16 17.1c4-2.7 3.1-7 2.1-9.1c-.6-1.2-1.1-1.7-1.1-2z"/>
        </svg>

        {/* Upper-middle row */}
        <svg className="absolute top-[25%] left-[15%] w-6 h-6 text-green-500 opacity-50 animate-pulse-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        <svg className="absolute top-[22%] left-[32%] w-6 h-6 text-eco-green-600 opacity-50 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c-1.1 0-2-.9-2-2v-2h4v2c0 1.1-.9 2-2 2zm-5-5c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1H7zm5-3c-2.76 0-5-2.24-5-5 0-4 5-10 5-10s5 6 5 10c0 2.76-2.24 5-5 5z"/>
        </svg>
        
        <svg className="absolute top-[25%] left-[48%] w-6 h-6 text-teal-500 opacity-50 animate-sway" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
        </svg>
        
        <svg className="absolute top-[22%] left-[65%] w-6 h-6 text-blue-400 opacity-50 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66c3.12 3.12 3.12 8.19 0 11.31-3.12 3.12-8.19 3.12-11.31 0-3.12-3.12-3.12-8.19 0-11.31L12 2.69z"/>
        </svg>
        
        <svg className="absolute top-[25%] left-[80%] w-6 h-6 text-eco-green-500 opacity-50 animate-sway" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l.29-1.29c.42-.82.85-1.68 1.33-2.5C10.08 19.22 13.17 19 16 17.1c4-2.7 3.1-7 2.1-9.1c-.6-1.2-1.1-1.7-1.1-2z"/>
        </svg>

        {/* Middle row */}
        <svg className="absolute top-[40%] left-[12%] w-6 h-6 text-eco-green-600 opacity-50 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c-1.1 0-2-.9-2-2v-2h4v2c0 1.1-.9 2-2 2zm-5-5c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1H7zm5-3c-2.76 0-5-2.24-5-5 0-4 5-10 5-10s5 6 5 10c0 2.76-2.24 5-5 5z"/>
        </svg>
        
        <svg className="absolute top-[38%] left-[28%] w-6 h-6 text-green-500 opacity-50 animate-pulse-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        <svg className="absolute top-[42%] left-[45%] w-6 h-6 text-teal-400 opacity-50 animate-sway" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
        </svg>
        
        <svg className="absolute top-[40%] left-[62%] w-6 h-6 text-blue-500 opacity-50 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66c3.12 3.12 3.12 8.19 0 11.31-3.12 3.12-8.19 3.12-11.31 0-3.12-3.12-3.12-8.19 0-11.31L12 2.69z"/>
        </svg>
        
        <svg className="absolute top-[38%] left-[78%] w-6 h-6 text-eco-green-500 opacity-50 animate-sway" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l.29-1.29c.42-.82.85-1.68 1.33-2.5C10.08 19.22 13.17 19 16 17.1c4-2.7 3.1-7 2.1-9.1c-.6-1.2-1.1-1.7-1.1-2z"/>
        </svg>

        {/* Lower-middle row */}
        <svg className="absolute top-[58%] left-[18%] w-6 h-6 text-green-500 opacity-50 animate-pulse-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        <svg className="absolute top-[55%] left-[35%] w-6 h-6 text-teal-500 opacity-50 animate-sway" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
        </svg>
        
        <svg className="absolute top-[58%] left-[52%] w-6 h-6 text-eco-green-600 opacity-50 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c-1.1 0-2-.9-2-2v-2h4v2c0 1.1-.9 2-2 2zm-5-5c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1H7zm5-3c-2.76 0-5-2.24-5-5 0-4 5-10 5-10s5 6 5 10c0 2.76-2.24 5-5 5z"/>
        </svg>
        
        <svg className="absolute top-[55%] left-[68%] w-6 h-6 text-blue-400 opacity-50 animate-sway" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66c3.12 3.12 3.12 8.19 0 11.31-3.12 3.12-8.19 3.12-11.31 0-3.12-3.12-3.12-8.19 0-11.31L12 2.69z"/>
        </svg>
        
        <svg className="absolute top-[58%] left-[83%] w-6 h-6 text-eco-green-500 opacity-50 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l.29-1.29c.42-.82.85-1.68 1.33-2.5C10.08 19.22 13.17 19 16 17.1c4-2.7 3.1-7 2.1-9.1c-.6-1.2-1.1-1.7-1.1-2z"/>
        </svg>

        {/* Bottom row */}
        <svg className="absolute top-[75%] left-[14%] w-6 h-6 text-teal-400 opacity-50 animate-sway" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
        </svg>
        
        <svg className="absolute top-[72%] left-[30%] w-6 h-6 text-eco-green-500 opacity-50 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l.29-1.29c.42-.82.85-1.68 1.33-2.5C10.08 19.22 13.17 19 16 17.1c4-2.7 3.1-7 2.1-9.1c-.6-1.2-1.1-1.7-1.1-2z"/>
        </svg>
        
        <svg className="absolute top-[75%] left-[46%] w-6 h-6 text-green-500 opacity-50 animate-pulse-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        <svg className="absolute top-[72%] left-[62%] w-6 h-6 text-blue-500 opacity-50 animate-sway" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66c3.12 3.12 3.12 8.19 0 11.31-3.12 3.12-8.19 3.12-11.31 0-3.12-3.12-3.12-8.19 0-11.31L12 2.69z"/>
        </svg>
        
        <svg className="absolute top-[75%] left-[78%] w-6 h-6 text-eco-green-600 opacity-50 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c-1.1 0-2-.9-2-2v-2h4v2c0 1.1-.9 2-2 2zm-5-5c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1H7zm5-3c-2.76 0-5-2.24-5-5 0-4 5-10 5-10s5 6 5 10c0 2.76-2.24 5-5 5z"/>
        </svg>
        
        {/* Extra scattered doodles for better coverage */}
        <svg className="absolute top-[18%] left-[58%] w-6 h-6 text-blue-400 opacity-50 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66c3.12 3.12 3.12 8.19 0 11.31-3.12 3.12-8.19 3.12-11.31 0-3.12-3.12-3.12-8.19 0-11.31L12 2.69z"/>
        </svg>
        
        <svg className="absolute top-[32%] left-[20%] w-6 h-6 text-teal-400 opacity-50 animate-sway" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
        </svg>
        
        <svg className="absolute top-[48%] left-[88%] w-6 h-6 text-green-500 opacity-50 animate-pulse-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        <svg className="absolute top-[65%] left-[42%] w-6 h-6 text-eco-green-500 opacity-50 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l.29-1.29c.42-.82.85-1.68 1.33-2.5C10.08 19.22 13.17 19 16 17.1c4-2.7 3.1-7 2.1-9.1c-.6-1.2-1.1-1.7-1.1-2z"/>
        </svg>
        
        <svg className="absolute top-[85%] left-[50%] w-6 h-6 text-blue-400 opacity-50 animate-sway" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66c3.12 3.12 3.12 8.19 0 11.31-3.12 3.12-8.19 3.12-11.31 0-3.12-3.12-3.12-8.19 0-11.31L12 2.69z"/>
        </svg>
      </>
    ),

    dashboard: (
      <>
        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-eco-green-50/4 via-transparent to-blue-50/4 dark:from-eco-green-900/2 dark:via-transparent dark:to-blue-900/2 pointer-events-none"></div>
        
        {/* Small leaf - Top right */}
        <svg className="absolute top-16 right-20 w-7 h-7 text-eco-green-500 opacity-50 dark:opacity-[0.17] animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l.29-1.29c.42-.82.85-1.68 1.33-2.5C10.08 19.22 13.17 19 16 17.1c4-2.7 3.1-7 2.1-9.1c-.6-1.2-1.1-1.7-1.1-2z"/>
        </svg>

        {/* Tiny checkmark - Top left */}
        <svg className="absolute top-20 left-24 w-6 h-6 text-green-500 opacity-[0.13] dark:opacity-50 animate-pulse-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Water drop - Right side */}
        <svg className="absolute top-1/3 right-28 w-6 h-6 text-blue-500 opacity-50 dark:opacity-[0.17] animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66c3.12 3.12 3.12 8.19 0 11.31-3.12 3.12-8.19 3.12-11.31 0-3.12-3.12-3.12-8.19 0-11.31L12 2.69z"/>
        </svg>

        {/* Small plant - Bottom left */}
        <svg className="absolute bottom-28 left-20 w-7 h-7 text-eco-green-600 opacity-[0.13] dark:opacity-50 animate-sway" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c-1.1 0-2-.9-2-2v-2h4v2c0 1.1-.9 2-2 2zm-5-5c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1H7zm5-3c-2.76 0-5-2.24-5-5 0-4 5-10 5-10s5 6 5 10c0 2.76-2.24 5-5 5z"/>
        </svg>

        {/* Tiny sun - Bottom right */}
        <svg className="absolute bottom-32 right-24 w-6 h-6 text-yellow-500 opacity-[0.13] dark:opacity-50 animate-pulse-slow" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v3m0 16v3M3.22 3.22l2.12 2.12m13.44 13.44l2.12 2.12M1 12h3m16 0h3M3.22 20.78l2.12-2.12m13.44-13.44l2.12-2.12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>

        {/* Calendar - Middle */}
        <svg className="absolute top-1/2 left-1/4 w-6 h-6 text-teal-500 opacity-[0.12] dark:opacity-50 animate-sway" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/>
        </svg>

        {/* Star - Lower area */}
        <svg className="absolute bottom-1/4 right-1/3 w-6 h-6 text-yellow-400 opacity-[0.13] dark:opacity-50 animate-pulse-slow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      </>
    ),

    minimal: (
      <>
        {/* Very subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-eco-green-50/3 via-transparent to-blue-50/3 dark:from-eco-green-900/2 dark:via-transparent dark:to-blue-900/2 pointer-events-none"></div>
        
        {/* Tiny leaf - Top right */}
        <svg className="absolute top-16 right-24 w-6 h-6 text-eco-green-500 opacity-[0.12] dark:opacity-50 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l.29-1.29c.42-.82.85-1.68 1.33-2.5C10.08 19.22 13.17 19 16 17.1c4-2.7 3.1-7 2.1-9.1c-.6-1.2-1.1-1.7-1.1-2z"/>
        </svg>

        {/* Checkmark - Top left */}
        <svg className="absolute top-20 left-28 w-6 h-6 text-green-500 opacity-[0.11] dark:opacity-50 animate-pulse-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Plant - Bottom left */}
        <svg className="absolute bottom-32 left-24 w-7 h-7 text-eco-green-600 opacity-[0.11] dark:opacity-50 animate-sway" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c-1.1 0-2-.9-2-2v-2h4v2c0 1.1-.9 2-2 2zm-5-5c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1H7zm5-3c-2.76 0-5-2.24-5-5 0-4 5-10 5-10s5 6 5 10c0 2.76-2.24 5-5 5z"/>
        </svg>

        {/* Star - Bottom right */}
        <svg className="absolute bottom-28 right-32 w-6 h-6 text-yellow-400 opacity-[0.11] dark:opacity-50 animate-pulse-slow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      </>
    )
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {doodleVariants[variant] || doodleVariants.landing}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-sway {
          animation: sway 5s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default EcoDoodles;
