import { resolveResource } from "@tauri-apps/api/path";
import { useCallback, useEffect, useRef, useState } from "react";
import { initUiElements } from "@/commands";
import { autoStartDisable, autoStartEnable, setRunLog } from "@/commands/core";
import { hotLoadPageInit } from "@/commands/hotLoadPage";
import { ocrInit } from "@/commands/ocr";
import { useAppSettingsLoad } from "@/hooks/useAppSettingsLoad";
import { type AppSettingsData, AppSettingsGroup } from "@/types/appSettings";
import { CaptureHistory } from "@/utils/captureHistory";

export const InitService = () => {
	// 清除无效的截图历史
	const clearCaptureHistory = useCallback(
		async (appSettings: AppSettingsData) => {
			const captureHistory = new CaptureHistory();
			await captureHistory.init();
			await captureHistory.clearExpired(appSettings);
		},
		[],
	);

	const hasInitOcr = useRef(false);
	const hasClearedCaptureHistory = useRef(false);
	const hasInitAutoStart = useRef(false);
	const hasInitRunLog = useRef(false);
	const hasInitHotLoadPage = useRef(false);

	const [appSettings, setAppSettings] = useState<AppSettingsData | undefined>(
		undefined,
	);
	const [prevAppSettings, setPrevAppSettings] = useState<
		AppSettingsData | undefined
	>(undefined);

	const initServices = useCallback(async () => {
		if (!appSettings) {
			return;
		}

		if (
			!hasInitOcr.current ||
			(prevAppSettings &&
				(appSettings[AppSettingsGroup.FunctionOcr].ocrModel !==
					prevAppSettings[AppSettingsGroup.FunctionOcr].ocrModel ||
					appSettings[AppSettingsGroup.SystemScreenshot].ocrHotStart !==
						prevAppSettings[AppSettingsGroup.SystemScreenshot].ocrHotStart ||
					appSettings[AppSettingsGroup.SystemScreenshot]
						.ocrModelWriteToMemory !==
						prevAppSettings[AppSettingsGroup.SystemScreenshot]
							.ocrModelWriteToMemory))
		) {
			hasInitOcr.current = true;

			ocrInit(
				await resolveResource("resources/ocr-models"),
				appSettings[AppSettingsGroup.FunctionOcr].ocrModel,
				appSettings[AppSettingsGroup.SystemScreenshot].ocrHotStart,
				appSettings[AppSettingsGroup.SystemScreenshot].ocrModelWriteToMemory,
			);
		}

		if (!hasClearedCaptureHistory.current) {
			hasClearedCaptureHistory.current = true;

			clearCaptureHistory(appSettings);
		}

		if (
			process.env.NODE_ENV !== "development" &&
			(!hasInitAutoStart.current ||
				(prevAppSettings &&
					appSettings[AppSettingsGroup.SystemCommon].autoStart !==
						prevAppSettings[AppSettingsGroup.SystemCommon].autoStart))
		) {
			hasInitAutoStart.current = true;

			if (appSettings[AppSettingsGroup.SystemCommon].autoStart) {
				autoStartEnable();
			} else {
				autoStartDisable();
			}
		}

		if (
			!hasInitRunLog.current ||
			(prevAppSettings &&
				appSettings[AppSettingsGroup.SystemCommon].runLog !==
					prevAppSettings[AppSettingsGroup.SystemCommon].runLog)
		) {
			hasInitRunLog.current = true;

			setRunLog(appSettings[AppSettingsGroup.SystemCommon].runLog);
		}

		if (
			!hasInitHotLoadPage.current ||
			(prevAppSettings &&
				appSettings[AppSettingsGroup.SystemCore].hotLoadPageCount !==
					prevAppSettings[AppSettingsGroup.SystemCore].hotLoadPageCount)
		) {
			hasInitHotLoadPage.current = true;

			hotLoadPageInit(
				Math.min(appSettings[AppSettingsGroup.SystemCore].hotLoadPageCount, 0),
			);
		}
	}, [appSettings, clearCaptureHistory, prevAppSettings]);

	useAppSettingsLoad(
		useCallback((appSettings, prevAppSettings) => {
			setAppSettings(appSettings);
			setPrevAppSettings(prevAppSettings);
		}, []),
		true,
	);

	const inited = useRef(false);

	useEffect(() => {
		if (inited.current) {
			return;
		}
		inited.current = true;

		initUiElements();
	}, []);

	useEffect(() => {
		initServices();
	}, [initServices]);

	return null;
};
