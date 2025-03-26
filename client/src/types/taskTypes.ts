import { z } from 'zod';

export const taskSchema = z.object({
  id: z.number().int().positive(),
  header: z.string().min(3, 'Минимальная длина 3 символа'),
  description: z.string(),
  priority: z.number().int().positive(),
  status: z.boolean(),
  userId: z.number().int().positive(),
  updatedAt: z.string(),
});

export const tasksListSchema = z.array(taskSchema);
export const reqBodyTaskSchema = taskSchema.omit({ updatedAt: true, status: true, id: true });
export type TaskType = z.infer<typeof taskSchema>;
export type TaskFormType = z.infer<typeof reqBodyTaskSchema>;
