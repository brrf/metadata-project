'use strict';

var express = require('express');
var cors = require('cors');
var multer  = require('multer');


// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

var upload = multer({ dest: 'uploads/' })
  .single('upfile')

app.post('/api/fileanalyse', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.send('error with file upload')
    }
    if (req.file == undefined) {
      return res.send('must select a file')
    }
    console.log(req.file)
    res.send({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    })
  })
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
