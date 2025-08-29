import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RandomImage } from '../services/ImageHelper.js';

const EntityGrid = ({ 
  entities, 
  categoryInfo, 
  loading, 
  onToggleFavorite, 
  isFavorite, 
  activeCategory 
}) => {
  
  const navigate = useNavigate();
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handleLearnMore = (entity) => {
    navigate(`/${activeCategory}/${entity.uid}`);
  };

  const handleImageError = (e) => {
    // Usar ImageHelper como fallback cuando la imagen principal falla
    const fallbackImage = RandomImage(activeCategory);
    e.target.src = fallbackImage;
    e.target.onerror = (fallbackError) => {
      // Si el fallback también falla, mostrar placeholder
      fallbackError.target.style.display = 'none';
      fallbackError.target.nextElementSibling.style.display = 'flex';
    };
  };

  return (
    <div className="row g-4">
      {entities.map((entity, index) => (
        <div key={`${entity.uid}-${index}`} className="col-lg-3 col-md-4 col-sm-6">
          <div className="card bg-dark text-white h-100 border-secondary">
            <div 
              className="card-img-top bg-secondary position-relative overflow-hidden"
              style={{ height: '200px' }}
            >
              <img
                src={`https://starwars-visualguide.com/assets/img/${
                  activeCategory === 'people' ? 'characters' : activeCategory
                }/${entity.uid}.jpg`}
                alt={entity.name}
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
                onError={handleImageError}
              />
              <div 
                className="w-100 h-100 d-none align-items-center justify-content-center bg-secondary position-absolute top-0 start-0"
              >
                <span className="text-muted">400 x 200</span>
              </div>
            </div>

            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-truncate">{entity.name}</h5>
              <p className="card-text text-muted small mb-auto">
                <i className={`${categoryInfo.icon} me-1`}></i>
                {categoryInfo.title.slice(0, -1)}
              </p>
            </div>

            <div className="card-footer bg-transparent border-top border-secondary">
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleLearnMore(entity)}
                >
                  <i className="fas fa-info-circle me-1"></i>
                  Learn more!
                </button>
                
                <button
                  className={`btn btn-sm ${
                    isFavorite(entity, activeCategory) 
                      ? 'btn-warning' 
                      : 'btn-outline-warning'
                  }`}
                  onClick={() => onToggleFavorite(entity, activeCategory)}
                  title={
                    isFavorite(entity, activeCategory) 
                      ? 'Remove from favorites' 
                      : 'Add to favorites'
                  }
                >
                  <i className={`fas fa-heart ${
                    isFavorite(entity, activeCategory) ? 'text-dark' : ''
                  }`}></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EntityGrid;