import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EcoDoodles from '../components/EcoDoodles'
import Logo from '../components/Logo'
import DarkModeToggle from '../components/DarkModeToggle'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement login logic with API
    console.log('Login:', formData)
    navigate('/dashboard')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-green-50 to-eco-green-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 relative transition-colors duration-300">
      <EcoDoodles variant="minimal" />
      <div className="absolute top-4 right-4 z-20">
        <DarkModeToggle />
      </div>
      <div className="max-w-md w-full relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" showText={false} />
          </div>
          <h1 className="text-3xl font-bold text-eco-green-700 dark:text-eco-green-400 transition-colors duration-300">Welcome Back!</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-300">Sign in to continue your eco journey</p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-eco-green-600 rounded" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-eco-green-600 hover:text-eco-green-700">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-eco-green-600 font-semibold hover:text-eco-green-700">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-600 hover:text-gray-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
