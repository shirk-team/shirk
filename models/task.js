/**
 * Data Model for Tasks. A Task must have a title, an owning list, a
 * completion status, and a priority. Completion status defaults to false
 * and priority defaults to medium. A Task may optionally have notes and/or
 * a deadline.
 * @author seropian@mit.edu
 */
var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    list: {
        type: mongoose.Schema.ObjectId,
        ref: 'List',
        required: true
    },
    
    completed: {
        type: Boolean,
        default: false
    },

    priority: {
        type: Number,
        validate: [priorityValidator, 'Priority must be +/- 1 or 0.'],
        default: 0
    },

    notes: String,

    deadline: Date
});

/**
 * Determines if a priority is valid. Priorities must be +/- 1 or 0.
 * @param  {Number} priority The priority to check.
 * @return {Boolean} Whether the priority is valid.
 */
function priorityValidator(priority) {
    return priority === -1 || priority === 0 || priority === 1;
}

var Task = mongoose.model('Task', taskSchema);

module.exports.Task = Task;
