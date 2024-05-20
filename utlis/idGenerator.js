const IdGenerator = require('../models/IdGeneratorModel');

const generateUniqueIdWithPrefix = async (prefix) => {
    // Atomically find the document for the specified prefix and increment its lastId value
    const result = await IdGenerator.findOneAndUpdate(
        { entityType: prefix },
        { $inc: { lastId: 1 } },
        { new: true, upsert: true } // Use upsert option to create a new document if one doesn't exist
    );

    // Construct the ID using the updated lastId value
    const id = `${prefix}${String(result.lastId).padStart(6, '0')}`; // Adjusted padding to ensure 6 digits
    return id;
};

module.exports = { generateUniqueIdWithPrefix };