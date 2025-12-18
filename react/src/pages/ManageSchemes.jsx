// src/components/ManageSchemes.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import schemeApi from '../api/schemeApi';
import '../css/ManageSchemes.css';

const ManageSchemes = () => {
  // state to hold the list of schemes fetched from backend
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true); // show loader initially
  const [error, setError] = useState(''); // error message if any
  const navigate = useNavigate();

  // fetch all schemes from API
  const loadSchemes = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await schemeApi.getAllSchemes();
      setSchemes(data);
    } catch (err) {
      console.error('Error fetching schemes:', err);
      setError('Oops! Could not load schemes.');
    } finally {
      setLoading(false);
    }
  };

  // call fetch once component mounts
  useEffect(() => {
    loadSchemes();
  }, []);

  // delete a scheme by id, confirm before deleting
  const deleteScheme = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this scheme?');
    if (!confirmed) return;

    try {
      await schemeApi.deleteScheme(id);
      // refresh list after delete
      loadSchemes();
    } catch (err) {
      console.error('Delete failed:', err);
      setError('Failed to delete scheme. Try again later.');
    }
  };

  return (
    <div className="manage-schemes container-fluid">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2>Manage Schemes</h2>
        <Link to="/add-scheme" className="btn btn-primary">
          Add New Scheme
        </Link>
      </div>

      {/* Show error alert if error exists */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Loading state */}
      {loading ? (
        <div className="loading">Loading schemes...</div>
      ) : schemes.length === 0 ? (
        // No schemes message
        <div className="no-schemes">
          No schemes found. Click “Add New Scheme” to create one.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Application Window</th>
                <th>Launched By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schemes.map((scheme) => (
                <tr key={scheme.scheme_id}>
                  <td>{scheme.scheme_id}</td>
                  <td>{scheme.scheme_name}</td>
                  {/* TODO: Replace category_id with actual category name from lookup */}
                  <td>{scheme.category_id}</td>
                  <td>{scheme.status}</td>
                  <td>
                    {scheme.application_start_date || '-'} to {scheme.application_end_date || '-'}
                  </td>
                  <td>{scheme.launched_by || '-'}</td>
                  <td className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => navigate(`/edit-scheme/${scheme.scheme_id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteScheme(scheme.scheme_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageSchemes;
