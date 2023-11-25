import React, { useEffect, useState } from 'react'
import { Posts, UserInfo, UserTopBar } from '../components'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Modal from '../UI/Modal';
import { Post } from '../UI';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPostData, setSelectedPostData] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const { state } = useLocation();
  useEffect(() => {
    callingPostsAPI()
    callingCountryAPI()
  }, []);

  useEffect(() => {
    selectedCountry ? callingTime() : null
  }, [selectedCountry])

  const callingPostsAPI = async () => {
    setIsLoading(true);
    try {
      const req = await axios.get(`${import.meta.env.VITE_API_LINK}/posts`);
      const res = await req?.data
      if (res) {
        const filterPosts = res?.filter((x) => x?.userId === state?.id);
        setData(filterPosts);
      }
    } catch (error) {
      console.error(`${error}`)
    } finally {
      setIsLoading(false);
    }
  }

  const callingCountryAPI = async () => {
    setIsLoading(true);
    try {
      const req = await axios.get(`${import.meta.env.VITE_TIMEZONE_API_LINK}`);
      const res = await req?.data
      if (res) {
        setCountryList(res);
      }
    } catch (error) {
      console.error(`${error}`)
    } finally {
      setIsLoading(false);
    }
  }

  function changeTimeZone(date, timeZone) {
    if (typeof date === 'string') {
      return new Date(
        new Date(date).toLocaleString('en-US', {
          timeZone,
        }),
      );
    }
  
    return new Date(
      date.toLocaleString('en-US', {
        timeZone,
      }),
    );
  }

  const callingTime = async () => {
    setIsLoading(true);
    try {
      const req = await axios.get(`${import.meta.env.VITE_TIMEZONE_API_LINK}/${selectedCountry}`);
      const res = await req?.data;
      if (res) {
        const newTimings = res.datetime
        const newTimeZone = res.timezone
        let parsedDate = changeTimeZone(newTimings,newTimeZone)
        setCurrentTime(parsedDate);
      }
    } catch (error) {
      console.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };



  const handleClick = (post) => {
    setShowModal(true);
    setSelectedPostData(post);
  }

  const handleClose = () => {
    setShowModal(!showModal)
  }

  const handleCountrySelect = (e) => {
    setSelectedCountry(e.target.value);
  }

  return (
    <div className='container relative'>
      <ToastContainer />
      {
        showModal &&
        <Modal handleClose={handleClose}>
          <Post>
            <div className='text-center text-gray-800 font-mono font-extrabold'>
              {selectedPostData?.title}
            </div>
            <div className='min-h-[50px] font-mono'>
              {selectedPostData?.body}
            </div>
          </Post>
        </Modal>
      }
      {/* TOp Bar of User Section */}
      <UserTopBar setCurrentTime={setCurrentTime} currentTime={currentTime} handleCountrySelect={handleCountrySelect} countryList={countryList} />
      {/* UserProfile section */}
      <UserInfo data={state} />
      {/* POsts */}
      <Posts handleClose={handleClose} data={data} isLoading={isLoading} handleClick={handleClick} />
    </div>
  )
}

export default UserProfile