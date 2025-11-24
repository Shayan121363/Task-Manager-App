import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { PlusCircle, Users, X, Moon, Sun } from 'lucide-react';
import './CreateTask.css';

const CreateTask = ({ setCurrentPage, handleCreateTask, teamMembers, user, darkMode, setDarkMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [attachments, setAttachments] = useState([]);
  
  const [currentTodo, setCurrentTodo] = useState('');
  const [currentAttachment, setCurrentAttachment] = useState('');
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);

  const handleAddTodo = () => {
    if (currentTodo.trim()) {
      setTodos([...todos, currentTodo.trim()]);
      setCurrentTodo('');
    }
  };

  const handleRemoveTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleAddAttachment = () => {
    if (currentAttachment.trim()) {
      setAttachments([...attachments, currentAttachment.trim()]);
      setCurrentAttachment('');
    }
  };

  const handleRemoveAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleToggleMember = (memberName) => {
    if (selectedMembers.includes(memberName)) {
      setSelectedMembers(selectedMembers.filter(m => m !== memberName));
    } else {
      setSelectedMembers([...selectedMembers, memberName]);
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }
    if (!description.trim()) {
      alert('Please enter a task description');
      return;
    }
    if (!dueDate) {
      alert('Please select a due date');
      return;
    }
    if (selectedMembers.length === 0) {
      alert('Please assign at least one team member');
      return;
    }

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
      members: selectedMembers,
      todos,
      attachments
    };

    handleCreateTask(newTask);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activePage="create" setCurrentPage={setCurrentPage} user={user} />
      <div className="main-content">
        <div className="create-task-container">
          <h1>Create Task</h1>
          
          <div className="form-group">
            <label>Task Title</label>
            <input 
              type="text" 
              placeholder="Create App UI" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea 
              placeholder="Describe task" 
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input 
                type="date" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Assign To ({selectedMembers.length} selected)</label>
            <button 
              className="btn-add-members"
              onClick={() => setShowMemberDropdown(!showMemberDropdown)}
            >
              <Users size={18} />
              {selectedMembers.length > 0 ? `${selectedMembers.length} Members Selected` : 'Select Members'}
            </button>
            
            {showMemberDropdown && (
              <div className="member-dropdown">
                {teamMembers.map((member, index) => (
                  <div 
                    key={index} 
                    className={`member-list-item ${selectedMembers.includes(member.name) ? 'selected' : ''}`}
                    onClick={() => handleToggleMember(member.name)}
                  >
                    <div className="member-info">
                      <div className="avatar-small">{member.name[0]}</div>
                      <div>
                        <div className="member-name">{member.name}</div>
                        <div className="member-email">{member.email}</div>
                      </div>
                    </div>
                    {selectedMembers.includes(member.name) && (
                      <div className="check-icon">✓</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {selectedMembers.length > 0 && (
              <div className="selected-members">
                {selectedMembers.map((member, index) => (
                  <span key={index} className="member-tag">
                    {member}
                    <button 
                      onClick={() => handleToggleMember(member)}
                      className="remove-member"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label>TODO Checklist ({todos.length} items)</label>
            <div className="input-with-button">
              <input 
                type="text" 
                placeholder="Enter Task" 
                value={currentTodo}
                onChange={(e) => setCurrentTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
              />
              <button className="btn-add" onClick={handleAddTodo}>
                <PlusCircle size={18} />
                Add
              </button>
            </div>
            
            {todos.length > 0 && (
              <div className="items-list">
                {todos.map((todo, index) => (
                  <div key={index} className="list-item">
                    <span>{todo}</span>
                    <button 
                      onClick={() => handleRemoveTodo(index)}
                      className="btn-remove"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label>Add Attachments ({attachments.length} files)</label>
            <div className="input-with-button">
              <input 
                type="text" 
                placeholder="Add File Link or Name" 
                value={currentAttachment}
                onChange={(e) => setCurrentAttachment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddAttachment()}
              />
              <button className="btn-add" onClick={handleAddAttachment}>
                <PlusCircle size={18} />
                Add
              </button>
            </div>
            
            {attachments.length > 0 && (
              <div className="items-list">
                {attachments.map((attachment, index) => (
                  <div key={index} className="list-item">
                    <span>{attachment}</span>
                    <button 
                      onClick={() => handleRemoveAttachment(index)}
                      className="btn-remove"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button className="btn-primary btn-create" onClick={handleSubmit}>
            CREATE TASK
          </button>
        </div>
      </div>

      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
};

export default CreateTask;