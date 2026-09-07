"use client";

import ProForm, { ProFormSelect, ProFormSwitch } from "@ant-design/pro-form";
import { Col, Divider, Form, Row, Spin, theme } from "antd";
import { useCallback, useContext, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ContentWrap } from "@/components/contentWrap";
import { GroupTitle } from "@/components/groupTitle";
import { IconLabel } from "@/components/iconLable";
import { ResetSettingsButton } from "@/components/resetSettingsButton";

import { AppSettingsActionContext } from "@/contexts/appSettingsActionContext";

import { useAppSettingsLoad } from "@/hooks/useAppSettingsLoad";
import { usePlatform } from "@/hooks/usePlatform";
import {
	type AppSettingsData,
	AppSettingsGroup,
	OcrDetectAfterAction,
	OcrModel,
} from "@/types/appSettings";
import { DrawState } from "@/types/draw";
import { getImageSaveDirectory } from "@/utils/file";


export const FunctionSettingsPage = () => {
	const intl = useIntl();
	const { token } = theme.useToken();
	const [platform] = usePlatform();

	const { updateAppSettings } = useContext(AppSettingsActionContext);
	const [functionDrawForm] =
		Form.useForm<AppSettingsData[AppSettingsGroup.FunctionDraw]>();

	const [screenshotForm] =
		Form.useForm<AppSettingsData[AppSettingsGroup.FunctionScreenshot]>();
	const [outputForm] =
		Form.useForm<AppSettingsData[AppSettingsGroup.FunctionOutput]>();
	const [functionOcrForm] =
		Form.useForm<AppSettingsData[AppSettingsGroup.FunctionOcr]>();

	const [appSettingsLoading, setAppSettingsLoading] = useState(true);

	useAppSettingsLoad(
		useCallback(
			(settings: AppSettingsData, preSettings?: AppSettingsData) => {
				setAppSettingsLoading(false);

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
					preSettings[AppSettingsGroup.FunctionOcr] !==
						settings[AppSettingsGroup.FunctionOcr]
				) {
					functionOcrForm.setFieldsValue(
						settings[AppSettingsGroup.FunctionOcr],
					);
				}
			},
			[functionDrawForm, screenshotForm, outputForm, functionOcrForm],
		),
		true,
	);

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
						</Row>
					}
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

			<style jsx>{`
                :global(.api-config-list .ant-pro-form-list-container) {
                    width: 100%;
                }
            `}</style>
		</ContentWrap>
	);
};
