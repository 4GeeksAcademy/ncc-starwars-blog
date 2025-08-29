import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';
import { getEntityDetails } from '../services/api.js';
import { RandomImage } from '../services/ImageHelper.js';

const DetailPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { dispatch, store } = useGlobalReducer();
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntityDetail = async () => {
      setLoading(true);
      try {
        const entityData = await getEntityDetails(type, id);
        if (entityData) {
          setEntity(entityData);
        } else {
          dispatch({ type: 'set_message', payload: 'Entity not found' });
        }
      } catch (error) {
        console.error('Error fetching entity details:', error);
        dispatch({ type: 'set_message', payload: 'Error loading details' });
      } finally {
        setLoading(false);
      }
    };

    fetchEntityDetail();
  }, [type, id, dispatch]);

  const handleImageError = (e) => {
    // Usar ImageHelper como fallback cuando la imagen principal falla
    const fallbackImage = RandomImage(type);
    e.target.src = fallbackImage;
    e.target.onerror = (fallbackError) => {
      // Si el fallback también falla, mostrar placeholder
      fallbackError.target.style.display = 'none';
      fallbackError.target.nextElementSibling.style.display = 'flex';
    };
  };

  if (loading) {
    return (
      <div className="bg-dark text-white min-vh-100">
        <Navbar 
          favorites={store.favorites} 
          onRemoveFavorite={(fav) => dispatch({ 
            type: 'remove_favorite', 
            payload: { uid: fav.uid, type: fav.type } 
          })} 
        />
        <div className="d-flex justify-content-center align-items-center" style={{ height: 'calc(100vh - 56px)' }}>
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!entity || !entity.properties) {
    return (
      <div className="bg-dark text-white min-vh-100">
        <Navbar 
          favorites={store.favorites} 
          onRemoveFavorite={(fav) => dispatch({ 
            type: 'remove_favorite', 
            payload: { uid: fav.uid, type: fav.type } 
          })} 
        />
        <div className="container py-5">
          <div className="alert alert-warning" role="alert">
            Entity not found
          </div>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const { properties } = entity;

  const getBasicInfo = () => {
    switch (type) {
      case 'people':
        return [
          { label: 'Height', value: properties.height },
          { label: 'Mass', value: properties.mass },
          { label: 'Hair Color', value: properties.hair_color },
          { label: 'Eye Color', value: properties.eye_color },
          { label: 'Birth Year', value: properties.birth_year },
          { label: 'Gender', value: properties.gender }
        ];
      case 'vehicles':
        return [
          { label: 'Model', value: properties.model },
          { label: 'Manufacturer', value: properties.manufacturer },
          { label: 'Length', value: properties.length },
          { label: 'Max Speed', value: properties.max_atmosphering_speed },
          { label: 'Crew', value: properties.crew },
          { label: 'Passengers', value: properties.passengers }
        ];
      case 'planets':
        return [
          { label: 'Climate', value: properties.climate },
          { label: 'Terrain', value: properties.terrain },
          { label: 'Population', value: properties.population },
          { label: 'Diameter', value: properties.diameter },
          { label: 'Gravity', value: properties.gravity },
          { label: 'Orbital Period', value: properties.orbital_period }
        ];
      default:
        return [];
    }
  };

  const basicInfo = getBasicInfo();

  return (
    <div className="bg-dark text-white min-vh-100">
      <Navbar 
        favorites={store.favorites} 
        onRemoveFavorite={(fav) => dispatch({ 
          type: 'remove_favorite', 
          payload: { uid: fav.uid, type: fav.type } 
        })} 
      />

      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-lg-6">
            <div className="position-relative" style={{ minHeight: '100vh' }}>
              <img
                src={`https://starwars-visualguide.com/assets/img/${
                  type === 'people' ? 'characters' : type
                }/${id}.jpg`}
                alt={properties.name}
                className="w-100 h-100"
                style={{ 
                  objectFit: 'cover',
                  minHeight: '100vh'
                }}
                onError={handleImageError}
              />
              <div 
                className="w-100 h-100 d-none align-items-center justify-content-center bg-secondary position-absolute top-0 start-0"
                style={{ minHeight: '100vh' }}
              >
                <div className="text-center">
                  <i className={`fas ${
                    type === 'people' ? 'fa-user' :
                    type === 'vehicles' ? 'fa-rocket' :
                    'fa-globe'
                  } fa-5x text-muted mb-3`}></i>
                  <p className="text-muted">Image not available</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 bg-black">
            <div className="p-5 h-100 d-flex flex-column" style={{ minHeight: '100vh' }}>
              <button
                className="btn btn-outline-light align-self-start mb-4"
                onClick={() => navigate('/')}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back to Database
              </button>
              <div className="mb-4">
                <h1 className="text-white fw-bold text-uppercase mb-2 display-4">
                  {properties.name}
                </h1>
                <p className="text-muted text-uppercase small">
                  {type === 'people' ? 'Character' : type.slice(0, -1)}
                </p>
              </div>
              <div className="mb-5 flex-grow-1">
                <h3 className="text-warning mb-3">Description</h3>
                <p className="text-light lh-lg fs-5">
                  {entity.description || 
                   `A ${type === 'people' ? 'character' : type.slice(0, -1)} from the Star Wars universe. ` +
                   `Discover more about ${properties.name} and explore the rich history and details ` +
                   'of this iconic part of the galaxy far, far away. May the Force be with you as you ' +
                   'delve into the extensive lore and background of this fascinating entity.'
                  }
                </p>
              </div>
              <div className="row g-4 mb-5">
                <div className="col-12">
                  <h3 className="text-warning mb-4">Details</h3>
                </div>
                {basicInfo.map(({ label, value }, index) => (
                  <div key={index} className="col-md-6">
                    <div className="border-bottom border-secondary pb-3">
                      <small className="text-muted text-uppercase d-block mb-2" 
                             style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                        {label}
                      </small>
                      <span className="text-white fs-5 fw-bold">
                        {value === 'n/a' || value === 'unknown' || !value 
                          ? <em className="text-muted">Unknown</em>
                          : value
                        }
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;