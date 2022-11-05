import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data:{
      name: 'John Doe',
      email: 'jdoe@gmail.com',
      avatarUrl: 'http://github.com/Italovini223.png',
    }
  });

  const pool = await prisma.pool.create({
    data: {
      title: 'Example pool',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
         userId: user.id
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-20T12:38:14.699Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-25T10:00:00.699Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }

    }
  })

}

main();