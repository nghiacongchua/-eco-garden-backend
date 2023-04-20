const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const FileSchema = require('./file');
const config = require('../config/config');

const placeSchema = mongoose.Schema(
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
placeSchema.plugin(toJSON);
placeSchema.plugin(paginate);

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

placeSchema.set('toJSON', {
  transform(doc, ret) {
    return transformPostData(ret);
  },
});

/**
 * @typedef Place
 */
const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
