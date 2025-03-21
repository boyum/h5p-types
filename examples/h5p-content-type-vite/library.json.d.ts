export const $schema : "https://h5p-json-schemas.vercel.app/library.schema.json";
export const title : "Content Type Vite";
export const machineName : "H5P.ContentTypeVite";
export const majorVersion : 1;
export const minorVersion : 0;
export const patchVersion : 0;
export const runnable : 1;
export const license : "MIT";
export const author : "";
export const embedTypes : [
	"iframe"
];
export const preloadedDependencies : [
	{
		machineName: "H5P.JoubelUI",
		majorVersion: 1,
		minorVersion: 3
	}
];
export const preloadedJs : [
	{
		path: "dist/h5p-content-type-vite.js"
	}
];
declare const $defaultExport: {
	$schema: typeof $schema,
	title: typeof title,
	machineName: typeof machineName,
	majorVersion: typeof majorVersion,
	minorVersion: typeof minorVersion,
	patchVersion: typeof patchVersion,
	runnable: typeof runnable,
	license: typeof license,
	author: typeof author,
	embedTypes: typeof embedTypes,
	preloadedDependencies: typeof preloadedDependencies,
	preloadedJs: typeof preloadedJs
};

export default $defaultExport;