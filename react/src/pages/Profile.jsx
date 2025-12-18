import React, { useContext, useState, useEffect } from 'react';
import userApi from '../api/userApi';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return; // no user, skip fetching

    const getProfile = async () => {
      setIsLoading(true);
      try {
        const profile = await userApi.getProfile(user.token);
        // password should never be prefilled
        setFormData({ ...profile, password: '' });
      } catch (err) {
        console.error('Error fetching profile:', err.response?.data?.error || err.message);
        // maybe show error UI here later
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: validate form before submit, esp password length if provided
    try {
      const updatedUser = await userApi.updateProfile(formData, user.token);
      login({ ...user, ...updatedUser });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Update failed:', err.response?.data?.error || err.message);
      alert('Failed to update profile, please try again.');
    }
  };

  if (!user) {
    return (
      <div className="container my-5">
        <h2>Please log in to see your profile.</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container my-5">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2>Your Profile</h2>
      <div className="card p-3 mb-3">
        <h5>Name: {formData.name}</h5>
        <h5>Email: {formData.email}</h5>
        {/* TODO: add phone and address display if needed */}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nameInput">Name</label>
          <input
            id="nameInput"
            name="name"
            type="text"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emailInput">Email</label>
          <input
            id="emailInput"
            name="email"
            type="email"
            className="form-control"
            value={formData.email}
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordInput">Password</label>
          <input
            id="passwordInput"
            name="password"
            type="password"
            className="form-control"
            placeholder="Leave blank to keep current password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
