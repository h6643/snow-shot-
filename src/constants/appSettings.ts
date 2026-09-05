import {
	AppSettingsControlNode,
	type AppSettingsData,
	AppSettingsFixedContentInitialPosition,
	AppSettingsGroup,
	AppSettingsLanguage,
	AppSettingsTheme,
	ColorPickerShowMode,
	DoubleClickAction,
	ExtraToolList,
	HdrColorAlgorithm,
	HistoryValidDuration,
	OcrDetectAfterAction,
	OcrModel,
	TrayIconClickAction,
} from "@/types/appSettings";
import { DrawState } from "@/types/draw";
import {
	TranslationDomain,
	TranslationType,
} from "@/types/servies/translation";
import { ImageFormat } from "@/types/utils/file";
import { getPlatformValue } from "@/utils/platform";
import { defaultAppFunctionConfigs } from "./appFunction";
import { defaultCommonKeyEventSettings } from "./commonKeyEvent";
import { FOCUS_WINDOW_APP_NAME_ENV_VARIABLE } from "./components/screenshot";
import { defaultTranslationPrompt } from "./components/translation";
import { defaultDrawToolbarKeyEventSettings } from "./drawToolbarKeyEvent";

export const defaultAppSettingsData: AppSettingsData = {
	[AppSettingsGroup.Common]: {
		theme: AppSettingsTheme.System,
		mainColor: "#1677FF",
		borderRadius: 6,
		enableCompactLayout: false,
		language: AppSettingsLanguage.ZHHans,
		browserLanguage: "",
	},
	[AppSettingsGroup.Screenshot]: {
		uiScale: 100,
		toolbarUiScale: 100,
		controlNode: AppSettingsControlNode.Circle,
		// 在 Mac 上禁用动画
		disableAnimation: getPlatformValue(false, true),
		colorPickerShowMode: ColorPickerShowMode.BeyondSelectRect,
		beyondSelectRectElementOpacity: 100,
		selectRectMaskColor: "#00000080",
		fullScreenAuxiliaryLineColor: "#00000000",
		monitorCenterAuxiliaryLineColor: "#00000000",
		hotKeyTipOpacity: 100,
		colorPickerCenterAuxiliaryLineColor: "#00000000",
		toolbarHiddenToolList: [],
	},
	[AppSettingsGroup.FixedContent]: {
		borderColor: "#dbdbdb",
	},
	[AppSettingsGroup.CommonTrayIcon]: {
		enableTrayIcon: true,
	},
	[AppSettingsGroup.FunctionDraw]: {
		lockDrawTool: true,
		enableSliderChangeWidth: false,
		toolIndependentStyle: true,
		disableQuickSelectElementToolList: [],
	},
	[AppSettingsGroup.Cache]: {
		menuCollapsed: false,
		colorPickerColorFormatIndex: 0,
		prevImageFormat: ImageFormat.PNG,
		prevSelectRect: {
			min_x: 0,
			min_y: 0,
			max_x: 0,
			max_y: 0,
		},
		enableMicrophone: false,
		enableLockDrawTool: false,
		disableArrowPicker: true,
		selectRectRadius: 0,
		selectRectShadowWidth: 0,
		selectRectShadowColor: "#595959",
		lastRectTool: DrawState.Rect,
		lastArrowTool: DrawState.Arrow,
		lastFilterTool: DrawState.Blur,
		lastExtraTool: ExtraToolList.None,
		lastDrawExtraTool: DrawState.Idle,
		lastWatermarkText: "",
		lockDragAspectRatio: 0,
		enableTabFindChildrenElements: true,
	},
	[AppSettingsGroup.DrawToolbarKeyEvent]: defaultDrawToolbarKeyEventSettings,
	[AppSettingsGroup.CommonKeyEvent]: defaultCommonKeyEventSettings,
	[AppSettingsGroup.AppFunction]: defaultAppFunctionConfigs,
	[AppSettingsGroup.Render]: {
		antialias: true,
	},
	[AppSettingsGroup.SystemCommon]: {
		autoStart: true,
		autoCheckVersion: true,
		runLog: false,
	},
	[AppSettingsGroup.FunctionTranslation]: {
		optimizeAiTranslationLayout: true,
		translationSystemPrompt: defaultTranslationPrompt,
		translationApiConfigList: [],
		sourceLanguage: "auto",
		targetLanguage: "zh-CHS",
		translationDomain: TranslationDomain.General,
		translationType: TranslationType.Youdao,
	},
	[AppSettingsGroup.FunctionTranslationCache]: {
		cacheSourceLanguage: "auto",
		cacheTargetLanguage: "zh-CHS",
		cacheTranslationDomain: TranslationDomain.General,
		cacheTranslationType: TranslationType.Youdao,
	},
	[AppSettingsGroup.FunctionOcr]: {
		ocrModel: OcrModel.RapidOcrV4,
	},
	[AppSettingsGroup.FunctionScreenshot]: {
		findChildrenElements: true,
		shortcutCanleTip: false,
		autoSaveOnCopy: false,
		doubleClickAction: DoubleClickAction.Copy,
		copyImageFileToClipboard: false,
		focusedWindowCopyToClipboard: true,
		fullScreenCopyToClipboard: true,
		fastSave: false,
		saveFileDirectory: "",
		saveFileFormat: ImageFormat.PNG,
		ocrAfterAction: OcrDetectAfterAction.None,
		ocrCopyText: true,
		selectRectPresetList: [],
	},
	[AppSettingsGroup.SystemScrollScreenshot]: {
		tryRollback: true,
		imageFeatureThreshold: 24,
		minSide: 128,
		maxSide: 128,
		sampleRate: 1,
		imageFeatureDescriptionLength: 28,
	},
	[AppSettingsGroup.FunctionFixedContent]: {
		zoomWithMouse: true,
		autoResizeWindow: true,
		autoOcr: true,
		autoCopyToClipboard: false,
		initialPosition: AppSettingsFixedContentInitialPosition.MousePosition,
	},
	[AppSettingsGroup.FunctionOutput]: {
		manualSaveFileNameFormat: `SnowShot_{{YYYY-MM-DD_HH-mm-ss}}`,
		autoSaveFileNameFormat: `SnowShot_{{YYYY-MM-DD_HH-mm-ss}}`,
		fastSaveFileNameFormat: `SnowShot_{{YYYY-MM-DD_HH-mm-ss}}`,
		focusedWindowFileNameFormat: `${FOCUS_WINDOW_APP_NAME_ENV_VARIABLE}/SnowShot_{{YYYY-MM-DD_HH-mm-ss}}`,
		fullScreenFileNameFormat: `SnowShot_{{YYYY-MM-DD_HH-mm-ss}}`,
	},
	[AppSettingsGroup.FunctionFullScreenDraw]: {
		defaultTool: DrawState.Select,
	},
	[AppSettingsGroup.SystemScreenshot]: {
		ocrHotStart: false,
		ocrModelWriteToMemory: false,
		ocrDetectAngle: false,
		historyValidDuration: HistoryValidDuration.Week,
		recordCaptureHistory: true,
		historySaveEditResult: true,
		/** 尝试使用 Bitmap 格式写入到剪贴板 */
		tryWriteBitmapImageToClipboard: true,
		/** 启用多显示器截图 */
		enableMultipleMonitor: true,
		/** 更正颜色滤镜 */
		correctColorFilter: true,
		/** 更正 HDR 颜色  */
		correctHdrColor: true,
		/** HDR 颜色转换算法 */
		correctHdrColorAlgorithm: HdrColorAlgorithm.Linear,
	},
	[AppSettingsGroup.FunctionTrayIcon]: {
		iconClickAction: TrayIconClickAction.Screenshot,
	},
	[AppSettingsGroup.SystemCore]: {
		/// 热加载页面数量
		hotLoadPageCount: 0,
	},
	[AppSettingsGroup.FunctionGlobalShortcut]: {
		disableOnFocusedFullScreenWindow: false,
	},
};
