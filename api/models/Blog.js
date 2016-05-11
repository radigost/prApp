/**
 * Blog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'integer'
    },
    title: {
      type: 'string'
    },
    img: {
      type: 'string'
    },
    short_text: {
      type: 'text',
    },
    text: {
      type: 'string'
    },
    createdAt: {
      type: 'date',
    },
    updatedAt:{
      type: 'date',
    },

  }
};

