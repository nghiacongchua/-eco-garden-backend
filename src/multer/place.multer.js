const path = require('path');
const multer = require('multer');
const slug = require('limax');
const ApiError = require('../utils/ApiError');
// import { MAX_UPLOAD_FILE_SIZE_MB, MEGABYTE, UPLOADS_DESTINATION, ROOT_PATH } from '../../constants';
const { getCurrentDateString, mkDir } = require('../utils/helper');
const config = require('../config/config');

const getPlaceImageMulter = () => {
  const storagePostImage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dest = `${config.ROOT_PATH}/uploads/${getCurrentDateString()}/place-image`;
      mkDir(dest);
      cb(null, dest);
    },
    filename: async function (req, file, cb) {
      const originalName = file.originalname;
      const fieldName = file.fieldname;
      const fileExtension = path.extname(originalName) || '';
      const slugName = slug(path.basename(file.originalname, fileExtension), { lowercase: true });
      const finalName = `${fieldName}-${slugName}-${Date.now()}${fileExtension}`;
      cb(null, finalName);
    },
  });

  const limits = { fileSize: 5 * 1024 * 1024 };
  const fileAllowedFormats = ['jpg', 'jpeg', 'png'];

  const placeImageMulter = multer({
    storage: storagePostImage,
    limits: limits,
    fileFilter: function (req, file, cb) {
      const originalName = file.originalname.toLowerCase();
      if (!originalName.match(new RegExp(`.(${fileAllowedFormats.join('|')})$`)) || !originalName) {
        return cb(
          new ApiError(422, [
            {
              msg: `Place image format must be ${fileAllowedFormats.join(
                ', '
              )} and max size: 5 MB`,
              param: 'placeImageInvalid',
              location: 'body',
            },
          ])
        );
      }
      return cb(null, true);
    },
  });
  return placeImageMulter.fields([{ name: 'images' }]);
}


module.exports = getPlaceImageMulter;