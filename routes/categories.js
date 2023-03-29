/**
 * @swagger
 * components:
 *   schemas:
 *    Category:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the category
 *         title:
 *           type: string
 *           description: The title of your category
 *         author:
 *           type: string
 *           description: The category author
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the category was added
 *       example:
 *         id: d5fE_asz
 *         title: hot drinks
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2022-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: category
 *   description: The books managing API
 * /category:
 *   get:
 *     summary: Lists all the category
 *     tags: [category]
 *     responses:
 *       200:
 *         description: The list of the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/category'
 *   post:
 *     summary: Create a new category
 *     tags: [category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/category'
 *     responses:
 *       200:
 *         description: The created category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/category'
 *       500:
 *         description: Some server error
 * /category/{id}:
 *   get:
 *     summary: Get the category by id
 *     tags: [category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     responses:
 *       200:
 *         description: The category response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/category'
 *       404:
 *         description: The category was not found
 *   put:
 *    summary: Update the category by the id
 *    tags: [category]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The category id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/category'
 *    responses:
 *      200:
 *        description: The category was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/category'
 *      404:
 *        description: The category was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the category by id
 *     tags: [category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *
 *     responses:
 *       200:
 *         description: The category was deleted
 *       404:
 *         description: The category was not found
 */


const express = require("express");
const Drink= require("../dataBase/drink")
const Category = require("../dataBase/category")
const router = express.Router();
const categoryController = require('../Controllers/CategoriesController');
const { authMiddleware, authApiKey } = require("../services/auth");

router.get("/",authApiKey,categoryController.getAllCategories);

router.post("/",authMiddleware,categoryController.createCategory);

router.get("/:id",authApiKey,categoryController.getOneCategory );

router.put("/:id",authMiddleware,categoryController.putOneCategory );

router.patch("/:id",authMiddleware,categoryController.patchOneCategory );

router.delete("/:id",authMiddleware,categoryController.deleteCategory );

module.exports = router;
