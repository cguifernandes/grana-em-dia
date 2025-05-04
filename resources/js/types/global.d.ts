import { AxiosInstance } from "axios";
import { route as ziggyRoute } from "ziggy-js";
import * as React from "react";

interface ImportMeta {
	glob: (path: string) => Record<string, () => Promise<any>>;
}

declare global {
	interface Window {
		axios: AxiosInstance;
	}

	var route: typeof ziggyRoute;
}

declare module "*.svg" {
	import React = require("react");
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}

declare const importMeta: ImportMeta;
