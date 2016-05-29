/**
 * OrdersController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    createOrder: function (req,res) {

        var products = req.body.products;
        var order=_.omit(req.body,'products');
        console.log(order);
        Orders.create(order).then(function (suc) {
            // console.log(suc);
            _.forEach(products,function (product) {
                var productToAdd={};
                productToAdd.order_id=suc.id;
                productToAdd.product_id=product.product.id;
                productToAdd.amount=product.amount;
                // console.log ("Product To ADD",productToAdd);
            });
            // console.log(products);
        });
}
};

