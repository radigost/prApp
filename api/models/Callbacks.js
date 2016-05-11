/**
 * Callbacks.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    message: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    from_method: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    
    createdAt: {
      type: 'date'
    },
    id: {
      type: 'integer'
    },

  }
};

