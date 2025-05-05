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
import { Link, router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types/types";

const Profile = () => {
	const { auth } = usePage<PageProps>().props;

	if (!auth || !auth.user) return;

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Avatar className="h-9 w-9 cursor-pointer">
					<AvatarFallback className="border border-primary">
						{getInitials(auth.user.name)}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-64 right-0">
				<DropdownMenuLabel className="truncate">
					<div className="flex gap-x-2 items-center">
						<Avatar className="h-9 w-9">
							<AvatarFallback className="border border-primary">
								{getInitials(auth.user.name)}
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col flex-1 overflow-hidden">
							<h2 className="truncate">{auth.user.name}</h2>
							<span className="text-xs text-muted-foreground truncate">
								{auth.user.email}
							</span>
						</div>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />
				<DropdownMenuGroup className="p-1">
					<DropdownMenuItem asChild>
						<Link href="/profile" className="flex items-center gap-2">
							<User className="text-black dark:text-white" />
							Perfil
						</Link>
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
