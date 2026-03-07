import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { CurrentUser } from "@/auth/current-user-decorator";
import { UserPayload } from "@/auth/jwt.strategy";
import { z } from 'zod'
import { ZodValidationPipe } from "@/pipes/zod-validation-pipe";
import { PrismaService } from "@/prisma/prisma.service";

const createQuestionBodySchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(
    private prisma: PrismaService
  ) {}

  @Post()
    async handle(
      @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
      @CurrentUser() user: UserPayload
    ) {
      const { title, content } = body
      const { sub: userId } = user
      const slug = this.slugify(title)

      await this.prisma.question.create({
        data: {
          title,
          content,
          authorId: userId,
          slug
        }
      }) 
  }

  private slugify(text: string) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') 
      .replace(/[^\w\-]+/g, '') 
      .replace(/\-\-+/g, '-')
  }

}