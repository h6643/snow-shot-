"use client";

import ProForm from "@ant-design/pro-form";
import {
	Col,
	ColorPicker,
	Form,
	Row,
	Select,
	Slider,
	Spin,
	Switch,
	theme,
} from "antd";
import type { AggregationColor } from "antd/es/color-picker/color";
import { debounce } from "es-toolkit";
import { useCallback, useContext, useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ContentWrap } from "@/components/contentWrap";
import { GroupTitle } from "@/components/groupTitle";
import { IconLabel } from "@/components/iconLable";
import { DarkModeIcon } from "@/components/icons";
import { ResetSettingsButton } from "@/components/resetSettingsButton";
import { AppSettingsActionContext } from "@/contexts/appSettingsActionContext";
import { useAppSettingsLoad } from "@/hooks/useAppSettingsLoad";
import { useStateRef } from "@/hooks/useStateRef";
import {
	type AppSettingsData,
	AppSettingsGroup,
	AppSettingsTheme,
} from "@/types/appSettings";

export const AppearancePage = () => {
	const intl = useIntl();
	const { token } = theme.useToken();

	const { updateAppSettings } = useContext(AppSettingsActionContext);
	const [commonForm] = Form.useForm<AppSettingsData[AppSettingsGroup.Common]>();

	const [appSettingsLoading, setAppSettingsLoading] = useStateRef(true);
	useAppSettingsLoad(
		useCallback(
			(settings: AppSettingsData, preSettings?: AppSettingsData) => {
				setAppSettingsLoading(false);
				if (
					preSettings === undefined ||
					preSettings[AppSettingsGroup.Common] !==
						settings[AppSettingsGroup.Common]
				) {
					commonForm.setFieldsValue(settings[AppSettingsGroup.Common]);
				}
			},
			[commonForm, setAppSettingsLoading],
		),
		true,
	);

	const themeOptions = useMemo(() => {
		return [
			{
				label: intl.formatMessage({ id: "settings.theme.light" }),
				value: AppSettingsTheme.Light,
			},
			{
				label: intl.formatMessage({ id: "settings.theme.dark" }),
				value: AppSettingsTheme.Dark,
			},
			{
				label: intl.formatMessage({ id: "settings.theme.system" }),
				value: AppSettingsTheme.System,
			},
		];
	}, [intl]);

	const updateAppSettingsDebounce = useMemo(() => {
		return debounce(updateAppSettings, 1 * 1000);
	}, [updateAppSettings]);

	return (
		<ContentWrap className="settings-wrap">
			<GroupTitle
				id="commonSettings"
				extra={
					<ResetSettingsButton
						title={<FormattedMessage id="appearance.title" key="appearance" />}
						appSettingsGroup={AppSettingsGroup.Common}
					/>
				}
			>
				<FormattedMessage id="appearance.title" />
			</GroupTitle>

			<Form
				className="settings-form common-settings-form"
				form={commonForm}
				onValuesChange={(_, values) => {
					if (typeof values.mainColor === "object") {
						values.mainColor = (
							values.mainColor as AggregationColor
						).toHexString();
					}

					updateAppSettingsDebounce(
						AppSettingsGroup.Common,
						values,
						true,
						true,
						true,
						false,
						false,
					);
				}}
				layout="vertical"
			>
				<Spin spinning={appSettingsLoading}>
					<Row gutter={token.marginLG}>
						<Col span={12}>
							<Form.Item
								label={
									<IconLabel
										icon={<DarkModeIcon />}
										label={<FormattedMessage id="settings.theme" />}
									/>
								}
								name="theme"
							>
								<Select options={themeOptions} />
							</Form.Item>
						</Col>
						<Col span={12}>
							<ProForm.Item
								name="mainColor"
								label={
									<IconLabel
										label={<FormattedMessage id="settings.theme.mainColor" />}
									/>
								}
							>
								<ColorPicker showText placement="bottom" />
							</ProForm.Item>
						</Col>
						<Col span={12}>
							<ProForm.Item
								name="borderRadius"
								label={<FormattedMessage id="settings.borderRadius" />}
							>
								<Slider
									min={0}
									max={16}
									step={1}
									marks={{ 0: "0px", 16: "16px" }}
								/>
							</ProForm.Item>
						</Col>
						<Col span={12}>
							<ProForm.Item
								name="enableCompactLayout"
								label={<FormattedMessage id="settings.compactLayout" />}
							>
								<Switch />
							</ProForm.Item>
						</Col>
					</Row>
				</Spin>
			</Form>
		</ContentWrap>
	);
};
