'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SubmitionSchema = new Schema({
    challangeId: { type: Schema.Types.ObjectId, ref: 'Challange' },
    userId: Schema.Types.ObjectId,
    notes: [{ title: String, note: String }],
    submitted: Boolean,
    SubmittedOn: Date
});

module.exports = mongoose.model('Submition', SubmitionSchema);