const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const placeValidation = require('../../validations/place.validation');
const placeController = require('../../controllers/place.controller');
const { setExpressRequestTimeout, multerBodyParser } = require("../../middlewares/multerBodyParser");
const getPlaceImageMulter = require("../../multer/place.multer");
const router = express.Router();

router
  .route('/')
  .post(auth('managePlaces'),
    setExpressRequestTimeout(60000),
    getPlaceImageMulter(),
    multerBodyParser(),
    validate(placeValidation.createPlace),
    placeController.createPlace)
  .get(validate(placeValidation.getPlaces), placeController.getPlaces);

router
  .route('/:placeId')
  .get(validate(placeValidation.getPlace), placeController.getPlace)
  .patch(auth('managePlaces'),
    setExpressRequestTimeout(60000),
    getPlaceImageMulter(),
    multerBodyParser(),
    validate(placeValidation.updatePlace),
    placeController.updatePlace)
  .delete(auth('managePlaces'), validate(placeValidation.deletePlace), placeController.deletePlace);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Places
 *   description: Place management and retrieval
 */

/**
 * @swagger
 * /places:
 *   post:
 *     summary: Create a place
 *     description: Only admins can create other places.
 *     tags: [Places]
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
 *     summary: Get all places
 *     description: Only admins can retrieve all places.
 *     tags: [Places]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Place name
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
 *         description: Maximum number of places
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
 * /places/{id}:
 *   get:
 *     summary: Get a place
 *     description:  Place information.
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Place id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *
 *   patch:
 *     summary: Update a place
 *     description: Only admins can update place.
 *     tags: [Places]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Place id
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
 *           example: {
 *             name: 'Ao ba ba',
 *             shortDes: 'shortDesssss',
 *             description: 'descriptionnnn',
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
 *     summary: Delete a place
 *     description:  Only admins can delete place.
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Place id
 *     responses:
 *       "200":
 *         description: No content
 */

