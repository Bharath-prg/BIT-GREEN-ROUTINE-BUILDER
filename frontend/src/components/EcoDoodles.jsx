const EcoDoodles = ({ variant = 'default' }) => {
  const doodleVariants = {
    landing: (
      <>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-eco-green-50/20 via-transparent to-blue-50/20 dark:from-eco-green-900/10 dark:via-transparent dark:to-blue-900/10 pointer-events-none"></div>
        
        {/* Top right - Leaves */}
        <svg className="absolute top-10 right-10 w-32 h-32 text-eco-green-400 dark:text-eco-green-500 opacity-10 dark:opacity-20 animate-float" viewBox="0 0 100 100">
          <path d="M50 10 Q60 30 50 50 Q40 30 50 10 M50 50 Q70 60 90 50 Q70 40 50 50 M50 50 Q30 60 10 50 Q30 40 50 50" 
                fill="currentColor" stroke="currentColor" strokeWidth="2"/>
        </svg>
        
        {/* Top left - Recycling symbol */}
        <svg className="absolute top-20 left-20 w-24 h-24 text-eco-green-300 dark:text-eco-green-600 opacity-8 dark:opacity-15 animate-spin-slow" viewBox="0 0 100 100">
          <path d="M50 20 L60 40 L40 40 Z M70 45 L90 55 L75 70 Z M30 70 L40 85 L15 85 Z" 
                fill="none" stroke="currentColor" strokeWidth="3"/>
          <circle cx="50" cy="35" r="5" fill="currentColor"/>
          <circle cx="78" cy="60" r="5" fill="currentColor"/>
          <circle cx="27" cy="78" r="5" fill="currentColor"/>
        </svg>

        {/* Top center - Cloud with rain */}
        <svg className="absolute top-16 left-1/2 transform -translate-x-1/2 w-28 h-32 text-blue-400 dark:text-blue-500 opacity-7 dark:opacity-12 animate-float-slow" viewBox="0 0 100 100">
          <ellipse cx="30" cy="20" rx="15" ry="10" fill="currentColor"/>
          <ellipse cx="45" cy="15" rx="18" ry="12" fill="currentColor"/>
          <ellipse cx="60" cy="20" rx="16" ry="11" fill="currentColor"/>
          <line x1="35" y1="30" x2="35" y2="45" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="45" y1="30" x2="45" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="55" y1="30" x2="55" y2="45" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        {/* Bottom right - Plant growth */}
        <svg className="absolute bottom-32 right-32 w-40 h-40 text-eco-green-500 dark:text-eco-green-400 opacity-7 dark:opacity-15 animate-sway" viewBox="0 0 100 100">
          <path d="M50 100 L50 40 M50 60 Q40 50 35 45 M50 70 Q60 65 65 62 M50 50 Q45 40 40 35 M50 55 Q55 45 60 40" 
                stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <ellipse cx="35" cy="42" rx="8" ry="12" fill="currentColor" opacity="0.6"/>
          <ellipse cx="65" cy="60" rx="10" ry="14" fill="currentColor" opacity="0.6"/>
          <ellipse cx="40" cy="32" rx="7" ry="10" fill="currentColor" opacity="0.6"/>
          <ellipse cx="60" cy="38" rx="9" ry="13" fill="currentColor" opacity="0.6"/>
        </svg>

        {/* Bottom left - Sun */}
        <svg className="absolute bottom-20 left-16 w-28 h-28 text-yellow-400 dark:text-yellow-500 opacity-10 dark:opacity-18 animate-pulse-slow" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="20" fill="currentColor"/>
          <path d="M50 5 L50 20 M50 80 L50 95 M95 50 L80 50 M20 50 L5 50 M80 20 L70 30 M30 70 L20 80 M80 80 L70 70 M30 30 L20 20" 
                stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </svg>

        {/* Middle - Floating clouds */}
        <svg className="absolute top-1/3 left-1/4 w-36 h-20 text-blue-300 dark:text-blue-600 opacity-6 dark:opacity-12 animate-float-slow" viewBox="0 0 100 40">
          <ellipse cx="25" cy="25" rx="15" ry="10" fill="currentColor"/>
          <ellipse cx="40" cy="20" rx="18" ry="12" fill="currentColor"/>
          <ellipse cx="55" cy="25" rx="16" ry="11" fill="currentColor"/>
          <ellipse cx="70" cy="22" rx="14" ry="10" fill="currentColor"/>
        </svg>

        {/* Right middle - Water drops */}
        <svg className="absolute top-1/2 right-1/4 w-20 h-24 text-blue-400 dark:text-blue-500 opacity-8 dark:opacity-15 animate-bounce-slow" viewBox="0 0 100 100">
          <path d="M30 40 Q30 20 40 10 Q50 20 50 40 Q50 55 40 55 Q30 55 30 40" fill="currentColor"/>
          <path d="M60 70 Q60 55 70 45 Q80 55 80 70 Q80 82 70 82 Q60 82 60 70" fill="currentColor" opacity="0.7"/>
          <path d="M15 75 Q15 65 22 58 Q29 65 29 75 Q29 84 22 84 Q15 84 15 75" fill="currentColor" opacity="0.5"/>
        </svg>

        {/* Left middle - Bicycle */}
        <svg className="absolute top-2/3 left-10 w-32 h-20 text-eco-green-400 dark:text-eco-green-500 opacity-7 dark:opacity-14" viewBox="0 0 100 60">
          <circle cx="25" cy="45" r="12" fill="none" stroke="currentColor" strokeWidth="2.5"/>
          <circle cx="75" cy="45" r="12" fill="none" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M25 45 L40 20 L55 20 L65 35 L75 45 M40 20 L40 35 L55 35" 
                stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Additional decorative elements */}
        <svg className="absolute top-1/4 right-1/3 w-16 h-16 text-pink-300 dark:text-pink-500 opacity-7 dark:opacity-13 animate-pulse-slow" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="8" fill="currentColor"/>
          <circle cx="30" cy="50" r="6" fill="currentColor" opacity="0.7"/>
          <circle cx="70" cy="50" r="6" fill="currentColor" opacity="0.7"/>
          <circle cx="50" cy="30" r="5" fill="currentColor" opacity="0.6"/>
          <circle cx="50" cy="70" r="5" fill="currentColor" opacity="0.6"/>
        </svg>

        <svg className="absolute bottom-1/3 right-20 w-24 h-24 text-green-300 dark:text-green-500 opacity-6 dark:opacity-12 animate-float" viewBox="0 0 100 100">
          <path d="M50 80 L50 50 Q50 35 35 35 M50 50 Q50 35 65 35" 
                stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <circle cx="35" cy="35" r="8" fill="currentColor"/>
          <circle cx="65" cy="35" r="8" fill="currentColor"/>
          <ellipse cx="50" cy="25" rx="18" ry="10" fill="currentColor" opacity="0.5"/>
        </svg>

        <svg className="absolute top-1/2 left-1/3 w-20 h-20 text-orange-300 dark:text-orange-500 opacity-6 dark:opacity-12 animate-twinkle" viewBox="0 0 100 100">
          <path d="M50 20 L55 45 L80 50 L55 55 L50 80 L45 55 L20 50 L45 45 Z" fill="currentColor" opacity="0.6"/>
          <circle cx="50" cy="50" r="6" fill="currentColor"/>
        </svg>

        {/* More nature elements */}
        <svg className="absolute bottom-10 right-1/3 w-24 h-24 text-eco-green-300 dark:text-eco-green-600 opacity-8 dark:opacity-15 animate-sway" viewBox="0 0 100 100">
          <path d="M50 90 L50 50 M50 60 Q35 55 30 50 Q35 55 50 60 M50 70 Q65 65 70 60 Q65 65 50 70" 
                stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <circle cx="30" cy="48" r="7" fill="currentColor"/>
          <circle cx="70" cy="58" r="8" fill="currentColor"/>
        </svg>

        <svg className="absolute top-3/4 right-16 w-20 h-20 text-purple-300 dark:text-purple-500 opacity-7 dark:opacity-13 animate-float" viewBox="0 0 100 100">
          <path d="M50 30 Q60 40 50 50 Q40 40 50 30" fill="currentColor"/>
          <path d="M50 50 Q60 60 50 70 Q40 60 50 50" fill="currentColor" opacity="0.8"/>
          <path d="M50 50 Q70 50 70 60 Q70 50 50 50" fill="currentColor" opacity="0.7"/>
          <path d="M50 50 Q30 50 30 60 Q30 50 50 50" fill="currentColor" opacity="0.7"/>
        </svg>

        {/* Environmental icons */}
        <svg className="absolute top-1/4 left-1/3 w-18 h-18 text-green-400 dark:text-green-500 opacity-8 dark:opacity-14 animate-bounce-slow" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="25" fill="currentColor" opacity="0.3"/>
          <path d="M30 50 Q50 30 70 50 M30 50 Q50 70 70 50" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        </svg>

        <svg className="absolute bottom-1/4 left-1/4 w-22 h-22 text-teal-400 dark:text-teal-500 opacity-7 dark:opacity-13 animate-sway" viewBox="0 0 100 100">
          <rect x="40" y="60" width="20" height="35" rx="3" fill="currentColor"/>
          <path d="M50 60 L50 30 M50 40 Q35 35 30 30 M50 45 Q65 40 70 35 M50 35 Q40 30 35 25" 
                stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>

        {/* Wind and air quality */}
        <svg className="absolute top-2/3 right-1/4 w-28 h-20 text-gray-300 dark:text-gray-600 opacity-6 dark:opacity-11 animate-float-slow" viewBox="0 0 100 50">
          <path d="M10 15 Q30 10 50 15 Q70 20 90 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M10 25 Q30 20 50 25 Q70 30 90 25" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M10 35 Q30 30 50 35 Q70 40 90 35" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>

        <svg className="absolute bottom-1/2 left-16 w-20 h-20 text-red-300 dark:text-red-500 opacity-7 dark:opacity-12 animate-pulse-slow" viewBox="0 0 100 100">
          <path d="M50 80 Q30 60 30 40 Q30 20 50 20 Q70 20 70 40 Q70 60 50 80 Z" fill="currentColor"/>
        </svg>
      </>
    ),
    
    dashboard: (
      <>
        {/* Gradient overlay for dashboard */}
        <div className="absolute inset-0 bg-gradient-to-br from-eco-green-50/5 via-transparent to-blue-50/5 dark:from-eco-green-900/3 dark:via-transparent dark:to-blue-900/3 pointer-events-none"></div>
        
        {/* Top right corner - Tree */}
        <svg className="absolute top-5 right-5 w-28 h-28 text-eco-green-400 dark:text-eco-green-500 opacity-5 dark:opacity-10 animate-sway" viewBox="0 0 100 100">
          <rect x="45" y="60" width="10" height="40" fill="currentColor" opacity="0.7"/>
          <circle cx="50" cy="50" r="25" fill="currentColor" opacity="0.5"/>
          <circle cx="40" cy="40" r="18" fill="currentColor" opacity="0.6"/>
          <circle cx="60" cy="42" r="20" fill="currentColor" opacity="0.6"/>
        </svg>

        {/* Bottom left - Light bulb */}
        <svg className="absolute bottom-10 left-10 w-24 h-24 text-yellow-400 dark:text-yellow-500 opacity-4 dark:opacity-8 animate-pulse-slow" viewBox="0 0 100 100">
          <path d="M50 20 Q35 20 35 35 Q35 45 40 55 L60 55 Q65 45 65 35 Q65 20 50 20" fill="currentColor"/>
          <rect x="42" y="55" width="16" height="8" rx="2" fill="currentColor"/>
          <rect x="44" y="63" width="12" height="4" rx="1" fill="currentColor" opacity="0.8"/>
          <line x1="50" y1="10" x2="50" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="70" y1="20" x2="66" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="30" y1="20" x2="34" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>

        {/* Top left - Stars */}
        <svg className="absolute top-20 left-20 w-20 h-20 text-yellow-300 dark:text-yellow-500 opacity-5 dark:opacity-10 animate-twinkle" viewBox="0 0 100 100">
          <path d="M50 10 L55 40 L85 45 L60 65 L68 95 L50 80 L32 95 L40 65 L15 45 L45 40 Z" fill="currentColor"/>
        </svg>

        {/* Right middle - Wind turbine */}
        <svg className="absolute top-1/3 right-12 w-24 h-32 text-gray-400 dark:text-gray-500 opacity-3 dark:opacity-6 animate-spin-slow" viewBox="0 0 100 100">
          <rect x="48" y="40" width="4" height="50" fill="currentColor"/>
          <ellipse cx="50" cy="30" rx="3" ry="3" fill="currentColor"/>
          <path d="M50 30 L50 10 L60 20 Z" fill="currentColor" opacity="0.8" transform="rotate(0 50 30)"/>
          <path d="M50 30 L50 10 L60 20 Z" fill="currentColor" opacity="0.8" transform="rotate(120 50 30)"/>
          <path d="M50 30 L50 10 L60 20 Z" fill="currentColor" opacity="0.8" transform="rotate(240 50 30)"/>
        </svg>

        {/* Additional dashboard decorations */}
        <svg className="absolute bottom-1/3 right-1/4 w-20 h-20 text-blue-300 dark:text-blue-500 opacity-4 dark:opacity-8 animate-float" viewBox="0 0 100 100">
          <path d="M30 50 Q30 30 50 30 Q70 30 70 50 Q70 70 50 80 Q30 70 30 50" fill="currentColor" opacity="0.5"/>
          <path d="M40 50 L50 40 L60 50" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>

        <svg className="absolute top-1/2 left-1/4 w-16 h-16 text-purple-300 dark:text-purple-500 opacity-4 dark:opacity-8 animate-bounce-slow" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.6"/>
          <path d="M50 35 L45 45 L50 40 L55 45 Z" fill="white" opacity="0.9"/>
          <path d="M35 50 L45 45 L40 50 L45 55 Z" fill="white" opacity="0.9"/>
          <path d="M50 65 L45 55 L50 60 L55 55 Z" fill="white" opacity="0.9"/>
          <path d="M65 50 L55 45 L60 50 L55 55 Z" fill="white" opacity="0.9"/>
        </svg>

        <svg className="absolute bottom-20 right-20 w-18 h-18 text-green-400 dark:text-green-500 opacity-4 dark:opacity-8 animate-sway" viewBox="0 0 100 100">
          <path d="M50 70 L50 40 M50 50 Q35 45 30 40 M50 55 Q65 50 70 48" 
                stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <circle cx="30" cy="38" r="6" fill="currentColor"/>
          <circle cx="70" cy="46" r="7" fill="currentColor"/>
        </svg>

        {/* More dashboard elements */}
        <svg className="absolute top-2/3 left-16 w-20 h-20 text-teal-400 dark:text-teal-500 opacity-4 dark:opacity-8 animate-float-slow" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="3"/>
          <path d="M50 35 L50 50 L60 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </svg>

        <svg className="absolute bottom-1/2 right-1/3 w-24 h-24 text-pink-300 dark:text-pink-500 opacity-3 dark:opacity-6 animate-pulse-slow" viewBox="0 0 100 100">
          <path d="M50 85 Q30 65 30 45 Q30 25 50 25 Q70 25 70 45 Q70 65 50 85 Z" fill="currentColor" opacity="0.6"/>
        </svg>

        <svg className="absolute top-1/4 right-1/4 w-16 h-16 text-orange-300 dark:text-orange-500 opacity-4 dark:opacity-8 animate-twinkle" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="8" fill="currentColor"/>
          <circle cx="30" cy="50" r="5" fill="currentColor" opacity="0.7"/>
          <circle cx="70" cy="50" r="5" fill="currentColor" opacity="0.7"/>
          <circle cx="50" cy="30" r="5" fill="currentColor" opacity="0.7"/>
          <circle cx="50" cy="70" r="5" fill="currentColor" opacity="0.7"/>
        </svg>

        <svg className="absolute bottom-1/4 left-1/3 w-18 h-18 text-green-300 dark:text-green-600 opacity-4 dark:opacity-8 animate-sway" viewBox="0 0 100 100">
          <path d="M50 80 L50 40 M50 50 Q40 45 35 40 M50 55 Q60 50 65 45" 
                stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <ellipse cx="35" cy="38" rx="6" ry="8" fill="currentColor"/>
          <ellipse cx="65" cy="43" rx="7" ry="9" fill="currentColor"/>
        </svg>

        {/* Recycling and eco symbols */}
        <svg className="absolute top-3/4 right-1/4 w-20 h-20 text-eco-green-400 dark:text-eco-green-500 opacity-4 dark:opacity-8 animate-spin-slow" viewBox="0 0 100 100">
          <path d="M50 30 L55 45 L40 45 Z M65 50 L80 55 L70 65 Z M35 65 L40 80 L25 80 Z" 
                fill="none" stroke="currentColor" strokeWidth="2.5"/>
          <circle cx="47" cy="40" r="3" fill="currentColor"/>
          <circle cx="70" cy="58" r="3" fill="currentColor"/>
          <circle cx="32" cy="73" r="3" fill="currentColor"/>
        </svg>
      </>
    ),

    minimal: (
      <>
        {/* Subtle leaf pattern - top right */}
        <svg className="absolute top-10 right-10 w-16 h-16 text-eco-green-300 dark:text-eco-green-500 opacity-5 dark:opacity-10 animate-float" viewBox="0 0 100 100">
          <path d="M50 10 Q65 30 50 50 Q35 30 50 10" fill="currentColor"/>
        </svg>
        
        {/* Bottom left flower */}
        <svg className="absolute bottom-10 left-10 w-20 h-20 text-eco-green-400 dark:text-eco-green-500 opacity-6 dark:opacity-12 animate-sway" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="5" fill="currentColor"/>
          <path d="M50 50 Q60 40 70 40 M50 50 Q40 60 30 60 M50 50 Q60 60 70 60 M50 50 Q40 40 30 40" 
                stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>

        {/* Top left sparkle */}
        <svg className="absolute top-16 left-16 w-12 h-12 text-yellow-300 dark:text-yellow-400 opacity-7 dark:opacity-14 animate-twinkle" viewBox="0 0 100 100">
          <path d="M50 20 L52 48 L80 50 L52 52 L50 80 L48 52 L20 50 L48 48 Z" fill="currentColor"/>
        </svg>

        {/* Bottom right leaf */}
        <svg className="absolute bottom-16 right-16 w-14 h-14 text-eco-green-300 dark:text-eco-green-500 opacity-6 dark:opacity-12 animate-float-slow" viewBox="0 0 100 100">
          <path d="M50 20 Q60 35 55 50 Q50 65 45 50 Q40 35 50 20 M50 50 L50 80" 
                fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
        </svg>

        {/* Center decorative circle */}
        <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-eco-green-200 dark:text-eco-green-700 opacity-4 dark:opacity-8" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5"/>
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3"/>
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        </svg>
      </>
    )
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {doodleVariants[variant] || doodleVariants.minimal}
    </div>
  )
}

export default EcoDoodles
