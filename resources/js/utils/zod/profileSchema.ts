import { z } from "zod";

export const profileSchema = z
    .object({
        name: z
            .string({ required_error: "Este campo é obrigatório" })
            .min(1, "Este campo é obrigatório"),

        email: z
            .string({ required_error: "Este campo é obrigatório" })
            .email("E-mail inválido, por favor digite um e-mail válido"),

        currentPassword: z.string().optional(),
        newPassword: z
            .string()
            .max(8, "A senha deve ter no máximo 8 caracteres")
            .optional(),
        passwordConfirmation: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        const anyPassword =
            data.currentPassword ||
            data.newPassword ||
            data.passwordConfirmation;

        if (anyPassword) {
            if (!data.currentPassword) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Este campo é obrigatório",
                    path: ["currentPassword"],
                });
            }
            if (!data.newPassword) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Este campo é obrigatório",
                    path: ["newPassword"],
                });
            }
            if (!data.passwordConfirmation) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Este campo é obrigatório",
                    path: ["passwordConfirmation"],
                });
            }
            if (
                data.newPassword &&
                data.passwordConfirmation &&
                data.newPassword !== data.passwordConfirmation
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "As senhas não coincidem",
                    path: ["newPassword"],
                });
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "As senhas não coincidem",
                    path: ["passwordConfirmation"],
                });
            }
        }
    });

export type profileSchemaType = z.infer<typeof profileSchema>;
