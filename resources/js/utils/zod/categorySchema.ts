import { z } from "zod";
import { categoryIcons } from "../functions";
import { CategoryColors } from "../enums";

export const categorySchema = z.object({
	name: z
		.string()
		.min(1, "Este campo é obrigatório")
		.max(20, "Este campo deve ter no máximo 20 caracteres"),
	icon: z.enum(
		categoryIcons.map((icon) => icon.value) as [string, ...string[]],
		{
			errorMap: () => ({ message: "Ícone inválido" }),
		},
	),
	color: z.enum(Object.values(CategoryColors) as [string, ...string[]], {
		errorMap: () => ({ message: "Cor inválida" }),
	}),
});

export type categorySchemaType = z.infer<typeof categorySchema>;
