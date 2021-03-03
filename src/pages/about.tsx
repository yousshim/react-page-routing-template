import React from "react"

type Props = {
  title: string
}

function About({ title }: Props) {
  return (
    <h1 className="header">
      { title }
    </h1>
  )
}

export async function preload () {
  return {
    title: "ABOUT PAGE"
  }
}

export default About