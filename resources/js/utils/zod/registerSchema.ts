import { z } from "zod";

export const registerSchema = z
	.object({
		email: z
			.string()
			.min(1, "Este campo é obrigatório")
			.email("E-mail inválido, por favor digite um e-mail válido"),
		name: z.string().min(1, "Este campo é obrigatório"),
		password: z
			.string()
			.min(1, "Este campo é obrigatório")
			.max(8, "A senha deve ter no máximo 8 caracteres"),
		passwordConfirmation: z.string().min(1, "Este campo é obrigatório"),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "As senhas não coincidem",
		path: ["passwordConfirmation"],
	});

export type registerSchemaType = z.infer<typeof registerSchema>;
