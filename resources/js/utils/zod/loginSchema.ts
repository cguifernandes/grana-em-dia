import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "Este campo é obrigatório")
		.email("E-mail inválido, por favor digite um e-mail válido"),
	password: z
		.string()
		.min(1, "Este campo é obrigatório")
		.max(8, "A senha deve ter no máximo 8 caracteres"),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
