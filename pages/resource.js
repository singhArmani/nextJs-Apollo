import fetch from 'isomorphic-unfetch';

import Layout from '../components/Layout';

const Content = props => (
    <div>
        <h1>{props.resource.title}</h1>
        <p>This is resource details page.</p>
    </div>
);

const Resource = props => (
    <Layout>
        <Content resource={props.shows[0]}/>
    </Layout>
);

Resource.getInitialProps = async function(context) {
    try {
    const { id } = context.query;
    const res = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query : `{   link(id: "${id}") {
            title
          }}`})
    });
    const data = await res.json()
    return {
      shows: data.data.link
    }
}catch (err) {
    console.log({err})
}
  }

export default Resource;