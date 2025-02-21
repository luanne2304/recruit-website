const AuditLog = require('../Models/AuditlogModel');

const logAudit = async (req, action, tableName, recordIds, oldData, newData,reason) => {
    try {
        await AuditLog.create({
            userId: req.user._id,
            action,
            endpoint: req.originalUrl,
            tableName,
            recordIds,
            oldData,
            newData,
            reason
        });
    } catch (error) {
        console.error('Error logging audit:', error);
    }
};

module.exports = logAudit;
