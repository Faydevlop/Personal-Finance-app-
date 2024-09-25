"use client";

import Sidebar from '@/components/Sidebar';
import React, { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function Goals() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [goals, setGoals] = useState([
    { id: 1, name: 'Vacation Fund', target: 5000, current: 2500, deadline: '2023-12-31' },
    { id: 2, name: 'Emergency Fund', target: 10000, current: 7500, deadline: '2024-06-30' },
    { id: 3, name: 'New Car', target: 20000, current: 5000, deadline: '2025-01-01' },
  ])
  const [newGoal, setNewGoal] = useState({ name: '', target: '', current: '', deadline: '' })
  const [editingGoal, setEditingGoal] = useState(null)

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

  const handleAddGoal = (e) => {
    e.preventDefault()
    const id = goals.length > 0 ? Math.max(...goals.map(g => g.id)) + 1 : 1
    setGoals([...goals, { ...newGoal, id, target: parseFloat(newGoal.target), current: parseFloat(newGoal.current) }])
    setNewGoal({ name: '', target: '', current: '', deadline: '' })
  }

  const handleEditGoal = (e) => {
    e.preventDefault()
    setGoals(goals.map(g => g.id === editingGoal.id ? editingGoal : g))
    setEditingGoal(null)
  }

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id))
  }

  const handleUpdateProgress = (id, newCurrent) => {
    setGoals(goals.map(g => g.id === id ? { ...g, current: parseFloat(newCurrent) } : g))
  }

  const calculateDaysLeft = (deadline) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const timeDiff = deadlineDate.getTime() - today.getTime()
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
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
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>Financial Goals</h1>
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

        {/* Add Goal Form */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Add New Goal</h2>
          <form onSubmit={handleAddGoal} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <input
              type="text"
              placeholder="Goal Name"
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              required
              style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
            />
            <input
              type="number"
              placeholder="Target Amount"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
              required
              style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
            />
            <input
              type="number"
              placeholder="Current Amount"
              value={newGoal.current}
              onChange={(e) => setNewGoal({ ...newGoal, current: e.target.value })}
              required
              style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
            />
            <input
              type="date"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              required
              style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
            />
            <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
              Add Goal
            </button>
          </form>
        </div>

        {/* Goals List */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Your Goals</h2>
          {goals.map(goal => (
            <div key={goal.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: '500', color: '#111827' }}>{goal.name}</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Target: ${goal.target.toFixed(2)}</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Deadline: {goal.deadline}</p>
                <p style={{ fontSize: '0.875rem', color: calculateDaysLeft(goal.deadline) > 0 ? '#10b981' : '#ef4444' }}>
                  {calculateDaysLeft(goal.deadline) > 0 ? `${calculateDaysLeft(goal.deadline)} days left` : 'Overdue'}
                </p>
              </div>
              <div style={{ width: '100px', height: '100px', marginRight: '1rem' }}>
                <CircularProgressbar
                  value={(goal.current / goal.target) * 100}
                  text={`${((goal.current / goal.target) * 100).toFixed(0)}%`}
                  styles={buildStyles({
                    textSize: '16px',
                    pathColor: `rgba(62, 152, 199, ${goal.current / goal.target})`,
                    textColor: '#111827',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                  })}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <input
                  type="number"
                  value={goal.current}
                  onChange={(e) => handleUpdateProgress(goal.id, e.target.value)}
                  style={{ padding: '0.25rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', marginBottom: '0.5rem', width: '100px' }}
                />
                <button onClick={() => setEditingGoal(goal)} style={{ marginBottom: '0.5rem', padding: '0.25rem 0.5rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
                  Edit
                </button>
                <button onClick={() => handleDeleteGoal(goal.id)} style={{ padding: '0.25rem 0.5rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Goal Modal */}
        {editingGoal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 20 }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', width: '100%', maxWidth: '500px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Edit Goal</h2>
              <form onSubmit={handleEditGoal} style={{ display: 'grid', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="Goal Name"
                  value={editingGoal.name}
                  onChange={(e) => setEditingGoal({ ...editingGoal, name: e.target.value })}
                  required
                  style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
                />
                <input
                  type="number"
                  placeholder="Target Amount"
                  value={editingGoal.target}
                  onChange={(e) => setEditingGoal({ ...editingGoal, target: parseFloat(e.target.value) })}
                  required
                  style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
                />
                <input
                  type="number"
                  placeholder="Current Amount"
                  value={editingGoal.current}
                  onChange={(e) => setEditingGoal({ ...editingGoal, current: parseFloat(e.target.value) })}
                  required
                  style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
                />
                <input
                  type="date"
                  value={editingGoal.deadline}
                  onChange={(e) => setEditingGoal({ ...editingGoal, deadline: e.target.value })}
                  required
                  style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button type="button" onClick={() => setEditingGoal(null)} style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}