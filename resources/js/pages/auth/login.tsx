import FormLogin from "@/components/forms/form-login";
import AuthLayout from "@/components/layout/auth.layout";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SidebarInset } from "@/components/ui/sidebar";
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
		<AuthLayout title="Login">
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
		</AuthLayout>
	);
};

export default Login;
