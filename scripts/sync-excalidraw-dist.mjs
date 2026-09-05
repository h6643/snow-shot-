// 把外部 excalidraw 仓库（D:\Project\excalidraw，mg-chao fork，custom/master 分支）
// 构建产物同步进 vendor/ 目录。用法：先在 ../excalidraw 跑 yarn build:packages，再执行本脚本。
import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRepo = resolve(root, "../excalidraw/packages");
const vendor = resolve(root, "vendor/excalidraw/packages");

const packages = ["common", "element", "math", "excalidraw"];

for (const pkg of packages) {
	const src = join(sourceRepo, pkg, "dist");
	const dest = join(vendor, pkg, "dist");

	if (!existsSync(src)) {
		console.error(`[sync-excalidraw] 缺少构建产物: ${src}，请先在 excalidraw 仓库执行 yarn build:packages`);
		process.exit(1);
	}

	rmSync(dest, { recursive: true, force: true });
	// 只同步 prod 与 types，dev 构建体积大且运行时用不到
	for (const part of ["prod", "types"]) {
		cpSync(join(src, part), join(dest, part), { recursive: true });
	}
	// package.json 一并覆盖，保持导出字段一致
	cpSync(join(sourceRepo, pkg, "package.json"), join(vendor, pkg, "package.json"));

	console.log(`[sync-excalidraw] 已同步 ${pkg}`);
}

console.log("[sync-excalidraw] 完成，记得执行 pnpm install 刷新链接");
