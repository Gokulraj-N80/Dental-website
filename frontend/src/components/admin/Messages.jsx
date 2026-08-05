import React, { useState } from 'react';
import { Mail, Phone, Calendar, ArrowRight } from 'lucide-react';
import { MESSAGES } from './data/mockMessages';

export default function Messages() {
  const [messages, setMessages] = useState(MESSAGES);
  const [activeMessage, setActiveMessage] = useState(MESSAGES[0]);
  const [replyVal, setReplyVal] = useState('');

  const selectMessage = (msg) => {
    setActiveMessage(msg);
    // Mark as read
    if (msg.status === 'Unread') {
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: 'Read' } : m));
    }
  };

  const handlePostReply = () => {
    if (!replyVal) return;
    setMessages(prev => prev.map(m => {
      if (m.id === activeMessage.id) {
        const updated = {
          ...m,
          status: 'Replied',
          replies: [...m.replies, replyVal]
        };
        setActiveMessage(updated);
        return updated;
      }
      return m;
    }));
    setReplyVal('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 140px)' }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>Website Inquiries</h2>
        <p style={{ color: '#64748b', margin: 0, fontSize: '0.9rem' }}>Patient communication requests, booking inquiries, and customer contact feedback logs.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '20px', flex: 1, overflow: 'hidden' }}>
        {/* Inbox side */}
        <div className="admin-v2-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>Inquiries List</h3>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {messages.map((msg) => (
              <div 
                key={msg.id}
                onClick={() => selectMessage(msg)}
                style={{ 
                  padding: '16px 20px', 
                  borderBottom: '1px solid #f1f5f9',
                  cursor: 'pointer',
                  backgroundColor: activeMessage.id === msg.id ? '#f1f5f9' : 'transparent',
                  transition: 'background-color 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>{msg.name}</strong>
                  <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{msg.date}</span>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {msg.subject}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                    {msg.message}
                  </span>
                  <span className={`admin-v2-badge ${msg.status === 'Unread' ? 'pending' : msg.status === 'Urgent' ? 'cancelled' : 'confirmed'}`} style={{ fontSize: '0.65rem' }}>
                    {msg.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message body side */}
        <div className="admin-v2-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
          {activeMessage ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
              <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '1.25rem', color: '#0f172a' }}>{activeMessage.subject}</h3>
                
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.8rem', color: '#475569' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> {activeMessage.email}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> {activeMessage.phone}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {activeMessage.date}</span>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: '1.6' }}>{activeMessage.message}</p>
                </div>

                {activeMessage.replies.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>Replies Log</h4>
                    {activeMessage.replies.map((reply, idx) => (
                      <div key={idx} style={{ padding: '14px 16px', backgroundColor: '#e6fbf4', borderRadius: '8px', borderLeft: '3px solid #10b981', alignSelf: 'flex-end', maxWidth: '80%' }}>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#0f172a' }}>{reply}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input 
                  type="text" 
                  placeholder="Draft response reply to patient email..." 
                  className="admin-v2-input"
                  style={{ flex: 1 }}
                  value={replyVal}
                  onChange={(e) => setReplyVal(e.target.value)}
                />
                <button 
                  onClick={handlePostReply}
                  className="admin-v2-btn admin-v2-btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  Send Reply <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748b' }}>
              Select a message to view detail logs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
