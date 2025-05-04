import Logo from "../../assets/logo.svg";
import { Sidebar, SidebarHeader } from "./ui/sidebar";

const SideBar = () => {
	return (
		<Sidebar>
			<SidebarHeader className="py-4">
				<div className="px-3">
					<div className="flex items-center gap-2">
						<img src={Logo} alt="Logo" className="h-10 w-auto" />

						<div className="flex flex-col">
							<h1 className="text-xl font-bold text-center">Grana Em Dia</h1>
							<span className="text-muted-foreground text-sm">
								Controle financeiro
							</span>
						</div>
					</div>
				</div>
			</SidebarHeader>
		</Sidebar>
	);
};

export default SideBar;
