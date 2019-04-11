const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const randomString = require('randomstring');

aws.config.update({
    secretAccessKey: process.env.AWS_ACCESS,
    accessKeyId: process.env.AWS_SECRET 
})

var s3 = new aws.S3()

const upload = multer({
    limits: { fileSize: 1000 * 1000 * 4 },
    storage: multerS3({
      s3: s3,
      bucket: 'dealbyimage',
      acl: 'public-read',
      cacheControl: 'max-age=31536000',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        if (file){
          let ext = file.originalname.split('.');
          let randomFileName = randomString.generate(7);
          ext = Array.isArray(ext) ? ext[1] : 'jpg';
          let newFilename = randomFileName + '.' + ext;
          cb(null, newFilename);
      }
      }
    })
  });
  
// const upload = multer({ dest: 'uploads/' });
  module.exports = upload;