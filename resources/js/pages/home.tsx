import { Head } from "@inertiajs/react";

const Home = () => {
	return (
		<>
			<Head title="Home" />
			<main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
				<h1 className="text-black">Bem-vindo</h1>
			</main>
		</>
	);
};

export default Home;
