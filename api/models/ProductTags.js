/**
 * ProductTags.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'product_rel_tags',
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      // columnName: 'the_primary_key'
    },
    product :{
      model:'products',
      columnName: 'product_id',
    },
    tag:{
      model:'tags',
      columnName: 'tag_id',
    },

  }
};

