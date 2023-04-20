const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const FileSchema = require('./file');
const config = require('../config/config');

const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    shortDes: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [FileSchema],
    type: {
      type: String,
      enum: ['clothes-rental', 'game'],
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
serviceSchema.plugin(toJSON);
serviceSchema.plugin(paginate);

const transformPostData = (post) => {
  const { images } = post;
  if (images instanceof Array) {
    post.images = images.map((image) => {
      image.url = `${config.uploadGetHost}/${image.url}`;
      delete image.fieldname;
      delete image.encoding;
      delete image.destination;
      delete image.path;
      return image;
    });
  }
  delete post.__v;
  delete post.createdAt;
  delete post.updatedAt;
  return post;
};

serviceSchema.set('toJSON', {
  transform(doc, ret) {
    return transformPostData(ret);
  },
});

/**
 * @typedef Service
 */
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
