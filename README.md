#Soundcloud-Likes

##Introduction

Soundcloud-Likes is a web application which allows you to discover new music by exploring the likes of each [soundcloud](https://soundcloud.com) user.

The existing soundcloud interface does not support this type of navigation particularly well - and often relegates a user's likes to a small sub-element of the page.

##Features

* Sign in using your soundcloud credentials (Sign up [here](https://soundcloud.com)).
* Explore music in a low latency Single Page Application.
* Play songs using the native web audio API.
* Sort tracks by a range of filters (total plays/total likes/upload date).
* Add songs to your likes by sending PUT requests to the Soundcloud RESTful API.

##Technology

Soundcloud-Likes uses JavaScript on both the client and server, including the following Open Source libraries:

* [NodeJS](http://nodejs.org/)
* [ExpressJS](http://expressjs.com/)
* [Backbone](http://http://backbonejs.org/)
* [jQuery](http://jquery.com/)
* [UnderscoreJS](http://underscorejs.org/)
* [Soundcloud SDK](https://developers.soundcloud.com/docs/api/sdks)

##Contributions

All contributions are welcomed.

##Demo

You can view the demo at [soundcloud-likes.herokuapp.com](http://soundcloud-likes.herokuapp.com/). Simply log in with your soundcloud credentials, and start exploring.
