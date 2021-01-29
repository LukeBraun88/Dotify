// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage"
import LikedSongs from "./components/LikedSongs"
import AllSongs from "./components/AllSongs";
import UploadSongForm from "./components/UploadSongModal/Index";
import UploadSongModal from "./components/UploadSongModal/UploadSong";

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
        {/* <Navigation isLoaded={isLoaded} /> */}
          <Route exact path="/">
              <HomePage />
          </Route>
          <Route path="/songs">
            <AllSongs />
          </Route>
          <Route path="/upload">
            <UploadSongForm />
          </Route>
          <Route to="/liked">
            <LikedSongs />
          </Route>
        </Switch>
      )
      }
    </>
  );
}

export default App;
