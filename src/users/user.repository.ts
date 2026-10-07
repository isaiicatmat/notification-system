import { User } from './user.entity.ts';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: number, user: User): Promise<User>;
  delete(id: number): Promise<void>;
}