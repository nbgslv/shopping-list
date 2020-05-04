import React from 'react';
import PropTypes from 'prop-types';
import withDataFetching from '../withDataFetching';

export const ItemsContext = React.createContext();

const ItemsContextProvider = ({ children, data }) => (
  <ItemsContext.Provider value={{ items: data }}>{children}</ItemsContext.Provider>
);

ItemsContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withDataFetching({
  dataSource: 'https://my-json-server.typicode.com/PacktPublishing/React-Projects/items',
})(ItemsContextProvider);
