/**
 * Tags.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    normalname: {
      type: 'string'
    },
    showinmagaz: {
      type: 'boolean'
    },
    products:{
      collection: 'products',
      via: 'product',
      through: 'producttags'
    }

  }
};

