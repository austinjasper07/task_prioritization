import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:8000/api';

export default function TaskList({ token, refreshFlag }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/tasks/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Error loading tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [refreshFlag]);

  const deleteTask = async (id) => {
    if (!window.confirm('Mark this task as completed?')) return;

    try {
      await axios.delete(`${API}/tasks/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Instant UI update (no reload delay)
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      alert('Failed to remove task');
    }
  };

  const displayedTasks = tasks.filter(t => {
    const matchesFilter = filter === 'All' || t.priority_label === filter;
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4 w-[70%]">
      <h2 className="text-xl font-semibold">Your Tasks</h2>

      {/* Filter / Search */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-1 rounded flex-1 min-w-[150px]"
        />
      </div>

      {/* Task List */}
      {loading && <p className="text-gray-500">Loading tasks...</p>}
      {!loading && displayedTasks.length === 0 && <p>No tasks found.</p>}

      <ul className="space-y-2">
        {displayedTasks.map(t => (
          <li
            key={t.id}
            className="border p-3 rounded shadow-sm flex justify-between items-center gap-4"
          >
            <div className="flex-1">
              <h3 className="font-bold">{t.title}</h3>
              <p className="text-sm text-gray-600">{t.priority_reason}</p>
            </div>

            <span
              className={`px-3 py-1 rounded font-semibold text-white
                ${t.priority_label === 'High'
                  ? 'bg-red-600'
                  : t.priority_label === 'Medium'
                  ? 'bg-yellow-500'
                  : 'bg-green-600'
                }`}
            >
              {t.priority_label}
            </span>

            <button
              onClick={() => deleteTask(t.id)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
            >
              ✓ Complete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
