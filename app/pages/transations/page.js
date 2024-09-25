"use client";
import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Sidebar from '@/components/Sidebar'

export default function Transactions() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Grocery Shopping', amount: -120.50, date: '2023-06-15', category: 'Groceries' },
    { id: 2, description: 'Salary Deposit', amount: 3500, date: '2023-06-01', category: 'Income' },
    { id: 3, description: 'Electric Bill', amount: -85.20, date: '2023-06-10', category: 'Utilities' },
    { id: 4, description: 'Online Purchase', amount: -65.99, date: '2023-06-12', category: 'Shopping' },
  ])
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
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

 

  useEffect(() => {
    let filtered = transactions

    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (dateFilter) {
      filtered = filtered.filter(t => t.date === dateFilter)
    }

    if (categoryFilter) {
      filtered = filtered.filter(t => t.category === categoryFilter)
    }

    setFilteredTransactions(filtered)
  }, [transactions, searchTerm, dateFilter, categoryFilter])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleAddTransaction = (e) => {
    e.preventDefault()
    const id = transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1
    setTransactions([...transactions, { ...newTransaction, id, amount: parseFloat(newTransaction.amount) }])
    setNewTransaction({ description: '', amount: '', date: '', category: '' })
  }

  const handleEditTransaction = (e) => {
    e.preventDefault()
    setTransactions(transactions.map(t => t.id === editingTransaction.id ? editingTransaction : t))
    setEditingTransaction(null)
  }

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  const categories = ['Groceries', 'Utilities', 'Shopping', 'Income', 'Entertainment', 'Transportation', 'Other']

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
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>Transactions</h1>
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

        {/* Add Transaction Form */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Add New Transaction</h2>
          <form onSubmit={handleAddTransaction} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <input
              type="text"
              placeholder="Description"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
              required
              style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
              required
              style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
            />
            <input
              type="date"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              required
              style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
            />
            <select
              value={newTransaction.category}
              onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
              required
              style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
              Add Transaction
            </button>
          </form>
        </div>

        {/* Filters and Search */}
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
          />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Transactions List */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Transactions</h2>
          {filteredTransactions.map(transaction => (
            <div key={transaction.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
              <div>
                <p style={{ fontWeight: '500', color: '#111827' }}>{transaction.description}</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{transaction.date} - {transaction.category}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: '500', color: transaction.amount > 0 ? '#10b981' : '#ef4444', marginRight: '1rem' }}>
                  {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                </span>
                <button onClick={() => setEditingTransaction(transaction)} style={{ marginRight: '0.5rem', padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#6b7280">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button onClick={() => handleDeleteTransaction(transaction.id)} style={{ padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#ef4444">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Transaction Modal */}
        {editingTransaction && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 20 }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', width: '100%', maxWidth: '500px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Edit Transaction</h2>
              <form onSubmit={handleEditTransaction} style={{ display: 'grid', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="Description"
                  value={editingTransaction.description}
                  onChange={(e) => setEditingTransaction({ ...editingTransaction, description: e.target.value })}
                  required
                  style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={editingTransaction.amount}
                  onChange={(e) => setEditingTransaction({ ...editingTransaction, amount: parseFloat(e.target.value) })}
                  required
                  style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
                />
                <input
                  type="date"
                  value={editingTransaction.date}
                  onChange={(e) => setEditingTransaction({ ...editingTransaction, date: e.target.value })}
                  required
                  style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
                />
                <select
                  value={editingTransaction.category}
                  onChange={(e) => setEditingTransaction({ ...editingTransaction, category: e.target.value })}
                  required
                  style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button type="button" onClick={() => setEditingTransaction(null)} style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>
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