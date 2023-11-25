import React from 'react'
import { Post, PostsLoader } from '../UI'

const Posts = ({ data, isLoading, handleClick,handleClose }) => {

    return (
        <div className='w-full py-4 grid grid-cols-1 md:grid-cols-3 gap-3 h-full overflow-auto'>
            {
                isLoading ?
                <PostsLoader/>
              :
                    data?.length > 0 ?
                    data?.map((post,index)=>
                        <Post key={index}  post={post} handleClick={handleClick}>
                            <div className='text-center text-gray-800 font-mono font-extrabold'>
                                {post?.title}
                            </div>
                            <div className='min-h-[50px]'>
                                {post?.body}
                            </div>
                        </Post>
                    )
                        :
                        <div>Something Went Wrong..!</div>
            }
        </div>
    )
}

export default Posts