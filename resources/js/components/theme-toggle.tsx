import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			className="hover:bg-accent/70 transition-colors size-8 cursor-pointer rounded-md flex justify-center items-center"
			type="button"
			onClick={toggleTheme}
		>
			{theme === "dark" ? (
				<Moon strokeWidth={1.5} size={18} />
			) : (
				<Sun strokeWidth={1.5} size={18} />
			)}
		</button>
	);
};

export default ThemeToggle;
