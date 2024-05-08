import { Test, TestingModule } from "@nestjs/testing";
import { UserRecoverPasswordService } from "./user-recover-password.service";

describe("UserRecoverPasswordService", () => {
  let service: UserRecoverPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRecoverPasswordService],
    }).compile();

    service = module.get<UserRecoverPasswordService>(
      UserRecoverPasswordService
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
