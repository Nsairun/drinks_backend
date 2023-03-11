const express = require("express");
const Glass = require ("../dataBase/glass");
const router = express.Router();

router.get ("/", async (req, res) =>{
   const glass = await Glass.findAll();
   res.send(glass)
});

router.post ("/", async (req, res) =>{
    const glass = await Glass.create(req.body)
    res.send(glass)
});

router.get ("/", async (req, res) =>{
    const glass = await Glass.findByPk(req.params.id);
  res.send(glass);
});

router.put('/:id',async function(req, res) {
    const {name} = req.body;
    if ( name) {
      await Glass.update(req.body, {where: {id: req.params.id}})
      const updateGlassData = await Glass.findByPk(req.params.id);
      res.send(updateGlassData);
    };
  
  });router.patch('/:id',async function(req, res) {
    await Glass.update(req.body, { where: {id: req.params.id}})
    const glass = await Glass.findByPk(req.params.id)
    res.send(glass);
  
  });router.delete('/:id',async function(req, res) {
    const glass = await Glass.destroy ({
      where:{
       id: req.params.id
      },
    })
    res.send("success");
  });
  
  module.exports = router;
  