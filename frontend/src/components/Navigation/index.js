import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from "react"
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal'
import './Navigation.css';
import HomePage from "../HomePage"
import {Login} from "../Login"

function Navigation({ isLoaded }) {

  const sessionUser = useSelector(state => state.session.user);

  // useEffect(()=>{
  //   },[])


  return (
    <div>

      <div className="navbar">
        <ul className="navbar-list">
          <div className="left-links">
            <li className=""><NavLink className="home navlink" exact to="/" >Dotify</NavLink></li>
          </div>


          {sessionUser ?
            (<div className="dropdown-container">
              {/* <li><img src={sessionUser.profileImageUrl}></img></li> */}
              <li><ProfileButton user={sessionUser} /></li>
            </div>) :


            (
              <div className="right-links">
                <li className="seperator">|</li>
                <li className="login-links">{isLoaded && <SignupFormModal />}</li>
                <li className="login-links">{isLoaded && <LoginFormModal />}</li>
              </div>
            )}
            </ul>
    </div>
</div>


    )}

export default Navigation;
