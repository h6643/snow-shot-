import { defaultWindowIcon } from "@tauri-apps/api/app";
import { Menu, type MenuItem } from "@tauri-apps/api/menu";
import { TrayIcon, type TrayIconOptions } from "@tauri-apps/api/tray";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { isEqual } from "es-toolkit";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { exitApp } from "@/commands";
import {
	createFixedContentWindow,
	createFullScreenDrawWindow,
} from "@/commands/core";
import { PLUGIN_ID_TRANSLATE } from "@/constants/pluginService";
import { AntdContext } from "@/contexts/antdContext";
import { AppSettingsPublisher } from "@/contexts/appSettingsActionContext";
import { usePluginServiceContext } from "@/contexts/pluginServiceContext";
import {
	executeScreenshot,
	executeScreenshotFocusedWindow,
} from "@/functions/screenshot";
import {
	executeTranslate,
	executeTranslateSelectedText,
	openCaptureHistory,
	openImageSaveFolder,
} from "@/functions/tools";
import { useAppSettingsLoad } from "@/hooks/useAppSettingsLoad";
import { createPublisher } from "@/hooks/useStatePublisher";
import { useStateRef } from "@/hooks/useStateRef";
import { useStateSubscriber } from "@/hooks/useStateSubscriber";
import {
	type AppSettingsData,
	AppSettingsGroup,
	TrayIconClickAction,
} from "@/types/appSettings";
import {
	AppFunction,
	type AppFunctionConfig,
} from "@/types/components/appFunction";
import { formatKey } from "@/utils/format";
import { appError } from "@/utils/log";
import { getPlatformValue } from "@/utils/platform";
import { ScreenshotType } from "@/utils/types";
import { showWindow } from "@/utils/window";

export const TrayIconStatePublisher = createPublisher<{
	disableShortcut: boolean;
}>({
	disableShortcut: false,
});

const TrayIconLoaderComponent = () => {
	const intl = useIntl();
	const { message } = useContext(AntdContext);
	const [disableShortcut, _setDisableShortcut] = useState(false);
	const [, setTrayIconState] = useStateSubscriber(
		TrayIconStatePublisher,
		useCallback((state: { disableShortcut: boolean }) => {
			_setDisableShortcut(state.disableShortcut);
		}, []),
	);

	const [shortcutKeys, setShortcutKeys, shortcutKeysRef] = useStateRef<
		Record<AppFunction, AppFunctionConfig> | undefined
	>(undefined);
	const [enableTrayIcon, setEnableTrayIcon] = useState(false);
	const [getAppSettings] = useStateSubscriber(AppSettingsPublisher, undefined);
	useAppSettingsLoad(
		useCallback(
			(settings: AppSettingsData, previous: AppSettingsData | undefined) => {
				if (
					shortcutKeysRef.current === undefined ||
					!isEqual(
						settings[AppSettingsGroup.AppFunction],
						previous?.[AppSettingsGroup.AppFunction],
					)
				) {
					setShortcutKeys(settings[AppSettingsGroup.AppFunction]);
				}

				setEnableTrayIcon(
					settings[AppSettingsGroup.CommonTrayIcon].enableTrayIcon,
				);
			},
			[setShortcutKeys, shortcutKeysRef],
		),
		true,
	);

	const { isReadyStatus } = usePluginServiceContext();
	const initTrayIcon = useCallback(async (): Promise<
		| {
				trayIcon: TrayIcon | undefined;
				trayIconMenu: Menu | undefined;
		  }
		| undefined
	> => {
		if (!isReadyStatus) {
			return;
		}

		if (!shortcutKeys) {
			return;
		}

		if (!enableTrayIcon) {
			return;
		}

		const appWindow = getCurrentWindow();

		const menu = await Menu.new({
			id: `${appWindow.label}-trayIconMenu`,
			items: [
				{
					id: `${appWindow.label}-screenshot`,
					text: intl.formatMessage({ id: "home.screenshot" }),
					accelerator: disableShortcut
						? undefined
						: formatKey(shortcutKeys[AppFunction.Screenshot].shortcutKey),
					action: async () => {
						executeScreenshot();
					},
				},
				{
					id: `${appWindow.label}-screenshot-fixedTool`,
					text: intl.formatMessage({ id: "draw.fixedTool" }),
					accelerator: disableShortcut
						? undefined
						: formatKey(shortcutKeys[AppFunction.ScreenshotFixed].shortcutKey),
					action: async () => {
						executeScreenshot(ScreenshotType.Fixed);
					},
				},
				{
					id: `${appWindow.label}-screenshot-ocr`,
					text: intl.formatMessage({ id: "draw.ocrDetectTool" }),
					accelerator: disableShortcut
						? undefined
						: formatKey(shortcutKeys[AppFunction.ScreenshotOcr].shortcutKey),
					action: async () => {
						executeScreenshot(ScreenshotType.OcrDetect);
					},
				},
				{
					id: `${appWindow.label}-screenshot-ocr-translate`,
					text: intl.formatMessage({ id: "draw.ocrTranslateTool" }),
					accelerator: disableShortcut
						? undefined
						: formatKey(
								shortcutKeys[AppFunction.ScreenshotOcrTranslate].shortcutKey,
							),
					action: async () => {
						executeScreenshot(ScreenshotType.OcrTranslate);
					},
				},
				...(shortcutKeys[AppFunction.ScreenshotFocusedWindow].shortcutKey
					? [
							{
								id: `${appWindow.label}-screenshot-focused-window`,
								text: intl.formatMessage({
									id: "home.screenshotFunction.screenshotFocusedWindow",
								}),
								accelerator: disableShortcut
									? undefined
									: formatKey(
											shortcutKeys[AppFunction.ScreenshotFocusedWindow]
												.shortcutKey,
										),
								action: async () => {
									executeScreenshotFocusedWindow(getAppSettings());
								},
							},
						]
					: []),
				{
					id: `${appWindow.label}-screenshot-fullScreen`,
					text: intl.formatMessage({
						id: "home.screenshotFunction.screenshotFullScreen",
					}),
					accelerator: disableShortcut
						? undefined
						: formatKey(
								shortcutKeys[AppFunction.ScreenshotFullScreen].shortcutKey,
							),
					action: async () => {
						executeScreenshot(ScreenshotType.CaptureFullScreen);
					},
				},
				...(isReadyStatus(PLUGIN_ID_TRANSLATE)
					? [
							{
								item: "Separator",
							} as unknown as MenuItem,
							{
								id: `${appWindow.label}-translation`,
								text: intl.formatMessage({ id: "home.translation" }),
								accelerator: disableShortcut
									? undefined
									: formatKey(
											shortcutKeys[AppFunction.Translation].shortcutKey,
										),
								action: async () => {
									executeTranslate();
								},
							},
							...(shortcutKeys[AppFunction.TranslationSelectText].shortcutKey
								? [
										{
											id: `${appWindow.label}-translation-selectText`,
											text: intl.formatMessage({
												id: "home.translationSelectText",
											}),
											accelerator: disableShortcut
												? undefined
												: formatKey(
														shortcutKeys[AppFunction.TranslationSelectText]
															.shortcutKey,
													),
											action: async () => {
												executeTranslateSelectedText();
											},
										},
									]
								: []),
						]
					: []),
				{
					item: "Separator",
				},
				{
					id: `${appWindow.label}-screenshot-fixedContent`,
					text: intl.formatMessage({ id: "home.fixedContent" }),
					accelerator: disableShortcut
						? undefined
						: formatKey(shortcutKeys[AppFunction.FixedContent].shortcutKey),
					action: async () => {
						createFixedContentWindow();
					},
				},
				...getPlatformValue(
					[
						{
							id: `${appWindow.label}-screenshot-topWindow`,
							text: intl.formatMessage({ id: "home.topWindow" }),
							accelerator: disableShortcut
								? undefined
								: formatKey(shortcutKeys[AppFunction.TopWindow].shortcutKey),
							action: async () => {
								executeScreenshot(ScreenshotType.TopWindow);
							},
						},
					],
					[],
				),
				{
					id: `${appWindow.label}-screenshot-fullScreenDraw`,
					text: intl.formatMessage({ id: "home.fullScreenDraw" }),
					accelerator: disableShortcut
						? undefined
						: formatKey(shortcutKeys[AppFunction.FullScreenDraw].shortcutKey),
					action: async () => {
						createFullScreenDrawWindow();
					},
				},
				{
					id: `${appWindow.label}-open-image-save-folder`,
					text: intl.formatMessage({ id: "home.openImageSaveFolder" }),
					action: async () => {
						openImageSaveFolder();
					},
				},
				{
					id: `${appWindow.label}-open-capture-history`,
					text: intl.formatMessage({ id: "home.openCaptureHistory" }),
					action: async () => {
						openCaptureHistory();
					},
				},
				{
					item: "Separator",
				},
				{
					id: `${appWindow.label}-disableShortcut`,
					text: intl.formatMessage({ id: "home.disableShortcut" }),
					checked: disableShortcut,
					action: async () => {
						setTrayIconState({
							disableShortcut: !disableShortcut,
						});
					},
				},
				{
					id: `${appWindow.label}-show-main-window`,
					text: intl.formatMessage({ id: "home.showMainWindow" }),
					action: async () => {
						showWindow();
					},
				},
				{
					item: "Separator",
				},
				{
					id: `${appWindow.label}-exit`,
					text: intl.formatMessage({ id: "home.exit" }),
					action: async () => {
						exitApp();
					},
				},
			],
		});

		const options: TrayIconOptions = {
			icon: (await defaultWindowIcon()) ?? "",
			showMenuOnLeftClick: false,
			tooltip: "Snow Shot",
			action: (event) => {
				switch (event.type) {
					case "Click":
						if (event.button === "Left") {
							if (
								getAppSettings()[AppSettingsGroup.FunctionTrayIcon]
									.iconClickAction === TrayIconClickAction.Screenshot
							) {
								executeScreenshot();
							} else if (
								getAppSettings()[AppSettingsGroup.FunctionTrayIcon]
									.iconClickAction === TrayIconClickAction.ShowMainWindow
							) {
								showWindow();
							}
						}
						break;
				}
			},
			menu,
		};

		return {
			trayIcon: await TrayIcon.new(options),
			trayIconMenu: menu,
		};
	}, [
		shortcutKeys,
		enableTrayIcon,
		intl,
		disableShortcut,
		getAppSettings,
		setTrayIconState,
		isReadyStatus,
	]);

	useEffect(() => {
		if (!isReadyStatus) {
			return;
		}

		if (!shortcutKeys) {
			return;
		}

		const trayIconPromise = initTrayIcon();

		const handleBeforeUnload = async () => {
			trayIconPromise
				.then((trayIcon) => {
					if (trayIcon) {
						trayIcon.trayIconMenu?.close();
						trayIcon.trayIcon?.close();
					}
				})
				.catch((error) => {
					appError(`[TrayIconLoader] beforeunload event failed`, error);
				});
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			trayIconPromise
				.then((trayIcon) => {
					if (trayIcon) {
						trayIcon.trayIconMenu?.close();
						trayIcon.trayIcon?.close();
					}
				})
				.catch((error) => {
					appError(`[TrayIconLoader] close tray icon failed`, error);
				});

			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [initTrayIcon, isReadyStatus, shortcutKeys]);

	return null;
};

export const TrayIconLoader = React.memo(TrayIconLoaderComponent);
