import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Action = {
	label: string;
	onClick: () => void;
	className?: string;
	icon?: React.ReactNode;
};

type ActionsCellProps = {
	actions: Action[];
};

const ActionsCell = ({ actions }: ActionsCellProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm">
					<Ellipsis size={16} />
					<span className="sr-only">Abrir menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Ações</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className="p-1">
					{actions.map((action, index) => (
						<DropdownMenuItem
							key={index}
							onClick={action.onClick}
							className={cn("flex items-center gap-x-2", action.className)}
						>
							{action.icon}
							{action.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ActionsCell;
