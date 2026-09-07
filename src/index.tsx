import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Polyfill for File System Access API to prevent browser-fs-access errors
if (typeof window !== "undefined") {
	if (!window.showOpenFilePicker) {
		window.showOpenFilePicker = async () => {
			throw new Error(
				"File System Access API is not supported in this environment",
			);
		};
	}
	if (!window.showSaveFilePicker) {
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
