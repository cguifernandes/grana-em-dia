import Header from "@/components/header";
import Dashboard from "@/components/layout/dashboard";
import SideBar from "@/components/side-bar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Head } from "@inertiajs/react";

const Home = () => {
	return (
		<>
			<Head title="Home" />
			<SidebarInset>
				<main className="min-h-screen flex bg-neutral-50 dark:bg-neutral-900">
					<SideBar />
					<div className="flex flex-col items-center flex-1">
						<Header />
						<Dashboard />
					</div>
				</main>
			</SidebarInset>
		</>
	);
};

export default Home;
