import FormRegister from "@/components/forms/form-register";
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

const Register = () => {
	const { flash } = usePage<PageProps>().props;

	useEffect(() => {
		if (flash.success) {
			toast.success(flash.success);
		} else if (flash.error) {
			toast.error(flash.error);
		}
	}, [flash]);

	return (
		<AuthLayout title="Register">
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
		</AuthLayout>
	);
};

export default Register;
