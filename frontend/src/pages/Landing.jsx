import React from 'react'
import { Link } from 'react-router-dom'
import EcoDoodles from '../components/EcoDoodles'
import Logo from '../components/Logo'
import DarkModeToggle from '../components/DarkModeToggle'

const Landing = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-eco-green-50 via-white to-eco-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 z-0"></div>
      
      {/* Eco Doodles Background */}
      <EcoDoodles variant="landing" />
      
      {/* Content with higher z-index */}
      <div className="relative z-10">
      {/* Navigation */}
      <nav className="px-6 py-4 flex items-center justify-between bg-white/90 dark:bg-gray-800/90 shadow-sm backdrop-blur-sm transition-colors duration-300">
        <Logo size="md" showText={true} />
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          <Link to="/login" className="btn-secondary">
            Login
          </Link>
          <Link to="/signup" className="btn-primary">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
          Build Sustainable Habits,
          <br />
          <span className="text-eco-green-600 dark:text-eco-green-400">One Day at a Time</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto transition-colors duration-300">
          Track eco-friendly habits, join challenges, and make a positive impact on the planet
          with our gamified habit tracker.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Link to="/signup" className="btn-primary text-lg px-8 py-3">
            Start Your Journey 🚀
          </Link>
          <Link to="/login" className="btn-secondary text-lg px-8 py-3">
            Already a Member?
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white transition-colors duration-300">Why Choose Green Routine?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '✅', title: 'Track Habits', desc: 'Create and monitor eco-friendly habits daily' },
            { icon: '🔥', title: 'Build Streaks', desc: 'Stay motivated with streak tracking and badges' },
            { icon: '🏆', title: 'Join Challenges', desc: 'Compete in eco-challenges with others' },
            { icon: '📅', title: 'Visual Calendar', desc: 'See your progress with color-coded calendar' },
            { icon: '📚', title: 'Eco Library', desc: 'Browse curated sustainability tips' },
            { icon: '🌍', title: 'Track Impact', desc: 'Monitor your environmental contribution' },
          ].map((feature, idx) => (
            <div key={idx} className="card text-center hover:scale-105 transition duration-300">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-eco-green-600 dark:bg-eco-green-700 text-white py-16 text-center transition-colors duration-300">
        <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-xl mb-8">Join thousands of eco-warriors building sustainable habits</p>
        <Link to="/signup" className="bg-white dark:bg-gray-800 text-eco-green-600 dark:text-eco-green-400 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition inline-block">
          Get Started Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8 text-center transition-colors duration-300">
        <p>&copy; 2025 Green Routine Builder. Built for a sustainable future 🌱</p>
      </footer>
    </div>
    </div>
  )
}

export default Landing
