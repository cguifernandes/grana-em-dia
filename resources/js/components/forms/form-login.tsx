import { loginSchema, loginSchemaType } from "@/utils/zod/loginSchema";
import { useForm } from "@inertiajs/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import InputPassword from "../input-password";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const FormLogin = () => {
	const { data, setData, setError, errors, post, processing } =
		useForm<loginSchemaType>({
			email: "",
			password: "",
			rememberMe: false,
		});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const result = loginSchema.safeParse(data);

		if (!result.success) {
			const zodErrors = result.error.format();
			setError({
				email: zodErrors.email?._errors[0] ?? "",
				password: zodErrors.password?._errors[0] ?? "",
				rememberMe: zodErrors.rememberMe?._errors[0] ?? "",
			});
		} else {
			setError({
				email: "",
				password: "",
				rememberMe: "",
			});

			post(route("login.store"));
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="grid w-full items-center gap-4">
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
				<div className="flex items-center gap-x-2">
					<Checkbox
						id="remember"
						checked={data.rememberMe}
						onCheckedChange={(checked) =>
							setData("rememberMe", Boolean(checked))
						}
					/>
					<Label htmlFor="remember">Lembrar-me por 7 dias</Label>
				</div>
				<Button isLoading={processing} type="submit" className="w-full">
					Login
				</Button>
			</div>
		</form>
	);
};

export default FormLogin;
