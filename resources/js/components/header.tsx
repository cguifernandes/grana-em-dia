import ProfileDropdown from "./profile-dropdown";
import ThemeToggle from "./theme-toggle";

type HeaderProps = {
	title: string;
};

const Header = ({ title }: HeaderProps) => {
	return (
		<header className="px-5 fixed h-16 w-[calc(100%_-_256px)] z-50 bg-accent/10 backdrop-blur-md flex items-center justify-between border-b border-border">
			<h1 className="text-foreground text-lg leading-none font-medium">
				{title}
			</h1>
			<div className="flex items-center gap-x-4">
				<ThemeToggle />
				<ProfileDropdown />
			</div>
		</header>
	);
};

export default Header;
