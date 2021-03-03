import React from "react"

type Props = {
  body: string,
  title: string,
  id: number
}

function Post({ body, title }: Props) {
  return (
    <div>
      <h3>{ title }</h3>
      <p>{ body }</p>
    </div>
  )
}

export default Post;

type Params = {
  id: number;
}

export async function preload({ id = 1 }: Params): Promise<Props> {
  return [
    {title: "post one", id: 1, body: "this is the body of post one "},
    {title: "post one", id: 1, body: "this is the body of post one "},
    {title: "post two", id: 2, body: "this is the body of post two "},
    {title: "post three", id: 3, body: "this is the body of post three "},
    {title: "post four", id: 4, body: "this is the body of post four "},
  ][id]
}