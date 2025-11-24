import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Download, Moon, Sun } from 'lucide-react';
import './TeamMembers.css';

const TeamMembers = ({ setCurrentPage, teamMembers, tasks, downloadReport, user, darkMode, setDarkMode }) => {
  // Calculate task stats for each member
  const membersWithStats = teamMembers.map(member => {
    const memberTasks = tasks.filter(task => task.members.includes(member.name));
    return {
      ...member,
      pending: memberTasks.filter(t => t.status === 'pending').length,
      inProgress: memberTasks.filter(t => t.status === 'inProgress').length,
      completed: memberTasks.filter(t => t.status === 'completed').length
    };
  });

  return (
    <div className="dashboard-layout">
      <Sidebar activePage="team" setCurrentPage={setCurrentPage} user={user} />
      <div className="main-content">
        <div className="page-header">
          <h1>Team Members</h1>
          <button className="btn-download" onClick={downloadReport}>
            <Download size={18} />
            Download Report
          </button>
        </div>
        
        <div className="team-grid">
          {membersWithStats.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-card-header">
                <div className="avatar-large">{member.name[0]}</div>
                <div>
                  <h3>{member.name}</h3>
                  <p>{member.email}</p>
                </div>
              </div>
              <div className="team-stats">
                <div className="team-stat">
                  <span className="stat-value">{member.pending}</span>
                  <span className="stat-label">Pending</span>
                </div>
                <div className="team-stat">
                  <span className="stat-value">{member.inProgress}</span>
                  <span className="stat-label">In Progress</span>
                </div>
                <div className="team-stat">
                  <span className="stat-value">{member.completed}</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
};

export default TeamMembers;