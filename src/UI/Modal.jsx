import React from 'react';

const Modal = ({ children, handleClose }) => {
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className='absolute bg-gray-600 flex w-full h-screen justify-center items-center'
      onClick={handleClose}
    >
      <div
        className='w-full p-4 md:p-0 md:w-1/4 z-50'
        onClick={handleModalClick}
      >
        <button
          onClick={() => handleClose()}
          className='text-white font-mono flex justify-end items-center w-full'
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
