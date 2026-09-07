import {
	CopyOutlined,
	DeleteOutlined,
	DownOutlined,
	EditOutlined,
	UpOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Space } from "antd";
import { useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";
import { executeScreenshot } from "@/functions/screenshot";
import type { AppSettingsData } from "@/types/appSettings";
import type { CaptureHistory } from "@/utils/captureHistory";
import { writeFilePathToClipboard } from "@/utils/clipboard";
import { ScreenshotType } from "@/utils/types";
import type { CaptureHistoryRecordItem } from "../extra";

export const CaptureHistoryItemActions: React.FC<{
	item: CaptureHistoryRecordItem;
	reloadList: () => Promise<void>;
	captureHistoryRef: React.RefObject<CaptureHistory | undefined>;
	appSettings: AppSettingsData;
}> = ({ item, reloadList, captureHistoryRef, appSettings }) => {
	const [editLoading, setEditLoading] = useState(false);
	const [copyLoading, setCopyLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [moveLoading, setMoveLoading] = useState<"up" | "down" | null>(null);
	const deleteAction = useCallback(async () => {
		if (!(await captureHistoryRef.current?.inited())) {
			return;
		}
		await captureHistoryRef.current?.delete(item.id);
		await reloadList();
	}, [captureHistoryRef, item.id, reloadList]);

	const moveAction = useCallback(
		async (direction: "up" | "down") => {
			if (!(await captureHistoryRef.current?.inited())) {
				return;
			}
			setMoveLoading(direction);
			await captureHistoryRef.current?.move(item.id, direction, appSettings);
			await reloadList();
			setMoveLoading(null);
		},
		[captureHistoryRef, item.id, appSettings, reloadList],
	);

	return (
		<Space wrap style={{ width: "100%", justifyContent: "flex-end" }}>
			<Button
				key="moveUp"
				onClick={() => moveAction("up")}
				size="small"
				variant="link"
				icon={<UpOutlined />}
				loading={moveLoading === "up"}
			>
				<FormattedMessage id="tools.captureHistory.moveUp" />
			</Button>
			<Button
				key="moveDown"
				onClick={() => moveAction("down")}
				size="small"
				variant="link"
				icon={<DownOutlined />}
				loading={moveLoading === "down"}
			>
				<FormattedMessage id="tools.captureHistory.moveDown" />
			</Button>
			<Button
				key="view"
				onClick={async () => {
					setEditLoading(true);
					await executeScreenshot(
						ScreenshotType.SwitchCaptureHistory,
						undefined,
						item.id,
					);
					setEditLoading(false);
				}}
				size="small"
				color="primary"
				variant="link"
				icon={<EditOutlined />}
				loading={editLoading}
			>
				<FormattedMessage id="tools.captureHistory.switch" />
			</Button>
			<Button
				onClick={async () => {
					if (!item.capture_result_file_path) {
						return;
					}

					setCopyLoading(true);
					await writeFilePathToClipboard(item.capture_result_file_path);
					setCopyLoading(false);
				}}
				key="copy"
				size="small"
				color="primary"
				variant="link"
				icon={<CopyOutlined />}
				loading={copyLoading}
			>
				<FormattedMessage id="tools.captureHistory.copy" />
			</Button>
			<Popconfirm
				key="delete"
				title={<FormattedMessage id="tools.captureHistory.delete.confirm" />}
				onConfirm={async () => {
					setDeleteLoading(true);
					await deleteAction();
					setDeleteLoading(false);
				}}
				okButtonProps={{
					loading: deleteLoading,
				}}
			>
				<Button
					color="danger"
					size="small"
					variant="link"
					icon={<DeleteOutlined />}
				>
					<FormattedMessage id="tools.captureHistory.delete" />
				</Button>
			</Popconfirm>
		</Space>
	);
};
