import type { MarkOptional } from "@excalidraw/common/utility-types";
import type { ExcalidrawImageElement, ExcalidrawTextElement, ExcalidrawLinearElement, ExcalidrawGenericElement, NonDeleted, TextAlign, VerticalAlign, Arrowhead, ExcalidrawFreeDrawElement, FontFamilyValues, ExcalidrawTextContainer, ExcalidrawFrameElement, ExcalidrawEmbeddableElement, ExcalidrawMagicFrameElement, ExcalidrawIframeElement, ElementsMap, ExcalidrawArrowElement, ExcalidrawElbowArrowElement, ExcalidrawBlurElement, ExcalidrawLineElement, ExcalidrawWatermarkElement, ExcalidrawBlurFreeDrawElement, ExcalidrawHighlightElement } from "./types";
export type ElementConstructorOpts = MarkOptional<Omit<ExcalidrawGenericElement, "id" | "type" | "isDeleted" | "updated">, "width" | "height" | "angle" | "groupIds" | "frameId" | "index" | "boundElements" | "seed" | "version" | "versionNonce" | "link" | "strokeStyle" | "fillStyle" | "strokeColor" | "backgroundColor" | "roughness" | "strokeWidth" | "roundness" | "locked" | "opacity" | "customData">;
export declare const newElement: (opts: {
    type: ExcalidrawGenericElement["type"];
} & ElementConstructorOpts) => NonDeleted<ExcalidrawGenericElement>;
export declare const newEmbeddableElement: (opts: {
    type: "embeddable";
} & ElementConstructorOpts) => NonDeleted<ExcalidrawEmbeddableElement>;
export declare const newIframeElement: (opts: {
    type: "iframe";
} & ElementConstructorOpts) => NonDeleted<ExcalidrawIframeElement>;
export declare const newFrameElement: (opts: {
    name?: string;
} & ElementConstructorOpts) => NonDeleted<ExcalidrawFrameElement>;
export declare const newMagicFrameElement: (opts: {
    name?: string;
} & ElementConstructorOpts) => NonDeleted<ExcalidrawMagicFrameElement>;
export declare const newBlurElement: (opts: {
    blur: number;
    filterType: string;
} & ElementConstructorOpts) => NonDeleted<ExcalidrawBlurElement>;
export declare const newHighlightElement: (opts: {
    maskColor: string;
    maskOpacity: number;
    shapeType: "circle" | "rect";
    borderType: "none" | "solid" | "dashed" | "dotted";
} & ElementConstructorOpts) => NonDeleted<ExcalidrawHighlightElement>;
export declare const newWatermarkElement: (opts: {
    watermarkText: string;
    watermarkFontSize: number;
} & ElementConstructorOpts) => NonDeleted<ExcalidrawWatermarkElement>;
export declare const newTextElement: (opts: {
    text: string;
    originalText?: string;
    fontSize?: number;
    fontFamily?: FontFamilyValues;
    textAlign?: TextAlign;
    verticalAlign?: VerticalAlign;
    containerId?: ExcalidrawTextContainer["id"] | null;
    lineHeight?: ExcalidrawTextElement["lineHeight"];
    autoResize?: ExcalidrawTextElement["autoResize"];
    textStrokeColor?: ExcalidrawTextElement["textStrokeColor"];
    textStrokeWidth?: ExcalidrawTextElement["textStrokeWidth"];
    textBackgroundColor?: ExcalidrawTextElement["textBackgroundColor"];
    textSerialNumberType?: ExcalidrawTextElement["textSerialNumberType"];
} & ElementConstructorOpts) => NonDeleted<ExcalidrawTextElement>;
export declare const refreshTextDimensions: (textElement: ExcalidrawTextElement, container: ExcalidrawTextContainer | null, elementsMap: ElementsMap, text?: string) => {
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
} | undefined;
export declare const newFreeDrawElement: (opts: {
    type: "freedraw";
    points?: ExcalidrawFreeDrawElement["points"];
    simulatePressure: boolean;
    pressures?: ExcalidrawFreeDrawElement["pressures"];
    penMode?: ExcalidrawFreeDrawElement["penMode"];
} & ElementConstructorOpts) => NonDeleted<ExcalidrawFreeDrawElement>;
export declare const newBlurFreeDrawElement: (opts: {
    type: "blur_freedraw";
    points?: ExcalidrawFreeDrawElement["points"];
    simulatePressure: boolean;
    pressures?: ExcalidrawFreeDrawElement["pressures"];
    penMode?: ExcalidrawFreeDrawElement["penMode"];
    blur: number;
    filterType: string;
} & ElementConstructorOpts) => NonDeleted<ExcalidrawBlurFreeDrawElement>;
export declare const newLinearElement: (opts: {
    type: ExcalidrawLinearElement["type"];
    points?: ExcalidrawLinearElement["points"];
    polygon?: ExcalidrawLineElement["polygon"];
} & ElementConstructorOpts) => NonDeleted<ExcalidrawLinearElement>;
export declare const newArrowElement: <T extends boolean>(opts: {
    type: ExcalidrawArrowElement["type"];
    startArrowhead?: Arrowhead | null | undefined;
    endArrowhead?: Arrowhead | null | undefined;
    points?: readonly import("@excalidraw/math").LocalPoint[] | undefined;
    elbowed?: T | undefined;
    fixedSegments?: readonly import("./types").FixedSegment[] | null | undefined;
} & Omit<Omit<ExcalidrawGenericElement, "id" | "isDeleted" | "updated" | "type">, "link" | "strokeColor" | "backgroundColor" | "fillStyle" | "strokeWidth" | "strokeStyle" | "roundness" | "roughness" | "opacity" | "width" | "height" | "angle" | "seed" | "version" | "versionNonce" | "index" | "groupIds" | "frameId" | "boundElements" | "locked" | "customData"> & Partial<Pick<Omit<ExcalidrawGenericElement, "id" | "isDeleted" | "updated" | "type">, "link" | "strokeColor" | "backgroundColor" | "fillStyle" | "strokeWidth" | "strokeStyle" | "roundness" | "roughness" | "opacity" | "width" | "height" | "angle" | "seed" | "version" | "versionNonce" | "index" | "groupIds" | "frameId" | "boundElements" | "locked" | "customData">>) => T extends true ? NonDeleted<ExcalidrawElbowArrowElement> : NonDeleted<ExcalidrawArrowElement>;
export declare const newImageElement: (opts: {
    type: ExcalidrawImageElement["type"];
    status?: ExcalidrawImageElement["status"];
    fileId?: ExcalidrawImageElement["fileId"];
    scale?: ExcalidrawImageElement["scale"];
    crop?: ExcalidrawImageElement["crop"];
} & ElementConstructorOpts) => NonDeleted<ExcalidrawImageElement>;
