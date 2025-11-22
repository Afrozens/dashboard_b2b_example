import { z } from 'zod';

const schema = z.object({
    name: z.string()
    .min(3, "Name must be at least 3 characters long")
    .describe("Name (validation: minimum 3 characters)"),
    
    email: z.email("Must be a valid email")
    .refine(email => email.endsWith('@empresa.com'), {
      message: "Email must have @empresa.com domain"
    })
    .describe("Corporate email (validation: email format + @empresa.com domain)"),
});

type Schema = z.infer<typeof schema>;

export { type Schema, schema };