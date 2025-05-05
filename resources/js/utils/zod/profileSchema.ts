import { z } from "zod";

export const profileSchema = z
	.object({
		name: z
			.string({ required_error: "Este campo é obrigatório" })
			.min(1, "Este campo é obrigatório"),

		email: z
			.string({ required_error: "Este campo é obrigatório" })
			.email("E-mail inválido, por favor digite um e-mail válido"),

		currentPassword: z
			.string({ required_error: "Este campo é obrigatório" })
			.min(1, "Este campo é obrigatório"),

		newPassword: z
			.string({ required_error: "Este campo é obrigatório" })
			.min(1, "Este campo é obrigatório")
			.max(8, "A senha deve ter no máximo 8 caracteres"),

		passwordConfirmation: z
			.string({ required_error: "Este campo é obrigatório" })
			.min(1, "Este campo é obrigatório"),
	})
	.refine((data) => data.newPassword === data.passwordConfirmation, {
		message: "As senhas não coincidem",
		path: ["newPassword"],
	})
	.refine((data) => data.newPassword === data.passwordConfirmation, {
		message: "As senhas não coincidem",
		path: ["passwordConfirmation"],
	});

export type profileSchemaType = z.infer<typeof profileSchema>;
