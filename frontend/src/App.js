// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage"
import UploadSongForm from "./components/UploadSongForm"
import AllSongs from "./components/AllSongs";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      {!sessionUser ? <Navigation isLoaded={isLoaded} /> :
      isLoaded && (
        <Switch>
          <Route exact path="/">
              <HomePage />
          </Route>
          <Route path="/songs">
            <AllSongs />
          </Route>
          <Route path="/songs/upload">
          <UploadSongForm />
          </Route>
        </Switch>
      )
      }
    </>
  );
}

export default App;
