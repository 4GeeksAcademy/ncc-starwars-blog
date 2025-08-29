import React, { useEffect, useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';
import { getPeople, getVehicles, getPlanets } from '../services/api.js';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import EntityGrid from '../components/EntityGrid.jsx';

const Home = () => {
  const { dispatch, store } = useGlobalReducer();
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('people');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [people, vehicles, planets] = await Promise.all([
          getPeople(),
          getVehicles(),
          getPlanets()
        ]);

        dispatch({ type: 'get_people', payload: people });
        dispatch({ type: 'get_vehicles', payload: vehicles });
        dispatch({ type: 'get_planets', payload: planets });
      } catch (error) {
        console.error('Error loading data:', error);
        dispatch({ type: 'set_message', payload: 'Error loading data' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const toggleFavorite = (entity, type) => {
    const entityWithType = { ...entity, type };
    const isFavorite = store.favorites.some(fav => 
      fav.uid === entity.uid && fav.type === type
    );

    if (isFavorite) {
      dispatch({ 
        type: 'remove_favorite', 
        payload: { uid: entity.uid, type } 
      });
    } else {
      dispatch({ 
        type: 'add_favorite', 
        payload: entityWithType 
      });
    }
  };

  const isFavorite = (entity, type) => {
    return store.favorites.some(fav => 
      fav.uid === entity.uid && fav.type === type
    );
  };

  const getCurrentEntities = () => {
    switch (activeCategory) {
      case 'people':
        return store.people;
      case 'vehicles':
        return store.vehicles;
      case 'planets':
        return store.planets;
      default:
        return [];
    }
  };

  // Get category info
  const getCategoryInfo = () => {
    switch (activeCategory) {
      case 'people':
        return {
          title: 'Characters',
          icon: 'fas fa-users',
          color: 'text-danger',
        };
      case 'vehicles':
        return {
          title: 'Vehicles',
          icon: 'fas fa-rocket',
          color: 'text-info',
        };
      case 'planets':
        return {
          title: 'Planets',
          icon: 'fas fa-globe',
          color: 'text-warning',
        };
      default:
        return { title: '', icon: '', color: '', count: 0 };
    }
  };

  const categoryInfo = getCategoryInfo();
  const categoryCounts = {
    people: store.people.length,
    vehicles: store.vehicles.length,
    planets: store.planets.length
  };

  return (
    <div className="bg-dark text-white" style={{ minHeight: '100vh' }}>
      <Navbar 
        favorites={store.favorites} 
        onRemoveFavorite={(fav) => dispatch({ 
          type: 'remove_favorite', 
          payload: { uid: fav.uid, type: fav.type } 
        })} 
      />
      
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <Sidebar 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          categoryCounts={categoryCounts}
        />

        {/* Main Content */}
        <div className="flex-grow-1">
          <div className="container-fluid p-4">
            {/* Error Message */}
            {store.message && (
              <div className="row mb-3">
                <div className="col-12">
                  <div className="alert alert-warning" role="alert">
                    {store.message}
                  </div>
                </div>
              </div>
            )}

            {/* Category Header */}
            <div className="row mb-4">
              <div className="col-12">
                <h2 className={`${categoryInfo.color} mb-3 d-flex align-items-center`}>
                  <i className={`${categoryInfo.icon} me-3`}></i>
                  {categoryInfo.title}
                  <span className="badge bg-secondary ms-3">{categoryInfo.count}</span>
                </h2>
              </div>
            </div>

            {/* Entity Grid */}
            <div className="row">
              <div className="col-12">
                <EntityGrid
                  entities={getCurrentEntities()}
                  categoryInfo={categoryInfo}
                  loading={loading}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                  activeCategory={activeCategory}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;