/**
 * @swagger
 * components:
 *   schemas:
 *     drinks:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the drink
 *         name:
 *           type: string
 *           description: The title of your drink
 *         author:
 *           type: string
 *           description: The drink author
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the drink was added
 *       example:
 *         id: d5fE_asz
 *         name: pineapple juice
 *         finished: false
 *         createdAt: 2022-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: drinks
 *   description: The books managing API
 * /drinks:
 *   get:
 *     summary: Lists all the drinks
 *     tags: [drinks]
 *     responses:
 *       200:
 *         description: The list of the drinks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/drink'
 *   post:
 *     summary: Create a new drink
 *     tags: [drinks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/drink'
 *     responses:
 *       200:
 *         description: The created drink.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/drink'
 *       500:
 *         description: Some server error
 * /drinks/{id}:
 *   get:
 *     summary: Get the drink by id
 *     tags: [drinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The drink id
 *     responses:
 *       200:
 *         description: The drink response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/drink'
 *       404:
 *         description: The drink was not found
 *   put:
 *    summary: Update the drink by the id
 *    tags: [drinks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The drink id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/drink'
 *    responses:
 *      200:
 *        description: The drink was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/drink'
 *      404:
 *        description: The drink was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the drink by id
 *     tags: [drinks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The drink id
 *
 *     responses:
 *       200:
 *         description: The drink was deleted
 *       404:
 *         description: The drink was not found
 */


const express = require("express");
const Drink= require("../dataBase/drink")
const router = express.Router();
const drinkController = require('../Controllers/drinksController');
const { authMiddleware, authApiKey } = require("../services/auth");

router.get("/",authApiKey, drinkController.getAllDrinks);

router.post("/",authMiddleware,drinkController.createDrink);

router.get("/:id",authApiKey,drinkController.getOneDrink );

router.put("/:id",authMiddleware,drinkController.putOneDrink );

router.patch("/:id",authMiddleware,drinkController.patchOneDrink );

router.delete("/:id",authMiddleware,drinkController.deleteDrink );

module.exports = router;
