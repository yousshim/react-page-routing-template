import React from "react"
import { Link } from "react-router-dom"

type Props = {
  title: string;
  posts: {title: string, id: number}[]
}

function Home({ title, posts }: Props) {
  return (
    <div>
      <h1 className="header">
        { title }
      </h1>
      <ul>
        {posts && posts.map(post => (
          <li key={post.id}><Link to={`/posts/${post.id}`}>{ post.title }</Link></li>
        ))}
      </ul>
    </div>
  )
}

export default Home

export async function preload(): Promise<Props> {
  return {
    title: "HOME PAGE",
    posts: [
      {title: "post one", id: 1},
      {title: "post two", id: 2},
      {title: "post three", id: 3},
      {title: "post four", id: 4},
    ]
  }
}