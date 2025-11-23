import React, { useState, useRef } from 'react';
import { Eye, EyeOff, Upload, Moon, Sun, Camera } from 'lucide-react';
import './SignUp.css';

const SignUp = ({ setCurrentPage, darkMode, setDarkMode, handleFileUpload }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
     
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

     
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);

     
      if (handleFileUpload) {
        handleFileUpload(file);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1 className="app-title">Task Manager</h1>
        <div className="auth-form">
          <h2>Create an Account</h2>
          <p className="auth-subtitle">Join us today by entering your details below.</p>
          
          <div className="avatar-upload">
            <div className="avatar-placeholder" onClick={handleAvatarClick}>
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar preview" className="avatar-preview-img" />
              ) : (
                <>
                  <Upload size={24} className="upload-icon" />
                  <Camera size={16} className="camera-icon" />
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <p className="avatar-upload-text">Click to upload photo</p>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="John" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <div className="password-input">
                <input type={showPassword ? 'text' : 'password'} placeholder="Min 8 Characters" />
                <button className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Admin Invite Token</label>
              <input type="text" placeholder="6 Digit Code" />
            </div>
          </div>
          
          <button className="btn-primary" onClick={() => setCurrentPage('dashboard')}>SIGN UP</button>
          
          <p className="auth-footer">
            Already have an account? <a href="#" onClick={() => setCurrentPage('login')}>Login</a>
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
                <span>21th Mar 2025</span>
              </div>
            </div>
          </div>
          
          <div className="preview-members">
            <div className="member-card">
              <div className="avatar-large">👤</div>
              <div>
                <h4>Shayan Ahmed</h4>
                <p>Shayan@gmail.com</p>
              </div>
            </div>
            <div className="member-card">
              <div className="avatar-large">👤</div>
              <div>
                <h4>Saym Asif</h4>
                <p>Saym@gmail.com</p>
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

export default SignUp;