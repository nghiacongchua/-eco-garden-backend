const mongoose = require('mongoose');

/**
 * @swagger
 * definitions:
 *  FileSchema:
 *    type: object
 *    properties:
 *      originalname:
 *        type: string
 *      filename:
 *        type: string
 *      url:
 *        type: string
 *      size:
 *        type: number
 */
const FileSchema = new mongoose.Schema({
  fieldname: { type: String },
  originalname: { type: String },
  encoding: { type: String },
  mimetype: { type: String },
  destination: { type: String },
  filename: { type: String },
  path: { type: String },
  size: { type: Number },
  url: { type: String },
});

module.exports = FileSchema;
