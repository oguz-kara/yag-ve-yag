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
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
