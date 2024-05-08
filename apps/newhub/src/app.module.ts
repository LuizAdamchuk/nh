import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { UserModule } from "./modules/user/user.module";
import { HealthModule } from "./health/health.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SecretsManagerModule } from "./providers/secrets/secretsManager.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { OrganizationModule } from "./modules/organization/organization.module";
import { WorkspaceModule } from "./modules/workspace/workspace.module";
import { QlikIntegrationModule } from "./modules/qlik-integration/qlik-integration.module";
import { UserConfigModule } from "./modules/user-config/user-config.module";
import { UserVerificationCodeModule } from "./modules/user-verification-code/user-verification-code.module";
import { OrganizationsWorkspaceModule } from "./modules/organizations-workspace/organizations-workspace.module";
import { UsersWorkspaceModule } from "./modules/users-workspace/users-workspace.module";
import { QlikWorkspaceModule } from "./modules/qlik-workspace/qlik-workspace.module";
import { EmailServerModule } from "./email-server/email-server.module";
import { UserRecoverPasswordModule } from "./modules/user-recover-password/user-recover-password.module";

const { MAILER, MAILER_PASSWORD } = process.env;

@Module({
  controllers: [],
  imports: [
    ACLModule,
    AuthModule,
    UserModule,
    OrganizationModule,
    WorkspaceModule,
    QlikIntegrationModule,
    UserConfigModule,
    UserVerificationCodeModule,
    UserRecoverPasswordModule,
    OrganizationsWorkspaceModule,
    UsersWorkspaceModule,
    QlikWorkspaceModule,
    HealthModule,
    PrismaModule,
    SecretsManagerModule,
    MailerModule.forRoot({
      transport: {
        host: "smtp.mailgun.org", // Host SMTP do seu provedor
        secure: false, // Regras de segurança do serviço SMTP
        port: 587, // Porta
        auth: {
          // Dados do usuário e senha
          user: `${MAILER}`,
          pass: `${MAILER_PASSWORD}`,
        },
        ignoreTLS: true,
      },
      defaults: {
        // Configurações que podem ser padrões
        from: '"',
      },
    }),
    EmailServerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: "schema.graphql",
          sortSchema: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
})
export class AppModule {}
