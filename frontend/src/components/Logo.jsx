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
      {/* Meaningful SVG Logo: Growth through Habits */}
      <div className={`${container} relative flex-shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Main circle - representing completeness & routine */}
          <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
          
          {/* Inner white circle */}
          <circle cx="50" cy="50" r="38" fill="white" />
          
          {/* Progress arc - representing habit tracking */}
          <circle cx="50" cy="50" r="42" fill="none" stroke="#10b981" strokeWidth="2" 
                  strokeDasharray="140 270" strokeLinecap="round" 
                  transform="rotate(-90 50 50)" opacity="0.9"/>
          
          {/* Central sprouting plant - representing growth */}
          <g>
            {/* Stem */}
            <line x1="50" y1="70" x2="50" y2="45" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"/>
            
            {/* Left leaf */}
            <path d="M50 55 Q42 53 40 50 Q42 48 50 50" 
                  fill="#10b981" stroke="#059669" strokeWidth="0.8"/>
            
            {/* Right leaf */}
            <path d="M50 50 Q58 48 60 45 Q58 43 50 45" 
                  fill="#10b981" stroke="#059669" strokeWidth="0.8"/>
            
            {/* Top leaves - continuous growth */}
            <ellipse cx="47" cy="43" rx="3" ry="5" fill="#10b981" opacity="0.9" transform="rotate(-25 47 43)"/>
            <ellipse cx="50" cy="41" rx="3.5" ry="5.5" fill="#059669"/>
            <ellipse cx="53" cy="43" rx="3" ry="5" fill="#10b981" opacity="0.9" transform="rotate(25 53 43)"/>
          </g>
          
          {/* Top left - Checkmark (habit completion) */}
          <g transform="translate(28, 25)">
            <circle cx="0" cy="0" r="7" fill="white" stroke="#10b981" strokeWidth="1.2"/>
            <path d="M-3 0 L-1 2 L3 -2" stroke="#10b981" strokeWidth="1.5" 
                  fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          
          {/* Top right - Recycling symbol (sustainability) */}
          <g transform="translate(72, 25) scale(0.7)">
            <path d="M0 -5 L1.5 -1.5 L-1.5 -1.5 Z" fill="#10b981"/>
            <path d="M4 2.5 L8 4 L5.5 6.5 Z" fill="#10b981"/>
            <path d="M-4 2.5 L-0.5 4 L-3 6.5 Z" fill="#10b981"/>
            <circle cx="0" cy="-3.5" r="0.8" fill="#10b981"/>
            <circle cx="3" cy="1.5" r="0.8" fill="#10b981"/>
            <circle cx="-3" cy="1.5" r="0.8" fill="#10b981"/>
          </g>
          
          {/* Bottom left - Calendar icon (routine) */}
          <g transform="translate(25, 72)">
            <rect x="-4" y="-4" width="8" height="8" rx="1" fill="white" stroke="#10b981" strokeWidth="0.8"/>
            <line x1="-2.5" y1="-4.5" x2="-2.5" y2="-3" stroke="#10b981" strokeWidth="0.8"/>
            <line x1="2.5" y1="-4.5" x2="2.5" y2="-3" stroke="#10b981" strokeWidth="0.8"/>
            <line x1="-4" y1="-1" x2="4" y2="-1" stroke="#10b981" strokeWidth="0.6"/>
            <path d="M-2 0.5 L-1 1.5 L0 0" stroke="#10b981" strokeWidth="0.7" fill="none"/>
          </g>
          
          {/* Bottom right - Heart (care) */}
          <g transform="translate(75, 72) scale(0.6)">
            <path d="M0 2 Q-3 -1 -3 -3 Q-3 -5 -1.5 -5 Q0 -5 0 -3.5 Q0 -5 1.5 -5 Q3 -5 3 -3 Q3 -1 0 2" 
                  fill="#ef4444" opacity="0.8"/>
          </g>
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
