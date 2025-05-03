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

	if (!auth) return;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="h-9 w-9 cursor-pointer">
					<AvatarFallback>{getInitials("Guilherme")}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel className="truncate">
					{auth.user?.email}
				</DropdownMenuLabel>

				<DropdownMenuSeparator />
				<DropdownMenuGroup className="p-1">
					<DropdownMenuItem>
						<User />
						<span>Perfil</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuGroup className="p-1">
					<DropdownMenuItem onClick={() => router.post("/logout")}>
						<span>Sair</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Profile;
