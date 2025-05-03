import Header from "@/components/header";
import { Head } from "@inertiajs/react";

const Home = () => {
	return (
		<>
			<Head title="Home" />
			<main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
				<Header />
			</main>
		</>
	);
};

export default Home;
