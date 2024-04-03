import { User, Task } from '../../database/models';

export default class TaskServices {
  async createTask(data) {
    return await Task.create(data);
  }

  async getTasks(offset, filter, limit) {
    const tasks = await Task.findAndCountAll({
      offset: offset || 0,
      limit: limit || null,
      order: filter && [[filter, 'DESC']] || [['createdAt', 'DESC']],
      include: {
        model: User,
        as: 'user',
        attributes: ['first_name', 'last_name', 'email']
      }
    });
    return tasks;
  }

  async updateTask(data, id) {
    const updated = await Task.update(data, {
      where: { id },
      returning: true,
      raw: true
    });
    return updated
  }

  async destroyTask(where) {
    const destroyed = await Task.destroy({
      where: {
        id: where
      }
    });
    return destroyed;
  }
}
