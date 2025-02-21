const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    action: { type: String, enum: ['CREATE', 'UPDATE', 'DELETE'], required: true },
    endpoint: { type: String, required: true },
    tableName: { type: String, required: true },
    recordIds: [{ type: mongoose.Schema.Types.ObjectId }], 
    oldData: Object,
    newData: Object,
    reason: { type: String},
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLogs', AuditLogSchema);