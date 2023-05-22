const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/upload')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.png')
    }
  })
  
  const maxSize = 2 * 1000 * 1000;
  const upload = multer({
  storage: storage,
      limits: {
        fileSize: maxSize ,
      },
      fileFilter: (req, file, cb) => {
        const acceptedTypeFile = ['jpg', 'png', 'jpeg'];
        // Get Extension file
        const extFile = path.extname(file.originalname).split('.')[1];
        if (!acceptedTypeFile.includes(extFile.toLowerCase())) {
          return cb(new Error('Photo should png, jpeg or jpg'));
        }
        cb(null, file);
      },
  
    })

  module.exports = upload