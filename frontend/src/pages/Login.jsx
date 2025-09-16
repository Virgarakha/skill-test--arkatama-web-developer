import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api/v1/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/signin`, {
        email,
        password
      });
      login(response.data.user, response.data.token);
      navigate('/');
    } catch (error) {
      alert('Login gagal: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        {/* Logo / Title */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-600">
            Travel<span className="text-yellow-400">in.</span>
          </h1>
          <p className="text-gray-500 mt-2">Login admin Travelin</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

      
      </div>
    </div>
  );
};

export default Login;
