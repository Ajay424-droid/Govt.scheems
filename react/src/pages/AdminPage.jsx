import React from 'react';
import { Link } from 'react-router-dom';
import '../css/AdminPage.css'; // styles for layout, sidebar, cards, etc.

// Admin dashboard page component
const AdminPage = () => {
  // TODO: Replace hardcoded stats with dynamic data from backend
  const totalSchemes = 50;
  const totalUsers = 120;
  const activeSchemes = 30;

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar Navigation */}
        <div className="sidebar col-12 col-md-3 col-lg-2 p-0">
          <div 
            className="offcanvas-md offcanvas-start bg-dark-blue" 
            tabIndex="-1" 
            id="sidebarMenu" 
            aria-labelledby="sidebarMenuLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title text-white" id="sidebarMenuLabel">
                SchemeHub Admin
              </h5>
              <button 
                type="button" 
                className="btn-close text-white" 
                data-bs-dismiss="offcanvas" 
                data-bs-target="#sidebarMenu" 
                aria-label="Close"
              ></button>
            </div>

            <div className="d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto offcanvas-body">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link text-white d-flex align-items-center gap-2 active" to="#">
                    <i className="fas fa-tachometer-alt"></i> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white d-flex align-items-center gap-2" to="/add-scheme">
                    <i className="fas fa-plus-circle"></i> Add Scheme
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white d-flex align-items-center gap-2 active" to="/manage-schemes">
                    <i className="fas fa-tachometer-alt"></i> Manage Schemes
                  </Link>
                </li>
              </ul>

              <hr className="my-3 text-white" />

              <ul className="nav flex-column mb-auto">
                <li className="nav-item">
                  <Link className="nav-link text-white d-flex align-items-center gap-2" to="#">
                    <i className="fas fa-cogs"></i> Settings
                  </Link>
                </li>
                {/* Leaving out Sign Out for now, maybe add later */}
              </ul>
            </div>
          </div>
        </div>

        {/* Main content section */}
        <main className="col-12 col-md-9 ms-sm-auto px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2 text-dark-blue">Dashboard</h1>
          </div>

          {/* Dashboard Cards */}
          <div className="row">
            {/* Total Schemes card */}
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="card text-white bg-info h-100">
                <div className="card-header">Total Schemes</div>
                <div className="card-body">
                  <h5 className="card-title">{totalSchemes}</h5>
                  <p className="card-text">Total number of schemes added.</p>
                </div>
              </div>
            </div>

            {/* Total Users card */}
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="card text-white bg-warning h-100">
                <div className="card-header">Total Users</div>
                <div className="card-body">
                  <h5 className="card-title">{totalUsers}</h5>
                  <p className="card-text">Total number of users registered.</p>
                </div>
              </div>
            </div>

            {/* Active Schemes card */}
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="card text-white bg-success h-100">
                <div className="card-header">Active Schemes</div>
                <div className="card-body">
                  <h5 className="card-title">{activeSchemes}</h5>
                  <p className="card-text">Number of active schemes.</p>
                </div>
              </div>
            </div>

            {/* Could add more metrics later */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
