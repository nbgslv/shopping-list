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
        list: {},
        loading: false,
        error: action.payload,
      };
    case 'GET_LIST_SUCCESS':
      return {
        ...value,
        list: action.payload,
        loading: false,
      };
    case 'GET_LIST_ERROR':
      return {
        ...value,
        list: {},
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

  const getListRequest = async id => {
    const result = await fetchData(
      `https://my-json-server.typicode.com/PacktPublishing/React-Projects/lists/${id}`
    );

    if (result.data && Object.prototype.hasOwnProperty.call(result.data, 'id'))
      dispatch({ type: 'GET_LIST_SUCCESS', payload: result.data });
    else dispatch({ type: 'GET_LIST_ERROR', payload: result.error });
  };

  const addListRequest = content => {
    dispatch({
      type: 'ADD_LIST_REQUEST',
      payload: {
        dataSource: 'https://my-json-server.typicode.com/PacktPublishing/React-Projects/items',
        content,
      },
    });
  };

  return (
    <ListsContext.Provider value={{ ...value, getListsRequest, getListRequest }}>
      {children}
    </ListsContext.Provider>
  );
};


ListsContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ListsContextProvider;
