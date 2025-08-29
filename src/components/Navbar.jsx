import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import getLogoUrl from "../assets/img/SWLogo.png";

const Navbar = ({ favorites = [], onRemoveFavorite }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleRemove = (favorite, event) => {
    event.stopPropagation(); 
    onRemoveFavorite(favorite, favorite.type);
  };

  const handleFavoriteClick = (favorite) => {
    setIsDropdownOpen(false);
    navigate(`/${favorite.type}/${favorite.uid}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: '#1a1a1a', zIndex: 1030 }}>
      <div className="container-fluid">
        <Link to="/">
          <span className="navbar-brand d-flex align-items-center">
            <img className="float-start img-fluid" style={{height:"40px"}} src={getLogoUrl} alt="Logo Starwars" />
          </span>
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <div className="d-flex align-items-center">
            <div className="dropdown me-3 position-static">
              <button
                className="btn btn-primary dropdown-toggle position-relative"
                type="button"
                onClick={toggleDropdown}
              >
                <i className="fas fa-heart me-1"></i>
                Favorites
                {favorites.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {favorites.length}
                  </span>
                )}
              </button>

              {isDropdownOpen && (
                <div 
                  className="dropdown-menu dropdown-menu-dark show position-absolute"
                  style={{
                    top: '100%',
                    right: '0',
                    left: 'auto',
                    maxHeight: '400px',
                    overflowY: 'auto',
                    minWidth: '280px',
                    zIndex: 1060,
                    transform: 'translateY(5px)',
                    border: '1px solid #495057',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {favorites.length === 0 ? (
                    <div className="dropdown-item-text text-muted text-center py-3">
                      (empty)
                    </div>
                  ) : (
                    favorites.map((favorite, index) => (
                      <div 
                        key={`${favorite.uid}-${favorite.type}-${index}`} 
                        className="dropdown-item d-flex justify-content-between align-items-center py-2 px-3 position-relative"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleFavoriteClick(favorite)}
                      >
                        {/* Click a detail */}
                        <div className="d-flex align-items-center flex-grow-1 me-2">
                          <i className={`fas ${
                            favorite.type === 'people' ? 'fa-user text-danger' :
                            favorite.type === 'vehicles' ? 'fa-rocket text-info' :
                            'fa-globe text-warning'
                          } me-2`}></i>
                          <span className="text-truncate" style={{ maxWidth: '160px' }} title={favorite.name}>
                            {favorite.name}
                          </span>
                        </div>
                        
                        {/* Botón de eliminar */}
                        <button
                          className="btn btn-sm btn-outline-danger flex-shrink-0"
                          onClick={(e) => handleRemove(favorite, e)}
                          title="Remove from favorites"
                          style={{ 
                            fontSize: '0.75rem', 
                            padding: '0.25rem 0.5rem',
                            zIndex: 1
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                        
                        {/* Overlay hover para feedback visual */}
                        <div 
                          className="position-absolute top-0 start-0 w-100 h-100 rounded"
                          style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            opacity: 0,
                            transition: 'opacity 0.2s ease',
                            pointerEvents: 'none'
                          }}
                          onMouseEnter={(e) => e.target.style.opacity = '1'}
                          onMouseLeave={(e) => e.target.style.opacity = '0'}
                        ></div>
                      </div>
                    ))
                  )}
                  
                  {/* Separador y texto informativo */}
                  {favorites.length > 0 && (
                    <div className="dropdown-divider"></div>
                  )}
                  {favorites.length > 0 && (
                    <div className="dropdown-item-text text-muted text-center py-2" style={{ fontSize: '0.75rem' }}>
                      <i className="fas fa-info-circle me-1"></i>
                      Click to view details
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isDropdownOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ zIndex: 1050 }}
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;