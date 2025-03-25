const { z } = require('zod');

const roleSchema = z.object({
    rolename: z.string(),
});

module.exports = roleSchema;