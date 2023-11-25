import React from 'react'

const List = ({children, handleThis,user}) => {
  return (
    <div onClick={()=>handleThis(user)} className='border w-full md:flex rounded-md my-2 cursor-pointer border-gray-400 p-2 bg-sky-100'>
        {children}
    </div>
  )
}

export default List