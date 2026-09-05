import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, Divider, Form, Row, Space, Spin, Tooltip, theme } from "antd";
import { useCallback, useContext, useMemo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { CheckPermissions } from "@/components/checkPermissions";
import { ContentWrap } from "@/components/contentWrap";
import { FunctionButton } from "@/components/functionButton";
import { GlobalShortcutContext } from "@/components/globalShortcut";
import { GroupTitle } from "@/components/groupTitle";
import { KeyButton } from "@/components/keyButton";
import { ResetSettingsButton } from "@/components/resetSettingsButton";
import {
	defaultCommonKeyEventComponentConfig,
	defaultCommonKeyEventSettings,
} from "@/constants/commonKeyEvent";
import {
	defaultDrawToolbarKeyEventComponentConfig,
	defaultDrawToolbarKeyEventSettings,
} from "@/constants/drawToolbarKeyEvent";
import { PLUGIN_ID_TRANSLATE } from "@/constants/pluginService";
import { AppSettingsActionContext } from "@/contexts/appSettingsActionContext";
import { usePluginServiceContext } from "@/contexts/pluginServiceContext";
import { useAppSettingsLoad } from "@/hooks/useAppSettingsLoad";
import { usePlatform } from "@/hooks/usePlatform";
import {
	type AppSettingsData,
	AppSettingsGroup,
	ShortcutKeyStatus,
} from "@/types/appSettings";
import {
	AppFunction,
	type AppFunctionConfig,
	AppFunctionGroup,
} from "@/types/components/appFunction";
import { DrawToolbarKeyEventKey } from "@/types/components/drawToolbar";
import {
	CommonKeyEventGroup,
	type CommonKeyEventKey,
} from "@/types/core/commonKeyEvent";
import {
	convertShortcutKeyStatusToButtonColor,
	convertShortcutKeyStatusToTip,
} from "./extra";

export const HomePage = () => {
	const { token } = theme.useToken();

	const { updateAppSettings } = useContext(AppSettingsActionContext);

	const resetFliter = useCallback((group: AppFunctionGroup) => {
		return (settings: Record<string, unknown>) => {
			const newSettings: Partial<
				AppSettingsData[AppSettingsGroup.AppFunction]
			> = {};

			Object.keys(settings).forEach((key) => {
				if ((settings[key] as AppFunctionConfig).group !== group) {
					return;
				}

				newSettings[key as AppFunction] = settings[key] as AppFunctionConfig;
			});

			return newSettings;
		};
	}, []);

	const [currentPlatform] = usePlatform();

	const {
		defaultAppFunctionComponentGroupConfigs,
		updateShortcutKeyStatusLoading,
		appSettingsLoading,
		appFunctionSettings,
		shortcutKeyStatus,
		disableShortcutKeyRef,
	} = useContext(GlobalShortcutContext);

	const { isReadyStatus } = usePluginServiceContext();

	// In-app hotkeys state
	const [hotKeySettingsLoading, setHotKeySettingsLoading] = useState(true);

	const [drawToolbarKeyEventForm] =
		Form.useForm<AppSettingsData[AppSettingsGroup.DrawToolbarKeyEvent]>();
	const [_commonKeyEventForm] =
		Form.useForm<AppSettingsData[AppSettingsGroup.CommonKeyEvent]>();

	const [drawToolbarKeyEvent, setDrawToolbarKeyEvent] = useState<
		AppSettingsData[AppSettingsGroup.DrawToolbarKeyEvent]
	>(defaultDrawToolbarKeyEventSettings);
	const [commonKeyEvent, setCommonKeyEvent] = useState<
		AppSettingsData[AppSettingsGroup.CommonKeyEvent]
	>(defaultCommonKeyEventSettings);

	useAppSettingsLoad(
		useCallback((settings: AppSettingsData, preSettings?: AppSettingsData) => {
			setHotKeySettingsLoading(false);

			if (
				preSettings === undefined ||
				preSettings[AppSettingsGroup.DrawToolbarKeyEvent] !==
					settings[AppSettingsGroup.DrawToolbarKeyEvent]
			) {
				setDrawToolbarKeyEvent(settings[AppSettingsGroup.DrawToolbarKeyEvent]);
			}

			if (
				preSettings === undefined ||
				preSettings[AppSettingsGroup.CommonKeyEvent] !==
					settings[AppSettingsGroup.CommonKeyEvent]
			) {
				setCommonKeyEvent(settings[AppSettingsGroup.CommonKeyEvent]);
			}
		}, []),
		true,
	);

	const drawToolbarKeyEventFormItemList = useMemo(() => {
		return Object.keys(defaultDrawToolbarKeyEventSettings)
			.filter((key) => {
				if (currentPlatform === "macos") {
					switch (key) {
						case DrawToolbarKeyEventKey.ResizeFromCenterPicker:
						case DrawToolbarKeyEventKey.MaintainAspectRatioPicker:
						case DrawToolbarKeyEventKey.RotateWithDiscreteAnglePicker:
						case DrawToolbarKeyEventKey.AutoAlignPicker:
							return false;
						default:
							return true;
					}
				}

				if (key === DrawToolbarKeyEventKey.OcrTranslateTool) {
					return isReadyStatus?.(PLUGIN_ID_TRANSLATE);
				}

				return true;
			})
			.map((key) => {
				const span = 12;
				const config = drawToolbarKeyEvent[key as DrawToolbarKeyEventKey];
				const componentConfig =
					defaultDrawToolbarKeyEventComponentConfig[
						key as DrawToolbarKeyEventKey
					];

				return (
					<Col key={`draw-toolbar-key-event_col-${key}`} span={span}>
						<Form.Item
							label={<FormattedMessage id={componentConfig.messageId} />}
							name={key}
						>
							<KeyButton
								title={
									<FormattedMessage key={key} id={componentConfig.messageId} />
								}
								keyValue={config.hotKey}
								maxWidth={100}
								onKeyChange={async (value) => {
									updateAppSettings(
										AppSettingsGroup.DrawToolbarKeyEvent,
										{
											[key]: {
												...config,
												hotKey: value,
											},
										},
										false,
										true,
										true,
									);
								}}
								maxLength={2}
							/>
						</Form.Item>
					</Col>
				);
			});
	}, [currentPlatform, drawToolbarKeyEvent, isReadyStatus, updateAppSettings]);

	const keyEventFormItemList = useMemo(() => {
		const groupFormItemMap: Record<CommonKeyEventGroup, React.ReactNode[]> = {
			[CommonKeyEventGroup.Translation]: [],
			[CommonKeyEventGroup.FixedContent]: [],
		};

		Object.keys(defaultCommonKeyEventSettings).forEach((key) => {
			const span = 12;
			const config = commonKeyEvent[key as CommonKeyEventKey];
			const componentConfig =
				defaultCommonKeyEventComponentConfig[key as CommonKeyEventKey];

			if (!groupFormItemMap[config.group]) {
				groupFormItemMap[config.group] = [];
			}

			groupFormItemMap[config.group].push(
				<Col key={`key-event_col-${key}`} span={span}>
					<Form.Item
						label={<FormattedMessage id={componentConfig.messageId} />}
						name={key}
					>
						<KeyButton
							title={
								<FormattedMessage key={key} id={componentConfig.messageId} />
							}
							keyValue={config.hotKey}
							maxWidth={100}
							onKeyChange={async (value) => {
								updateAppSettings(
									AppSettingsGroup.CommonKeyEvent,
									{
										[key]: {
											...config,
											hotKey: value,
										},
									},
									false,
									true,
									true,
								);
							}}
							maxLength={2}
						/>
					</Form.Item>
				</Col>,
			);
		});

		return groupFormItemMap;
	}, [commonKeyEvent, updateAppSettings]);

	const keyEventFormItemListKeys = Object.keys(
		keyEventFormItemList,
	) as CommonKeyEventGroup[];

	return (
		<ContentWrap className="home-wrap">
			<CheckPermissions />

			{/* Global Shortcuts */}
			{Object.keys(defaultAppFunctionComponentGroupConfigs)
				.filter((group) => {
					if (group === AppFunctionGroup.Translation) {
						return isReadyStatus?.(PLUGIN_ID_TRANSLATE);
					}

					return true;
				})
				.map((group) => {
					const configs =
						defaultAppFunctionComponentGroupConfigs[group as AppFunctionGroup];

					let groupTitle: React.ReactNode;
					switch (group) {
						case AppFunctionGroup.Screenshot:
							groupTitle = (
								<GroupTitle
									id="screenshotFunction"
									extra={
										<ResetSettingsButton
											title={
												<FormattedMessage
													id="home.screenshotFunction"
													key="screenshotFunction"
												/>
											}
											appSettingsGroup={AppSettingsGroup.AppFunction}
											filter={resetFliter(AppFunctionGroup.Screenshot)}
										/>
									}
								>
									<FormattedMessage
										id="home.screenshotFunction"
										key="screenshotFunction"
									/>
								</GroupTitle>
							);
							break;
						case AppFunctionGroup.Translation:
							groupTitle = (
								<GroupTitle
									id="translationFunction"
									extra={
										<ResetSettingsButton
											title={<FormattedMessage id="home.translationFunction" />}
											appSettingsGroup={AppSettingsGroup.AppFunction}
											filter={resetFliter(AppFunctionGroup.Translation)}
										/>
									}
								>
									<FormattedMessage
										id="home.translationFunction"
										key="translationFunction"
									/>
								</GroupTitle>
							);
							break;
						case AppFunctionGroup.Other:
							groupTitle = (
								<GroupTitle
									id="otherFunction"
									extra={
										<ResetSettingsButton
											title={<FormattedMessage id="home.otherFunction" />}
											appSettingsGroup={AppSettingsGroup.AppFunction}
											filter={resetFliter(AppFunctionGroup.Other)}
										/>
									}
								>
									<FormattedMessage
										id="home.otherFunction"
										key="otherFunction"
									/>
								</GroupTitle>
							);
							break;
					}

					let speicalKeys: string[] | undefined;
					switch (group) {
						case AppFunctionGroup.Screenshot:
						case AppFunctionGroup.Translation:
						case AppFunctionGroup.Other:
							speicalKeys = ["PrintScreen"];
							break;
					}

					return (
						<div key={`${group}`} style={{ marginBottom: token.marginLG }}>
							{groupTitle}
							<Spin
								key={`${group}`}
								spinning={updateShortcutKeyStatusLoading || appSettingsLoading}
							>
								<Space
									direction="vertical"
									size="middle"
									style={{ display: "flex" }}
								>
									{configs
										.filter((config) => {
											if (
												currentPlatform === "macos" &&
												config.configKey === AppFunction.TopWindow
											) {
												return false;
											}

											return true;
										})
										.map((config) => {
											const key = config.configKey;
											const currentShortcutKey =
												appFunctionSettings?.[key as AppFunction]?.shortcutKey;
											const statusColor = appSettingsLoading
												? undefined
												: convertShortcutKeyStatusToButtonColor(
														shortcutKeyStatus?.[key as AppFunction],
													);

											const statusTip = appSettingsLoading
												? undefined
												: convertShortcutKeyStatusToTip(
														shortcutKeyStatus?.[key as AppFunction],
													);

											let children = <></>;
											if (
												shortcutKeyStatus?.[key as AppFunction] ===
												ShortcutKeyStatus.None
											) {
												children = (
													<div
														style={{
															color: token.colorTextDescription,
														}}
													>
														<FormattedMessage id="home.shortcut.none" />
													</div>
												);
											} else if (statusTip) {
												children = (
													<Tooltip
														title={convertShortcutKeyStatusToTip(
															shortcutKeyStatus?.[key as AppFunction],
														)}
													>
														<InfoCircleOutlined />
													</Tooltip>
												);
											}

											return (
												<div key={`${group}-${key}`}>
													<FunctionButton
														label={config.title}
														icon={config.icon}
														onClick={config.onClick}
													>
														<KeyButton
															speicalKeys={speicalKeys}
															title={config.title}
															maxWidth={200}
															keyValue={currentShortcutKey ?? ""}
															buttonProps={{
																variant: "dashed",
																color: statusColor,
																children,
																onClick: () => {
																	disableShortcutKeyRef.current = true;
																},
															}}
															onCancel={() => {
																disableShortcutKeyRef.current = false;
															}}
															onKeyChange={async (value) => {
																disableShortcutKeyRef.current = false;
																updateAppSettings(
																	AppSettingsGroup.AppFunction,
																	{
																		[key as AppFunction]: {
																			...appFunctionSettings,
																			shortcutKey: value,
																		},
																	},
																	false,
																	true,
																	false,
																	false,
																);
															}}
															maxLength={1}
														/>
													</FunctionButton>
												</div>
											);
										})}
								</Space>
							</Spin>
						</div>
					);
				})}

			<Divider />

			{/* In-App Hotkeys: Common Key Events */}
			{keyEventFormItemListKeys
				.filter((_configGroup) => {
					return true;
				})
				.map((configGroup, index) => {
					return (
						<div key={configGroup}>
							<GroupTitle
								id={configGroup}
								extra={
									<ResetSettingsButton
										title={
											<FormattedMessage
												id={`settings.hotKeySettings.${configGroup}`}
												key={configGroup}
											/>
										}
										appSettingsGroup={AppSettingsGroup.CommonKeyEvent}
										filter={(settings) => {
											return Object.keys(settings).reduce(
												(acc, key) => {
													if (
														commonKeyEvent[key as CommonKeyEventKey].group ===
														configGroup
													) {
														acc[key] = settings[key];
													}
													return acc;
												},
												{} as Record<string, unknown>,
											);
										}}
									/>
								}
							>
								<FormattedMessage
									id={`settings.hotKeySettings.${configGroup}`}
								/>
							</GroupTitle>
							<Spin spinning={hotKeySettingsLoading}>
								<Row gutter={token.marginLG}>
									{keyEventFormItemList[configGroup as CommonKeyEventGroup]}
								</Row>
							</Spin>

							{index !== keyEventFormItemListKeys.length - 1 && <Divider />}
						</div>
					);
				})}

			<Divider />

			{/* In-App Hotkeys: Drawing Hotkeys */}
			<GroupTitle
				id="drawingHotKey"
				extra={
					<ResetSettingsButton
						title={
							<FormattedMessage
								id="settings.drawingHotKey"
								key="drawingHotKey"
							/>
						}
						appSettingsGroup={AppSettingsGroup.DrawToolbarKeyEvent}
					/>
				}
			>
				<FormattedMessage id="settings.drawingHotKey" />
			</GroupTitle>

			<Form
				className="settings-form common-settings-form"
				form={drawToolbarKeyEventForm}
			>
				<Spin spinning={hotKeySettingsLoading}>
					<Row gutter={token.marginLG}>{drawToolbarKeyEventFormItemList}</Row>
				</Spin>
			</Form>
		</ContentWrap>
	);
};
