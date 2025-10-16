import { Request, Response } from 'express';
import { UserService } from 'core-db-models';

export default class UserController {
  constructor(private userService: UserService) {}

  async getAll(req: Request, res: Response) {
    const data = await this.userService.findAll({});
    return res.json(data);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const found = await this.userService.findById(id);
    if (!found) return res.status(404).json({ message: 'User not found' });
    return res.json(found);
  }

  async create(req: Request, res: Response) {
    const payload = req.body;
    const created = await this.userService.create(payload);
    return res.status(201).json(created);
  }
}
