import Link  from 'next/link'
const Resource = (props) => {
  return (
    <li>
      <Link as={`/r/${props.id}`} href={`/resource?title=${props.title}`}>
        <a>{props.title}</a>
      </Link>
    </li>
  )
}

export default Resource;
