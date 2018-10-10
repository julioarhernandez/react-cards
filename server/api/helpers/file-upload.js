const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const awsAccessKey = 'OHLX++DzZ32BEQNgp+lIX9MDGQbz4XJzKpLNERrt';
const awsSecretKey = 'AKIAJTDAJSYHVZJWKSUA';

aws.config.update({
    secretAccessKey: awsAccessKey,
    accessKeyId: awsSecretKey 
})

var s3 = new aws.S3()

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'dealby',
      acl: 'public-read',
      cacheControl: 'max-age=31536000',
      expires: 'Wed, 21 Oct 2020 07:28:00 GMT',
      metadata: function (req, file, cb) {
        cb(null, {'Cache-Control': 'max-age=31536000'});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  });
  
  module.exports = upload;