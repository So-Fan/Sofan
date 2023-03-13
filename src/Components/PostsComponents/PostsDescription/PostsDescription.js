import React from 'react'
import "./PostsDescription.css"
function PostsDescription({postFeedDescription, postDescription}) {
  return (
    <div className={`post-feed-description ${postFeedDescription}`}>
      {/* Backend here */}
            <p>
              {postDescription}
            </p>
          </div>
  )
}

export default PostsDescription;