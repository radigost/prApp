/**
 * Sails_session_store.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'string',
      columnName: 'sid',
      primaryKey:true,
    },
    // createdAt: {
    //   type: 'date',
    // },
    // updatedAt:{
    //   type: 'date',
    // },
    // description: {
    //   type: 'string'
    // },
  }
};

