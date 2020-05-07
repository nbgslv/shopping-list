import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'styled-components';
import { ListsContext } from '../Context/ListsContextProvider';
import { ItemsContext } from '../Context/ItemsContextProvider';
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

const List = ({ match, history }) => {
  const { list = {}, getListRequest } = React.useContext(ListsContext);
  const { loading, error, items, getItemsRequest } = React.useContext(ItemsContext);
  React.useEffect(() => {
    if (
      !Object.prototype.hasOwnProperty.call(list, 'id') ||
      list.id !== parseInt(match.params.id, 10)
    )
      getListRequest(match.params.id);

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
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default List;
