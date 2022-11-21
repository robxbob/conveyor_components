import { Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Routes, Route, Link } from 'react-router-dom';
import { request } from 'graphql-request';

import { Conveyor, GraphQLFetcher } from '../src';
import useThemeSelect from '../src/common/hooks/useThemeSelect';
import autoInventAdapter from './schemaAdapter';

function App() {
  const { themeCSS } = useThemeSelect();

  // Fetcher to retrieve schema from endpoint
  const schemaUrl = '/api/schema';
  const schemaFetcher = async () => {
    const response = await fetch(schemaUrl);
    const remoteSchemaResponse = await response.json();
    return autoInventAdapter(remoteSchemaResponse.definitions);
  };
  // Fetcher to retrieve GraphQL query/mutation from endpoint
  const graphQLUrl = '/api/graphql';
  const graphqlFetcher: GraphQLFetcher = async (graphQLParams) => {
    const result = await request(
      graphQLUrl,
      graphQLParams.request,
      graphQLParams.variables,
    );
    return result;
  };

  return (
    <>
      <Helmet defer>
        <style>{themeCSS}</style>
      </Helmet>
      <Routes>
        <Route
          path="/"
          element={
            <Card.Text>
              <Link to="/Conveyor">Explore Data</Link>
            </Card.Text>
          }
        />
        <Route
          path="Conveyor/*"
          element={
            <Conveyor schemaFetcher={schemaFetcher} gqlFetcher={graphqlFetcher} />
          }
        />
      </Routes>
    </>
  );
}

export default App;