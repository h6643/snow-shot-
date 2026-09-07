import { defineConfig } from "@rsbuild/core";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";
import { pluginReact } from "@rsbuild/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/rspack";

export default defineConfig({
	plugins: [pluginReact(), pluginNodePolyfill()],
	dev: {
		// 关闭 lazy compilation，避免 pixi.js 等模块触发 lazy-compilation-proxy 模块找不到的问题
		lazyCompilation: false,
	},
	resolve: {
		alias: {
			"@": "./src",
			// 替换 browser-fs-access 为一个简单的 mock，避免打包问题
			"browser-fs-access$": "@/mocks/browser-fs-access",
		},
	},
	output: {
		cleanDistPath: true,
	},
	performance: {
		chunkSplit: {
			strategy: "split-by-module",
		},
	},
	html: {
		tags: [
			{
				tag: "script",
				attrs: {
					src:
						import.meta.env.PUBLIC_ONLINE_STATUS === "true"
							? "/scripts/excalidraw.js"
							: "/scripts/excalidraw.offline.js",
				},
			},
			{
				tag: "script",
				attrs: {
					src: "/scripts/markdownItFix.js",
				},
			},
		],
	},
	tools: {
		swc: {
			jsc: {
				experimental: {
					plugins: [["@swc/plugin-styled-jsx", {}]],
				},
			},
		},
		rspack: {
			plugins: [
				tanstackRouter({
					target: "react",
					autoCodeSplitting: true,
				}),
			],
			optimization: {
				splitChunks: {
					cacheGroups: {
						browserFsAccess: {
							test: /[\\/]node_modules[\\/]browser-fs-access[\\/]/,
							name: "browser-fs-access",
							chunks: "all",
							priority: 100,
						},
					},
				},
			},
		},
	},
	// 修复模块加载问题
	source: {
		exclude: [/@excalidraw\/excalidraw\/dist\/dev\/chunk-TPDO5EF3\.js/],
	},
});
