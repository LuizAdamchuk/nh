import { Test, TestingModule } from "@nestjs/testing";
import { UserRecoverPasswordController } from "./user-recover-password.controller";
import { UserRecoverPasswordService } from "./user-recover-password.service";

describe("UserRecoverPasswordController", () => {
  let controller: UserRecoverPasswordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRecoverPasswordController],
      providers: [UserRecoverPasswordService],
    }).compile();

    controller = module.get<UserRecoverPasswordController>(
      UserRecoverPasswordController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
