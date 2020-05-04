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

const List = ({ lists, listItems, loading = false, error = false, match, history }) => {
  const items =
    listItems && listItems.filter(item => item.listId === parseInt(match.params.id, 10));
  // eslint-disable-next-line no-shadow
  const list = lists && lists.find(list => list.id === parseInt(match.params.id, 10));

  return !loading && !error ? (
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
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

List.defaultProps = {
  loading: false,
  error: false,
};

export default List;