"use client";
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null); // Create a ref for the sidebar

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsSidebarOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false); // Close sidebar if click is outside
      }
    };

    if (isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      if (isMobile) {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [isMobile, setIsSidebarOpen]);

  const links = [
    { title: 'Dashboard', icon: <DashboardIcon /> ,href:'/pages/dashboard' },
    { title: 'Transactions', icon: <TransactionsIcon /> ,href:'/pages/transations' },
    { title: 'Budget', icon: <BudgetIcon /> ,href:'/pages/budget' },
    { title: 'Reports', icon: <ReportIcon /> ,href:'/pages/reports' },
    { title: 'goals', icon: <GoalIcon /> ,href:'/pages/goals' },
    { title: 'Profile', icon: <ProfileIcon /> ,href:'/pages/profile' },
  ];

  return (
    <aside
      ref={sidebarRef} // Attach the ref to the sidebar
      style={{
        width: isSidebarOpen ? '250px' : '0px',
        backgroundColor: 'white',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        transition: 'width 0.3s ease',
        position: isMobile ? 'absolute' : 'relative',
        height: '100%',
        zIndex: 10,
        overflowX: 'hidden',
        overflowY: 'auto',
      }}>
      <div style={{ padding: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
          {isSidebarOpen && 'FinanceTrack'}
        </h2>
      </div>
      <nav style={{ marginTop: '1.5rem' }}>
        {links.map((link) => (
          <Link key={link.title} href={link.href} style={linkStyle(isSidebarOpen)}>
            {link.icon}
            {isSidebarOpen && link.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

const linkStyle = (isSidebarOpen) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  color: isSidebarOpen ? '#4b5563' : '#1f2937',
  textDecoration: 'none',
  marginTop: '0.5rem',
});

// Define your SVG icons here or import them from elsewhere
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const TransactionsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
  </svg>
);

const BudgetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
  </svg>
);

const GoalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
  </svg>
)

const ReportIcon = () =>(
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
     <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
  </svg> 
)

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

export default Sidebar;
