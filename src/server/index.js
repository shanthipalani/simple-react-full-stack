const express = require('express');
const os = require('os');
const request = require('request');

const app = express();

app.use(express.static('dist'));

//app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.post('/api/getUsername/:name', function(req, res, next) {
    console.log(req.params.name);
    var search = req.params.name;
    var searchURl = "https://swapi.co/api/people/?search="+req.params.name;

    request(searchURl, function(error, response, html) {
        if (error) {
            console.log('Error:', error);
            res.send({
                flag : false
            });
        } else {
            console.log("success");
            var resData = JSON.parse(html);
            res.send({
                flag : true,
                data : resData
            });
        }
    });
});

app.listen(8080, () => console.log('Listening on port 8080!'));
