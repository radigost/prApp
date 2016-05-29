/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    adore: function (req, res) {
        var r =Blog.getFullName()+" I adore pets!";
        res.send(r);
    }
};

