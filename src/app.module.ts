import { DbModule } from './@core/database/db.module'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    DbModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      driver: ApolloDriver,
      formatError: (error) => {
        const originalError = error.extensions?.originalError as Error

        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code,
          }
        }
        return {
          message: originalError.message,
          code: error.extensions?.code,
        }
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
