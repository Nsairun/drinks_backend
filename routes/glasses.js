/**
 * @swagger
 * components:
 *   schemas:
 *     Glasses:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the glasses
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the glass was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: glass
 *   description: The books managing API
 * /glass:
 *   get:
 *     summary: Lists all the glass
 *     tags: [glass]
 *     responses:
 *       200:
 *         description: The list of the glass
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/glass'
 *   post:
 *     summary: Create a new glass
 *     tags: [glass]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/glass'
 *     responses:
 *       200:
 *         description: The created glass.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/glass'
 *       500:
 *         description: Some server error
 * /glass/{id}:
 *   get:
 *     summary: Get the glass by id
 *     tags: [glass]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The glass id
 *     responses:
 *       200:
 *         description: The glass response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/glass'
 *       404:
 *         description: The glass was not found
 *   put:
 *    summary: Update the glass by the id
 *    tags: [glass]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The glass id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/glass'
 *    responses:
 *      200:
 *        description: The glass was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/glass'
 *      404:
 *        description: The glass was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the glass by id
 *     tags: [glass]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The glass id
 *
 *     responses:
 *       200:
 *         description: The glass was deleted
 *       404:
 *         description: The glass was not found
 */

const express = require("express");
const Glass = require("../dataBase/glass");
const router = express.Router();
const glassController = require('../Controllers/GlassController');
const { authMiddleware, authApiKey } = require("../services/auth");

router.get("/",authApiKey,glassController.getAllGlasses);

router.post("/",authMiddleware,glassController.createGlass);

router.get("/:id",authApiKey,glassController.getOneGlass );

router.put("/:id",authMiddleware,glassController.putOneGlass );

router.patch("/:id",authMiddleware,glassController.patchOneGlass );

router.delete("/:id",authMiddleware,glassController.deleteGlass );

module.exports = router;
