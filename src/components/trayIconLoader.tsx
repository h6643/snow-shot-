import { defaultWindowIcon } from "@tauri-apps/api/app";
import { Menu } from "@tauri-apps/api/menu";
import { TrayIcon, type TrayIconOptions } from "@tauri-apps/api/tray";
import { getCurrentWindow } from "@tauri-apps/api/window";
import React, { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { exitApp } from "@/commands";
import { useAppSettingsLoad } from "@/hooks/useAppSettingsLoad";
import { createPublisher } from "@/hooks/useStatePublisher";
import { useStateSubscriber } from "@/hooks/useStateSubscriber";
import { type AppSettingsData, AppSettingsGroup } from "@/types/appSettings";
import { appError } from "@/utils/log";
import { showWindow } from "@/utils/window";

export const TrayIconStatePublisher = createPublisher<{
	disableShortcut: boolean;
}>({
	disableShortcut: false,
});

const TrayIconLoaderComponent = () => {
	const intl = useIntl();
	const [disableShortcut, _setDisableShortcut] = useState(false);
	const [, setTrayIconState] = useStateSubscriber(
		TrayIconStatePublisher,
		useCallback((state: { disableShortcut: boolean }) => {
			_setDisableShortcut(state.disableShortcut);
		}, []),
	);

	const [enableTrayIcon, setEnableTrayIcon] = useState(false);
	useAppSettingsLoad(
		useCallback((settings: AppSettingsData) => {
			setEnableTrayIcon(
				settings[AppSettingsGroup.CommonTrayIcon].enableTrayIcon,
			);
		}, []),
		true,
	);

	const initTrayIcon = useCallback(async (): Promise<
		| {
				trayIcon: TrayIcon | undefined;
				trayIconMenu: Menu | undefined;
		  }
		| undefined
	> => {
		if (!enableTrayIcon) {
			return;
		}

		const appWindow = getCurrentWindow();

		const menu = await Menu.new({
			id: `${appWindow.label}-trayIconMenu`,
			items: [
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
							showWindow();
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
	}, [enableTrayIcon, intl, disableShortcut, setTrayIconState]);

	useEffect(() => {
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
	}, [initTrayIcon]);

	return null;
};

export const TrayIconLoader = React.memo(TrayIconLoaderComponent);
