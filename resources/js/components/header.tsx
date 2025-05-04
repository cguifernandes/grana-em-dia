import Profile from "./profile";
import ThemeToggle from "./theme-toggle";

const Header = () => {
	return (
		<header className="p-3 flex-1 h-fit flex items-center justify-between border-b border-border">
			<h1 className="text-foreground text-lg">Dashboard</h1>
			<div className="flex items-center gap-x-4">
				<ThemeToggle />
				<Profile />
			</div>
		</header>
	);
};

export default Header;
