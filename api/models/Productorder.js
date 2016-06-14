/**
 * ProductOrder.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'products_rel_order',
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      // primaryKey: true,
      // autoIncrement: true,
      // columnName: 'the_primary_key'
    },
    product :{
      model:'products',
      columnName: 'product_id',
    },
    order:{
      model:'orders',
      columnName: 'order_id',
    },
  }
};

