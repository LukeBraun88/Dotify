import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal'
import './Navigation.css';

function Navigation({ isLoaded }) {

  const sessionUser = useSelector(state => state.session.user);

  return (
    <div>
      <div className="navbar">
        <ul className="navbar-list">
          <div className="left-links">
            <NavLink className="home navlink" exact to="/" >Dotify</NavLink>
          </div>
          {sessionUser ?
            (
              <li><ProfileButton user={sessionUser} /></li>
            ) :
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
  )
}

export default Navigation;
