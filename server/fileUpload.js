const multer = require('multer')

var storageFile = multer.diskStorage({
  destination: __dirname + '/uploads/files',
  filename: function(req, file, cb) {
    if(file.mimetype === 'image/jpeg') {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    } else if(file.mimetype === 'image/png') {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    } else if (file.mimetype === 'application/pdf') {
      cb(null, file.fieldname + '-' + Date.now() + '.pdf')
    } else if (file.mimetype === 'video/mp4') {
      cb(null, file.fieldname + '-' + Date.now() + '.mp4')
    }
  }
})

const uploadFile = multer({storage: storageFile});

exports.uploadFile = (req, res) => {
  uploadFile.single('oppematerjal')(req, res, function (error) {
    if (error) {
      console.log(`upload.single error: ${error}`);
      return res.sendStatus(500);
    }
      console.log("filename: " + req.file.filename);
  })
};