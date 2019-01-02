import Link  from 'next/link'
const Resource = (props) => {
  return (
    <li>
      <Link href={`/resource?title=${props.title}`}>
        <a>{props.title}</a>
      </Link>
    </li>
  )
}

export default Resource;
