import z from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "production", "test"]).default("dev"),
    PORT: z.coerce.number().default(3333),
    JWT_SECRET: z.string(),
    DATABASE_URL: z.string().url({
     message: "DATABASE_URL is missing or invalid"
  }),

})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
    console.error("Invalid environments variable", z.treeifyError(_env.error))

    throw new Error("Invalid environments variable")
}

export const env = _env.data