import FormProfile from "@/components/forms/form-profile";
import DashboardLayout from "@/components/layout/dashboard-layout";
import ProfileInformation from "@/components/profile-information";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PageProps } from "@/types/types";
import { Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

const Profile = () => {
	const { auth, flash } = usePage<PageProps>().props;

	useEffect(() => {
		if (flash.success) {
			toast.success(flash.success);
		} else if (flash.error) {
			toast.error(flash.error);
		}
	}, [flash]);

	if (!auth || !auth.user) return;

	return (
		<>
			<Head title="Perfil" />
			<DashboardLayout title="Perfil">
				<div className="h-full flex flex-col gap-y-4">
					<h1 className="text-xl">Perfil</h1>

					<Card className="gap-6 p-4">
						<CardHeader className="px-0">
							<CardTitle>Informações</CardTitle>
							<CardDescription>
								Visualize e edite suas informações básicas
							</CardDescription>
						</CardHeader>

						<CardContent className="px-0 flex flex-col gap-y-4">
							<ProfileInformation user={auth.user} />

							<FormProfile defaultValues={auth.user} />
						</CardContent>
					</Card>
				</div>
			</DashboardLayout>
		</>
	);
};

export default Profile;
