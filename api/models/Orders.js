/**
 * Orders.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes:{
    id:{
      type:'integer',
      // autoIncrement: true,
      primaryKey:true,
    },

    customername: {
      type: 'string'
    },
    customerphone: {
      type: 'string'
    },
    customeremail: {
      type: 'string'
    },
    needDelivery: {
      type: 'boolean',
      defaultsTo: 'false'
    },
    customeradress: {
      type: 'string'
    },
    delivered: {
      type: 'boolean',
      defaultsTo: 'false'
    },
    // products: {
    //   type: 'json'
    // },
    createdAt: {
      type: 'date'
    },
    products:{
      collection: 'products',
      via: 'product',
      through: 'productorder'
    },
    summ:{
      type:'integer',
    }
    
  }
};

