

require("dotenv").config();


var keys = require("./keys.js");


var request = require("request");
var nodeArgs = process.argv;


var userInput = ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"];

// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal / bash window.

var myTweets = userInput[0];
var mySong = userInput[1];
var myMovie = userInput[2];
var myRules = userInput[3];

function messages() {


    if (nodeArgs[2] === myTweets) {
        // console.log(myTweets);

        var Twitter = require('twitter');
        var client = new Twitter(keys.twitter);
        var params = {
            screen_name: 'nodejs'
        };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            
            tweets.forEach(function(item) {
                console.log(item.text);
            });
            if (error) {
                console.log("something wrong");
            }
        });

    }

///////////MUSIC//////////////////////////////////////////////////////////////////////////////////////////////////////

// node liri.js spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal / bash window

    if (nodeArgs[2] === mySong) {

        var Spotify = require('node-spotify-api');
        var spotify = new Spotify(keys.spotify);
        var songName = "";
        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                songName = songName + "+" + nodeArgs[i];
            } else {
                songName += nodeArgs[i];
            }
        }
        if (!songName) {
            songName = "I Want It this Way";
        }

        spotify.search({
            type: 'track',
            query: songName,
        }, function (err, data) {
            
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(data.tracks.items[0].artists[0].name);
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].preview_url);
            console.log(data.tracks.items[0].album.name);
        });
    }

// If no song is provided then your program will default to "The Sign" by Ace of Base.

//////////////MOVIE?????///////////////////////////////////////////////////////////////////////////////////////////////////

    else if (nodeArgs[2] === myMovie) {
        var movieName = "";
        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                movieName = movieName + "+" + nodeArgs[i];
            } else {
                movieName += nodeArgs[i];
            }
        }
        if (!movieName){
            movieName = "Mr. Nobody";
        }
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


        request(queryUrl, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                console.log(JSON.parse(body).Title);
                console.log(JSON.parse(body).imdbRating);
                console.log(JSON.parse(body).Ratings[1].Value);
                console.log(JSON.parse(body).Country);
                console.log(JSON.parse(body).Language);
                console.log(JSON.parse(body).Plot);
                console.log(JSON.parse(body).Actors);
            }         
        });
    }

////////////RANDOM/////////////////////////////////////////////////////////////////////////////////////////////////////

// node liri.js do -what-it-says Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI 's commands. It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    
    else if (nodeArgs[2] === myRules) {

        var fs = require('fs'),
        filename = ("./random.txt");
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) throw err;
            nodeArgs = ["garbage", "trash"].concat(data.split(" "));
            messages();
        });
    }

}

messages();