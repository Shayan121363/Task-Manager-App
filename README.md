# Task Manager Application

A modern, responsive, and feature-rich task management web application built with React. This project enables teams to efficiently create, manage, and track tasks with an intuitive user interface and seamless user experience.

---

## Group Members

| Name | Roll No | Responsibilities |
|------|---------|-----------------|
| **Shayan Ahmed** | 044 | Authentication (Login/SignUp), Dashboard, Task Management (Create Task, Manage Tasks), Dark Mode Implementation, Responsive Design |
| **Saym Asif** | 034 | Sidebar Navigation, Team Members Module, Responsive Design |

---

## Course Information

- **Course:** Web Technologies
- **Instructor:** Sir Qaisar
- **Semester:** 5th Semester

---

## Project Overview

The Task Manager Application is a comprehensive project management tool designed to help teams organize, track, and complete tasks efficiently. The application features user authentication, interactive dashboards with data visualization, task creation and management, team member tracking, and a beautiful dark mode for enhanced user experience.

### Key Highlights:
-  Secure user authentication system
-  Interactive dashboard with visual analytics
-  Complete task lifecycle management
-  Team member collaboration features
-  Dark mode support
-  Fully responsive across all devices
-  Modern UI/UX design

---

##  Project Modules & Pages

| Module/Page | Purpose/Functionality | Responsible Member(s) |
|------------|----------------------|---------------------|
| **Login Page** | User authentication and login functionality with form validation | Shayan Ahmed (044) |
| **Sign Up Page** | New user registration with avatar upload and invite token system | Shayan Ahmed (044) |
| **Dashboard** | Overview of all tasks with statistics, charts (donut & bar), and recent tasks display | Shayan Ahmed (044) |
| **Sidebar Navigation** | Main navigation menu with user profile and page routing | Saym Asif (034) |
| **Create Task** | Form to create new tasks with title, description, priority, due date, team members, todos, and attachments | Saym Asif (036) |
| **Manage Tasks** | View, filter, update status, check/uncheck todos, and delete tasks | Saym Asif (034) |
| **Team Members** | Display team members with their task statistics (pending, in-progress, completed) | Saym Asif (034) |
| **Dark Mode** | Toggle between light and dark themes across all pages | Shayan Ahmed (044) |
| **Responsive Design** | Mobile-first responsive design with slide-in navigation for mobile devices | Both Members |

---

##  Features

###  Authentication System
- Login page with email and password validation
- Sign up page with avatar upload capability
- Password visibility toggle
- Admin invite token system
- Form validation and error handling

###  Interactive Dashboard
- **Statistics Cards**: Display total, pending, in-progress, and completed tasks
- **Donut Chart**: Visual representation of task distribution by status
- **Bar Chart**: Task priority levels visualization (Low, Medium, High)
- **Recent Tasks Table**: Quick view of the 8 most recent tasks
- **Hover Tooltips**: Interactive tooltips showing task details on chart hover

###  Task Management
- **Create Tasks**: 
  - Add task title and description
  - Set priority levels (Low, Medium, High)
  - Assign due dates
  - Select multiple team members
  - Create TODO checklists
  - Attach files/links
  
- **Manage Tasks**:
  - Filter tasks by status (All, Pending, In Progress, Completed)
  - Expandable TODO lists with checkbox functionality
  - Real-time progress tracking
  - Task deletion with confirmation
  - View task members and attachments
  - Download task reports (JSON format)

###  Team Members Module
- Display all team members with avatars
- Show individual task statistics
- Track workload distribution
- Export team performance reports

###  Dark Mode
- System-wide dark theme toggle
- Smooth color transitions
- Persistent across all pages
- Floating toggle button for easy access

###  Responsive Design
- Mobile-first approach
- Slide-in sidebar navigation for mobile devices
- Optimized layouts for tablet and desktop
- Touch-friendly interface elements
- Adaptive grid systems

###  UI/UX Features
- Modern gradient designs
- Smooth animations and transitions
- Interactive hover effects
- Color-coded badges for status and priority
- Loading states and empty states
- Progress bars with animations

---

## Technologies & Tools Used

### Frontend Framework
- **React.js** - Component-based UI development
- **React Hooks** - State management (useState)

### Styling
- **CSS3** - Custom styling and animations
- **Flexbox** - Responsive layouts
- **CSS Variables** - Theme management

### Libraries & Dependencies
- **lucide-react** - Modern icon library
- **react-icons** - Additional icon set
- **react-router-dom** - Client-side routing (if applicable)

### Development Tools
- **Git & GitHub** - Version control and collaboration
- **VS Code** - Code editor


### Design Principles
- Mobile-first responsive design
- Component-based architecture
- Reusable UI components
- Consistent design system
- Accessibility considerations

---

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shayan121363/Task-Manager-App.git
   ```

2. **Navigate to project directory**
   ```bash
   cd Task-Manager-App
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

---

##  How to Use

### For Users:

1. **Login/Sign Up**: Start by creating an account or logging in
2. **View Dashboard**: See your task overview with statistics and charts
3. **Create Tasks**: Click "Create Task" to add new tasks with details
4. **Manage Tasks**: Filter and manage your tasks, check off todos
5. **View Team**: Check team member workloads and statistics
6. **Toggle Dark Mode**: Use the floating moon/sun icon to switch themes

### For Developers:

1. Each component is self-contained with its own styles
2. State management is handled in `App.jsx`
3. Add new components in the respective folders
4. Follow the existing naming conventions
5. Ensure responsiveness for all new features

---

##  Color Scheme

### Light Mode
- Primary: `#3b82f6` (Blue)
- Secondary: `#2563eb` (Dark Blue)
- Background: `#f9fafb` (Light Gray)
- Text: `#1f2937` (Dark Gray)

### Dark Mode
- Primary: `#1e40af` (Dark Blue)
- Background: `#111827` (Dark)
- Surface: `#1f2937` (Dark Gray)
- Text: `#f9fafb` (Light)

---

## Interactive Features

### JavaScript Interactivity:

1. **Form Validation**
   - Real-time input validation
   - Required field checks
   - Email format validation
   - Password strength indicators

2. **Dynamic Content Display**
   - Filterable task lists
   - Expandable todo sections
   - Conditional rendering based on task status
   - Real-time statistics calculation

3. **Interactive Charts**
   - Hover tooltips on donut and bar charts
   - Click-to-filter functionality
   - Animated data visualization

4. **Modal & Popups**
   - Member selection dropdown
   - Delete confirmation dialogs
   - Toast notifications for actions

5. **State Management**
   - Task CRUD operations
   - Todo toggle functionality
   - Filter state management
   - Dark mode persistence

6. **Responsive Navigation**
   - Mobile hamburger menu
   - Slide-in sidebar
   - Overlay backdrop
   - Auto-close on navigation

---

## 📱 Responsive Breakpoints

- **Desktop**: > 968px (Full sidebar layout)
- **Tablet**: ≤ 968px (Mobile header with slide-in menu)
- **Mobile**: ≤ 480px (Optimized compact layout)



**If you found this project helpful, please consider giving it a star on GitHub!**

---

*Last Updated: November 2025*