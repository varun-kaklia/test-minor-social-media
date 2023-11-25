import React from 'react'

const Post = ({ children, handleClick,post }) => {
  return (
    <div
      onClick={() => handleClick(post)}
      tabIndex={0}
      className='post-container cursor-pointer overflow-hidden'>
      {children}
    </div>
  )
}

export default Post