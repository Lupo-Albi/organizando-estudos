import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

describe('UsersService', () => {
  let service: UsersService;
  const createUserInput: CreateUserInput = {
    name: 'Test User',
    username: 'myTest',
    email: 'foo@bar.com',
    password: 'anyVulnerablePassword',
  };

  const updateUserInput: UpdateUserInput = {
    name: 'User Test',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', () => {
      const result = service.create(createUserInput);

      expect(result).toEqual({
        id: 1,
        ...createUserInput,
      });
    });
  });

  describe('findAll', () => {
    it('should get all users', () => {
      const result = service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    beforeEach(() => {
      service.create(createUserInput);
    });

    it('should get a user by their id', () => {
      const result = service.findOne(1);

      expect(result).toEqual({
        id: 1,
        ...createUserInput,
      });
    });

    it("should return undefined if there's no user with the given id", () => {
      const result = service.findOne(2);

      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update a user with a given id', () => {
      const result = service.update(1, updateUserInput);

      expect(result).toBe('This action updates a #1 user');
    });
  });

  describe('remove', () => {
    it('should remova a user with a given id', () => {
      const result = service.remove(1);

      expect(result).toBe('This action removes a #1 user');
    });
  });
});
