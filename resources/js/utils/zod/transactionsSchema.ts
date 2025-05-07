import { z } from "zod";

export const transactionsSchema = z.object({
	description: z
		.string()
		.min(1, "Este campo é obrigatório")
		.max(20, "Este campo deve ter no máximo 20 caracteres"),
	amount: z.number().min(0.01, "O valor deve ser maior que zero"),
	date: z.date(),
	category_id: z.number().min(1, "Este campo é obrigatório"),
	type: z.enum(["expense", "income"], {
		required_error: "O tipo é obrigatório",
	}),
});

export type transactionsSchemaType = z.infer<typeof transactionsSchema>;
