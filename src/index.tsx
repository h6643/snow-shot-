import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Polyfill for File System Access API to prevent browser-fs-access errors
if (typeof window !== "undefined") {
	// @ts-expect-error
	if (!window.showOpenFilePicker) {
		// @ts-expect-error
		window.showOpenFilePicker = async () => {
			throw new Error(
				"File System Access API is not supported in this environment",
			);
		};
	}
	// @ts-expect-error
	if (!window.showSaveFilePicker) {
		// @ts-expect-error
		window.showSaveFilePicker = async () => {
			throw new Error(
				"File System Access API is not supported in this environment",
			);
		};
	}
}

const rootEl = document.getElementById("root");

if (rootEl) {
	const root = ReactDOM.createRoot(rootEl);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
}
