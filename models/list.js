/**
 * Data Model for Lists. The only metadata a List has is a title.
 * @author seropian@mit.edu
 */

var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }
});

var List = mongoose.model('List', listSchema);

module.exports.List = List;

