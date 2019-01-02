import Link from 'next/link';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';

function Shows(props) {
  return (
    <Layout>
      <h1>TV Shows</h1>
      <ul>
        {props.shows.map(({show}) => (
            <li key={show.id}>
                <Link as ={`/s/${show.id}`} href={`/show?id=${show.id}`}>
                    <a>
                        {show.name}
                    </a>
                </Link>
            </li>
        ))}
      </ul>
    </Layout>
  )
}

Shows.getInitialProps = async function() {
    console.log({fetch})
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

export default Shows;
