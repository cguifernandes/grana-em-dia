import { ChartPie } from "lucide-react";
import { Separator } from "./ui/separator";
import Logo from "../../assets/logo.svg";

const SideBar = () => {
	return (
		<aside className="flex flex-col gap-y-3 p-3 w-60 bg-primary">
			<div className="flex gap-x-2 items-center">
				<img src={Logo} alt="Logo" className="h-10 w-auto" />

				<div className="flex flex-col">
					<h1 className="text-xl text-white font-bold text-center">
						Grana Em Dia
					</h1>
					<span className="text-sidebar-primary-foreground text-sm">
						Controle financeiro
					</span>
				</div>
			</div>
		</aside>
	);
};

export default SideBar;
