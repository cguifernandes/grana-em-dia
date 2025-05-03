import React, {
	createContext,
	useContext,
	useLayoutEffect,
	useState,
} from "react";

type Theme = "light" | "dark";

type ThemeProviderProps = {
	children: React.ReactNode;
};

const ThemeContext = createContext<
	| {
			theme: Theme;
			toggleTheme: () => void;
	  }
	| undefined
>(undefined);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const getInitialTheme = (): Theme => {
		if (typeof window === "undefined") return "light";
		const storedTheme = localStorage.getItem("theme") as Theme | null;
		return storedTheme || "light";
	};

	const [theme, setTheme] = useState<Theme>(getInitialTheme);

	useLayoutEffect(() => {
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
	}
	return context;
};
