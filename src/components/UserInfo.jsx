import React from 'react'
import { UserMainProfile } from '../UI'

const UserInfo = ({data}) => {
  return (
    <div className='w-full'>
        <div className='align-center'>
            <h2 className='heading font-mono'>Profile Page</h2>
        </div>
        <UserMainProfile>
            <div className='w-full'>
                <div className='user-profile-section'>
                    <div className='font-mono w-1/2'>{data?.name}</div>
                    <div className='font-mono w-1/2'>{`${data?.address?.suite}, ${data?.address?.street}, ${data?.address?.city}, ${data?.address?.zipcode}`}</div>
                </div>
                <div className='user-profile-section'>
                    <div className='font-mono w-1/2'>{`${data?.username} | ${data?.company?.catchPhrase}`}</div>
                    <div className='font-mono w-1/2'>{`${data?.email} | ${data?.phone}`}</div>
                </div>
            </div>
        </UserMainProfile>
    </div>
  )
}

export default UserInfo