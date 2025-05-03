import FormLogin from "@/components/forms/form-login";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PageProps } from "@/types/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

const Login = () => {
	const { flash } = usePage<PageProps>().props;

	useEffect(() => {
		if (flash.success) {
			toast.success(flash.success);
		} else if (flash.error) {
			toast.error(flash.error);
		}
	}, [flash]);

	return (
		<>
			<Head title="Login" />
			<main className="min-h-screen flex flex-col gap-y-6 items-center justify-center bg-gradient-to-br from-primary/10 to-white p-4">
				<div className="flex flex-col items-center gap-y-1">
					<h1 className="md:text-5xl text-3xl sm:text-4xl text-primary font-bold text-center">
						Grana Em Dia
					</h1>
					<span className="text-foreground text-sm">
						Controle suas finanças com facilidade
					</span>
				</div>
				<Card className="max-w-xl w-full">
					<CardHeader>
						<CardTitle className="text-xl">Login</CardTitle>
						<CardDescription>
							Entre com suas credenciais para acessar sua conta.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<FormLogin />
					</CardContent>
					<CardFooter className="flex flex-col items-start gap-y-2">
						<span className="text-sm">
							Ainda não tem uma conta?{" "}
							<Link
								className="underline text-primary"
								href={{
									method: "get",
									url: "register",
								}}
							>
								Crie uma conta
							</Link>
						</span>
					</CardFooter>
				</Card>
			</main>
		</>
	);
};

export default Login;
