import React, { useState } from 'react';
import { Eye, EyeOff, Moon, Sun } from 'lucide-react';
import './Login.css';

const Login = ({ setCurrentPage, darkMode, setDarkMode }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1 className="app-title">Task Manager</h1>
        <div className="auth-form">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Please enter your details to log in</p>
          
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="john@example.com" defaultValue="john@example.com" />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input type={showPassword ? 'text' : 'password'} placeholder="Min 8 Characters" />
              <button className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <button className="btn-primary" onClick={() => setCurrentPage('dashboard')}>LOGIN</button>
          
          <p className="auth-footer">
            Don't have an account? <a href="#" onClick={() => setCurrentPage('signup')}>SignUp</a>
          </p>
        </div>
      </div>
      
      <div className="auth-right">
        <div className="preview-cards">
          <div className="preview-card">
            <div className="preview-card-header">
              <span className="badge badge-pending">Pending</span>
              <span className="badge badge-medium">Medium Priority</span>
              <div className="member-avatars">
                <div className="avatar">👤</div>
                <div className="avatar">👤</div>
                <div className="avatar">👤</div>
                <span className="avatar-count">+2</span>
              </div>
            </div>
            <h3>Social Media Campaign</h3>
            <p>Develop a content plan for the upcoming product launch. Create visually appealing designs with, engaging captions. Schedule posts strategically to maximize audience engagement.</p>
            <div className="task-progress">
              <span>Task Done 4 / 10</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '40%'}}></div>
              </div>
            </div>
            <div className="task-dates">
              <div>
                <label>Start Date</label>
                <span>16th Mar 2025</span>
              </div>
              <div>
                <label>Due Date</label>
                <span>29th Mar 2025</span>
              </div>
            </div>
          </div>
          
          <div className="preview-members">
            <div className="member-card">
              <div className="avatar-large">👤</div>
              <div>
                <h4>Shayan Ahmed</h4>
                <p>shayan@gmail.com</p>
              </div>
            </div>
            <div className="member-card">
              <div className="avatar-large">👤</div>
              <div>
                <h4>Saym Asif</h4>
                <p>saym@gmail.com.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
};

export default Login;