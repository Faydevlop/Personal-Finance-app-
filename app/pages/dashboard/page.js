"use client";
import React, { useState, useEffect } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js'
import Sidebar from '@/components/Sidebar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export default function Dashboard() {
  const [balance, setBalance] = useState(5280.50)
  const [income, setIncome] = useState(3500)
  const [expenses, setExpenses] = useState(2219.50)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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

  const recentTransactions = [
    { id: 1, description: 'Grocery Shopping', amount: -120.50, date: '2023-06-15' },
    { id: 2, description: 'Salary Deposit', amount: 3500, date: '2023-06-01' },
    { id: 3, description: 'Electric Bill', amount: -85.20, date: '2023-06-10' },
    { id: 4, description: 'Online Purchase', amount: -65.99, date: '2023-06-12' },
  ]

  const spendingData = {
    labels: ['Housing', 'Food', 'Transportation', 'Utilities', 'Entertainment', 'Others'],
    datasets: [
      {
        data: [1000, 500, 300, 200, 150, 69.50],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const monthlySpendingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Spending',
        data: [1800, 2200, 1900, 2400, 2000, 2219.50],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6', position: 'relative' }}>
      {/* Sidebar */}
      
     
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
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>Dashboard</h1>
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

        {/* Financial Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4b5563' }}>Balance</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#6b7280">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>${balance.toFixed(2)}</div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>+2.1% from last month</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4b5563' }}>Income</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#6b7280">
                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>${income.toFixed(2)}</div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>+0.5% from last month</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4b5563' }}>Expenses</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#6b7280">
                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>${expenses.toFixed(2)}</div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>+4.3% from last month</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Recent Transactions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: '500', color: '#111827' }}>{transaction.description}</p>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{transaction.date}</p>
                </div>
                <div style={{ fontWeight: '500', color: transaction.amount > 0 ? '#10b981' : '#ef4444' }}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spending Patterns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Spending by Category</h2>
            <div style={{ height: '300px' }}>
              <Doughnut data={spendingData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Monthly Spending Trend</h2>
            <div style={{ height: '300px' }}>
              <Bar data={monthlySpendingData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}