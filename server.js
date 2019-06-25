var express = require('express')
var nodemailer = require('nodemailer')
var bodyparser = require('body-parser')
var app = express();


var server = app.listen(8081, function () {
    var port = server.address().port

    console.log(`Server listening on port ${port}`)
})

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    res.json({ "test": "success" })
})

app.post('/email', (req, res) => {
    console.log(req.body)
    var mailOptions = {
        from: 'webappmailclient@gmail.com',
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.text
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.json({ "success": false })
        } else {
            console.log(info)
            res.status(200).json({ "success": true})
        }
    })
})

// email
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'webappmailclient@gmail.com',
        pass: "Webapp123"
    }
})