"use client";

import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
} from 'chart.js'
import Sidebar from '@/components/Sidebar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Budgets() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Groceries', limit: 500, spent: 420 },
    { id: 2, category: 'Entertainment', limit: 200, spent: 180 },
    { id: 3, category: 'Transportation', limit: 300, spent: 250 },
    { id: 4, category: 'Utilities', limit: 400, spent: 380 },
  ])
  const [editingBudget, setEditingBudget] = useState(null)
  const [newBudget, setNewBudget] = useState({
    category: '',
    limit: '',
    spent: 0,
  })

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

  const handleAddBudget = (e) => {
    e.preventDefault()
    const id = budgets.length > 0 ? Math.max(...budgets.map(b => b.id)) + 1 : 1
    setBudgets([...budgets, { ...newBudget, id, limit: parseFloat(newBudget.limit) }])
    setNewBudget({ category: '', limit: '', spent: 0 })
  }

  const handleEditBudget = (e) => {
    e.preventDefault()
    setBudgets(budgets.map(b => b.id === editingBudget.id ? editingBudget : b))
    setEditingBudget(null)
  }

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter(b => b.id !== id))
  }

  const chartData = {
    labels: budgets.map(b => b.category),
    datasets: [
      {
        label: 'Budget Limit',
        data: budgets.map(b => b.limit),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Actual Spending',
        data: budgets.map(b => b.spent),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6', position: 'relative' }}>
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
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>Budgets</h1>
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

        {/* Add Budget Form */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Add New Budget</h2>
          <form onSubmit={handleAddBudget} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <input
              type="text"
              placeholder="Category"
              value={newBudget.category}
              onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
              required
              style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
            />
            <input
              type="number"
              placeholder="Budget Limit"
              value={newBudget.limit}
              onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
              required
              style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
            />
            <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
              Add Budget
            </button>
          </form>
        </div>

        {/* Budget vs. Actual Spending Chart */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Budget vs. Actual Spending</h2>
          <div style={{ height: '400px' }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Budgets List */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Your Budgets</h2>
          {budgets.map(budget => (
            <div key={budget.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
              <div>
                <p style={{ fontWeight: '500', color: '#111827' }}>{budget.category}</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Limit: ${budget.limit.toFixed(2)}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: budget.spent > budget.limit ? '#ef4444' : '#10b981', marginRight: '1rem' }}>
                  ${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}
                </span>
                {budget.spent > budget.limit && (
                  <span style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', marginRight: '1rem' }}>
                    Over Budget
                  </span>
                )}
                <button onClick={() => setEditingBudget(budget)} style={{ marginRight: '0.5rem', padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#6b7280">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button onClick={() => handleDeleteBudget(budget.id)} style={{ padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#ef4444">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Budget Modal */}
        {editingBudget && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 20 }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', width: '100%', maxWidth: '500px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Edit Budget</h2>
              <form onSubmit={handleEditBudget} style={{ display: 'grid', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="Category"
                  value={editingBudget.category}
                  onChange={(e) => setEditingBudget({ ...editingBudget, category: e.target.value })}
                  required
                  style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
                />
                <input
                  type="number"
                  placeholder="Budget Limit"
                  value={editingBudget.limit}
                  onChange={(e) => setEditingBudget({ ...editingBudget, limit: parseFloat(e.target.value) })}
                  required
                  style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
                />
                <input
                  type="number"
                  placeholder="Spent Amount"
                  value={editingBudget.spent}
                  onChange={(e) => setEditingBudget({ ...editingBudget, spent: parseFloat(e.target.value) })}
                  required
                  style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button type="button" onClick={() => setEditingBudget(null)} style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
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