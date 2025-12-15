import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

export default function Dashboard({ token, username, onLogout }) {
  const [refreshFlag, setRefreshFlag] = useState(false);

  // Trigger refresh after a new task is added
  const triggerRefresh = () => setRefreshFlag(prev => !prev);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {username}</h1>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Task Form triggers refresh when a new task is added */}
      <TaskForm token={token} onTaskAdded={triggerRefresh} />

      {/* Task List listens to refreshFlag */}
      <TaskList token={token} refreshFlag={refreshFlag} />
    </div>
  );
}
