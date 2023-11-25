import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserTopBar = ({countryList,handleCountrySelect, currentTime,setCurrentTime}) => {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(true);
  // console.log('currentTIme',currentTime);

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setCurrentTime((prevTime) => new Date(prevTime.getTime() + 1000));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isRunning]);

  const handlePauseResumeTime = () => {
    setIsRunning(!isRunning);
  };

  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');

  return (
    <div className='w-full'>
      <div className='w-full flex justify-between md:flex-row flex-col items-center'>
        <div className='w-full flex md:justify-start justify-between items-center'>
          <button className='font-mono bg-sky-100 border border-gray-700 rounded-md px-4' onClick={() => navigate('/')}>
            Back
          </button>
          <button className='font-mono md:hidden bg-lime-100 border border-gray-700 rounded-md px-4' onClick={handlePauseResumeTime}>
            <span className='font-mono'> Pause/Start</span>
          </button>
        </div>
        <div className='w-full flex justify-center items-center  my-2'>
          <div>
            <select onChange={(e)=>handleCountrySelect(e)} className='font-mono'>
              {
                countryList?.length>0?
                countryList?.map((countries,index)=>
                <option key={index} value={countries} className='font-mono'>{countries?countries:"NA"}</option>
                )
                :
                <option className='font-mono'>Please Wait</option>
              }
            </select>
          </div>
          <div className='font-mono'>{`${hours}:${minutes}:${seconds}`}</div>
        </div>
        <div className='w-full hidden justify-end items-center md:flex '>
          <button className='font-mono bg-lime-100 border border-gray-700 rounded-md px-4' onClick={handlePauseResumeTime}>
            <span className='font-mono'> Pause/Start</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTopBar;
