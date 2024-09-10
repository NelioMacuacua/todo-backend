import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
const app = fastify()
const db = new PrismaClient()

app.get("/users", async (request, reply) => {
    const users = await db.user.findMany()
    return { users }
})



app.listen(
    {
        host: "0.0.0.0",
        port: 3000
    }
).then(() => console.log("HTTP server running"))