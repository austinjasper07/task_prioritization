import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = 'http://localhost:8000';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async e => {
  e.preventDefault();
  setMsg('Submitting...');

  try {
    const res = await axios.post(`${API}/api/auth/register/`, {
      username,
      email,
      password
    });
    console.log(res.data);
    setMsg('Registered successfully. You can now login.');
  } catch (err) {
    setMsg(
      err.response?.data?.detail ||
      JSON.stringify(err.response?.data) ||
      'Registration failed'
    );
  }finally {
    setUsername('');
    setEmail('');
    setPassword('');
  }
};


  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full border px-3 py-2 rounded"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Register</button>
        {msg && <p className="mt-2 text-sm text-gray-700">{msg}</p>}
      </form>
      <p className="mt-4 text-sm">Already have an account? <Link className="text-blue-600" to="/login">Login</Link></p>
    </div>
  );
}
