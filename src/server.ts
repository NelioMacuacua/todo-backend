import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { z } from "zod"
const app = fastify()
const db = new PrismaClient()


app.register(fastifyCors, {
    methods:["GET"],
}
)

app.get("/users", async (request, reply) => {
    const users = await db.user.findMany()
    return { users }
})

app.post("/users", async (request, reply) => {

    const createUserSchema = z.object({
        email: z.string().email(),
        name: z.string()
    })
    const { email, name } = createUserSchema.parse(request.body)
    await db.user.create({
        data: {
            email,
            name
        }
    })
    reply.status(201).send()
})


app.listen(
    {
        host: "0.0.0.0",
        port: 3000
    }
).then(() => console.log("HTTP server running"))