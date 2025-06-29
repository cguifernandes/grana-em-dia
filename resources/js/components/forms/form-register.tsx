import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, registerSchemaType } from "@/utils/zod/registerSchema";
import { router, useForm } from "@inertiajs/react";
import InputPassword from "../input-password";
import { Button } from "../ui/button";

const FormRegister = () => {
	const { data, setData, setError, errors, post, processing } =
		useForm<registerSchemaType>({
			name: "",
			email: "",
			password: "",
			passwordConfirmation: "",
		});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const result = registerSchema.safeParse(data);

		if (!result.success) {
			const zodErrors = result.error.format();
			setError({
				name: zodErrors.name?._errors[0] ?? "",
				email: zodErrors.email?._errors[0] ?? "",
				password: zodErrors.password?._errors[0] ?? "",
				passwordConfirmation: zodErrors.passwordConfirmation?._errors[0] ?? "",
			});
		} else {
			setError({
				name: "",
				email: "",
				password: "",
				passwordConfirmation: "",
			});

			post(route("register.store"), {
				onSuccess: () => {
					router.visit('/login')
				}
			});
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="grid w-full items-center gap-4">
				<div className="flex flex-col gap-y-2">
					<Label htmlFor="name">Nome</Label>
					<Input
						value={data.name}
						onChange={(e) => setData("name", e.target.value)}
						id="name"
						placeholder="Informe seu nome completo"
						aria-invalid={!!errors.name}
					/>
					{errors.name && errors.name !== "" && (
						<p className="text-xs text-destructive">{errors.name}</p>
					)}
				</div>
				<div className="flex flex-col gap-y-2">
					<Label htmlFor="email">E-mail</Label>
					<Input
						value={data.email}
						onChange={(e) => setData("email", e.target.value)}
						id="email"
						placeholder="example@example.com"
						aria-invalid={!!errors.email}
					/>
					{errors.email && errors.email !== "" && (
						<p className="text-xs text-destructive">{errors.email}</p>
					)}
				</div>
				<div className="flex flex-col gap-y-2">
					<Label htmlFor="password">Senha</Label>
					<InputPassword
						value={data.password}
						onChange={(e) => setData("password", e.target.value)}
						id="password"
						placeholder="******"
						aria-invalid={!!errors.password}
						maxLength={8}
					/>
					{errors.password && errors.password !== "" && (
						<p className="text-xs text-destructive">{errors.password}</p>
					)}
				</div>
				<div className="flex flex-col gap-y-2">
					<Label htmlFor="passwordConfirmation">Confirmar Senha</Label>
					<InputPassword
						value={data.passwordConfirmation}
						onChange={(e) => setData("passwordConfirmation", e.target.value)}
						type="password"
						id="passwordConfirmation"
						placeholder="******"
						aria-invalid={!!errors.passwordConfirmation}
						maxLength={8}
					/>
					{errors.passwordConfirmation && (
						<p className="text-xs text-destructive">
							{errors.passwordConfirmation}
						</p>
					)}
				</div>
				<Button isLoading={processing} type="submit" className="w-full">
					Criar conta
				</Button>
			</div>
		</form>
	);
};

export default FormRegister;
