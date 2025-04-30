interface ImportMeta {
	glob: (path: string) => Record<string, () => Promise<any>>;
}

declare const importMeta: ImportMeta;
