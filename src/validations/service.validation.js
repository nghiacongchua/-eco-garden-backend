
const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createService = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    shortDes: Joi.string().required().max(500).min(10),
    description: Joi.string().required().max(1000).min(10),
    price: Joi.number().required(),
    type: Joi.string().required().valid('game', 'clothes-rental'),
  }),
};

const getServices = {
  query: Joi.object().keys({
    name: Joi.string(),
    type: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getService = {
  params: Joi.object().keys({
    serviceId: Joi.string().custom(objectId),
  }),
};

const updateService = {
  params: Joi.object().keys({
    serviceId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      shortDes: Joi.string().required().max(500).min(10),
      description: Joi.string().required().max(1000).min(10),
      price: Joi.number().required(),
      type: Joi.string().required().valid('game', 'clothes-rental'),
    })
    .min(1),
};

const deleteService = {
  params: Joi.object().keys({
    serviceId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
};
