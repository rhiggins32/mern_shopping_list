const express = require('express');
const router = express.Router();

//Item model for queries
const Item = require('../../models/Item');


//@route    GET api/items
//@desc     Get All Items and sort descending by date
//@access   Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1})
        .then(items => res.json(items))
})


// @route POST api/items
// @desc Create a Item
// @access Public
router.post('/', (req, res) => {
   const newItem = new Item ({
       name: req.body.name
   });  
   //save new item to DB
   newItem.save().then(item => res.json(item));
});

// @route DELETE api/items/:id
// @desc Delete a Item
// @access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(()=> res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
    });  
  





module.exports = router; 