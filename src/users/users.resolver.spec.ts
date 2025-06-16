import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let usersService: UsersService;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    password: 'password123',
    email: 'john@example.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(() => mockUser),
            findAll: jest.fn(() => [mockUser]),
            findOne: jest.fn((id: number) => (id === 1 ? mockUser : undefined)),
            update: jest.fn(
              (id: number, updateData: UpdateUserInput) => `update ${id}`,
            ),
            remove: jest.fn((id: number) => `delete ${id}`),
          },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    usersService = module.get<UsersService>(
      UsersService,
    ) as jest.Mocked<UsersService>;
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', () => {
      const createUserInput: CreateUserInput = {
        name: 'John Doe',
        username: 'johndoe',
        password: 'password123',
        email: 'john@example.com',
      };

      const result = resolver.createUser(createUserInput);

      expect(result).toEqual(mockUser);
      expect(usersService.create).toHaveBeenCalledWith(createUserInput);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      const result = resolver.findAll();

      expect(result).toEqual([mockUser]);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user if found', () => {
      const result = resolver.findOne(1);

      expect(result).toEqual(mockUser);
      expect(usersService.findOne).toHaveBeenCalledWith(1);
    });

    it('should return undefined if user not found', () => {
      jest.spyOn(usersService, 'findOne').mockReturnValue(undefined);

      const result = resolver.findOne(999);

      expect(result).toBeUndefined();
      expect(usersService.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('updateUser', () => {
    it('should show update message', () => {
      const updateUserInput: UpdateUserInput = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };

      const result = resolver.updateUser(updateUserInput);

      expect(result).toBe('update 1');
      expect(usersService.update).toHaveBeenCalledWith(1, updateUserInput);
    });
  });

  describe('removeUser', () => {
    it('should remove a user', () => {
      const result = resolver.removeUser(1);

      expect(result).toBe('delete 1');
      expect(usersService.remove).toHaveBeenCalledWith(1);
    });
  });
});
