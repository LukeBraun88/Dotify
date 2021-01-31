

[![Contributors][contributors-shield]][https://github.com/LukeBraun88/Dotify/graphs/contributors]
[![Forks][forks-shield]][https://github.com/LukeBraun88/Dotify/network/members]
[![Stargazers][stars-shield]][https://github.com/LukeBraun88/Dotify/stargazers]
[![Issues][issues-shield]][https://github.com/LukeBraun88/Dotify/issues]
[![LinkedIn][linkedin-shield]][https://www.linkedin.com/in/luke-braun-840328a8/]



<!-- PROJECT PIC -->

<p align="center">



  <h2 align="center">Dotify</h2>

  <p align="center">
    A clone of the one and only Spotify
    <br />
    <a href="https://github.com/LukeBraun88/Dotify"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://dotify-music.herokuapp.com/">View Demo</a>
    .
    <a href="https://github.com/LukeBraun88/Dotify/wiki">Wiki</a>
    ·
    <a href="https://github.com/LukeBraun88/Dotify/issues">Report Bug</a>
    ·
    <a href="https://github.com/LukeBraun88/Dotify/issues">Request Feature</a>

  </p>
  <div align="center">
  <img  src="https://imgur.com/sdz5Gpx" alt="HomePage" width="150" height="150">
  </div>

</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#feature-highlights">Feature Highlights</a></li>
        <li><a href="#project-challenges">Project Challenges</a></li>
        <li><a href="#code-snippets">Code Snippets</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Dotify is a react/redux based clone of Spotify that allows users to upload their own music which is then stored on an AWS database and can be accessed at any time. Dotify uses User-based session authentication to keep your session unique.

## Feature Highlights

### Single page react app
- Users will experience a one page app experience with Dotify. The app will never be reloaded
  resulting in smooth and seamless transitions.


### Liked songs playlist
- How much do you love your liked songs playlist on Spotify? Well you'll be glad to find out that we have incorporated a very similar functionality with Dotify. Users are able to keep track of their favorite songs while also having the option to unlike them whenever they want resulting in the song being kicked from the liked songs playlist.


## Project Challenges

You wouldn't know how hard it would be to get songs uploaded to AWS without trying it for yourself, but let's just say it was definitely a learning experience. Although, I think for my first time I did a good job!

## Code Snippets

Redux thunk for finding liked songs with the corresponding api route
```js

export const getLikedSongs = (userId) => async dispatch => {
    const res = await fetch(`/api/likes/songs/${userId}`);
    const songs = res.data.songs
    let normalizedSongs = {}
    for (let i = 0; i < songs.length; i++) {
        const song = songs[i]
        normalizedSongs[song.id] = song
    }
    dispatch(setLikedSongs(normalizedSongs))
};

router.get(`/songs/:id(\\d+)`, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userLikes = await Like.findAll({
        where:{
            userId:userId
        },
        order: [["createdAt", "DESC"]],
    })
    const songsId = await userLikes.map(like=>like.songId)
    const songs = await Song.findAll({
        where: {
            id: songsId
        }
    })
    await
        res.json({
            songs,
        });
}),
);
```
You're probably thinking, "wait this was his first time using react/redux and he's showing off sequelize code?" Well, I was proud of this code snippet because I got it to work on ALMOST the first try! Maybe there is a smarter way to accomplish this, but I liked my implementation. I'm making a fetch call to the likes/songs/userId api route, extracting the users id, using the id to find all of the likes that the user made, then mapping out all of the songId's to then finally find the songs and send them back. I then normalize the songs into key value pairs and set the state.



### Built With

* [Javascript](https://www.javascript.com/)
* [CSS]()
* [PostgreSQL](https://www.postgresql.org/)
* [Express](https://expressjs.com/)
* [React](https://reactrouter.com/)
* [Redux](https://redux.js.org/)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps

### Prerequisites

- install npm. How do you not have npm already?
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/LukeBraun88/Dotify.git
   ```
   or if using SSH:
   ```sh
   git clone git@github.com:LukeBraun88/Dotify.git
   ```

2. Install NPM packages (cd into the Dotify root directory first)
   ```sh
   npm install
   ```



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- CONTACT -->
## Contact

Luke Braun - [Luke Braun]:(https://www.linkedin.com/in/luke-braun-840328a8/) - LinkedIn

Project Link: [Dotify]: (https://github.com/LukeBraun88/Dotify)
