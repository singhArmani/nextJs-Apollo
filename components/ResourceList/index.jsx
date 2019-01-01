
import Resource from './components/Resource';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const LINK_QUERY = gql`
  query GetLinks {
    store {
      links {
        _id,
        title,
        url
      }
    }
  }
`;
const ResourceList = () => (
  <Query query={LINK_QUERY} notifyOnNetworkStatusChange >
    {({loading, error, data, refetch, networkStatus }) => {
      if (networkStatus === 4) return "Refetching!";
      if(loading) return <h2>Loading links...</h2>;
      const resourceList = data.store.links.map(resource => <Resource key={resource._id} title={resource.title} />)
      return (<>
      {resourceList}
        <button onClick={() => refetch()}>Refetch</button>
      </>)
    }}
  </Query>
);

export default ResourceList;