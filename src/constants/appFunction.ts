import {
	AppFunction,
	type AppFunctionConfig,
	AppFunctionGroup,
} from "@/types/components/appFunction";

export const defaultAppFunctionConfigs: Record<AppFunction, AppFunctionConfig> =
	{
		[AppFunction.Screenshot]: {
			shortcutKey: "F1",
			group: AppFunctionGroup.Screenshot,
		},
		[AppFunction.ScreenshotFixed]: {
			shortcutKey: "",
			group: AppFunctionGroup.Screenshot,
		},
		[AppFunction.ScreenshotOcr]: {
			shortcutKey: "",
			group: AppFunctionGroup.Screenshot,
		},
		[AppFunction.ScreenshotFullScreen]: {
			shortcutKey: "",
			group: AppFunctionGroup.Screenshot,
		},
		[AppFunction.ScreenshotFocusedWindow]: {
			shortcutKey: "",
			group: AppFunctionGroup.Screenshot,
		},
		[AppFunction.FixedContent]: {
			shortcutKey: "",
			group: AppFunctionGroup.Other,
		},
		[AppFunction.TopWindow]: {
			shortcutKey: "",
			group: AppFunctionGroup.Other,
		},
		[AppFunction.FullScreenDraw]: {
			shortcutKey: "",
			group: AppFunctionGroup.Other,
		},
		[AppFunction.ShowOrHideMainWindow]: {
			shortcutKey: "",
			group: AppFunctionGroup.Other,
		},
		[AppFunction.OpenImageSaveFolder]: {
			shortcutKey: "",
			group: AppFunctionGroup.Other,
		},
		[AppFunction.OpenCaptureHistory]: {
			shortcutKey: "",
			group: AppFunctionGroup.Other,
		},
	};
