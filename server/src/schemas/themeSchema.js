const {z} = require('zod');

const themeSchema = z.object({
    theme: z.string(),
});

module.exports = themeSchema;