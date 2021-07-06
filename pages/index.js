import React, { useState } from "react"

import { Typography, Button, Modal } from "@material-ui/core"

export default function Home({ posts }) {

  const [displayPost, setDisplayPost] = useState(null)

  const pageStyle = {
    backgroundColor: "#FFFFF0"
  }

  return (
    <div style={pageStyle}>
      <Typography variant="h2" align="center"> Posts</Typography>
      <hr />
      {posts.length > 0 ? 
      posts.map((post) => {
        return (
          <div key={post.id}>
            <Button 
            variant="contained" 
            style={{backgroundColor: "#F0F8FF", margin: 5}}
            onClick={() => setDisplayPost(post)}
            > 
            {post.title} 
            </Button>
          </div>
        )
      })
      :
      null
      }
      {displayPost ? 
      <Modal 
      open={true} 
      disableEnforceFocus
      onClose={() => setDisplayPost(null)}
      style={{
        margin: 75,
        overflowY: "auto",
        overflowX: "hidden"
      }}>
      <div 
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 10
      }}>
        <Button variant="contained" onClick={() => setDisplayPost(null)}> Close </Button>
        <Typography variant="h3" align="center"> Title: </Typography>
        <Typography variant="h4" align="center"> {displayPost.title} </Typography>
        <hr />
        <Typography variant="h3" align="center"> Body: </Typography>
        <Typography variant="h4" align="center"> {displayPost.body} </Typography>

      </div>
      </Modal>
      :
      null
      }

    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const posts = await res.json()

  return {
    props: { posts }, // will be passed to the page component as props
  }
}
