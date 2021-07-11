import React, { useState } from "react"

import { Typography, Button, Modal } from "@material-ui/core"

export default function Home({ posts, users }) {

  const [displayPost, setDisplayPost] = useState(null)

  const lookUpUser = (post) => {
    
    users.forEach((user) => {

      if (user.id === post.userId) {

        let result = {
          ...user,
          ...post,
        }

        setDisplayPost(result)   
        return
      }
    })

  } 

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
            onClick={() => lookUpUser(post)}
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

        <Typography variant="h3" align="center"> Author Name: </Typography>
        <Typography variant="h4" align="center"> {displayPost.name} </Typography>
        <hr />
        <Typography variant="h3" align="center"> CatchPhrase </Typography>
        <Typography variant="h4" align="center"> {displayPost.company.catchPhrase} </Typography>
        <hr />
        <Typography variant="h3" align="center"> Post Title: </Typography>
        <Typography variant="h4" align="center"> {displayPost.title} </Typography>
        <hr />
        <Typography variant="h3" align="center"> Post Body: </Typography>
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
  const res1 = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const posts = await res1.json()

  const res2 = await fetch(`https://jsonplaceholder.typicode.com/users`)
  const users = await res2.json()


  return {
    props: { posts, users }, // will be passed to the page component as props
  }
}
