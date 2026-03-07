import { AppModule } from "@/app.module"
import { Test } from '@nestjs/testing'
import type { INestApplication } from "@nestjs/common"
import request from "supertest"
import { PrismaService } from "@/prisma/prisma.service"
import { JwtService } from "@nestjs/jwt"

describe('Create Question (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get<PrismaService>(PrismaService)  
    jwt = moduleRef.get<JwtService>(JwtService)

    await app.init()


  })

  test('[POST] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      }
    })

    const access_token = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        title: 'My Question',
        content: 'This is the content of my question'
      })

    expect(response.statusCode).toBe(201)

    const questionOnDatabase = await prisma.question.findFirst({
      where: {
        title: 'My Question',
      }
    })

    expect(questionOnDatabase).toBeTruthy()

  })
})