import Link from 'next/link';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';

const Show = ({show}) => (
    <li key={show.id}>
    <Link as ={`/s/${show.id}`} href={`/show?id=${show.id}`}>
        <a>
            {show.name}
        </a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: "Arial";
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
</li>
)

function Shows(props) {
  return (
    <Layout>
      <h1>TV Shows</h1>
      <ul>
        {props.shows.map(({show}) => (
           <Show key={show.id} show={show} />
        ))}
      </ul>
      <style jsx>{`
      h1, a {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }
    `}</style>
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
