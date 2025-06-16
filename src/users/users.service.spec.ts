import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    // Limpa o array de usuários após cada teste
    service['users'] = [];
    service['currentId'] = 1;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', () => {
      const createUserInput: CreateUserInput = {
        name: 'Test User',
        username: 'myTest',
        email: 'foo@bar.com',
        password: 'anyVulnerablePassword',
      };

      const result = service.create(createUserInput);

      expect(result).toEqual({
        id: 1,
        ...createUserInput,
      });
    });

    it('should increment id for each new user', () => {
      const user1 = service.create({
        name: 'User 1',
        username: 'user1',
        password: 'pass1',
        email: 'user1@example.com',
      });

      const user2 = service.create({
        name: 'User 2',
        username: 'user2',
        password: 'pass2',
        email: 'user2@example.com',
      });

      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
    });
  });

  describe('findAll', () => {
    it('should return an empty array when no users exist', () => {
      expect(service.findAll()).toEqual([]);
    });

    it('should return all users', () => {
      const user1 = service.create({
        name: 'User 1',
        username: 'user1',
        password: 'pass1',
        email: 'user1@example.com',
      });

      const user2 = service.create({
        name: 'User 2',
        username: 'user2',
        password: 'pass2',
        email: 'user2@example.com',
      });

      const result = service.findAll();

      expect(result).toHaveLength(2);
      expect(result).toContainEqual(user1);
      expect(result).toContainEqual(user2);
    });
  });

  describe('findOne', () => {
    it('should return undefined when user does not exist', () => {
      expect(service.findOne(999)).toBeUndefined();
    });

    it('should return the correct user', () => {
      const createdUser = service.create({
        name: 'Test User',
        username: 'testuser',
        password: 'testpass',
        email: 'test@example.com',
      });

      const foundUser = service.findOne(createdUser.id);

      expect(foundUser).toEqual(createdUser);
    });
  });

  describe('update', () => {
    it('should return the update message with id', () => {
      const result = service.update(1, {} as UpdateUserInput);
      expect(result).toBe('This action updates a #1 user');
    });
  });

  describe('remove', () => {
    it('should return the remove message with id', () => {
      const result = service.remove(1);
      expect(result).toBe('This action removes a #1 user');
    });
  });
});
