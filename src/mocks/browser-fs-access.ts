// Mock for browser-fs-access to avoid bundler issues with dynamic imports
// This provides fallback implementations that use traditional file dialogs

/**
 * 检查是否支持 File System Access API
 */
export const supported = false;

/**
 * 打开文件选择器 - 使用传统的 file input
 */
export const fileOpen = async (options: {
	multiple?: boolean;
	types?: Array<{
		description?: string;
		accept?: Record<string, string[]>;
	}>;
	startIn?: string;
	excludeAcceptAllOption?: boolean;
}): Promise<File[]> => {
	return new Promise((resolve, reject) => {
		const input = document.createElement("input");
		input.type = "file";
		input.multiple = options.multiple || false;

		if (options.types) {
			const acceptTypes = options.types
				.flatMap((t) =>
					Object.keys(t.accept || {}).map((ext) => ext.replace(".", "")),
				)
				.join(",");
			if (acceptTypes) {
				input.accept = acceptTypes;
			}
		}

		input.onchange = (e) => {
			const files = Array.from((e.target as HTMLInputElement).files || []);
			resolve(files);
		};

		input.onerror = () => {
			reject(new Error("Failed to open file dialog"));
		};

		input.click();
	});
};

/**
 * 保存文件 - 使用传统的 download 方式
 */
export const fileSave = async (
	blob: Blob | ReadableStream<Uint8Array> | AsyncIterable<Uint8Array>,
	options?: {
		fileName?: string;
	},
): Promise<void> => {
	let blobToSave: Blob;

	if (blob instanceof Blob) {
		blobToSave = blob;
	} else {
		// Convert stream to blob
		const chunks: BlobPart[] = [];
		for await (const chunk of blob as AsyncIterable<BlobPart>) {
			chunks.push(chunk);
		}
		blobToSave = new Blob(chunks);
	}

	const fileName = options?.fileName || "download";
	const url = URL.createObjectURL(blobToSave);
	const a = document.createElement("a");
	a.href = url;
	a.download = fileName;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
};

/**
 * 打开目录选择器 - 使用传统的 file input
 */
export const directoryOpen = async (options?: {
	multiple?: boolean;
	startIn?: string;
}): Promise<File[]> => {
	return new Promise((resolve, reject) => {
		const input = document.createElement("input");
		input.type = "file";
		input.webkitdirectory = true;
		input.multiple = options?.multiple || true;

		input.onchange = (e) => {
			const files = Array.from((e.target as HTMLInputElement).files || []);
			resolve(files);
		};

		input.onerror = () => {
			reject(new Error("Failed to open directory dialog"));
		};

		input.click();
	});
};

/**
 * 导出供 excalidraw 使用
 */
export const nativeFileSystemSupported = false;
export const getFileHandle = async () => null;
export const getFileHandleType = async () => null;
export const createFile = async () => null;
export const normalizeFile = async () => null;
export const isImageFileHandle = async () => false;
export const isImageFileHandleType = async () => false;
