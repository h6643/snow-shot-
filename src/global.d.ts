/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ServiceResponse } from "./services/tools";

// 模拟 File System Access API，避免 browser-fs-access 使用 Web Share API
interface FileSystemHandle {
	kind: "file" | "directory";
	name: string;
}

interface ShowOpenFilePickerOptions {
	multiple?: boolean;
	excludeAcceptAllOption?: boolean;
	startIn?: string;
	id?: string;
	types?: Array<{
		description?: string;
		accept?: Record<string, string[]>;
	}>;
}

interface ShowSaveFilePickerOptions {
	suggestedName?: string;
	excludeAcceptAllOption?: boolean;
	startIn?: string;
	id?: string;
	types?: Array<{
		description?: string;
		accept?: Record<string, string[]>;
	}>;
}

declare global {
	interface Window {
		__APP_AUTO_START_HIDE_WINDOW__: boolean;
		__APP_HANDLE_HTTP_ERROR__:
			| ((response: ServiceResponse<unknown>) => void)
			| undefined;
		__APP_HANDLE_SERVICE_ERROR__:
			| ((response: ServiceResponse<unknown>) => void)
			| undefined;
		__APP_HANDLE_REQUEST_ERROR__:
			| ((response: ServiceResponse<unknown>) => void)
			| undefined;
		__APP_ACCEPT_LANGUAGE__: string;
		chrome: {
			webview: {
				addEventListener: (
					event: string,
					callback: (e: { getBuffer: () => ArrayBuffer }) => void,
				) => void;
				removeEventListener: (
					event: string,
					callback: (e: {
						getBuffer: () => SharedBuffer;
						additionalData?: Record<string, unknown>;
					}) => void,
				) => void;
				releaseBuffer: (buffer: SharedBuffer) => void;
			};
		};
		// File System Access API polyfill
		showOpenFilePicker?: (
			options?: ShowOpenFilePickerOptions,
		) => Promise<FileSystemHandle[]>;
		showSaveFilePicker?: (
			options?: ShowSaveFilePickerOptions,
		) => Promise<FileSystemHandle>;
	}
}
