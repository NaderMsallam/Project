const { Router } = require("express");
const { UsersModel } = require("../models/items")
const router = Router();
const { mongoose } = require("mongoose");
const { itemService } = require("../services/itemService")
const { validateToken, validateAdminToken } = require("../Auth/JWT")

//add new item 
router.post("/addItem", validateAdminToken, async function(req, res) {
    const title = req.body.title;
    const description = req.body.description;;
    const price = req.body.price;

    const data = {
        title: title,
        description: description,
        price: price,
    };
    res.json(await itemService.addItem(data));
});

//delete existing item
router.post("/deleteItem", validateAdminToken, async function(req, res) {
    const _id = req.body._id;
    const title = req.body.title;
    const description = req.body.description;;
    const price = req.body.price;


    const data = {
        _id: _id,
        title: title,
        description: description,
        price: price,
    };

    res.json(await itemService.deleteItem(data));
});

//get existing item
router.post("/getItem", validateAdminToken, async(req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const data = {
        title: title,
        description: description,
        price: price,
    };
    res.json(await itemService.getItem(data))


});
//get all items
router.get("/getAllItems", async(req, res) => {

    res.json(await itemService.getAllItems());
})

//edit existing item
router.post("/editItem", validateAdminToken, async function(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    console.log("here:");
    console.log(req.body);

    const data = {

        title: title,
        description: description,
        price: price,

    };

    res.json(await itemService.editItem(data));
});

module.exports = router;