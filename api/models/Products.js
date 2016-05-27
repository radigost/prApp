/**
 * Products.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    popular: {
      type: 'boolean'
    },
    description: {
      type: 'string'
    },
    gros_description: {
      type: 'string'
    },
    price: {
      type: 'integer'
    },
    img: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    tags: {
      collection:'tags',
      via:'tag',
      through: 'producttags'
    },

  },
  getTagsForProduct: function (id){
    var p;
    Products.find()
        .where({ id:id})
        .exec(function(err, products) {
          // console.log(products);
          p = products;
          // req.send(products);
          // return products;

        });
    // console.log(p);
    return p;

  },
};

