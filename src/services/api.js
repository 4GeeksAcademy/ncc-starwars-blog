const apiBaseUrl = "https://www.swapi.tech/api";

// Servicio para obtener elemento individual
export const getElement = async (type, id) => {
  try {
    const newElement = await fetch(apiBaseUrl + "/" + type + "/" + id);
    const response = await newElement.json();
    return response.result;
  } catch (error) {
    console.error('Error fetching element:', error);
    return null;
  }
};

// Servicio para obtener listado de elementos
export const getElementIndex = async (type) => {
  try {
    const newElementList = await fetch(apiBaseUrl + "/" + type);
    const response = await newElementList.json();
    console.log(response.results);
    return response.results;
  } catch (error) {
    console.error('Error fetching element list:', error);
    return [];
  }
};

// Funciones específicas para cada tipo
export const getPeople = () => getElementIndex('people');
export const getVehicles = () => getElementIndex('vehicles');
export const getPlanets = () => getElementIndex('planets');

// Funciones para obtener elementos individuales
export const getPerson = (id) => getElement('people', id);
export const getVehicle = (id) => getElement('vehicles', id);
export const getPlanet = (id) => getElement('planets', id);

// Nueva función para obtener detalles de cualquier tipo de entidad
export const getEntityDetails = async (type, id) => {
  try {
    const response = await fetch(`${apiBaseUrl}/${type}/${id}`);
    const data = await response.json();
    return {
      ...data.result,
      type: type === 'people' ? 'people' : type
    };
  } catch (error) {
    console.error('Error fetching entity details:', error);
    return null;
  }
};