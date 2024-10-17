import React, { useState } from 'react';
import './App.css';

function App() {
  const [smtpConfig, setSmtpConfig] = useState({ host: '', port: '', user: '', pass: '' });
  const [emailDetails, setEmailDetails] = useState({ to: '', subject: '', text: '' });
  const [message, setMessage] = useState('');

  const handleSmtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/setup-smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smtpConfig)
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Failed to configure SMTP');
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailDetails)
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Failed to send email');
    }
  };

  return (
    <div className="App">
      <h1>Simple Email Sender</h1>
      <form onSubmit={handleSmtpSubmit}>
        <h2>Configure SMTP</h2>
        <input
          type="text"
          placeholder="SMTP Host"
          value={smtpConfig.host}
          onChange={(e) => setSmtpConfig({...smtpConfig, host: e.target.value})}
        />
        <input
          type="text"
          placeholder="SMTP Port"
          value={smtpConfig.port}
          onChange={(e) => setSmtpConfig({...smtpConfig, port: e.target.value})}
        />
        <input
          type="text"
          placeholder="SMTP User"
          value={smtpConfig.user}
          onChange={(e) => setSmtpConfig({...smtpConfig, user: e.target.value})}
        />
        <input
          type="password"
          placeholder="SMTP Password"
          value={smtpConfig.pass}
          onChange={(e) => setSmtpConfig({...smtpConfig, pass: e.target.value})}
        />
        <button type="submit">Configure SMTP</button>
      </form>

      <form onSubmit={handleEmailSubmit}>
        <h2>Send Email</h2>
        <input
          type="email"
          placeholder="To"
          value={emailDetails.to}
          onChange={(e) => setEmailDetails({...emailDetails, to: e.target.value})}
        />
        <input
          type="text"
          placeholder="Subject"
          value={emailDetails.subject}
          onChange={(e) => setEmailDetails({...emailDetails, subject: e.target.value})}
        />
        <textarea
          placeholder="Email Body"
          value={emailDetails.text}
          onChange={(e) => setEmailDetails({...emailDetails, text: e.target.value})}
        />
        <button type="submit">Send Email</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;