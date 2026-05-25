import React, { useState, useEffect } from 'react';

function App() {
  const [records, setRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // 1. Fetch data from our Django REST API as soon as the page loads
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/dashboard/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setRecords(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setErrorMessage('Could not connect to the backend server. Make sure Django is running!');
      });
  }, []);

  // 2. Function to handle clicking the "Approve" button
  const handleApprove = (id) => {
    fetch(`http://127.0.0.1:8000/api/approve/${id}/`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'success') {
          // Update our screen instantly by mapping the updated record status
          setRecords(records.map(row => row.id === id ? { ...row, status: 'APPROVED' } : row));
        } else {
          alert('Failed to approve record: ' + result.message);
        }
      })
      .catch((error) => console.error('Error approving record:', error));
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <header style={{ marginBottom: '30px', borderBottom: '2px solid #e5e7eb', paddingBottom: '15px' }}>
        <h1 style={{ color: '#111827', margin: '0 0 10px 0' }}>Breathe ESG Analyst Review Dashboard</h1>
        <p style={{ color: '#4b5563', margin: 0 }}>Review, validate, and sign-off on enterprise emissions activity data.</p>
      </header>

      {errorMessage && (
        <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '15px', borderRadius: '6px', marginBottom: '20px', fontWeight: 'bold' }}>
          ⚠️ {errorMessage}
        </div>
      )}

      <div style={{ overflowX: 'auto', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '15px', color: '#374151' }}>Source</th>
              <th style={{ padding: '15px', color: '#374151' }}>Scope Hierarchy</th>
              <th style={{ padding: '15px', color: '#374151' }}>Data Description Lineage</th>
              <th style={{ padding: '15px', color: '#374151' }}>Normalized Value</th>
              <th style={{ padding: '15px', color: '#374151' }}>Status</th>
              <th style={{ padding: '15px', color: '#374151' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid #e5e7eb', transition: 'background-color 0.2s' }}>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#1f2937' }}>{row.source_type}</td>
                <td style={{ padding: '15px', color: '#4b5563' }}>
                  <span style={{ backgroundColor: '#eff6ff', color: '#1e40af', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '6px' }}>
                    {row.scope_category}
                  </span>
                </td>
                <td style={{ padding: '15px', color: '#4b5563', maxWidth: '400px' }}>
                  <div style={{ fontSize: '14px' }}>{row.description}</div>
                  {row.validation_notes && (
                    <div style={{ color: '#dc2626', fontSize: '12px', marginTop: '6px', backgroundColor: '#fef2f2', padding: '6px', borderRadius: '4px', borderLeft: '3px solid #dc2626' }}>
                      <strong>Validation Alert:</strong> {row.validation_notes}
                    </div>
                  )}
                </td>
                <td style={{ padding: '15px', fontWeight: '600', color: '#111827' }}>
                  {row.normalized_quantity} {row.normalized_unit}
                  <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 'normal' }}>Originally: {row.raw_quantity} {row.raw_unit}</div>
                </td>
                <td style={{ padding: '15px' }}>
                  <span style={{
                    padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold',
                    backgroundColor: row.status === 'APPROVED' ? '#d1fae5' : row.status === 'SUSPICIOUS' ? '#fef3c7' : '#e5e7eb',
                    color: row.status === 'APPROVED' ? '#065f46' : row.status === 'SUSPICIOUS' ? '#92400e' : '#374151'
                  }}>
                    {row.status}
                  </span>
                </td>
                <td style={{ padding: '15px' }}>
                  {row.status !== 'APPROVED' ? (
                    <button
                      onClick={() => handleApprove(row.id)}
                      style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}
                    >
                      Sign Off / Approve
                    </button>
                  ) : (
                    <span style={{ color: '#9ca3af', fontSize: '14px' }}>🔒 Locked for Audit</span>
                  )}
                </td>
              </tr>
            ))}
            {records.length === 0 && !errorMessage && (
              <tr>
                <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#6b7280' }}>No records found in the system.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;