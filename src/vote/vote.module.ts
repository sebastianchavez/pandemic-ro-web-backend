import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './services/vote/vote.service';
import { CpanelService } from '../common/services/cpanel/cpanel.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alternative } from './entities/alternative.entity';
import { Question } from './entities/question.entity';
import { Vote } from './entities/vote.entity';
import { User } from 'src/users/entities/User.entity';
import { AuthMiddleware } from 'src/common/middlewares/auth';
import { TokenService } from 'src/common/services/token/token.service';

@Module({
  controllers: [VoteController],
  imports:[
    HttpModule,
    TypeOrmModule.forFeature([
      Alternative,
      Question,
      Vote,
      User
    ])
  ],
  providers: [VoteService, CpanelService, TokenService],
  exports: [CpanelService, TypeOrmModule, TokenService]
})
export class VoteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/api/vote/', method: RequestMethod.PUT },
      )
      .forRoutes('/api/vote/');
  }
}
