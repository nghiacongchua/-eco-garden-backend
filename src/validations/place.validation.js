
const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPlace = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    shortDes: Joi.string().required().max(500).min(10),
    description: Joi.string().required().max(1000).min(10),
    price: Joi.number().required(),
  }),
};

const getPlaces = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPlace = {
  params: Joi.object().keys({
    placeId: Joi.string().custom(objectId),
  }),
};

const updatePlace = {
  params: Joi.object().keys({
    placeId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      shortDes: Joi.string().required().max(500).min(10),
      description: Joi.string().required().max(1000).min(10),
      price: Joi.number().required(),
    })
    .min(1),
};

const deletePlace = {
  params: Joi.object().keys({
    placeId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPlace,
  getPlaces,
  getPlace,
  updatePlace,
  deletePlace,
};
