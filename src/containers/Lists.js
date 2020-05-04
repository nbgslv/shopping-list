import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SubHeader from '../components/Header/SubHeader';

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

const ListLink = styled(Link)`
  display: flex;
  text-align: left;
  align-items: center;
  padding: 1%;
  background: lightGray;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 2%;
  color: black;
  text-decoration: none;
`;

const Title = styled.h3`
  flex-basis: 80%;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const Lists = ({ lists, loading, error, getListsRequest, history }) => {
  React.useEffect(() => {
    if (!lists.length) getListsRequest();
  }, [lists, getListsRequest]);
  return !loading && !error.length ? (
    <>
      {history && <SubHeader title="Your Lists" />}
      <ListWrapper>
        {lists &&
          lists.map(list => (
            <ListLink key={list.id} to={`list/${list.id}`}>
              <Title>{list.title}</Title>
            </ListLink>
          ))}
      </ListWrapper>
    </>
  ) : (
    <Alert>{loading ? 'Loading...' : error}</Alert>
  );
};

Lists.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  getListsRequest: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default Lists;
