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

    ffind : function(req,res) {

        var sid=req.signedCookies['sails.sid'];
        var param={session:sid}
        Carts.find(param).then(function (cartArray) {
            console.log(cartArray);
            res.send(cartArray);
        });


    }


};

