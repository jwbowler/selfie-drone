var Twitter = require('twitter');
var fs = require('fs')

function postImage(tweet_text) {
    var data = fs.readFileSync('screenshot.png');
    postImage2(tweet_text, data)
}

function postImage2(tweet_text, data) {
    var client = new Twitter({
        consumer_key: 'vmBac5nECwuW87UaAzvG2KhyR',
        consumer_secret: 'DJLjxGiVheKISFRfG9yPCi62jfqeasYXVv0pZuzJayPspY6GU5',
        access_token_key: '4804911954-lvrpq6TRAM1PzfBzoc4fnpFWFJU1pLoRSp40MHO',
        access_token_secret: 'DPEsseodueJWiWrrc684MKUOmTfDNX30MmF6qFlLV1xtf'
    });

    client.post('media/upload', {media: data}, function(error, media, response){

        if (!error) {

            // If successful, a media object will be returned.
            console.log(media);

            // Lets tweet it
            var status = {
                status: tweet_text,
                media_ids: media.media_id_string // Pass the media id string
            }

            client.post('statuses/update', status, function(error, tweet, response){
                if(error) throw error;
                console.log(tweet);  // Tweet body.
                console.log(response);  // Raw response object.
            });

        }
    });
}

var express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/foo', function (req, res) {
    var tweet_text = req.query.tweet_text
    postImage(tweet_text);
    res.send(200, "Did stuff");
});

app.post('/bar', function(req, res) {
    console.log(req.body)
    var tweet_text = req.body.tweet_text;
    var image_data = req.body.image;

    postImage2(tweet_text, image_data)
    res.send(200, "Did stuff");
});

app.listen(3000)
