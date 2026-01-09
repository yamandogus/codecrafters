import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { PrismaModule } from "./prisma/prisma.module"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { PostsModule } from "./posts/posts.module"
import { ForumsModule } from "./forums/forums.module"
import { CommentsModule } from "./comments/comments.module"
import { JobsModule } from "./jobs/jobs.module"
import { EventsModule } from "./events/events.module"
import { ProjectsModule } from "./projects/projects.module"
import { LearningModule } from "./learning/learning.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    PostsModule,
    ForumsModule,
    CommentsModule,
    JobsModule,
    EventsModule,
    ProjectsModule,
    LearningModule,
  ],
})
export class AppModule {}
