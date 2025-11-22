import React, { useState } from 'react';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import ManageTasks from './components/Tasks/ManageTasks';
import CreateTask from './components/Tasks/CreateTask';
import TeamMembers from './components/Team/TeamMembers';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [darkMode, setDarkMode] = useState(false);
  
 
  const [user, setUser] = useState({
    name: 'Shayan Ahmed',
    email: 'shayan@gmail.com',
    role: 'Admin',
    avatar: null
  });

  // Tasks state with  datad
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Design Homepage',
      description: 'Create a clean and modern homepage layout using Tailwind CSS. Ensure the design is responsive and works across all devices.',
      status: 'inProgress',
      priority: 'high',
      todos: [
        { id: 1, text: 'Create wireframe', done: true },
        { id: 2, text: 'Design mockup', done: true },
        { id: 3, text: 'Build responsive layout', done: false },
        { id: 4, text: 'Add animations', done: false },
        { id: 5, text: 'Test on devices', done: false }
      ],
      startDate: '2025-03-16',
      dueDate: '2025-03-31',
      members: ['Saym', 'Ali', 'Ahmed'],
      attachments: [
        { id: 1, name: 'design-mockup.pdf', url: '#' },
        { id: 2, name: 'wireframe.png', url: '#' }
      ],
      createdOn: '17th Mar 2025'
    },
    {
      id: 2,
      title: 'Write Blog Post',
      description: 'Write an informative blog post about React performance optimization. Cover topics like memoization, lazy loading, and code splitting.',
      status: 'inProgress',
      priority: 'medium',
      todos: [
        { id: 1, text: 'Research topic', done: true },
        { id: 2, text: 'Create outline', done: true },
        { id: 3, text: 'Write draft', done: false },
        { id: 4, text: 'Edit and proofread', done: false },
        { id: 5, text: 'Publish', done: false }
      ],
      startDate: '2025-03-16',
      dueDate: '2025-03-27',
      members: ['Ali', 'Zaeem', 'Umer'],
      attachments: [],
      createdOn: '17th Mar 2025'
    },
    {
      id: 3,
      title: 'API Integration',
      description: 'Implement API integration for the user dashboard.',
      status: 'pending',
      priority: 'high',
      todos: [
        { id: 1, text: 'Setup API endpoints', done: false },
        { id: 2, text: 'Create authentication', done: false },
        { id: 3, text: 'Test API calls', done: false }
      ],
      startDate: '2025-03-16',
      dueDate: '2025-04-05',
      members: ['Nasir', 'Ahmed'],
      attachments: [],
      createdOn: '17th Mar 2025'
    }
  ]);

  
  const [teamMembers] = useState([
    { name: 'Saym Asif', email: 'Saym@gmail.com' },
    { name: 'Ahmed', email: 'Ahmed@gmail.com' },
    { name: 'Asghar', email: 'Asghar@gmail.com' },
    { name: 'Zaeem', email: 'Zaeem@gmail.com' },
    { name: 'Ali', email: 'Ali@gmail.com' },
    { name: 'Umer', email: 'Umer@gmail.com' },
    { name: 'Nasir', email: 'Nasir@gmail.com' },
  ]);

  // Function of task 
  const handleCreateTask = (newTask) => {
    const task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      status: 'pending',
      priority: newTask.priority,
      todos: newTask.todos.map((todo, index) => ({ 
        id: index + 1, 
        text: todo, 
        done: false 
      })),
      startDate: new Date().toISOString().split('T')[0],
      dueDate: newTask.dueDate,
      members: newTask.members,
      attachments: newTask.attachments.map((att, index) => ({ 
        id: index + 1, 
        name: att, 
        url: '#' 
      })),
      createdOn: new Date().toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      })
    };

    setTasks([...tasks, task]);
    setCurrentPage('tasks');
    alert('Task created successfully!');
  };

  const toggleTodoStatus = (taskId, todoId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTodos = task.todos.map(todo => 
          todo.id === todoId ? { ...todo, done: !todo.done } : todo
        );
        const completedCount = updatedTodos.filter(t => t.done).length;
        const newStatus = completedCount === updatedTodos.length ? 'completed' : 
                         completedCount > 0 ? 'inProgress' : 'pending';
        return { ...task, todos: updatedTodos, status: newStatus };
      }
      return task;
    }));
  };

  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const downloadReport = () => {
    const report = {
      generatedOn: new Date().toISOString(),
      totalTasks: tasks.length,
      pendingTasks: tasks.filter(t => t.status === 'pending').length,
      inProgressTasks: tasks.filter(t => t.status === 'inProgress').length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      tasks: tasks.map(task => ({
        title: task.title,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        completionRate: `${task.todos.filter(t => t.done).length}/${task.todos.length}`,
        members: task.members.join(', ')
      }))
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `task-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (file) => {
    if (file) {
      setUser({ ...user, avatar: URL.createObjectURL(file) });
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      {currentPage === 'login' && (
        <Login setCurrentPage={setCurrentPage} darkMode={darkMode} setDarkMode={setDarkMode} />
      )}
      {currentPage === 'signup' && (
        <SignUp 
          setCurrentPage={setCurrentPage} 
          user={user}
          handleFileUpload={handleFileUpload}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard 
          setCurrentPage={setCurrentPage}
          tasks={tasks}
          user={user}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}
      {currentPage === 'tasks' && (
        <ManageTasks 
          setCurrentPage={setCurrentPage}
          tasks={tasks}
          toggleTodoStatus={toggleTodoStatus}
          deleteTask={deleteTask}
          downloadReport={downloadReport}
          user={user}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}
      {currentPage === 'create' && (
        <CreateTask 
          setCurrentPage={setCurrentPage}
          handleCreateTask={handleCreateTask}
          teamMembers={teamMembers}
          user={user}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}
      {currentPage === 'team' && (
        <TeamMembers 
          setCurrentPage={setCurrentPage}
          teamMembers={teamMembers}
          tasks={tasks}
          downloadReport={downloadReport}
          user={user}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}
    </div>
  );
};

export default App;