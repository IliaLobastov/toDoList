const { z } = require('zod');

const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  themeId: z.number(),
  roleId: z.number(),
});

module.exports = UserSchema;