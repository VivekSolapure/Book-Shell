import { useEffect, useState, useContext } from 'react';
import API from '../api';
import { UserContext } from '../context/UserContext';

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [form, setForm] = useState({ username: '', email: '' });

  useEffect(() => {
    if (user) {
      setForm({
        username: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await API.put(`/users/${user._id}`, form);
      setUser(res.data); // update context
      localStorage.setItem('username', res.data.username || res.data.name); // update localStorage
      alert('Profile updated');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  if (!user) return <p>Please log in</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        className="w-full border p-2 mb-2"
        placeholder="Username"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 mb-2"
        placeholder="Email"
      />

      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </div>
  );
};

export default UserProfile;