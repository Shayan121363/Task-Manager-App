// src/components/Dashboard/Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import './Dashboard.css';
import { ImStatsDots } from "react-icons/im";

const Dashboard = ({ setCurrentPage, tasks, user, darkMode, setDarkMode }) => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);

  // Calculate statistics
  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'inProgress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  const priorityData = {
    low: tasks.filter(t => t.priority === 'low').length,
    medium: tasks.filter(t => t.priority === 'medium').length,
    high: tasks.filter(t => t.priority === 'high').length
  };

  const maxPriority = Math.max(priorityData.low, priorityData.medium, priorityData.high) || 1;

  // Get recent tasks (last 8)
  const recentTasks = tasks.slice(-8).reverse();

  // Get tasks for each segment
  const getTasksByStatus = (status) => {
    return tasks.filter(t => t.status === status);
  };

  const getTasksByPriority = (priority) => {
    return tasks.filter(t => t.priority === priority);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activePage="dashboard" setCurrentPage={setCurrentPage} user={user} />
      <div className="main-content">
        <div className="page-header">
          <div>
            <h1>Good Morning! {user.name}</h1>
            <p className="page-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon stat-total">📊</div>
            <div>
              <h3>{taskStats.total}</h3>
              <p>Total Tasks</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-pending">⏳</div>
            <div>
              <h3>{taskStats.pending}</h3>
              <p>Pending Tasks</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-progress">🔄</div>
            <div>
              <h3>{taskStats.inProgress}</h3>
              <p>In Progress</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-completed">✅</div>
            <div>
              <h3>{taskStats.completed}</h3>
              <p>Completed Tasks</p>
            </div>
          </div>
        </div>
        
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Task Distribution</h3>
            <div className="donut-chart-container">
              <div className="donut-chart">
                <svg viewBox="0 0 200 200">
                  {/* Pending */}
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="80" 
                    fill="none" 
                    stroke="#8b5cf6" 
                    strokeWidth="40" 
                    strokeDasharray={`${(taskStats.pending / taskStats.total) * 502} 502`}
                    transform="rotate(-90 100 100)"
                    className="chart-segment"
                    onMouseEnter={() => setHoveredSegment('pending')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{ cursor: 'pointer', opacity: hoveredSegment === 'pending' ? 1 : hoveredSegment ? 0.5 : 1 }}
                  />
                  {/* In Progress */}
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="80" 
                    fill="none" 
                    stroke="#06b6d4" 
                    strokeWidth="40" 
                    strokeDasharray={`${(taskStats.inProgress / taskStats.total) * 502} 502`}
                    strokeDashoffset={`-${(taskStats.pending / taskStats.total) * 502}`}
                    transform="rotate(-90 100 100)"
                    className="chart-segment"
                    onMouseEnter={() => setHoveredSegment('inProgress')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{ cursor: 'pointer', opacity: hoveredSegment === 'inProgress' ? 1 : hoveredSegment ? 0.5 : 1 }}
                  />
                  {/* Completed */}
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="80" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="40" 
                    strokeDasharray={`${(taskStats.completed / taskStats.total) * 502} 502`}
                    strokeDashoffset={`-${((taskStats.pending + taskStats.inProgress) / taskStats.total) * 502}`}
                    transform="rotate(-90 100 100)"
                    className="chart-segment"
                    onMouseEnter={() => setHoveredSegment('completed')}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{ cursor: 'pointer', opacity: hoveredSegment === 'completed' ? 1 : hoveredSegment ? 0.5 : 1 }}
                  />
                </svg>
                
                {/* Tooltip */}
                {hoveredSegment && (
                  <div className="chart-tooltip">
                    <div className="tooltip-title">
                      {hoveredSegment === 'pending' ? 'Pending' : hoveredSegment === 'inProgress' ? 'In Progress' : 'Completed'}
                    </div>
                    <div className="tooltip-value">
                      {hoveredSegment === 'pending' ? taskStats.pending : hoveredSegment === 'inProgress' ? taskStats.inProgress : taskStats.completed} tasks
                    </div>
                    <div className="tooltip-tasks">
                      {getTasksByStatus(hoveredSegment).slice(0, 3).map((task, i) => (
                        <div key={i}>• {task.title}</div>
                      ))}
                      {getTasksByStatus(hoveredSegment).length > 3 && (
                        <div>+ {getTasksByStatus(hoveredSegment).length - 3} more...</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-dot" style={{backgroundColor: '#8b5cf6'}}></span>
                <span>Pending ({taskStats.pending})</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{backgroundColor: '#06b6d4'}}></span>
                <span>In Progress ({taskStats.inProgress})</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{backgroundColor: '#10b981'}}></span>
                <span>Completed ({taskStats.completed})</span>
              </div>
            </div>
          </div>
          
          <div className="chart-card">
            <h3>Task Priority Levels</h3>
            <div className="bar-chart">
              <div className="bar-container">
                <div 
                  className="bar bar-low" 
                  style={{height: `${(priorityData.low / maxPriority) * 100}%`}}
                  onMouseEnter={() => setHoveredBar('low')}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {hoveredBar === 'low' && (
                    <div className="bar-tooltip">
                      <div className="tooltip-title">Low Priority</div>
                      <div className="tooltip-value">{priorityData.low} tasks</div>
                      <div className="tooltip-tasks">
                        {getTasksByPriority('low').slice(0, 3).map((task, i) => (
                          <div key={i}>• {task.title}</div>
                        ))}
                        {getTasksByPriority('low').length > 3 && (
                          <div>+ {getTasksByPriority('low').length - 3} more...</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <span>Low ({priorityData.low})</span>
              </div>
              <div className="bar-container">
                <div 
                  className="bar bar-medium" 
                  style={{height: `${(priorityData.medium / maxPriority) * 100}%`}}
                  onMouseEnter={() => setHoveredBar('medium')}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {hoveredBar === 'medium' && (
                    <div className="bar-tooltip">
                      <div className="tooltip-title">Medium Priority</div>
                      <div className="tooltip-value">{priorityData.medium} tasks</div>
                      <div className="tooltip-tasks">
                        {getTasksByPriority('medium').slice(0, 3).map((task, i) => (
                          <div key={i}>• {task.title}</div>
                        ))}
                        {getTasksByPriority('medium').length > 3 && (
                          <div>+ {getTasksByPriority('medium').length - 3} more...</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <span>Medium ({priorityData.medium})</span>
              </div>
              <div className="bar-container">
                <div 
                  className="bar bar-high" 
                  style={{height: `${(priorityData.high / maxPriority) * 100}%`}}
                  onMouseEnter={() => setHoveredBar('high')}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {hoveredBar === 'high' && (
                    <div className="bar-tooltip">
                      <div className="tooltip-title">High Priority</div>
                      <div className="tooltip-value">{priorityData.high} tasks</div>
                      <div className="tooltip-tasks">
                        {getTasksByPriority('high').slice(0, 3).map((task, i) => (
                          <div key={i}>• {task.title}</div>
                        ))}
                        {getTasksByPriority('high').length > 3 && (
                          <div>+ {getTasksByPriority('high').length - 3} more...</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <span>High ({priorityData.high})</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="recent-tasks-section">
          <div className="section-header">
            <h3>Recent Tasks</h3>
            <button className="btn-link" onClick={() => setCurrentPage('tasks')}>
              See All <ArrowRight size={16} />
            </button>
          </div>
          <div className="table-container">
            <table className="tasks-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Created On</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>
                      <span className={`badge badge-${task.status.toLowerCase()}`}>
                        {task.status === 'pending' ? 'Pending' : task.status === 'inProgress' ? 'In Progress' : 'Completed'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${task.priority}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </td>
                    <td>{task.createdOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
};

export default Dashboard;