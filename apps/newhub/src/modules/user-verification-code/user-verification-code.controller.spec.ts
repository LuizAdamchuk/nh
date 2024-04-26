import { Test, TestingModule } from '@nestjs/testing';
import { UserVerificationCodeController } from './user-verification-code.controller';
import { UserVerificationCodeService } from './user-verification-code.service';

describe('UserVerificationCodeController', () => {
  let controller: UserVerificationCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserVerificationCodeController],
      providers: [UserVerificationCodeService],
    }).compile();

    controller = module.get<UserVerificationCodeController>(UserVerificationCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
