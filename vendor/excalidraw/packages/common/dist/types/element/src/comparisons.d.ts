import type { ElementOrToolType } from "@excalidraw/excalidraw/types";
export declare const hasBackground: (type: ElementOrToolType) => boolean;
export declare const hasStrokeColor: (type: ElementOrToolType) => boolean;
export declare const hasTextStrokeColor: (type: ElementOrToolType) => boolean;
export declare const canChangeTextStrokeColorProp: (element: {
    type: string;
    id: string;
}) => boolean;
export declare const hasStrokeWidth: (type: ElementOrToolType) => boolean;
export declare const hasStrokeStyle: (type: ElementOrToolType) => boolean;
export declare const canChangeRoundness: (type: ElementOrToolType) => boolean;
export declare const canChangeBlur: (type: ElementOrToolType) => boolean;
export declare const canChangeHighlight: (type: ElementOrToolType) => boolean;
export declare const canChangeLayer: (type: ElementOrToolType) => boolean;
export declare const toolIsArrow: (type: ElementOrToolType) => boolean;
export declare const canHaveArrowheads: (type: ElementOrToolType) => boolean;
