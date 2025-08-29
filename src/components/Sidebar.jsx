import React from 'react';

const Sidebar = ({ activeCategory, onCategoryChange, categoryCounts }) => {
  return (
    <div className="bg-black" style={{ width: '280px', borderRight: '1px solid #495057' }}>
      <div className="p-4">
        <h5 className="text-warning mb-4">
          <i className="fas fa-database me-2"></i>
          BROWSE DATABANK
        </h5>
        
        <div className="mb-3">
          <small className="text-muted text-uppercase tracking-wide">BROWSE</small>
        </div>
        
        {/* Navigation Menu */}
        <ul className="list-unstyled">
          <li className="mb-1">
            <button
              className={`btn w-100 text-start border-0 rounded-0 py-2 px-3 ${
                activeCategory === 'people' 
                  ? 'bg-danger text-white' 
                  : 'text-muted bg-transparent'
              }`}
              onClick={() => onCategoryChange('people')}
            >
              <i className="fas fa-users me-2"></i>
              CHARACTERS
              <span className="badge bg-secondary ms-2 float-end">
                {categoryCounts.people}
              </span>
            </button>
          </li>
          
          <li className="mb-1">
            <button
              className={`btn w-100 text-start border-0 rounded-0 py-2 px-3 ${
                activeCategory === 'vehicles' 
                  ? 'bg-info text-white' 
                  : 'text-muted bg-transparent'
              }`}
              onClick={() => onCategoryChange('vehicles')}
            >
              <i className="fas fa-rocket me-2"></i>
              VEHICLES
              <span className="badge bg-secondary ms-2 float-end">
                {categoryCounts.vehicles}
              </span>
            </button>
          </li>
          
          <li className="mb-1">
            <button
              className={`btn w-100 text-start border-0 rounded-0 py-2 px-3 ${
                activeCategory === 'planets' 
                  ? 'bg-warning text-dark' 
                  : 'text-muted bg-transparent'
              }`}
              onClick={() => onCategoryChange('planets')}
            >
              <i className="fas fa-globe me-2"></i>
              PLANETS
              <span className="badge bg-secondary ms-2 float-end">
                {categoryCounts.planets}
              </span>
            </button>
          </li>
        </ul>

        <div className="mb-3 mt-4">
          <small className="text-muted text-uppercase tracking-wide">Future updates</small>
        </div>

        {/* Future Categories */}
        <ul className="list-unstyled">
          <li className="mb-1">
            <span className="text-muted px-3 py-2 d-block">
              <i className="fas fa-paw me-2"></i>
              CREATURES
            </span>
          </li>
          <li className="mb-1">
            <span className="text-muted px-3 py-2 d-block">
              <i className="fas fa-robot me-2"></i>
              DROIDS
            </span>
          </li>
          <li className="mb-1">
            <span className="text-muted px-3 py-2 d-block">
              <i className="fas fa-map-marker-alt me-2"></i>
              LOCATIONS
            </span>
          </li>
          <li className="mb-1">
            <span className="text-muted px-3 py-2 d-block">
              <i className="fas fa-sitemap me-2"></i>
              ORGANIZATIONS
            </span>
          </li>
          <li className="mb-1">
            <span className="text-muted px-3 py-2 d-block">
              <i className="fas fa-dna me-2"></i>
              SPECIES
            </span>
          </li>
          <li className="mb-1">
            <span className="text-muted px-3 py-2 d-block">
              <i className="fas fa-tools me-2"></i>
              WEAPONS+TECH
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;