import React, { useEffect, useState } from 'react'
import {UserLists} from '../components'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Directory = () => {
    const [isLoading,setIsLoading] = useState(false);
    const [userData,setUserData] = useState([]);
    const [newFilterData,setNewFilterData] = useState([]);
    const [data,setData] = useState([])
    const navigate = useNavigate();
    const handleThis = (user)=>{
        navigate('/userprofile',{state:user})
    }

    
    const callingPostsAPI = async () => {
        setIsLoading(true);
        try {
        const req = await axios.get(`${import.meta.env.VITE_API_LINK}/posts`);
        const res = await req?.data
        if (res) {
            setData(res);
        }
        } catch (error) {
        console.error(`${error}`)
        } finally {
        setIsLoading(false);
        }
    }

    const callingUserAPI = async()=>{
        setIsLoading(true);
        try {
            const req = await axios.get(`${import.meta.env.VITE_API_LINK}/users`)
            const res = await req.data;
            if(res){
                    setUserData(res)
            }
        } catch (error) {
            console.error(`${error}`)
        } finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        callingPostsAPI();
        callingUserAPI();
    },[]);

    useEffect(()=>{
        if(data?.length>0){
            const mergedArray = userData.map(user => {
                const postData = data.filter(u => u.userId === user.id);
                return { ...user, post:postData?.length };
              });
            setNewFilterData(mergedArray)
              
        }
    },[data])

    return (
        <div className='container'>
            {/* heading */}
            <div className='align-center'>
                <h2 className='heading font-mono'>Directory</h2>
            </div>
            {/* User Lists */}
            <UserLists isLoading={isLoading} userData={data?.length>0?newFilterData:userData} handleThis={handleThis}/>
        </div>
    )
}

export default Directory