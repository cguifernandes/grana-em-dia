import { AxiosInstance } from "axios";
import { route as ziggyRoute } from "ziggy-js";

interface ImportMeta {
	glob: (path: string) => Record<string, () => Promise<any>>;
}

declare global {
	interface Window {
		axios: AxiosInstance;
	}

	var route: typeof ziggyRoute;
}

declare const importMeta: ImportMeta;
