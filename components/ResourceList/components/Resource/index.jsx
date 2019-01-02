import Link  from 'next/link'
const Resource = (props) => {
  return (
    <li>
      <Link as={`/r/${props.id}`} href={`/resource?title=${props.title}`}>
        <a>{props.title}</a>
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
      }`}</style>
    </li>
  )
}

export default Resource;
