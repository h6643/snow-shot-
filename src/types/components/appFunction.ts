export enum AppFunction {
	Screenshot = "screenshot",
	ScreenshotFixed = "screenshotFixed",
	ScreenshotOcr = "screenshotOcr",
	/** 截取当前具有焦点的窗口 */
	ScreenshotFocusedWindow = "screenshotFocusedWindow",
	/** 截图全屏 */
	ScreenshotFullScreen = "screenshotFullScreen",
	/** 截图翻译 */
	ScreenshotOcrTranslate = "screenshotOcrTranslate",
	Translation = "translation",
	TranslationSelectText = "translationSelectText",
	FixedContent = "fixedContent",
	TopWindow = "topWindow",
	FullScreenDraw = "fullScreenDraw",
	ShowOrHideMainWindow = "showOrHideMainWindow",
	OpenImageSaveFolder = "openImageSaveFolder",
	OpenCaptureHistory = "openCaptureHistory",
}

export enum AppFunctionGroup {
	Screenshot = "screenshot",
	Translation = "translation",
	Other = "other",
}

export type AppFunctionConfig = {
	shortcutKey: string;
	group: AppFunctionGroup;
};

export type AppFunctionComponentConfig = AppFunctionConfig & {
	configKey: AppFunction;
	title: React.ReactNode;
	icon?: React.ReactNode;
	group: AppFunctionGroup;
	onClick: () => Promise<void>;
	onKeyChange: (value: string, prevValue: string) => Promise<boolean>;
};
