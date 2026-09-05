"use client";

import ProForm, {
	ProFormDependency,
	ProFormList,
	ProFormSelect,
	ProFormSwitch,
	ProFormText,
	ProFormTextArea,
} from "@ant-design/pro-form";
import {
	Alert,
	Col,
	Divider,
	Flex,
	Form,
	Row,
	Select,
	Spin,
	Typography,
	theme,
} from "antd";
import { useCallback, useContext, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ContentWrap } from "@/components/contentWrap";
import { DirectoryInput } from "@/components/directoryInput";
import { GroupTitle } from "@/components/groupTitle";
import { IconLabel } from "@/components/iconLable";
import { ResetSettingsButton } from "@/components/resetSettingsButton";
import { FOCUS_WINDOW_APP_NAME_ENV_VARIABLE } from "@/constants/components/screenshot";
import {
	SOURCE_LANGUAGE_ENV_VARIABLE,
	TARGET_LANGUAGE_ENV_VARIABLE,
	TRANSLATION_DOMAIN_ENV_VARIABLE,
} from "@/constants/components/translation";
import { PLUGIN_ID_TRANSLATE } from "@/constants/pluginService";
import { AppSettingsActionContext } from "@/contexts/appSettingsActionContext";
import { usePluginServiceContext } from "@/contexts/pluginServiceContext";
import { useAppSettingsLoad } from "@/hooks/useAppSettingsLoad";
import { usePlatform } from "@/hooks/usePlatform";
import {
	type AppSettingsData,
	AppSettingsFixedContentInitialPosition,
	AppSettingsGroup,
	DoubleClickAction,
	OcrDetectAfterAction,
	OcrModel,
	TranslationApiType,
	TrayIconClickAction,
} from "@/types/appSettings";
import { DrawState } from "@/types/draw";
import { ImageFormat } from "@/types/utils/file";
import { generateImageFileName, getImageSaveDirectory } from "@/utils/file";
import { TranslationConfig } from "./components/translationConfig";

export const FunctionSettingsPage = () => {
	const intl = useIntl();
	const { token } = theme.useToken();

	const { updateAppSettings } = useContext(AppSettingsActionContext);
	const [functionDrawForm] =
		Form.useForm<AppSettingsData[AppSettingsGroup.FunctionDraw]>();
	const [trayIconForm] =
		Form.useForm<AppSettingsData[AppSettingsGroup.FunctionTrayIcon]>();
	const [translationForm] =
		Form.useForm<AppSettingsData[AppSettingsGroup.FunctionTranslation]>();
	const [screenshotForm] =
		Form.useForm<AppSettingsData[AppSettingsGroup.FunctionScreenshot]>();
	const [outputForm] =
		Form.useForm<AppSettingsData[AppSettingsGroup.FunctionOutput]>();
	const [fullScreenDrawForm] =
		Form.useForm<AppSettingsData[AppSettingsGroup.FunctionFullScreenDraw]>();
	const [fixedContentForm] =
		Form.useForm<AppSettingsData[AppSettingsGroup.FunctionFixedContent]>();
	const [functionOcrForm] =
		Form.useForm<AppSettingsData[AppSettingsGroup.FunctionOcr]>();
	const [functionGlobalShortcutForm] =
		Form.useForm<AppSettingsData[AppSettingsGroup.FunctionGlobalShortcut]>();

	const [appSettingsLoading, setAppSettingsLoading] = useState(true);
	const [platform] = usePlatform();

	useAppSettingsLoad(
		useCallback(
			(settings: AppSettingsData, preSettings?: AppSettingsData) => {
				setAppSettingsLoading(false);

				if (
					preSettings === undefined ||
					preSettings[AppSettingsGroup.FunctionTranslation] !==
						settings[AppSettingsGroup.FunctionTranslation]
				) {
					translationForm.setFieldsValue(
						settings[AppSettingsGroup.FunctionTranslation],
					);
				}

				if (
					preSettings === undefined ||
					preSettings[AppSettingsGroup.FunctionDraw] !==
						settings[AppSettingsGroup.FunctionDraw]
				) {
					functionDrawForm.setFieldsValue(
						settings[AppSettingsGroup.FunctionDraw],
					);
				}

				if (
					preSettings === undefined ||
					preSettings[AppSettingsGroup.FunctionScreenshot] !==
						settings[AppSettingsGroup.FunctionScreenshot]
				) {
					screenshotForm.setFieldsValue(
						settings[AppSettingsGroup.FunctionScreenshot],
					);

					const screenshotSettings =
						settings[AppSettingsGroup.FunctionScreenshot];
					if (!screenshotSettings.saveFileDirectory) {
						getImageSaveDirectory(settings).then((saveDirectory) => {
							screenshotSettings.saveFileDirectory = saveDirectory;
							screenshotForm.setFieldsValue(screenshotSettings);
						});
					}
				}

				if (
					preSettings === undefined ||
					preSettings[AppSettingsGroup.FunctionOutput] !==
						settings[AppSettingsGroup.FunctionOutput]
				) {
					outputForm.setFieldsValue(settings[AppSettingsGroup.FunctionOutput]);
				}

				if (
					preSettings === undefined ||
					preSettings[AppSettingsGroup.FunctionFixedContent] !==
						settings[AppSettingsGroup.FunctionFixedContent]
				) {
					fixedContentForm.setFieldsValue(
						settings[AppSettingsGroup.FunctionFixedContent],
					);
				}

				if (
					preSettings === undefined ||
					preSettings[AppSettingsGroup.FunctionFullScreenDraw] !==
						settings[AppSettingsGroup.FunctionFullScreenDraw]
				) {
					fullScreenDrawForm.setFieldsValue(
						settings[AppSettingsGroup.FunctionFullScreenDraw],
					);
				}

				if (
					preSettings === undefined ||
					preSettings[AppSettingsGroup.FunctionTrayIcon] !==
						settings[AppSettingsGroup.FunctionTrayIcon]
				) {
					trayIconForm.setFieldsValue(
						settings[AppSettingsGroup.FunctionTrayIcon],
					);
				}

				if (
					preSettings === undefined ||
					preSettings[AppSettingsGroup.FunctionOcr] !==
						settings[AppSettingsGroup.FunctionOcr]
				) {
					functionOcrForm.setFieldsValue(
						settings[AppSettingsGroup.FunctionOcr],
					);
				}

				if (
					preSettings === undefined ||
					preSettings[AppSettingsGroup.FunctionGlobalShortcut] !==
						settings[AppSettingsGroup.FunctionGlobalShortcut]
				) {
					functionGlobalShortcutForm.setFieldsValue(
						settings[AppSettingsGroup.FunctionGlobalShortcut],
					);
				}
			},
			[
				translationForm,
				functionDrawForm,
				screenshotForm,
				outputForm,
				fixedContentForm,
				fullScreenDrawForm,
				trayIconForm,
				functionOcrForm,
				functionGlobalShortcutForm,
			],
		),
		true,
	);

	const { isReadyStatus } = usePluginServiceContext();

	const trayIconClickActionOptions = useMemo(() => {
		return [
			{
				label: intl.formatMessage({
					id: "settings.functionSettings.trayIconSettings.iconClickAction.screenshot",
				}),
				value: TrayIconClickAction.Screenshot,
			},
			{
				label: intl.formatMessage({
					id: "settings.functionSettings.trayIconSettings.iconClickAction.showMainWindow",
				}),
				value: TrayIconClickAction.ShowMainWindow,
			},
		];
	}, [intl]);

	const disableQuickSelectElementToolListOptions = useMemo(() => {
		return [
			{
				label: intl.formatMessage({
					id: "draw.rectTool",
				}),
				value: DrawState.Rect,
			},
			{
				label: intl.formatMessage({
					id: "draw.diamondTool",
				}),
				value: DrawState.Diamond,
			},
			{
				label: intl.formatMessage({
					id: "draw.ellipseTool",
				}),
				value: DrawState.Ellipse,
			},
			{
				label: intl.formatMessage({
					id: "draw.arrowTool",
				}),
				value: DrawState.Arrow,
			},
			{
				label: intl.formatMessage({
					id: "draw.lineTool",
				}),
				value: DrawState.Line,
			},
			{
				label: intl.formatMessage({
					id: "draw.penTool",
				}),
				value: DrawState.Pen,
			},
			{
				label: intl.formatMessage({
					id: "draw.serialNumberTool",
				}),
				value: DrawState.SerialNumber,
			},
			{
				label: intl.formatMessage({
					id: "draw.blurTool",
				}),
				value: DrawState.Blur,
			},
		];
	}, [intl]);

	const ocrAfterActionOptions = useMemo(() => {
		return [
			{
				label: intl.formatMessage({
					id: "settings.functionSettings.screenshotSettings.ocrAfterAction.none",
				}),
				value: OcrDetectAfterAction.None,
			},
			{
				label: intl.formatMessage({
					id: "settings.functionSettings.screenshotSettings.ocrAfterAction.copyText",
				}),
				value: OcrDetectAfterAction.CopyText,
			},
			{
				label: intl.formatMessage({
					id: "settings.functionSettings.screenshotSettings.ocrAfterAction.copyTextAndCloseWindow",
				}),
				value: OcrDetectAfterAction.CopyTextAndCloseWindow,
			},
			{
				label: intl.formatMessage({
					id: "settings.functionSettings.screenshotSettings.ocrAfterAction.ocrDetectCopyText",
				}),
				value: OcrDetectAfterAction.OcrDetectCopyText,
			},
			{
				label: intl.formatMessage({
					id: "settings.functionSettings.screenshotSettings.ocrAfterAction.ocrDetectCopyTextAndCloseWindow",
				}),
				value: OcrDetectAfterAction.OcrDetectCopyTextAndCloseWindow,
			},
		];
	}, [intl]);

	const initialPositionOptions = useMemo(() => {
		return [
			{
				label: intl.formatMessage({
					id: "settings.functionSettings.fixedContentSettings.initialPosition.monitorCenter",
				}),
				value: AppSettingsFixedContentInitialPosition.MonitorCenter,
			},
			{
				label: intl.formatMessage({
					id: "settings.functionSettings.fixedContentSettings.initialPosition.mousePosition",
				}),
				value: AppSettingsFixedContentInitialPosition.MousePosition,
			},
		];
	}, [intl]);

	const fullScreenDrawDefaultToolOptions = useMemo(() => {
		return [
			{
				label: intl.formatMessage({
					id: "draw.selectTool",
				}),
				value: DrawState.Select,
			},
			{
				label: intl.formatMessage({
					id: "draw.penTool",
				}),
				value: DrawState.Pen,
			},
			{
				label: intl.formatMessage({
					id: "draw.laserPointerTool",
				}),
				value: DrawState.LaserPointer,
			},
		];
	}, [intl]);

	const translationApiTypeOptions = useMemo(() => {
		return [
			{
				label: intl.formatMessage({
					id: "settings.functionSettings.translationSettings.apiConfig.apiType.deepL",
				}),
				value: TranslationApiType.DeepL,
			},
		];
	}, [intl]);

	const ocrModelOptions = useMemo(() => {
		return [
			{
				label: intl.formatMessage({
					id: "settings.systemSettings.screenshotSettings.ocrModel.rapidOcrV4",
				}),
				value: OcrModel.RapidOcrV4,
			},
			{
				label: intl.formatMessage({
					id: "settings.systemSettings.screenshotSettings.ocrModel.rapidOcrV5",
				}),
				value: OcrModel.RapidOcrV5,
			},
		];
	}, [intl]);

	const doubleClickActionOptions = useMemo(() => {
		return [
			{
				label: intl.formatMessage({ id: "draw.doubleClickAction.copy" }),
				value: DoubleClickAction.Copy,
			},
			{
				label: intl.formatMessage({ id: "draw.doubleClickAction.save" }),
				value: DoubleClickAction.Save,
			},
			{
				label: intl.formatMessage({
					id: "draw.doubleClickAction.fixedToScreen",
				}),
				value: DoubleClickAction.FixedToScreen,
			},
			{
				label: intl.formatMessage({ id: "draw.doubleClickAction.none" }),
				value: DoubleClickAction.None,
			},
		];
	}, [intl]);

	return (
		<ContentWrap>
			<GroupTitle
				id="screenshotSettings"
				extra={
					<ResetSettingsButton
						title={
							<FormattedMessage id="settings.functionSettings.screenshotSettings" />
						}
						appSettingsGroup={AppSettingsGroup.FunctionScreenshot}
					/>
				}
			>
				<FormattedMessage id="settings.functionSettings.screenshotSettings" />
			</GroupTitle>

			<Spin spinning={appSettingsLoading}>
				<ProForm
					form={screenshotForm}
					onValuesChange={(_, values) => {
						updateAppSettings(
							AppSettingsGroup.FunctionScreenshot,
							values,
							true,
							true,
							true,
							true,
							false,
						);
					}}
					submitter={false}
					layout="horizontal"
				>
					<Row gutter={token.marginLG}>
						{platform !== "macos" && (
							<Col span={12}>
								<ProFormSwitch
									name="findChildrenElements"
									layout="horizontal"
									label={
										<FormattedMessage id="settings.functionSettings.screenshotSettings.findChildrenElements" />
									}
								/>
							</Col>
						)}

						<Col span={12}>
							<ProFormSwitch
								label={
									<IconLabel
										label={
											<FormattedMessage id="settings.functionSettings.screenshotSettings.shortcutCanleTip" />
										}
										tooltipTitle={
											<FormattedMessage id="settings.functionSettings.screenshotSettings.shortcutCanleTip.tip" />
										}
									/>
								}
								name="shortcutCanleTip"
								layout="horizontal"
							/>
						</Col>
					</Row>

					{
						<Row gutter={token.marginLG}>
							<Col span={12}>
								<ProFormSelect
									name="ocrAfterAction"
									layout="horizontal"
									label={
										<FormattedMessage id="settings.functionSettings.screenshotSettings.ocrAfterAction" />
									}
									options={ocrAfterActionOptions}
								/>
							</Col>

							<Col span={12}>
								<ProFormSwitch
									name="ocrCopyText"
									layout="horizontal"
									label={
										<FormattedMessage id="settings.functionSettings.screenshotSettings.ocrCopyText" />
									}
								/>
							</Col>
						</Row>
					}

					<Row gutter={token.marginLG}>
						<Col span={12}>
							<ProFormSelect
								name="doubleClickAction"
								layout="horizontal"
								label={
									<IconLabel
										label={<FormattedMessage id="draw.doubleClickAction" />}
									/>
								}
								options={doubleClickActionOptions}
							/>
						</Col>
					</Row>

					<Row gutter={token.marginLG}>
						<Col span={12}>
							<ProFormSwitch
								name="focusedWindowCopyToClipboard"
								layout="horizontal"
								label={
									<FormattedMessage id="settings.functionSettings.screenshotSettings.focusedWindowCopyToClipboard" />
								}
							/>
						</Col>

						<Col span={12}>
							<ProFormSwitch
								name="fullScreenCopyToClipboard"
								layout="horizontal"
								label={
									<FormattedMessage id="settings.functionSettings.screenshotSettings.fullScreenCopyToClipboard" />
								}
							/>
						</Col>
					</Row>

					<Row gutter={token.marginLG}>
						<Col span={12}>
							<ProFormSwitch
								name="copyImageFileToClipboard"
								layout="horizontal"
								label={
									<IconLabel
										label={
											<FormattedMessage id="draw.copyImageFileToClipboard" />
										}
										tooltipTitle={
											<FormattedMessage id="draw.copyImageFileToClipboard.tip" />
										}
									/>
								}
							/>
						</Col>

						<Col span={12}>
							<ProFormSwitch
								name="autoSaveOnCopy"
								layout="horizontal"
								label={
									<FormattedMessage id="settings.functionSettings.screenshotSettings.autoSaveFileMode.autoSave" />
								}
							/>
						</Col>

						<Col span={12}>
							<ProFormSwitch
								name="fastSave"
								layout="horizontal"
								label={
									<IconLabel
										label={
											<FormattedMessage id="settings.functionSettings.screenshotSettings.autoSaveFileMode.fastSave" />
										}
										tooltipTitle={
											<FormattedMessage id="settings.functionSettings.screenshotSettings.autoSaveFileMode.fastSave.tip" />
										}
									/>
								}
							/>
						</Col>
					</Row>

					<Row gutter={token.marginLG}>
						<Col span={12}>
							<ProForm.Item
								name="saveFileDirectory"
								label={
									<IconLabel
										label={
											<FormattedMessage id="settings.functionSettings.screenshotSettings.autoSaveFileMode.directory" />
										}
									/>
								}
								required={false}
							>
								<DirectoryInput />
							</ProForm.Item>
						</Col>

						<Col span={12}>
							<ProForm.Item
								name="saveFileFormat"
								label={
									<FormattedMessage id="settings.functionSettings.screenshotSettings.autoSaveFileMode.saveFileFormat" />
								}
							>
								<Select
									options={[
										{
											label: "PNG(*.png)",
											value: ImageFormat.PNG,
										},
										{
											label: "JPEG(*.jpg)",
											value: ImageFormat.JPEG,
										},
										{
											label: "WEBP(*.webp)",
											value: ImageFormat.WEBP,
										},
										{
											label: "AVIF(*.avif)",
											value: ImageFormat.AVIF,
										},
										{
											label: "JPEG XL(*.jxl)",
											value: ImageFormat.JPEG_XL,
										},
									]}
								/>
							</ProForm.Item>
						</Col>
					</Row>
				</ProForm>
			</Spin>

			<Divider />

			<GroupTitle
				id="functionDrawSettings"
				extra={
					<ResetSettingsButton
						title={intl.formatMessage({ id: "settings.commonSettings.draw" })}
						appSettingsGroup={AppSettingsGroup.FunctionDraw}
					/>
				}
			>
				<FormattedMessage id="settings.commonSettings.draw" />
			</GroupTitle>

			<ProForm<AppSettingsData[AppSettingsGroup.FunctionDraw]>
				className="settings-form common-draw-settings-form"
				form={functionDrawForm}
				submitter={false}
				onValuesChange={(_, values) => {
					updateAppSettings(
						AppSettingsGroup.FunctionDraw,
						values,
						true,
						true,
						true,
						true,
						false,
					);
				}}
				layout="horizontal"
			>
				<Spin spinning={appSettingsLoading}>
					<Row gutter={token.marginLG}>
						<Col span={12}>
							<ProFormSwitch
								name="lockDrawTool"
								label={
									<IconLabel
										label={
											<FormattedMessage id="settings.functionSettings.screenshotSettings.lockDrawTool" />
										}
									/>
								}
							/>
						</Col>

						<Col span={12}>
							<ProFormSwitch
								name="enableSliderChangeWidth"
								label={
									<IconLabel
										label={
											<FormattedMessage id="settings.commonSettings.draw.enableSliderChangeWidth" />
										}
										tooltipTitle={
											<FormattedMessage id="settings.commonSettings.draw.enableSliderChangeWidth.tip" />
										}
									/>
								}
							/>
						</Col>

						<Col span={12}>
							<ProFormSwitch
								name="toolIndependentStyle"
								label={
									<IconLabel
										label={
											<FormattedMessage id="settings.commonSettings.draw.toolIndependentStyle" />
										}
										tooltipTitle={
											<FormattedMessage id="settings.commonSettings.draw.toolIndependentStyle.tip" />
										}
									/>
								}
							/>
						</Col>
					</Row>

					<Row gutter={token.marginLG}>
						<Col span={24}>
							<ProFormSelect
								name="disableQuickSelectElementToolList"
								label={
									<IconLabel
										label={
											<FormattedMessage id="settings.functionSettings.drawSettings.disableQuickSelectElementToolList" />
										}
										tooltipTitle={
											<FormattedMessage id="settings.functionSettings.drawSettings.disableQuickSelectElementToolList.tip" />
										}
									/>
								}
								mode="multiple"
								options={disableQuickSelectElementToolListOptions}
							/>
						</Col>
					</Row>
				</Spin>
			</ProForm>

			<Divider />

			<GroupTitle
				id="fixedContentSettings"
				extra={
					<ResetSettingsButton
						title={
							<FormattedMessage id="settings.functionSettings.fixedContentSettings" />
						}
						appSettingsGroup={AppSettingsGroup.FunctionFixedContent}
					/>
				}
			>
				<FormattedMessage id="settings.functionSettings.fixedContentSettings" />
			</GroupTitle>

			<Spin spinning={appSettingsLoading}>
				<ProForm
					form={fixedContentForm}
					onValuesChange={(_, values) => {
						updateAppSettings(
							AppSettingsGroup.FunctionFixedContent,
							values,
							true,
							true,
							true,
							true,
							false,
						);
					}}
					submitter={false}
					layout="horizontal"
				>
					<Row gutter={token.marginLG}>
						<Col span={12}>
							<ProFormSwitch
								name="zoomWithMouse"
								layout="horizontal"
								label={
									<FormattedMessage id="settings.functionSettings.fixedContentSettings.zoomWithMouse" />
								}
							/>
						</Col>

						<Col span={12}>
							<ProFormSelect
								name="initialPosition"
								layout="horizontal"
								label={
									<FormattedMessage id="settings.functionSettings.fixedContentSettings.initialPosition" />
								}
								options={initialPositionOptions}
							/>
						</Col>

						{
							<Col span={12}>
								<ProFormSwitch
									label={
										<FormattedMessage id="settings.functionSettings.fixedContentSettings.autoOcr" />
									}
									name="autoOcr"
									layout="horizontal"
								/>
							</Col>
						}

						<Col span={12}>
							<ProFormSwitch
								name="autoResizeWindow"
								layout="horizontal"
								label={
									<IconLabel
										label={
											<FormattedMessage id="settings.functionSettings.fixedContentSettings.autoResizeWindow" />
										}
										tooltipTitle={
											<FormattedMessage id="settings.functionSettings.fixedContentSettings.autoResizeWindow.tip" />
										}
									/>
								}
							/>
						</Col>

						<Col span={12}>
							<ProFormSwitch
								label={
									<FormattedMessage id="settings.functionSettings.fixedContentSettings.autoCopyToClipboard" />
								}
								name="autoCopyToClipboard"
								layout="horizontal"
							/>
						</Col>
					</Row>
				</ProForm>
			</Spin>

			{
				<>
					<Divider />

					<GroupTitle
						id="ocrSettings"
						extra={
							<ResetSettingsButton
								title={
									<FormattedMessage id="settings.functionSettings.ocrSettings" />
								}
								appSettingsGroup={AppSettingsGroup.FunctionOcr}
							/>
						}
					>
						<FormattedMessage id="settings.functionSettings.ocrSettings" />
					</GroupTitle>

					<Spin spinning={appSettingsLoading}>
						<ProForm
							form={functionOcrForm}
							onValuesChange={(_, values) => {
								updateAppSettings(
									AppSettingsGroup.FunctionOcr,
									values,
									true,
									true,
									true,
									true,
									false,
								);
							}}
							submitter={false}
							layout="vertical"
						>
							<Row gutter={token.marginLG}>
								<Col span={12}>
									<ProFormSelect
										label={
											<IconLabel
												label={
													<FormattedMessage id="settings.systemSettings.screenshotSettings.ocrModel" />
												}
											/>
										}
										name="ocrModel"
										options={ocrModelOptions}
									/>
								</Col>
							</Row>
						</ProForm>
					</Spin>
				</>
			}

			{isReadyStatus?.(PLUGIN_ID_TRANSLATE) && (
				<>
					<Divider />

					<GroupTitle
						id="translationSettings"
						extra={
							<ResetSettingsButton
								title={
									<FormattedMessage id="settings.functionSettings.translationSettings" />
								}
								appSettingsGroup={AppSettingsGroup.FunctionTranslation}
							/>
						}
					>
						<FormattedMessage id="settings.functionSettings.translationSettings" />
					</GroupTitle>

					<Spin spinning={appSettingsLoading}>
						<TranslationConfig />

						<ProForm
							form={translationForm}
							onValuesChange={(_, values) => {
								updateAppSettings(
									AppSettingsGroup.FunctionTranslation,
									values,
									true,
									true,
									true,
									true,
									false,
								);
							}}
							submitter={false}
						>
							<Row gutter={token.marginLG}>
								<Col span={12}>
									<ProFormSwitch
										name="optimizeAiTranslationLayout"
										label={
											<IconLabel
												label={
													<FormattedMessage id="settings.functionSettings.translationSettings.optimizeAiTranslationLayout" />
												}
												tooltipTitle={
													<FormattedMessage id="settings.functionSettings.translationSettings.optimizeAiTranslationLayout.tip" />
												}
											/>
										}
										layout="vertical"
									/>
								</Col>
							</Row>

							<Row gutter={token.marginLG}>
								<Col span={24}>
									<ProFormList
										name="translationApiConfigList"
										label={
											<IconLabel
												label={
													<FormattedMessage id="settings.functionSettings.translationSettings.apiConfig" />
												}
											/>
										}
										creatorButtonProps={{
											creatorButtonText: intl.formatMessage({
												id: "settings.functionSettings.translationSettings.apiConfig.add",
											}),
										}}
										className="api-config-list"
										min={0}
										itemRender={({ listDom, action }) => (
											<Flex align="end" justify="space-between">
												{listDom}

												<div>{action}</div>
											</Flex>
										)}
										creatorRecord={() => ({
											api_uri: "",
											api_key: "",
											api_type: TranslationApiType.DeepL,
										})}
									>
										<Row gutter={token.marginLG} style={{ width: "100%" }}>
											<Col span={12}>
												<ProFormSelect
													name="api_type"
													label={
														<IconLabel
															label={
																<FormattedMessage id="settings.functionSettings.translationSettings.apiConfig.apiType" />
															}
														/>
													}
													allowClear={false}
													options={translationApiTypeOptions}
												/>
											</Col>
											<Col span={12}>
												<ProFormText
													name="api_uri"
													label={
														<IconLabel
															label={
																<FormattedMessage id="settings.functionSettings.translationSettings.apiConfig.apiUri" />
															}
															tooltipTitle={
																<FormattedMessage id="settings.functionSettings.translationSettings.apiConfig.apiUri.tip" />
															}
														/>
													}
													rules={[
														{
															required: true,
															message: intl.formatMessage({
																id: "settings.functionSettings.translationSettings.apiConfig.apiUri.required",
															}),
														},
													]}
												/>
											</Col>
											<Col span={12}>
												<ProFormText.Password
													name="api_key"
													label={
														<IconLabel
															label={
																<FormattedMessage id="settings.functionSettings.translationSettings.apiConfig.apiKey" />
															}
															tooltipTitle={
																<FormattedMessage id="settings.functionSettings.translationSettings.apiConfig.apiKey.tip" />
															}
														/>
													}
													rules={[
														{
															required: true,
															message: intl.formatMessage({
																id: "settings.functionSettings.translationSettings.apiConfig.apiKey.required",
															}),
														},
													]}
												/>
											</Col>

											<ProFormDependency<{ api_type: TranslationApiType }>
												name={["api_type"]}
											>
												{({ api_type }) => {
													if (api_type === TranslationApiType.DeepL) {
														return (
															<Col span={12}>
																<ProFormSwitch
																	name="deepl_prefer_quality_optimized"
																	label={
																		<IconLabel
																			label={
																				<FormattedMessage id="settings.functionSettings.translationSettings.apiConfig.deeplPreferQualityOptimized" />
																			}
																			tooltipTitle={
																				<FormattedMessage id="settings.functionSettings.translationSettings.apiConfig.deeplPreferQualityOptimized.tip" />
																			}
																		/>
																	}
																/>
															</Col>
														);
													}

													return null;
												}}
											</ProFormDependency>
										</Row>
									</ProFormList>
								</Col>
							</Row>

							<Row gutter={token.marginLG}>
								<Col span={24}>
									<Alert
										message={
											<Typography>
												<Row>
													<Col span={24}>
														<FormattedMessage id="settings.functionSettings.translationSettings.chatPrompt.variables" />
													</Col>
													<Col span={12}>
														<FormattedMessage id="settings.functionSettings.translationSettings.chatPrompt.sourceLanguage" />
														<code>{SOURCE_LANGUAGE_ENV_VARIABLE}</code>
													</Col>
													<Col span={12}>
														<FormattedMessage id="settings.functionSettings.translationSettings.chatPrompt.targetLanguage" />
														<code>{TARGET_LANGUAGE_ENV_VARIABLE}</code>
													</Col>
													<Col span={12}>
														<FormattedMessage id="settings.functionSettings.translationSettings.chatPrompt.translationDomain" />
														<code>{TRANSLATION_DOMAIN_ENV_VARIABLE}</code>
													</Col>
												</Row>
											</Typography>
										}
										type="info"
										style={{ marginBottom: token.margin }}
									/>
									<ProFormTextArea
										label={
											<IconLabel
												label={
													<FormattedMessage id="settings.functionSettings.translationSettings.chatPrompt" />
												}
												tooltipTitle={
													<FormattedMessage id="settings.functionSettings.translationSettings.chatPrompt.tip" />
												}
											/>
										}
										layout="horizontal"
										name="translationSystemPrompt"
										rules={[
											{
												required: true,
												message: intl.formatMessage({
													id: "settings.functionSettings.translationSettings.chatPrompt.required",
												}),
											},
										]}
										fieldProps={{
											autoSize: {
												minRows: 1,
												maxRows: 1,
											},
										}}
									/>
								</Col>
							</Row>
						</ProForm>
					</Spin>
				</>
			)}

			<Divider />

			<GroupTitle
				id="fullScreenDrawSettings"
				extra={
					<ResetSettingsButton
						title={
							<FormattedMessage id="settings.functionSettings.fullScreenDrawSettings" />
						}
						appSettingsGroup={AppSettingsGroup.FunctionFullScreenDraw}
					/>
				}
			>
				<FormattedMessage id="settings.functionSettings.fullScreenDrawSettings" />
			</GroupTitle>

			<Spin spinning={appSettingsLoading}>
				<ProForm
					form={fullScreenDrawForm}
					onValuesChange={(_, values) => {
						updateAppSettings(
							AppSettingsGroup.FunctionFullScreenDraw,
							values,
							true,
							true,
							true,
							true,
							false,
						);
					}}
					submitter={false}
					layout="horizontal"
				>
					<Row gutter={token.marginLG}>
						<Col span={12}>
							<ProFormSelect
								name="defaultTool"
								layout="horizontal"
								label={
									<FormattedMessage id="settings.functionSettings.fullScreenDrawSettings.defaultTool" />
								}
								options={fullScreenDrawDefaultToolOptions}
							/>
						</Col>
					</Row>
				</ProForm>
			</Spin>

			<Divider />

			<GroupTitle
				id="trayIconSettings"
				extra={
					<ResetSettingsButton
						title={
							<FormattedMessage id="settings.functionSettings.trayIconSettings" />
						}
						appSettingsGroup={AppSettingsGroup.FunctionTrayIcon}
					/>
				}
			>
				<FormattedMessage id="settings.functionSettings.trayIconSettings" />
			</GroupTitle>

			<Spin spinning={appSettingsLoading}>
				<ProForm
					form={trayIconForm}
					onValuesChange={(_, values) => {
						updateAppSettings(
							AppSettingsGroup.FunctionTrayIcon,
							values,
							true,
							true,
							false,
							true,
							false,
						);
					}}
					submitter={false}
					layout="horizontal"
				>
					<Row gutter={token.marginLG}>
						<Col span={12}>
							<ProFormSelect
								name="iconClickAction"
								label={
									<FormattedMessage id="settings.functionSettings.trayIconSettings.iconClickAction" />
								}
								options={trayIconClickActionOptions}
							/>
						</Col>
					</Row>
				</ProForm>
			</Spin>

			<Divider />

			<GroupTitle
				id="globalShortcutSettings"
				extra={
					<ResetSettingsButton
						title={
							<FormattedMessage id="settings.functionSettings.globalShortcutSettings" />
						}
						appSettingsGroup={AppSettingsGroup.FunctionGlobalShortcut}
					/>
				}
			>
				<FormattedMessage id="settings.functionSettings.globalShortcutSettings" />
			</GroupTitle>

			<Spin spinning={appSettingsLoading}>
				<ProForm
					form={functionGlobalShortcutForm}
					onValuesChange={(_, values) => {
						updateAppSettings(
							AppSettingsGroup.FunctionGlobalShortcut,
							values,
							true,
							true,
							false,
							true,
							false,
						);
					}}
					submitter={false}
					layout="horizontal"
				>
					<Row gutter={token.marginLG}>
						<Col span={12}>
							<ProFormSwitch
								name="disableOnFocusedFullScreenWindow"
								layout="horizontal"
								label={
									<FormattedMessage id="settings.functionSettings.globalShortcutSettings.disableOnFocusedFullScreenWindow" />
								}
							/>
						</Col>
					</Row>
				</ProForm>
			</Spin>

			<Divider />

			<GroupTitle
				id="outputSettings"
				extra={
					<ResetSettingsButton
						title={
							<FormattedMessage id="settings.functionSettings.outputSettings" />
						}
						appSettingsGroup={AppSettingsGroup.FunctionOutput}
					/>
				}
			>
				<FormattedMessage id="settings.functionSettings.outputSettings" />
			</GroupTitle>

			<Alert
				message={
					<Typography>
						<Row>
							<Col span={24}>
								<FormattedMessage id="settings.functionSettings.outputSettings.variables" />
							</Col>
							<Col span={12}>
								<FormattedMessage id="settings.functionSettings.outputSettings.variables.date" />
								<code>{"{{YYYY-MM-DD_HH-mm-ss}}"}</code>
							</Col>
							<Col span={12}>
								<FormattedMessage id="settings.functionSettings.outputSettings.variables.focusedWindowAppName" />
								<code>{FOCUS_WINDOW_APP_NAME_ENV_VARIABLE}</code>
							</Col>
						</Row>
					</Typography>
				}
				type="info"
				style={{ marginBottom: token.margin }}
			/>

			<Spin spinning={appSettingsLoading}>
				<ProForm
					form={outputForm}
					onValuesChange={(_, values) => {
						updateAppSettings(
							AppSettingsGroup.FunctionOutput,
							values,
							true,
							true,
							true,
							true,
							false,
						);
					}}
					submitter={false}
					layout="horizontal"
				>
					<Row gutter={token.marginLG}>
						<Col span={24}>
							<ProFormText
								name="manualSaveFileNameFormat"
								layout="horizontal"
								label={
									<FormattedMessage id="settings.functionSettings.outputSettings.manualSaveFileNameFormat" />
								}
							/>
						</Col>

						<ProFormDependency<{ manualSaveFileNameFormat: string }>
							name={["manualSaveFileNameFormat"]}
						>
							{({ manualSaveFileNameFormat }) => {
								const text = generateImageFileName(manualSaveFileNameFormat);
								return (
									<Col span={24}>
										<ProFormText
											layout="horizontal"
											readonly
											label={
												<FormattedMessage id="settings.functionSettings.outputSettings.manualSaveFileNameFormatPreview" />
											}
											fieldProps={{
												value: text,
											}}
										/>
									</Col>
								);
							}}
						</ProFormDependency>

						<Col span={24}>
							<ProFormText
								name="autoSaveFileNameFormat"
								layout="horizontal"
								label={
									<FormattedMessage id="settings.functionSettings.outputSettings.autoSaveFileNameFormat" />
								}
							/>
						</Col>

						<ProFormDependency<{ autoSaveFileNameFormat: string }>
							name={["autoSaveFileNameFormat"]}
						>
							{({ autoSaveFileNameFormat }) => {
								const text = generateImageFileName(autoSaveFileNameFormat);
								return (
									<Col span={24}>
										<ProFormText
											layout="horizontal"
											readonly
											label={
												<FormattedMessage id="settings.functionSettings.outputSettings.autoSaveFileNameFormatPreview" />
											}
											fieldProps={{
												value: text,
											}}
										/>
									</Col>
								);
							}}
						</ProFormDependency>

						<Col span={24}>
							<ProFormText
								name="fastSaveFileNameFormat"
								layout="horizontal"
								label={
									<FormattedMessage id="settings.functionSettings.outputSettings.fastSaveFileNameFormat" />
								}
							/>
						</Col>

						<ProFormDependency<{ fastSaveFileNameFormat: string }>
							name={["fastSaveFileNameFormat"]}
						>
							{({ fastSaveFileNameFormat }) => {
								const text = generateImageFileName(fastSaveFileNameFormat);
								return (
									<Col span={24}>
										<ProFormText
											layout="horizontal"
											readonly
											label={
												<FormattedMessage id="settings.functionSettings.outputSettings.fastSaveFileNameFormatPreview" />
											}
											fieldProps={{
												value: text,
											}}
										/>
									</Col>
								);
							}}
						</ProFormDependency>

						<Col span={24}>
							<ProFormText
								name="focusedWindowFileNameFormat"
								layout="horizontal"
								label={
									<FormattedMessage id="settings.functionSettings.outputSettings.focusedWindowFileNameFormat" />
								}
							/>
						</Col>

						<ProFormDependency<{ focusedWindowFileNameFormat: string }>
							name={["focusedWindowFileNameFormat"]}
						>
							{({ focusedWindowFileNameFormat }) => {
								const text = generateImageFileName(focusedWindowFileNameFormat);
								return (
									<Col span={24}>
										<ProFormText
											layout="horizontal"
											readonly
											label={
												<FormattedMessage id="settings.functionSettings.outputSettings.focusedWindowFileNameFormatPreview" />
											}
											fieldProps={{
												value: text,
											}}
										/>
									</Col>
								);
							}}
						</ProFormDependency>

						<Col span={24}>
							<ProFormText
								name="fullScreenFileNameFormat"
								layout="horizontal"
								label={
									<FormattedMessage id="settings.functionSettings.outputSettings.fullScreenFileNameFormat" />
								}
							/>
						</Col>

						<ProFormDependency<{ fullScreenFileNameFormat: string }>
							name={["fullScreenFileNameFormat"]}
						>
							{({ fullScreenFileNameFormat }) => {
								const text = generateImageFileName(fullScreenFileNameFormat);
								return (
									<Col span={24}>
										<ProFormText
											layout="horizontal"
											readonly
											label={
												<FormattedMessage id="settings.functionSettings.outputSettings.fullScreenFileNameFormatPreview" />
											}
											fieldProps={{
												value: text,
											}}
										/>
									</Col>
								);
							}}
						</ProFormDependency>
					</Row>
				</ProForm>
			</Spin>

			<style jsx>{`
                :global(.api-config-list .ant-pro-form-list-container) {
                    width: 100%;
                }
            `}</style>
		</ContentWrap>
	);
};
