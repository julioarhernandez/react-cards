const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const randomString = require('randomstring');

const awsAccessKey = 'OHLX++DzZ32BEQNgp+lIX9MDGQbz4XJzKpLNERrt';
const awsSecretKey = 'AKIAJTDAJSYHVZJWKSUA';

aws.config.update({
    secretAccessKey: awsAccessKey,
    accessKeyId: awsSecretKey 
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
        let ext = file.originalname.split('.');
        let randomFileName = randomString.generate(7);
        ext = Array.isArray(ext) ? ext[1] : 'jpg';
        let newFilename = randomFileName + '.' + ext;
        cb(null, newFilename);
      }
    })
  });
  
  module.exports = upload;