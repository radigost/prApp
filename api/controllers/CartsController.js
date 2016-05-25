/**
 * CartsController
 *
 * @description :: Server-side logic for managing carts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    //
    // find: function (req,res) {
    //     // Carts.find();
    //     console.log( req.session);
    // }

    find : function(req,res) {

        var sid=req.signedCookies['sails.sid'];
        var param={session:sid}
        Carts.find(param)
            .populate('product')
            .then(function (cartArray) {
                res.send(cartArray);
            // ret = []
            // _.forEach(cartArray,function (element) {
            //     ret.push(element.id);
            // })
            // Products.find({id:ret}).then(function (myProducts) {
            //     res.send(myProducts);
            // })
            // console.log(cartArray);

        });


    }


};

