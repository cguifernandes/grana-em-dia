import Profile from "./profile";
import ThemeToggle from "./theme-toggle";

const Header = () => {
	return (
		<header className="p-3 fixed h-16 w-[calc(100%_-_256px)] z-50 bg-accent/10 backdrop-blur-md flex items-center justify-between border-b border-border">
			<h1 className="text-foreground text-lg">Dashboard</h1>
			<div className="flex items-center gap-x-4">
				<ThemeToggle />
				<Profile />
			</div>
		</header>
	);
};

export default Header;
