import { SidebarInset } from "../ui/sidebar";
import { Head } from "@inertiajs/react";

type AuthLayoutProps = {
	children: React.ReactNode;
	title: string;
};

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
	return (
		<SidebarInset>
			<Head title={title} />
			<main className="min-h-screen flex flex-col gap-y-6 items-center justify-center bg-gradient-to-br from-primary/10 dark:to-neutral-900 to-white p-4">
				<div className="flex flex-col items-center gap-y-1">
					<h1 className="md:text-5xl text-4xl text-primary font-bold text-center">
						Grana Em Dia
					</h1>
					<span className="text-foreground text-sm">
						Controle suas finanças com facilidade
					</span>
				</div>
                {children}
				</main>
		</SidebarInset>
	);
};

export default AuthLayout;
