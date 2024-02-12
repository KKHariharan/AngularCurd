const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema({
    ObjectId: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
        maxlength: 30
    },
    age: {
        type: Number,
        required: true
    },
    desigination: {
        type: String,
        required: true,
        maxlength: 30
    },
    manager_id: {
        type: Schema.Types.ObjectId,
        ref: 'List' ,// Reference to the same collection,

    },
}, {
    versionKey: false // Disable the version key
});

const List = mongoose.model('List', listSchema);

module.exports = List;
