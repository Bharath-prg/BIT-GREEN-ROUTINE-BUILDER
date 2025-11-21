import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import EcoDoodles from '../components/EcoDoodles'

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 relative transition-colors duration-300">
      {/* Eco Doodles Background */}
      <EcoDoodles variant="dashboard" />
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col relative z-10">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
