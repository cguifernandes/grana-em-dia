import FormRegister from "@/components/forms/form-register";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Head, Link } from "@inertiajs/react";

const Register = () => {
	return (
		<>
			<Head title="Register" />
			<main className="min-h-screen flex flex-col gap-y-6 items-center justify-center bg-gradient-to-br from-primary/10 to-white p-4">
				<div className="flex flex-col items-center gap-y-1">
					<h1 className="md:text-5xl text-4xl text-primary font-bold text-center">
						Grana Em Dia
					</h1>
					<span className="text-foreground text-sm">
						Controle suas finanças com facilidade
					</span>
				</div>
				<Card className="max-w-xl w-full">
					<CardHeader>
						<CardTitle className="text-xl">Criar conta</CardTitle>
						<CardDescription>
							Preencha seus dados para criar uma nova conta.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<FormRegister />
					</CardContent>
					<CardFooter className="flex flex-col items-start gap-y-2">
						<span className="text-sm">
							Já tem uma conta?{" "}
							<Link
								className="underline text-primary"
								href={{
									method: "get",
									url: "login",
								}}
							>
								Login
							</Link>
						</span>
					</CardFooter>
				</Card>
			</main>
		</>
	);
};

export default Register;
