import React from 'react'
import {List} from '../UI'

const UserLists = ({handleThis,isLoading,userData}) => {
  return (
    <>
            <div className='w-full px-2 py-1 h-screen overflow-auto' >
        {
            userData.length>0?
            userData?.map((user)=>
        <List key={user?.id} handleThis={handleThis} user={user}>
            <div className='left-side-content-list'>
                <span className='font-mono'>Name:</span>
                {
                    isLoading?
                    <div className='animate-pulse flex space-x-4'>
                    <div className="h-2 bg-slate-700 rounded"/>
                    </div>
                        :
                <span className='md:ml-2 font-mono'>{user?.name}</span>
                }
            </div>
            <div className='right-side-content-list'>
                <span className='font-mono'>Post:</span>
                <span className='md:ml-2 font-mono'>{user?.post?user?.post:10}</span>
            </div>
        </List>
            ):
            <p className='font-mono'>Wait for sometime...</p>
}
            </div>
    </>
  )
}

export default UserLists