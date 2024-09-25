"use client";

import Sidebar from '@/components/Sidebar';
import React, { useState, useEffect } from 'react'

export default function Settings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  })
  const [currency, setCurrency] = useState('USD')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    console.log('Profile updated:', userProfile)
  }

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value)
    // In a real application, you would update this in your backend and possibly refetch data
  }

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode)
    // In a real application, you would apply the dark mode styles here
  }

  const handleDataExport = () => {
    // In a real application, you would generate and download the export file
    console.log('Exporting data...')
  }

  const handleDataImport = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real application, you would process the imported file
      console.log('Importing data from:', file.name)
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6', position: 'relative' }}>
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          {isMobile && (
            <button onClick={toggleSidebar} style={{ marginRight: '1rem', padding: '0.5rem', border: 'none', background: 'none' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>Settings</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button style={{ marginRight: '1rem', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '50%', backgroundColor: 'white' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#d1d5db', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              JD
            </div>
          </div>
        </div>

        {/* User Profile Management */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>User Profile</h2>
          <form onSubmit={handleProfileUpdate}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>Name</label>
              <input
                type="text"
                id="name"
                value={userProfile.name}
                onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>Email</label>
              <input
                type="email"
                id="email"
                value={userProfile.email}
                onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>Phone</label>
              <input
                type="tel"
                id="phone"
                value={userProfile.phone}
                onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
              />
            </div>
            <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
              Update Profile
            </button>
          </form>
        </div>

        {/* Data Import/Export Options */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Data Management</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleDataExport} style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
              Export Data
            </button>
            <label htmlFor="import-file" style={{ padding: '0.5rem 1rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
              Import Data
              <input
                type="file"
                id="import-file"
                onChange={handleDataImport}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        {/* Currency Settings */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Currency Settings</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="currency" style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>Preferred Currency</label>
            <select
              id="currency"
              value={currency}
              onChange={handleCurrencyChange}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CAD">CAD - Canadian Dollar</option>
            </select>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Appearance</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#374151' }}>Dark Mode</span>
            <button
              onClick={handleDarkModeToggle}
              style={{
                width: '3rem',
                height: '1.5rem',
                backgroundColor: darkMode ? '#3b82f6' : '#d1d5db',
                borderRadius: '9999px',
                position: 'relative',
                transition: 'background-color 0.2s',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '1.25rem',
                  height: '1.25rem',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '0.125rem',
                  left: darkMode ? 'calc(100% - 1.375rem)' : '0.125rem',
                  transition: 'left 0.2s',
                }}
              />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}