// src/components/Tasks/ManageTasks.jsx
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Download, Paperclip, Trash2, Check, Moon, Sun } from 'lucide-react';
import './ManageTasks.css';

const ManageTasks = ({ setCurrentPage, tasks, toggleTodoStatus, deleteTask, downloadReport, user, darkMode, setDarkMode }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedTask, setExpandedTask] = useState(null);

  const filteredTasks = selectedFilter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === selectedFilter);
  
  const filterCounts = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'inProgress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  const toggleTaskExpand = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activePage="tasks" setCurrentPage={setCurrentPage} user={user} />
      <div className="main-content">
        <div className="page-header">
          <h1>My Tasks</h1>
          <button className="btn-download" onClick={downloadReport}>
            <Download size={18} />
            Download Report
          </button>
        </div>
        
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${selectedFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('all')}
          >
            All <span className="filter-count">{filterCounts.all}</span>
          </button>
          <button 
            className={`filter-tab ${selectedFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('pending')}
          >
            Pending <span className="filter-count">{filterCounts.pending}</span>
          </button>
          <button 
            className={`filter-tab ${selectedFilter === 'inProgress' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('inProgress')}
          >
            In Progress <span className="filter-count">{filterCounts.inProgress}</span>
          </button>
          <button 
            className={`filter-tab ${selectedFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('completed')}
          >
            Completed <span className="filter-count">{filterCounts.completed}</span>
          </button>
        </div>
        
        <div className="tasks-grid">
          {filteredTasks.map(task => (
            <div key={task.id} className="task-card">
              <div className="task-card-header">
                <span className={`badge badge-${task.status.toLowerCase()}`}>
                  {task.status === 'inProgress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
                <span className={`badge badge-${task.priority}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </span>
                <button 
                  className="btn-delete" 
                  onClick={() => deleteTask(task.id)}
                  title="Delete Task"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              
              {/* Task Progress */}
              <div className="task-progress">
                <div className="progress-header">
                  <span>Task Done: {task.todos.filter(t => t.done).length} / {task.todos.length}</span>
                  <button 
                    className="btn-expand"
                    onClick={() => toggleTaskExpand(task.id)}
                  >
                    {expandedTask === task.id ? 'Hide Todos' : 'Show Todos'}
                  </button>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{width: `${(task.todos.filter(t => t.done).length / task.todos.length) * 100}%`}}
                  ></div>
                </div>
              </div>

              {/* Expandable Todos List */}
              {expandedTask === task.id && (
                <div className="todos-list">
                  {task.todos.map(todo => (
                    <div key={todo.id} className="todo-item">
                      <button
                        className={`todo-checkbox ${todo.done ? 'checked' : ''}`}
                        onClick={() => toggleTodoStatus(task.id, todo.id)}
                      >
                        {todo.done && <Check size={14} />}
                      </button>
                      <span className={todo.done ? 'todo-done' : ''}>{todo.text}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Task Dates */}
              <div className="task-dates">
                <div>
                  <label>Start Date</label>
                  <span>{new Date(task.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div>
                  <label>Due Date</label>
                  <span>{new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
              
              {/* Task Footer */}
              <div className="task-footer">
                <div className="member-avatars">
                  {task.members.slice(0, 3).map((member, i) => (
                    <div key={i} className="avatar" title={member}>
                      {member[0]}
                    </div>
                  ))}
                  {task.members.length > 3 && (
                    <div className="avatar-count" title={task.members.slice(3).join(', ')}>
                      +{task.members.length - 3}
                    </div>
                  )}
                </div>
                {task.attachments.length > 0 && (
                  <div className="attachments-count">
                    <Paperclip size={16} />
                    <span>{task.attachments.length}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="empty-state">
            <p>No tasks found in this category.</p>
            <button className="btn-primary" onClick={() => setCurrentPage('create')}>
              Create New Task
            </button>
          </div>
        )}
      </div>

      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
};

export default ManageTasks;