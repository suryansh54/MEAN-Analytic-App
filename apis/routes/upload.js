var express = require('express');
var multer = require('multer');
var fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')
var app = express();
const router = require('express').Router();

const DIR = './uploads';
 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
});
let upload = multer({storage: storage});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
 
router.get('/upload', function (req, res) {
  res.end('file catcher example');
});
 
router.post('/upload',upload.single('fileData'), function (req, res) {
  console.log(req.file.originalname);
    if (!req.file) {
        return res.json({
          error: 'error',
          message:"No file received"
        });
    
      } else {
        return res.json({
          success: true,
          message:"File uploaded"
        })
      }
});


router.get('/upload-list', function (req, res) {
    let filesArr = [];
    fs.readdir(DIR, (err, files) => {
        files.forEach(file => {
            filesArr.push(file);
        });
        res.json(filesArr);
    });
});
module.exports = router;