import { DrawState } from "@/types/draw";

export const isOcrTool = (drawState: DrawState) => {
	return drawState === DrawState.OcrDetect;
};

const OcrTool: React.FC = () => {
	return null;
};

export default OcrTool;
