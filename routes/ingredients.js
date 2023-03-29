/**
 * @swagger
 * components:
 *   schemas:
 *     Ingredients:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the ingredient
 *         title:
 *           type: string
 *           description: The name of the ingredient
 *         author:
 *           type: string
 *           description: of the ingredient
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the ingredient was added
 *       example:
 *         id: d5fE_asz
 *         title: ingredients
 *         author: Mboma
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: ingredient
 *   description: The ingredient managing API
 * /ingredients:
 *   get:
 *     summary: Lists all the ingredients
 *     tags: [ingredients]
 *     responses:
 *       200:
 *         description: The list of the ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ingredient'
 *   post:
 *     summary: Create a new ingredient
 *     tags: [ingredients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ingredient'
 *     responses:
 *       200:
 *         description: The created ingredient.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ingredient'
 *       500:
 *         description: Some server error
 * /ingredients/{id}:
 *   get:
 *     summary: Get the ingredient by id
 *     tags: [ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ingredient id
 *     responses:
 *       200:
 *         description: The ingredient response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ingredient'
 *       404:
 *         description: The ingredient was not found
 *   put:
 *    summary: Update the ingredient by the id
 *    tags: [ingredients]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ingredient id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ingredient'
 *    responses:
 *      200:
 *        description: The ingredient was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ingredient'
 *      404:
 *        description: The ingredient was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the ingredient by id
 *     tags: [ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ingredient id
 *     responses:
 *       200:
 *         description: The ingredient was deleted
 *       404:
 *         description: The ingredient was not found
 */

const express = require("express");
const Drink = require("../dataBase/drink")
const Ingredient = require("../dataBase/ingredient");
const router = express.Router();
const ingredientController = require('../Controllers/IngrdientController');
const { authMiddleware, authApiKey } = require("../services/auth");

router.get("/",authApiKey, ingredientController.getAll);

router.post("/",authMiddleware, ingredientController.createIngredient);

router.get("/:id",authApiKey, ingredientController.getOneIngredient );

router.put("/:id",authMiddleware, ingredientController.putOneIngredient );

router.patch("/:id",authMiddleware, ingredientController.patchOneIngredient );

router.delete("/:id",authMiddleware, ingredientController.deleteIngredient );

module.exports = router;
