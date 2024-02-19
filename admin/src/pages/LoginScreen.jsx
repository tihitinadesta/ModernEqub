import React from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdOutlineMailOutline } from 'react-icons/md';
import '../Styles/LoginScreen.css';  

function LoginScreen() {

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Login </div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <MdOutlineMailOutline />
          <input type='email' placeholder='Enter your email'  />
        </div>
        <div className='input'>
          <RiLockPasswordLine />
          <input type='password' placeholder='Enter your password' />
        </div>
      </div>
      <div className='forgot-password'>
        Forgot password?</div>
      <div className='submit-container'>
        <button className='submit'>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
