const { Router } = require('express');
const { Task } = require('../../db/models');
const { taskSchema, taskSchemaWithDate, reqTaskSchema } = require('../schemas/taskSchema');

const tasksRouter = Router();

tasksRouter.route('/').post(async (req, res) => {
  try {
    const { header, description, status, userId, priority } = reqTaskSchema.parse(req.body);
    const createdTodo = await Task.create({ header, description, status, userId, priority });
    res.status(201).json(taskSchema.parse(createdTodo));
  } catch (error) {
    console.log(error, 'Ошибка добавления новой "Задачи"');
    res.status(500).json({ message: 'Ошибка добавления новой "Задачи"' });
  }
});

tasksRouter.route('/:userId').get(async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.params.userId } });
    res.status(200).json(taskSchemaWithDate.array().parse(tasks));
  } catch (error) {
    console.log(error, 'Ошибка получения всех "Задач"');
    res.status(500).json({ message: 'Ошибка получения всех "Задач"' });
  }
});

tasksRouter
  .route('/:id')
  // .get(async (req, res) => {
  //   try {
  //     if (Number.isNaN(Number(req.params.id))) throw new Error('id is not a number');
  //     const todo = await Todo.findByPk(req.params.id);
  //     res.json(todoSchema.parse(todo));
  //   } catch (error) {
  //     console.log(error, 'Ошибка получения "Задачи"');
  //     res.status(500).json({ message: 'Ошибка получения "Задачи"' });
  //   }
  // })
  .delete(async (req, res) => {
    try {
      if (Number.isNaN(Number(req.params.id))) throw new Error('id is not a number');
      const task = await Task.findByPk(req.params.id);
      await task.destroy();
      res.sendStatus(200);
    } catch (error) {
      console.log(error, 'Ошибка удаления "Задачи"');
      res.status(500).json({ message: 'Ошибка удаления "Задачи"' });
    }
  })
  .patch(async (req, res) => {
    try {
      if (Number.isNaN(Number(req.params.id))) throw new Error('id is not a number');
      const task = await Task.findOne({
        where: { id: req.params.id },
      });
      await task.update(taskSchema.partial().parse(req.body));
      res.json(taskSchema.parse(task));
    } catch (error) {
      console.log(error, 'Ошибка обновления "Задачи"');
      res.status(500).json({ message: 'Ошибка обновления "Задачи"' });
    }
  });

  tasksRouter.route('/:id/taskDone').patch(async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      task.status = true;
      await task.save();
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: '"Задача" не найдена' });
    }
  } catch (error) {
    console.log(error, 'Ошибка завершения "Задачи"');
    res.status(500).json({ message: 'Ошибка завершения "Задачи"' });
  }
});

tasksRouter.route('/:id/taskUndone').patch(async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      task.status = false;
      await task.save();
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: '"Задача" не найдена' });
    }
  } catch (error) {
    console.log(error, 'Ошибка включения "Задачи"');
    res.status(500).json({ message: 'Ошибка включения "Задачи"' });
  }
});

module.exports = tasksRouter;
