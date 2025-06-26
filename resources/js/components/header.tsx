import ProfileDropdown from "./profile-dropdown";
import ThemeToggle from "./theme-toggle";
import { SidebarTrigger } from "./ui/sidebar";

type HeaderProps = {
    title: string;
};

const Header = ({ title }: HeaderProps) => {
    return (
        <header
            style={{ maxWidth: "-webkit-fill-available" }}
            className="px-5 fixed h-16 w-full z-50 bg-accent/10 backdrop-blur-md flex items-center justify-between border-b border-border"
        >
            <div className="flex items-center gap-x-4">
                <SidebarTrigger />
                <h1 className="text-foreground text-lg leading-none font-medium">
                    {title}
                </h1>
            </div>
            <div className="flex items-center gap-x-4">
                <ThemeToggle />
                <ProfileDropdown />
            </div>
        </header>
    );
};

export default Header;
