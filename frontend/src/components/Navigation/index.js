import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal'
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <>
    <div className="navbar">
      <ul className="navbar-list">
      <div className="left-links">
          <li className="link"><NavLink className="home navlink" exact to="/" >Dotify</NavLink></li>
      </div> {sessionUser ?
        <li><ProfileButton user={sessionUser} /></li> :
          (<div className="right-links">
            <li  className="seperator">|</li>
            <li className="link signup">{isLoaded && <SignupFormModal />}</li>
            <li className="link">{isLoaded && <LoginFormModal />}</li>
          </div>)
        }
      </ul>
    </div>
    <div className="page">
        <img href=""></img>
    </div>
</>

  );
}

export default Navigation;
