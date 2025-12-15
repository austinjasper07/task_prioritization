# Task Prioritization Project Documentation

## Table of Contents
1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Technology Stack](#technology-stack)
4. [Installation](#installation)
5. [Running the Application](#running-the-application)
6. [Project Architecture](#project-architecture)
7. [Features](#features)
8. [API Endpoints](#api-endpoints)
9. [Frontend Components](#frontend-components)
10. [Backend Models](#backend-models)
11. [Authentication](#authentication)
12. [Contributing](#contributing)
13. [License](#license)

---

## Overview

The **Task Prioritization** project is a full-stack web application designed to help users manage and prioritize their tasks effectively. The application uses machine learning to predict task priorities based on multiple factors such as importance, deadlines, estimated hours, dependencies, and value score.

The system combines a robust Django REST API backend with a modern React frontend, providing users with an intuitive interface to create, manage, and organize their tasks.

---

## Project Structure

```
Task Prioritization/
├── backend/
│   ├── db.sqlite3                 # SQLite database
│   ├── manage.py                  # Django management script
│   ├── requirements.txt           # Python dependencies
│   ├── tasks_labeled.csv          # Training data for ML model
│   ├── backend/
│   │   ├── __init__.py
│   │   ├── asgi.py               # ASGI configuration
│   │   ├── settings.py           # Django settings
│   │   ├── urls.py               # URL routing
│   │   └── wsgi.py               # WSGI configuration
│   └── tasks/
│       ├── __init__.py
│       ├── admin.py              # Django admin configuration
│       ├── apps.py               # App configuration
│       ├── models.py             # Database models
│       ├── views.py              # API views
│       ├── serializers.py        # DRF serializers
│       ├── predictor.py          # ML prediction logic
│       ├── rules.py              # Prioritization rules
│       ├── urls.py               # App URL routing
│       ├── tests.py              # Unit tests
│       ├── management/
│       │   └── commands/
│       │       └── train_model.py    # Model training command
│       └── migrations/
│           └── 0001_initial.py
│
├── frontend/
│   ├── package.json              # Node.js dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── eslint.config.js          # ESLint configuration
│   ├── index.html                # HTML entry point
│   ├── README.md
│   ├── public/                   # Static assets
│   └── src/
│       ├── main.jsx              # React entry point
│       ├── App.jsx               # Root component
│       ├── App.css               # App styles
│       ├── index.css             # Global styles
│       ├── assets/               # Images and assets
│       └── components/
│           ├── Dashboard.jsx     # Main dashboard
│           ├── Login.jsx         # Login form
│           ├── Register.jsx      # Registration form
│           ├── TaskForm.jsx      # Task creation form
│           └── TaskList.jsx      # Task list display
│
└── documentation.md              # This file
```

---

## Technology Stack

### Backend
- **Framework**: Django 6.0
- **API**: Django REST Framework 3.16.1
- **Authentication**: djangorestframework_simplejwt (JWT tokens)
- **Database**: SQLite3
- **Machine Learning**: scikit-learn 1.8.0, pandas 2.3.3, numpy 2.3.5
- **Python Version**: 3.x

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 4.x
- **Styling**: Tailwind CSS 4.1.18
- **Routing**: react-router-dom 7.10.1
- **HTTP Client**: axios 1.13.2
- **Linting**: ESLint
- **Node.js**: Compatible with latest versions

---

## Installation

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- Git
- Virtual environment (recommended)

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment** (if not already created):
   ```bash
   python -m venv .venv
   ```

3. **Activate the virtual environment**:
   - On Windows:
     ```bash
     .venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source .venv/bin/activate
     ```

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Run migrations** (if needed):
   ```bash
   python manage.py migrate
   ```

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

---

## Running the Application

### Start the Backend Server

```bash
cd backend
python manage.py runserver
```

The API will be available at `http://localhost:8000`

### Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will typically be available at `http://localhost:5173` (Vite default)

### Building for Production

**Frontend**:
```bash
cd frontend
npm run build
```

---

## Project Architecture

### Backend Architecture

The backend follows Django's MVT (Model-View-Template) pattern, adapted for REST APIs:

- **Models**: Define the database schema (Task, User)
- **Views**: Handle API requests and business logic
- **Serializers**: Convert model instances to/from JSON
- **URLs**: Route requests to appropriate views

### Frontend Architecture

The frontend uses React with component-based architecture:

- **App.jsx**: Root component managing routing and global state
- **Dashboard.jsx**: Main container for authenticated users
- **Components**: Reusable UI components (TaskForm, TaskList, Login, Register)
- **API Communication**: Uses axios for HTTP requests

---

## Features

### User Management
- ✅ User registration with email validation
- ✅ Login with JWT authentication
- ✅ Secure token-based authentication
- ✅ Logout functionality

### Task Management
- ✅ Create new tasks with title and description
- ✅ Set task importance level (1-5 scale)
- ✅ Set task deadline
- ✅ Automatic priority prediction using ML
- ✅ View all user tasks in a dashboard
- ✅ Filter tasks by priority level
- ✅ Search tasks by keyword
- ✅ Display estimated hours and dependencies

### Task Prioritization
- ✅ ML-based task priority prediction
- ✅ Considers multiple factors:
  - Importance score
  - Deadline urgency
  - Estimated completion time
  - Task dependencies
  - Value score
  - Recurrence patterns

### UI/UX
- ✅ Responsive design using Tailwind CSS
- ✅ Intuitive navigation
- ✅ Real-time task list updates
- ✅ Error handling and user feedback
- ✅ Clean, modern interface

---

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/token/` - Obtain JWT token (login)
- `POST /api/auth/token/refresh/` - Refresh JWT token

### Tasks
- `GET /api/tasks/` - Get all tasks for the authenticated user
- `POST /api/tasks/` - Create a new task
- `GET /api/tasks/{id}/` - Get task details
- `PUT /api/tasks/{id}/` - Update task
- `DELETE /api/tasks/{id}/` - Delete task
- `POST /api/tasks/{id}/predict/` - Get predicted priority for a task

### Request/Response Format

**Create Task Request**:
```json
{
  "title": "Task Title",
  "description": "Task description",
  "importance": 4,
  "deadline": "2025-12-20T10:00:00Z",
  "estimated_hours": 2.5,
  "dependencies": 0,
  "value_score": 8,
  "recurrence": "none"
}
```

**Task Response**:
```json
{
  "id": 1,
  "title": "Task Title",
  "description": "Task description",
  "importance": 4,
  "deadline": "2025-12-20T10:00:00Z",
  "created_at": "2025-12-15T10:00:00Z",
  "estimated_hours": 2.5,
  "dependencies": 0,
  "value_score": 8,
  "recurrence": "none",
  "predicted_priority": "High",
  "owner": 1
}
```

---

## Frontend Components

### App.jsx
**Purpose**: Root component that manages routing and authentication state
- Manages JWT token storage
- Handles login/logout flow
- Routes between Login, Register, and Dashboard
- Protects Dashboard route with authentication check

### Dashboard.jsx
**Purpose**: Main user interface after login
- Displays welcome message with username
- Renders TaskForm and TaskList components
- Manages task refresh state
- Provides logout functionality

**Props**:
- `token` (string): JWT authentication token
- `username` (string): Currently logged-in username
- `onLogout` (function): Callback to handle logout

### Login.jsx
**Purpose**: User authentication
- Username/password login form
- API communication to obtain JWT token
- Redirects to dashboard on successful login
- Error handling and display

### Register.jsx
**Purpose**: User account creation
- Username, email, and password registration
- Form validation
- API communication to create new user account
- Success/error messaging

### TaskForm.jsx
**Purpose**: Create and edit tasks
- Form inputs for task details
- Sends POST request to create task
- Triggers parent component refresh on success
- Input validation and error handling

**Props**:
- `token` (string): JWT authentication token
- `onTaskAdded` (function): Callback when task is created

### TaskList.jsx
**Purpose**: Display and manage user's tasks
- Fetches and displays all user tasks
- Filter tasks by priority level (All, High, Medium, Low)
- Search tasks by keyword
- Responds to refresh events from parent component

**Props**:
- `token` (string): JWT authentication token
- `refreshFlag` (boolean): Trigger to refresh task list

---

## Backend Models

### Task Model
**Fields**:
- `id` (Primary Key): Auto-incremented integer
- `owner` (ForeignKey): Reference to Django User
- `title` (CharField): Task title (max 255 characters)
- `description` (TextField): Detailed task description
- `deadline` (DateTimeField): Task deadline (nullable)
- `created_at` (DateTimeField): Automatic creation timestamp
- `importance` (IntegerField): 1-5 scale (default: 3)
- `urgency_flag` (BooleanField): Marks urgent tasks (default: False)
- `estimated_hours` (FloatField): Estimated completion time (default: 1.0)
- `dependencies` (IntegerField): Number of dependent tasks (default: 0)
- `value_score` (IntegerField): 1-10 scale of task value (default: 5)
- `recurrence` (CharField): Recurrence pattern (default: 'none')
- `priority` (CharField): Predicted priority level (High, Medium, Low)

**Methods**:
- Validates user ownership
- Supports REST operations through DRF serializers

---

## Authentication

The application uses **JWT (JSON Web Tokens)** for stateless authentication:

1. **User Registration**: POST to `/api/auth/register/` creates a new user
2. **User Login**: POST to `/api/auth/token/` with credentials returns JWT tokens
3. **Token Storage**: Frontend stores token in localStorage
4. **API Requests**: Include token in Authorization header: `Bearer <token>`
5. **Token Refresh**: Use refresh token to obtain new access token when expired

---

## Training the ML Model

The project includes a custom Django management command to train the prioritization model:

```bash
python manage.py train_model --input tasks_labeled.csv
```

This command:
- Loads labeled training data from CSV
- Trains the ML model using scikit-learn
- Saves the model for predictions
- Evaluates model performance

---

## Development Workflow

### Making Code Changes

1. **Backend changes**: Restart `python manage.py runserver`
2. **Frontend changes**: Vite provides hot module replacement (HMR) - changes reload automatically
3. **Database changes**: Create migrations with `python manage.py makemigrations` and apply with `python manage.py migrate`

### Code Quality

**Frontend**:
```bash
npm run lint
```

This runs ESLint to check for code style issues.

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Troubleshooting

### Backend Issues
- **Port 8000 already in use**: Run on different port: `python manage.py runserver 8001`
- **Module not found**: Ensure virtual environment is activated and requirements are installed
- **Database errors**: Delete `db.sqlite3` and run migrations: `python manage.py migrate`

### Frontend Issues
- **Dependency conflicts**: Delete `node_modules` and `package-lock.json`, then run `npm install`
- **Port 5173 in use**: Vite will auto-increment to next available port
- **API connection errors**: Ensure backend is running on `http://localhost:8000`

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Contact & Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

**Repository**: https://github.com/austinjasper07/task_prioritization

---

## Changelog

### Version 0.1.0 (Current)
- Initial project setup
- User authentication (registration & login)
- Task CRUD operations
- Task prioritization with ML predictions
- Responsive React frontend
- Django REST API backend
- JWT token-based authentication

---

**Last Updated**: December 15, 2025
