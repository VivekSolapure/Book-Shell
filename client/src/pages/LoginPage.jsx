import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login, register } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto mt-16">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
          {isRegister ? 'Register' : 'Login'}
        </h2>
        <form onSubmit={isRegister ? handleRegister : handleSubmit} className="space-y-4">
          {isRegister && (
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          )}
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded w-full font-semibold shadow hover:from-blue-600 hover:to-pink-600 transition">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-blue-600 underline"
            onClick={() => setIsRegister(prev => !prev)}
          >
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;