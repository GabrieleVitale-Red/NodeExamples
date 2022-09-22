const express = require('express');
const router = express.Router();

const mongoose =require('mongoose');
const TestModel = require('../../models/testModel');

//Test for mongo connetion
router.get('/mongoConnetionTest', (req, res, next)=> {
    tmp = mongoose.connection.readyState=="1" ? "Mongo connection ok!" : "Mongo Connection failure";
    res.status(200).json({
        message: tmp
    });
});


//Insert element inside mongo DB collection
router.post('/insertElement',(req, res, next) =>{

    const inputTestMoodel = new TestModel({
        _id: mongoose.Types.ObjectId(),
        testName: req.body.testName,
        testValue:  req.body.testValue
    });

    inputTestMoodel.save().then(result =>{
        console.log(result);
        res.status(200).json({
            message: "Element added to collection",
            incomingReq: inputTestMoodel
        });
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            message: "Error, cannot add element to mongo DB collection",
            error: err
        });
    });

});

router.get('/getElementByID/:idElem',(req, res, next) =>{

    console.log("Mongo collection, getting element by ID.");

    TestModel.findById(req.params.idElem).exec().then(doc =>{
        console.log("Here it is the document retrieved");
        if(doc){
            res.status(200).json({
                message: "Retrieve executed",
                document: doc
            });
        }else{
            res.status(404).json({
                message: "Cannot find the element with the id"+req.params.idElem,
                error: 404
            })
        }
    }).catch(err =>{
        console.log("Error catched: "+err);
        res.status(500).json({
            error: err
        })
    });

});

router.get('/findAllElements',(req, res, next) =>{

    console.log("Mongo collection, getting all elements");

    TestModel.find().exec().then(doc =>{
        console.log("Here it is the document retrieved");
        if(doc){
            res.status(200).json({
                message: "Retrieve executed, numeber of elements is:"+doc.length,
                document: doc
            });
        }else{
            res.status(404).json({
                message: "Cannot find any element ",
                error: 404
            })
        }
    }).catch(err =>{
        console.log("Error catched: "+err);
        res.status(500).json({
            error: err
        })
    });

});

router.delete('/deleteElementByID/:idElem',(req, res, next) =>{

    console.log("Mongo collection, deleting element by ID");

    TestModel.remove({_id: req.params.idElem}).exec().then(result =>{
        if(result){
            res.status(200).json({
                message: "Delete executed!",
                document: result
            });
        }else{
            res.status(404).json({
                message: "Cannot find the element with the id"+req.params.idElem,
                error: 404
            })
        }
    }).catch(err =>{
        console.log("Error catched: "+err);
        res.status(500).json({
            error: err
        })
    });

});

module.exports = router;