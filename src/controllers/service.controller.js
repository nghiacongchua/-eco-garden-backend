
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { serviceService } = require('../services');
const config = require('../config/config');

const createService = catchAsync(async (req, res) => {

  const { body, files } = req;
  const images = files?.images?.map((image) => {
    const rootPath = image.destination.replace(`${config.ROOT_PATH}/`, '');
    image.url = `${rootPath}/${image.filename}`;
    return image;
  });
  body.images = images;
  const service = await serviceService.createService(body);
  res.status(httpStatus.CREATED).send({service});
});

const getServices = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['type', 'name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await serviceService.queryService(filter, options);
  res.send(result);
});

const getService = catchAsync(async (req, res) => {
  const service = await serviceService.getServiceById(req.params.serviceId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  res.send(service);
});

const updateService = catchAsync(async (req, res) => {
  const service = await serviceService.updateServiceById(req.params.serviceId, req.body);
  res.send(service);
});

const deleteService = catchAsync(async (req, res) => {
  await serviceService.deleteServiceById(req.params.serviceId);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  createService,
  getServices,
  updateService,
  getService,
  deleteService
};
