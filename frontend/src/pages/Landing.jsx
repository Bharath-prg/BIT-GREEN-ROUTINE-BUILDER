import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-green-50 via-white to-eco-green-50">
      {/* Navigation */}
      <nav className="px-6 py-4 flex items-center justify-between bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-3xl">🌱</span>
          <h1 className="text-2xl font-bold text-eco-green-700">Green Routine</h1>
        </div>
        <div className="space-x-4">
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
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Build Sustainable Habits,
          <br />
          <span className="text-eco-green-600">One Day at a Time</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
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
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Green Routine?</h2>
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
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-eco-green-600 text-white py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-xl mb-8">Join thousands of eco-warriors building sustainable habits</p>
        <Link to="/signup" className="bg-white text-eco-green-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition inline-block">
          Get Started Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>&copy; 2025 Green Routine Builder. Built for a sustainable future 🌱</p>
      </footer>
    </div>
  )
}

export default Landing
