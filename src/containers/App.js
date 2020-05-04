import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import ListsContextProvider, { ListsContext } from '../Context/ListsContextProvider';
import ItemsContextProvider, { ItemsContext } from '../Context/ItemsContextProvider';
import Header from '../components/Header/Header';
import Lists from './Lists';
import List from './List';
import Form from './Form';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

const App = () => (
  <>
    <GlobalStyle />
    <AppWrapper>
      <Header />
      <ListsContextProvider>
        <ItemsContextProvider>
          <ListsContext.Consumer>
            {({ lists }) => (
              <ItemsContext.Consumer>
                {({ items }) => (
                  <Switch>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <Route
                      exact
                      path="/"
                      render={props => lists && <Lists lists={lists} {...props} />}
                    />
                    <Route path="/list/:id/new" component={Form} />
                    <Route
                      path="/list/:id"
                      render={props =>
                        lists && items && <List lists={lists} items={items} {...props} />
                      }
                    />
                  </Switch>
                )}
              </ItemsContext.Consumer>
            )}
          </ListsContext.Consumer>
        </ItemsContextProvider>
      </ListsContextProvider>
    </AppWrapper>
  </>
);

export default App;