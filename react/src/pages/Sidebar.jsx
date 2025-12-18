import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import categoryApi from '../api/categoryApi';
import schemeApi from '../api/schemeApi';
import '../css/Sidebar.css';

const Sidebar = () => {
  // State for categories fetched from API
  const [categories, setCategories] = useState([]);
  // Selected category, default is 'all'
  const [selectedCategory, setSelectedCategory] = useState({
    category_id: 'all',
    category_name: 'All Categories',
  });
  // Schemes list based on selected category
  const [schemes, setSchemes] = useState([]);
  // Pagination current page
  const [currentPage, setCurrentPage] = useState(1);
  // Sidebar toggle state for mobile view
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Number of schemes shown per page
  const schemesPerPage = 12;

  // Utility function to shuffle an array (Fisher-Yates shuffle)
  const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // Fetch categories and all schemes on component mount
  useEffect(() => {
    async function loadInitialData() {
      try {
        const cats = await categoryApi.getAllCategories();
        setCategories(cats);
        const allSchemes = await schemeApi.getAllSchemes();
        setSchemes(shuffleArray(allSchemes));
      } catch (err) {
        console.error('Error fetching categories or schemes:', err);
      }
    }
    loadInitialData();
  }, []);

  // Handler for clicking category buttons
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // reset page to first
    setSidebarOpen(false); // close sidebar on mobile after selection

    try {
      let data;
      if (category.category_id === 'all') {
        const allSchemes = await schemeApi.getAllSchemes();
        data = shuffleArray(allSchemes);
      } else {
        data = await schemeApi.getSchemesByCategoryId(category.category_id);
      }
      setSchemes(data);
    } catch (err) {
      console.error('Failed to load schemes for category:', err);
    }
  };

  // Calculate indices for pagination slice
  const lastIndex = currentPage * schemesPerPage;
  const firstIndex = lastIndex - schemesPerPage;
  const displayedSchemes = schemes.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(schemes.length / schemesPerPage);

  return (
    <div className="sidebar-wrapper d-flex">
      {/* Hamburger toggle for mobile sidebar */}
      <button
        className="sidebar-toggle d-md-none"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar with categories */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul className="nav flex-column">
          <li className="mb-2">
            <button
              onClick={() =>
                handleCategoryClick({ category_id: 'all', category_name: 'All Categories' })
              }
              className={`sidebar-button ${selectedCategory.category_id === 'all' ? 'active' : ''}`}
            >
              All Categories
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.category_id} className="mb-2">
              <button
                onClick={() => handleCategoryClick(cat)}
                className={`sidebar-button ${selectedCategory.category_id === cat.category_id ? 'active' : ''}`}
              >
                {cat.category_name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content area showing schemes */}
      <div className="content-area container-fluid">
        <h4 className="mb-4">
          {selectedCategory
            ? `Schemes for ${selectedCategory.category_name}`
            : 'Select a Category to View Schemes'}
        </h4>

        <div className="row">
          {displayedSchemes.length > 0 ? (
            displayedSchemes.map((scheme) => (
              <div key={scheme.scheme_id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100">
                  {/* Show image if exists */}
                  {scheme.image_url && (
                    <img src={scheme.image_url} alt={scheme.scheme_name} className="card-img-top" />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{scheme.scheme_name}</h5>
                    <p className="card-text flex-grow-1">
                      {scheme.benefits
                        ? `${scheme.benefits.substring(0, 100)}...`
                        : 'No description available.'}
                    </p>
                    <ul className="list-unstyled">
                      <li><strong>Launched By:</strong> {scheme.launched_by}</li>
                      <li><strong>Start Date:</strong> {new Date(scheme.application_start_date).toLocaleDateString()}</li>
                      <li><strong>How to Apply:</strong> {scheme.how_to_apply}</li>
                    </ul>
                    <Link to={`/scheme/${scheme.scheme_id}`} className="btn btn-outline-primary mt-auto">
                      More details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No schemes available for this category.</p>
          )}
        </div>

        {/* Pagination controls */}
        {schemes.length > schemesPerPage && (
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-secondary"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-secondary"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* TODO: Add search/filter functionality for schemes */}
    </div>
  );
};

export default Sidebar;
