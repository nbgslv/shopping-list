import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'styled-components';
import SubHeader from '../components/Header/SubHeader';
import ListItem from '../components/ListItem/ListItem';

const ListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const List = ({ items, loading, error, list, getListRequest, getItemsRequest, match, history }) => {
  React.useEffect(() => {
    if (!Object.prototype.hasOwnProperty.call(list, 'id') || list.id !== match.params.id) {
      getListRequest(match.params.id);
    }

    if (!(items.length > 0)) getItemsRequest(match.params.id);
  }, [items, list, match.params.id, getListRequest, getItemsRequest]);
  return !loading && !error.length ? (
    <>
      {history && list && (
        <SubHeader
          goBack={() => history.goBack()}
          title={list.title}
          openForm={() => history.push(`${match.url}/new`)}
        />
      )}
      <ListItemWrapper>
        {items && items.map(item => <ListItem key={item.id} data={item} />)}
      </ListItemWrapper>
    </>
  ) : (
    <Alert>{loading ? 'Loading...' : error}</Alert>
  );
};

List.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
  }),
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  getListRequest: PropTypes.func.isRequired,
  getItemsRequest: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

List.defaultProps = {
  list: {},
};

export default List;
