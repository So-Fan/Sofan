import React from 'react'
import "./PostsDescription.css"
function PostsDescription({postFeedDescription}) {
  return (
    <div className={`post-feed-description ${postFeedDescription}`}>
      {/* Backend here */}
            <p>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book
            </p>
          </div>
  )
}

export default PostsDescription;