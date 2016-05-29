/**
 * Carts.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id:{
      type:'integer',
      // primaryKey:true,
      // autoIncrement: true,
    },
    session: {
      model:'sails_session_store',
      columnName:'session_id',
      type:'string',
    },
    product: {
      model:'products',
      columnName: 'product_id',
      // type:'integer',
    },
    createdAt: {
      type: 'date',
    },
    updatedAt:{
      type: 'date',
    },
    amount:{
      type:'integer',
    },
    // find_session: function (req,res) {
    //     console.log req.session;
    //
    // },


  }
};

