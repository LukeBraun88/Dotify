import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useEffect} from "react"
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal'
import './Navigation.css';
import HomePage from "../HomePage"

function Navigation({ isLoaded }) {

  const sessionUser = useSelector(state => state.session.user);

  // useEffect(()=>{
  //   },[])


  return (
    <>
    <div className="navbar">
      <ul className="navbar-list">
      <div className="left-links">
          <li className=""><NavLink className="home navlink" exact to="/" >Dotify</NavLink></li>
      </div>
      {sessionUser ?
      <div className="dropdown-container">
              {/* <li><img src={sessionUser.profileImageUrl}></img></li> */}
              <li><ProfileButton user={sessionUser} /></li>
      </div>:
          (<div className="right-links">
            <li className="seperator">|</li>
            <li className=" ">{isLoaded && <SignupFormModal />}</li>
            <li className="">{isLoaded && <LoginFormModal />}</li>
          </div>)
        }
      </ul>
    </div>
      {!sessionUser?
    (<div className="page">
        <img href=""></img>
    </div>):
    <HomePage />
}
</>

  );
}

export default Navigation;
