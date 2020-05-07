import React from 'react';
import PropTypes from 'prop-types';
import ListsContextProvider from './ListsContextProvider';
import ItemsContextProvider from './ItemsContextProvider';

const GlobalContext = ({ children }) => {
  return (
    <ListsContextProvider>
      <ItemsContextProvider>
        { children }
      </ItemsContextProvider>
    </ListsContextProvider>
  );
};

GlobalContext.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default GlobalContext;
