/**
 * CartsController
 *
 * @description :: Server-side logic for managing carts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// require('lodash');


module.exports = {
    find : function(req,res) {
        var sid=req.signedCookies['sails.sid'];
        var param={session:sid}
        Carts.find(param)
            .populate('product')
            .then(function (cartArray) {
                res.send(cartArray);
        });
    },
    postProduct:function (req,res) {
        var product =req.body;
        product.session_id = req.signedCookies['sails.sid'];
        var search={product_id:product.product_id,session_id:product.session_id};
        console.log(product,search);
        Carts.findOne(search).then(function cb(result,error) {
            console.log ("Result",result,"Error:",error);
            if (result) res.send({result:"exist"});
            else Carts.create(product).then(function(success){
                res.send({result:"saved"});
            })
        });
    },
    putProduct:function (req,res) {
        var product = req.body;
        // if (product.amount<0) {
        //     product.amount = 0;
        //     console.log(product);
        // }
        console.log(product);
        Carts.update({id:product.id,},{amount:product.amount}).then(function (success,error) {
            console.log(success,error);
        })
    }

};

