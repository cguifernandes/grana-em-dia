import { SidebarInset } from "../ui/sidebar";
import SideBar from "./side-bar";
import Header from "../header";

type DashboardLayoutProps = {
	children: React.ReactNode;
	title: string;
};

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
	return (
		<SidebarInset>
			<div className="min-h-screen flex bg-neutral-50 dark:bg-neutral-900">
				<SideBar />
				<div className="flex flex-col items-center flex-1">
					<Header title={title} />
					<div className="w-full bg-neutral-50 max-w-7xl pt-20 p-5 dark:bg-neutral-900">
						{children}
					</div>
				</div>
			</div>
		</SidebarInset>
	);
};

export default DashboardLayout;
