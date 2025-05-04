import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./context/ThemeContext";
import { SidebarProvider } from "./components/ui/sidebar";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
	title: (title) => `${title} - ${appName}`,
	resolve: (name) => {
		return resolvePageComponent(
			`./Pages/${name}.tsx`,
			import.meta.glob("./Pages/**/*.tsx"),
		);
	},
	setup({ el, App, props }) {
		const root = createRoot(el);

		root.render(
			<>
				<Toaster />
				<SidebarProvider>
					<ThemeProvider>
						<App {...props} />
					</ThemeProvider>
				</SidebarProvider>
			</>,
		);
	},
});
