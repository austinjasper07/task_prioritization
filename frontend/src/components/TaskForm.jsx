/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:8000/api';

export default function TaskForm({ token, onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [importance, setImportance] = useState(3);
  const [deadline, setDeadline] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      const res = await axios.post(
        `${API}/tasks/`,
        {
          title,
          importance,
          deadline: deadline || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMsg(`✅ Task created! Predicted priority: ${res.data.priority_label}`);
      setTitle('');
      setImportance(3);
      setDeadline('');

      if (onTaskAdded) onTaskAdded();
    } catch (err) {
      setMsg('❌ Error creating task. Please try again.');
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-6 mb-6 shadow rounded space-y-5"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Create a New Task
      </h2>

      {/* Task Title */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Task Title
        </label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Prepare project report"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <p className="text-xs text-gray-500">
          Briefly describe what needs to be done.
        </p>
      </div>

      {/* Importance */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Importance Level
        </label>
        <input
          type="number"
          min="1"
          max="5"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={importance}
          onChange={(e) => setImportance(Number(e.target.value))}
          required
        />
        <p className="text-xs text-gray-500">
          1 = Very Low, 5 = Extremely Important
        </p>
      </div>

      {/* Deadline */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Deadline (optional)
        </label>
        <input
          type="datetime-local"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <p className="text-xs text-gray-500">
          Set a due date if the task is time-sensitive.
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Task
      </button>

      {msg && (
        <p className="text-sm mt-2 text-gray-700">
          {msg}
        </p>
      )}
    </form>
  );
}
