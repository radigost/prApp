/**
 * ProductsController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    withtags: function (req, res) {
        console.log(req.path);
        console.log(req.query.id);
       // Products.getTagsForProduct(2);
        Products.find()
            .where({ id:req.query.id})
            .exec(function(err, products) {
                console.log(products);
                // p = products;
                res.send(products);
                // return products;


            });


    }
};

