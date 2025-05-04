import Header from "@/components/header";
import SideBar from "@/components/side-bar";
import { Head } from "@inertiajs/react";

const Home = () => {
	return (
		<>
			<Head title="Home" />
			<main className="min-h-screen flex bg-neutral-50 dark:bg-neutral-900">
				<SideBar />
				<Header />
			</main>
		</>
	);
};

export default Home;
