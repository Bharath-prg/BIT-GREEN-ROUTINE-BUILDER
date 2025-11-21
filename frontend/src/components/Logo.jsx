const Logo = ({ size = 'md', showText = true }) => {
  const sizes = {
    sm: { container: 'w-8 h-8', text: 'text-base' },
    md: { container: 'w-12 h-12', text: 'text-xl' },
    lg: { container: 'w-16 h-16', text: 'text-2xl' },
    xl: { container: 'w-20 h-20', text: 'text-3xl' }
  }

  const { container, text } = sizes[size]

  return (
    <div className="flex items-center space-x-3">
      {/* Unique SVG Logo */}
      <div className={`${container} relative flex-shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Circular background with gradient */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#34d399', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Main circle background */}
          <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />
          
          {/* Recycling arrows forming a circle */}
          <g transform="translate(50, 50)">
            {/* Arrow 1 - Top */}
            <path 
              d="M 0,-20 L -8,-28 L -3,-28 L -3,-35 L 3,-35 L 3,-28 L 8,-28 Z" 
              fill="#ffffff" 
              opacity="0.9"
            />
            {/* Arrow 2 - Bottom Right */}
            <path 
              d="M 0,-20 L -8,-28 L -3,-28 L -3,-35 L 3,-35 L 3,-28 L 8,-28 Z" 
              fill="#ffffff" 
              opacity="0.9"
              transform="rotate(120)"
            />
            {/* Arrow 3 - Bottom Left */}
            <path 
              d="M 0,-20 L -8,-28 L -3,-28 L -3,-35 L 3,-35 L 3,-28 L 8,-28 Z" 
              fill="#ffffff" 
              opacity="0.9"
              transform="rotate(240)"
            />
            
            {/* Central leaf sprout */}
            <g transform="translate(0, 5)">
              {/* Stem */}
              <line x1="0" y1="0" x2="0" y2="-15" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
              
              {/* Left leaf */}
              <path 
                d="M 0,-8 Q -6,-10 -8,-13 Q -6,-11 0,-8" 
                fill="url(#leafGradient)" 
                stroke="#ffffff" 
                strokeWidth="1"
              />
              
              {/* Right leaf */}
              <path 
                d="M 0,-8 Q 6,-10 8,-13 Q 6,-11 0,-8" 
                fill="url(#leafGradient)" 
                stroke="#ffffff" 
                strokeWidth="1"
              />
              
              {/* Top leaf */}
              <ellipse 
                cx="0" 
                cy="-15" 
                rx="5" 
                ry="7" 
                fill="url(#leafGradient)" 
                stroke="#ffffff" 
                strokeWidth="1"
              />
            </g>
          </g>
          
          {/* Decorative dots around the circle */}
          <circle cx="50" cy="10" r="2" fill="#ffffff" opacity="0.6"/>
          <circle cx="90" cy="50" r="2" fill="#ffffff" opacity="0.6"/>
          <circle cx="50" cy="90" r="2" fill="#ffffff" opacity="0.6"/>
          <circle cx="10" cy="50" r="2" fill="#ffffff" opacity="0.6"/>
        </svg>
      </div>
      
      {showText && (
        <div>
          <h1 className={`${text} font-bold text-eco-green-700 dark:text-eco-green-400 leading-tight`}>
            Green Routine
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">Build Better Habits</p>
        </div>
      )}
    </div>
  )
}

export default Logo
