import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { getInitials } from "@/utils/functions";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types/types";

const Profile = () => {
	const { auth } = usePage<PageProps>().props;

	if (!auth || !auth.user) return;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="h-9 w-9 cursor-pointer">
					<AvatarFallback>{getInitials("Guilherme")}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-64 right-0">
				<DropdownMenuLabel className="truncate">
					<div className="flex gap-x-2 items-center">
						<Avatar className="h-10 w-10">
							<AvatarFallback>{getInitials("Guilherme")}</AvatarFallback>
						</Avatar>
						<div className="flex flex-col flex-1 overflow-hidden">
							<h2 className="truncate">{auth.user.name}</h2>
							<span className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
								{auth.user.email}
							</span>
						</div>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />
				<DropdownMenuGroup className="p-1">
					<DropdownMenuItem>
						<User className="dark:text-white text-black" />
						<span>Perfil</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuGroup className="p-1">
					<DropdownMenuItem onClick={() => router.post("/logout")}>
						<span className="text-center w-full">Sair</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Profile;
