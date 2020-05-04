import React from 'react';
import PropTypes from 'prop-types';
import withDataFetching from '../withDataFetching';

export const ListsContext = React.createContext();

const ListsContextProvider = ({ children, data }) => (
  <ListsContext.Provider value={{ lists: data }}>{children}</ListsContext.Provider>
);

ListsContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withDataFetching({
  dataSource: 'https://my-json-server.typicode.com/PacktPublishing/React-Projects/lists'
})(ListsContextProvider);
