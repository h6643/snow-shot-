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
import { AppSettingsActionContext } from "@/contexts/appSettingsActionContext";
import { useAppSettingsLoad } from "@/hooks/useAppSettingsLoad";
import { usePlatform } from "@/hooks/usePlatform";
import {
	type AppSettingsData,
	AppSettingsGroup,
	ShortcutKeyStatus,
} from "@/types/appSettings";
import { AppFunction } from "@/types/components/appFunction";
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

	const resetAllFilter = useCallback((settings: Record<string, unknown>) => {
		return settings as Partial<AppSettingsData[AppSettingsGroup.AppFunction]>;
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
	}, [currentPlatform, drawToolbarKeyEvent, updateAppSettings]);

	const keyEventFormItemList = useMemo(() => {
		const groupFormItemMap: Record<CommonKeyEventGroup, React.ReactNode[]> = {
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
			<div style={{ marginBottom: token.marginLG }}>
				<GroupTitle
					id="commonFunction"
					extra={
						<ResetSettingsButton
							title={<FormattedMessage id="home.commonFunction" />}
							appSettingsGroup={AppSettingsGroup.AppFunction}
							filter={resetAllFilter}
						/>
					}
				>
					<FormattedMessage id="home.commonFunction" />
				</GroupTitle>
				<Spin spinning={updateShortcutKeyStatusLoading || appSettingsLoading}>
					<Space direction="vertical" size="middle" style={{ display: "flex" }}>
						{Object.values(defaultAppFunctionComponentGroupConfigs)
							.flat()
							.filter((config) => {
								if (
									currentPlatform === "macos" &&
									config.configKey === AppFunction.TopWindow
								) {
									return false;
								}

								// 隐藏"固定剪贴板内容到屏幕"，避免与"固定到屏幕"混淆
								if (config.configKey === AppFunction.FixedContent) {
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
									<div key={`${key}`}>
										<FunctionButton
											label={config.title}
											icon={config.icon}
											onClick={config.onClick}
										>
											<KeyButton
												speicalKeys={["PrintScreen"]}
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
							<Form
								className="settings-form common-settings-form"
								form={_commonKeyEventForm}
							>
								<Spin spinning={hotKeySettingsLoading}>
									<Row gutter={token.marginLG}>
										{keyEventFormItemList[configGroup as CommonKeyEventGroup]}
									</Row>
								</Spin>
							</Form>

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
