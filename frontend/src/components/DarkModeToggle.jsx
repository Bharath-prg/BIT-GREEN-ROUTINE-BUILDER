import { useTheme } from '../context/ThemeContext'

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <button
      onClick={toggleDarkMode}
      className="relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-eco-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 border-2 border-gray-300 dark:border-gray-600"
      style={{
        backgroundColor: darkMode ? '#374151' : '#f3f4f6'
      }}
      aria-label="Toggle dark mode"
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Toggle slider */}
      <div
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-lg transform transition-transform duration-300 flex items-center justify-center ${
          darkMode ? 'translate-x-8' : 'translate-x-0'
        }`}
      >
        {darkMode ? (
          <span className="text-xs">🌙</span>
        ) : (
          <span className="text-xs">☀️</span>
        )}
      </div>
    </button>
  )
}

export default DarkModeToggle
