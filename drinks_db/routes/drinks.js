const express = require("express");
const Drink = require ("../dataBase/drink");
const router = express.Router();

router.get ("/", async (req, res) =>{
   const drink = await Drink.findAll();
   res.send(drink)
});

router.post ("/", async (req, res) =>{
    const drink = await Drink.create(req.body)
    res.send(drink)
});

router.get ("/", async (req, res) =>{
    const drink = await Drink.findByPk(req.params.id);
  res.send(drink);
});

router.put('/:id',async function(req, res) {
    const { name, description, image_url, glass} = req.body;
    if ( name && description && image_url && glass) {
      await Drink.update(req.body, {where: {id: req.params.id}})
      const updateDrinkData = await Drink.findByPk(req.params.id);
      res.send(updateDrinkData);
    };
  
  });router.patch('/:id',async function(req, res) {
    await Drink.update(req.body, { where: {id: req.params.id}})
    const drink = await Drink.findByPk(req.params.id)
    res.send(drink);
  
  });router.delete('/:id',async function(req, res) {
    const drink = await Drink.destroy ({
      where:{
       id: req.params.id
      },
    })
    res.send("success");
  });
  
  module.exports = router;
  