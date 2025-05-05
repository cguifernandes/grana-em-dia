import { getInitials } from "@/utils/functions";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { UserType } from "@/types/types";
import { CalendarIcon, Mail } from "lucide-react";

type ProfileInformationProps = {
	user: UserType;
};

const ProfileInformation = ({ user }: ProfileInformationProps) => {
	return (
		<div className="flex gap-x-4 items-center">
			<Avatar className="h-14 w-14">
				<AvatarFallback className="border text-lg border-primary">
					{getInitials(user.name)}
				</AvatarFallback>
			</Avatar>
			<div className="flex flex-col flex-1 overflow-hidden">
				<h2 className="truncate text-lg">{user.name}</h2>
				<div className="flex flex-col gap-y-1">
					<div className="flex items-center gap-x-2">
						<Mail className="text-muted-foreground" size={16} />
						<span className="text-muted-foreground text-sm truncate">
							{user.email}
						</span>
					</div>
					<div className="flex items-center gap-x-2">
						<CalendarIcon className="text-muted-foreground" size={14} />
						<time
							className="text-muted-foreground text-xs"
							dateTime={user.created_at}
						>
							{new Date(user.created_at).toLocaleDateString("pt-BR", {
								day: "2-digit",
								month: "long",
								year: "numeric",
							})}
						</time>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileInformation;
