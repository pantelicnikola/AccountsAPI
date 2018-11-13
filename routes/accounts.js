var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://pantelic.n:nikolapa94@ds249503.mlab.com:49503/pumadb', ['accounts']);

// GETALL 

router.get('/accounts', function(req, res, next){
    db.accounts.find(function(err, accounts) {
        if (err) {
            res.send(err);
        }
        res.json(accounts);
    })
});

// GET

router.get('/account/:id', function(req, res, next){
    db.accounts.find({_id: mongojs.ObjectId(req.params.id)}, function(err, account) {
        if (err) {
            res.send(err);
        }
        res.json(account);
    })
});

// CREATE

router.post('/account', function(req,res,next){
    var account = req.body;
    
    if (!account.amount) {
        res.status(400);
        res.json({
            "error" : "bad data"
        });
    } else {
        db.accounts.save(account, function(err, account){
            if (err) {
                res.send(err);
            } 
            res.json(account);
        });
    }
});

// UPDATE

router.put('/account/:id', function(req, res, next){

    var account = req.body;
    // var updAccount = {};
    // if (account.amount){
    //     updAccount.amount = account.amount;
    // } 

    db.accounts.update({_id: mongojs.ObjectId(req.params.id)}, account, {}, function(err, account) {
        if (err) {
            res.send(err);
        }
        res.json(account);
    });
});

// DELETE

router.delete('/account/:id', function(req, res, next){
    db.accounts.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, account) {
        if (err) {
            res.send(err);
        }
        res.json(account);
    });
});

module.exports = router;