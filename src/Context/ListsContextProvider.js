import React from 'react';
import PropTypes from 'prop-types';

export const ListsContext = React.createContext();

const initialValue = {
  lists: [],
  loading: true,
  error: '',
};

const reducer = (value, action) => {
  switch (action.type) {
    case 'GET_LISTS_SUCCESS':
      return {
        ...value,
        lists: action.payload,
        loading: false,
      };
    case 'GET_LISTS_ERROR':
      return {
        ...value,
        lists: [],
        loading: false,
        error: action.payload,
      };
    default:
      return value;
  }
};

async function fetchData(dataSource) {
  try {
    const data = await fetch(dataSource);
    const dataJSON = await data.json();

    if (dataJSON) return { data: dataJSON, error: false };
  } catch (e) {
    return { data: false, error: e.message };
  }
}

const ListsContextProvider = ({ children }) => {
  const [value, dispatch] = React.useReducer(reducer, initialValue);
  const getListsRequest = async () => {
    const result = await fetchData(
      'https://my-json-server.typicode.com/PacktPublishing/React-Projects/lists'
    );

    if (result.data && result.data.length)
      dispatch({ type: 'GET_LISTS_SUCCESS', payload: result.data });
    else dispatch({ type: 'GET_LISTS_ERROR', payload: result.error });
  };

  return (
    <ListsContext.Provider value={{ ...value, getListsRequest }}>{children}</ListsContext.Provider>
  );
};

ListsContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ListsContextProvider;
