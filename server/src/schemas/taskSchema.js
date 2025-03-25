const { z } = require('zod');

const taskSchema = z.object({
  header: z.string(),
  description: z.string(),
  priority: z.number(),
  status: z.string(),
  userId: z.number(),
});

const taskSchemaWithDate = z.object({
    header: z.string(),
    description: z.string(),
    priority: z.number(),
    status: z.string(),
    userId: z.number(),
    updatedAt: z.date(),
  });

const reqTaskSchema = taskSchema.omit({id: true});

module.exports = { taskSchema, taskSchemaWithDate, reqTaskSchema };
