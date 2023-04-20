const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const serviceValidation = require('../../validations/service.validation');
const serviceController = require('../../controllers/service.controller');
const { setExpressRequestTimeout, multerBodyParser } = require("../../middlewares/multerBodyParser");
const getServiceImageMulter = require("../../multer/service.multer");
const router = express.Router();

router
  .route('/')
  .post(auth('manageServices'),
    setExpressRequestTimeout(60000),
    getServiceImageMulter(),
    multerBodyParser(),
    validate(serviceValidation.createService),
    serviceController.createService)
  .get(validate(serviceValidation.getServices), serviceController.getServices);

router
  .route('/:serviceId')
  .get(validate(serviceValidation.getService), serviceController.getService)
  .patch(auth('manageServices'),
    setExpressRequestTimeout(60000),
    getServiceImageMulter(),
    multerBodyParser(),
    validate(serviceValidation.updateService),
    serviceController.updateService)
  .delete(auth('manageServices'), validate(serviceValidation.deleteService), serviceController.deleteService);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Service management and retrieval
 */

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create a service
 *     description: Only admins can create other services.
 *     tags: [Services]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: images
 *         type: array
 *         items:
 *           type: file
 *         description: The post images, upload type jpg|jpeg|png
 *       - in: formData
 *         name: data
 *         type: object
 *         description: The body stringify information
 *         schema:
 *           type: object
 *           properties:
 *           example: {
 *             name: 'Ao ba ba',
 *             shortDes: 'shortDesssss',
 *             description: 'descriptionnnn',
 *             type: 'clothes-rental',
 *             price: 100000,
 *           }
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *
 *   get:
 *     summary: Get all services
 *     description: Only admins can retrieve all services.
 *     tags: [Services]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Service name
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Service type
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of services
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 */


/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get a service
 *     description:  Service information.
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *
 *   patch:
 *     summary: Update a service
 *     description: Only admins can update service.
 *     tags: [Services]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service id
 *       - in: formData
 *         name: images
 *         type: array
 *         items:
 *           type: file
 *         description: The post images, upload type jpg|jpeg|png
 *       - in: formData
 *         name: data
 *         type: object
 *         description: The body stringify information
 *         schema:
 *           type: object
 *           properties:
 *           example: {
 *             name: 'Ao ba ba',
 *             shortDes: 'shortDesssss',
 *             description: 'descriptionnnn',
 *             type: 'clothes-rental',
 *             price: 100000,
 *           }
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *
 *   delete:
 *     summary: Delete a service
 *     description:  Only admins can delete service.
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service id
 *     responses:
 *       "200":
 *         description: No content
 */

