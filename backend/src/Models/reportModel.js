const Mongoose = require('mongoose');

const reportSchema = new Mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    from: {type: String, required: true},
    status: {type: String, required: true, default: 'pending'},
    createdAt: {type: Date, default: Date.now}
});

const reportModel = Mongoose.model('report', reportSchema);
exports.reportModel = reportModel;

