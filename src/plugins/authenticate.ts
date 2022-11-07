import { FastifyRequest } from "fastify";

export async function authenticated(request: FastifyRequest){
  await request.jwtVerify()
}