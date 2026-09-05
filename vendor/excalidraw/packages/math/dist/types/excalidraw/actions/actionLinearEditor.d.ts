/// <reference types="react" />
import type { ExcalidrawLinearElement } from "@excalidraw/element/types";
export declare const actionToggleLinearEditor: {
    name: "toggleLinearEditor";
    category: string;
    label: (elements: readonly import("@excalidraw/element/types").ExcalidrawElement[], appState: Readonly<import("../types").AppState>, app: import("../types").AppClassProperties) => "labels.lineEditor.editArrow" | "labels.lineEditor.edit";
    keywords: string[];
    trackEvent: {
        category: "element";
    };
    predicate: (elements: readonly import("@excalidraw/element/types").ExcalidrawElement[], appState: import("../types").AppState, _: import("../types").ExcalidrawProps, app: import("../types").AppClassProperties) => boolean;
    perform(elements: readonly import("@excalidraw/element/types").OrderedExcalidrawElement[], appState: Readonly<import("../types").AppState>, _: any, app: import("../types").AppClassProperties): {
        appState: {
            selectedLinearElement: {
                isEditing: boolean;
                elementId: string & {
                    _brand: "excalidrawLinearElementId";
                };
                selectedPointsIndices: readonly number[] | null;
                pointerDownState: Readonly<{
                    prevSelectedPointsIndices: readonly number[] | null;
                    lastClickedPoint: number;
                    lastClickedIsEndPoint: boolean;
                    origin: Readonly<{
                        x: number;
                        y: number;
                    }> | null;
                    segmentMidpoint: {
                        value: import("@excalidraw/math").GlobalPoint | null;
                        index: number | null;
                        added: boolean;
                    };
                }>;
                isDragging: boolean;
                lastUncommittedPoint: import("@excalidraw/math").LocalPoint | null;
                pointerOffset: Readonly<{
                    x: number;
                    y: number;
                }>;
                startBindingElement: import("@excalidraw/element/types").ExcalidrawBindableElement | "keep" | null;
                endBindingElement: import("@excalidraw/element/types").ExcalidrawBindableElement | "keep" | null;
                hoverPointIndex: number;
                segmentMidPointHoveredCoords: import("@excalidraw/math").GlobalPoint | null;
                elbowed: boolean;
                customLineAngle: number | null;
            };
            contextMenu: {
                items: import("../components/ContextMenu").ContextMenuItems;
                top: number;
                left: number;
            } | null;
            showWelcomeScreen: boolean;
            isLoading: boolean;
            errorMessage: import("react").ReactNode;
            activeEmbeddable: {
                element: import("@excalidraw/element/types").NonDeletedExcalidrawElement;
                state: "active" | "hover";
            } | null;
            newElement: import("@excalidraw/element/types").NonDeleted<import("@excalidraw/element/types").ExcalidrawNonSelectionElement> | null;
            resizingElement: import("@excalidraw/element/types").NonDeletedExcalidrawElement | null;
            multiElement: import("@excalidraw/element/types").NonDeleted<ExcalidrawLinearElement> | null;
            selectionElement: import("@excalidraw/element/types").NonDeletedExcalidrawElement | null;
            isBindingEnabled: boolean;
            startBoundElement: import("@excalidraw/element/types").NonDeleted<import("@excalidraw/element/types").ExcalidrawBindableElement> | null;
            suggestedBindings: import("@excalidraw/element").SuggestedBinding[];
            frameToHighlight: import("@excalidraw/element/types").NonDeleted<import("@excalidraw/element/types").ExcalidrawFrameLikeElement> | null;
            frameRendering: {
                enabled: boolean;
                name: boolean;
                outline: boolean;
                clip: boolean;
            };
            editingFrame: string | null;
            elementsToHighlight: import("@excalidraw/element/types").NonDeleted<import("@excalidraw/element/types").ExcalidrawElement>[] | null;
            editingTextElement: import("@excalidraw/element/types").NonDeletedExcalidrawElement | null;
            activeTool: {
                lastActiveTool: import("../types").ActiveTool | null;
                locked: boolean;
                fromSelection: boolean;
            } & import("../types").ActiveTool;
            preferredSelectionTool: {
                type: "selection" | "lasso";
                initialized: boolean;
            };
            penMode: boolean;
            penDetected: boolean;
            exportBackground: boolean;
            exportEmbedScene: boolean;
            exportWithDarkMode: boolean;
            exportScale: number;
            currentItemStrokeColor: string;
            currentItemTextBackgroundColor: string;
            currentItemTextSerialNumberType: "number" | "letter" | "roman";
            currentItemTextStrokeColor: string;
            currentItemTextStrokeWidth: number;
            currentItemBackgroundColor: string;
            currentItemFillStyle: import("@excalidraw/element/types").FillStyle;
            currentItemStrokeWidth: number;
            currentItemStrokeStyle: import("@excalidraw/element/types").StrokeStyle;
            currentItemRoughness: number;
            currentItemOpacity: number;
            currentItemBlur: number;
            currentItemFilterType: string;
            currentItemMaskColor: string;
            currentItemMaskOpacity: number;
            currentItemShapeType: "circle" | "rect";
            currentItemBorderType: "solid" | "dashed" | "dotted" | "none";
            currentItemPenMode: import("@excalidraw/element/types").PenMode;
            currentItemFontFamily: number;
            currentItemFontSize: number;
            currentItemTextAlign: string;
            currentItemStartArrowhead: import("@excalidraw/element/types").Arrowhead | null;
            currentItemEndArrowhead: import("@excalidraw/element/types").Arrowhead | null;
            currentHoveredFontFamily: number | null;
            currentItemRoundness: import("@excalidraw/element/types").StrokeRoundness;
            currentItemArrowType: "round" | "sharp" | "elbow";
            viewBackgroundColor: string;
            scrollX: number;
            scrollY: number;
            cursorButton: "up" | "down";
            scrolledOutside: boolean;
            name: string | null;
            isResizing: boolean;
            isRotating: boolean;
            zoom: Readonly<{
                value: import("../types").NormalizedZoomValue;
            }>;
            openMenu: "canvas" | null;
            openPopup: "fontFamily" | "canvasBackground" | "elementBackground" | "elementStroke" | "compactTextProperties" | "compactStrokeStyles" | "compactOtherProperties" | "compactArrowProperties" | null;
            openSidebar: {
                name: string;
                tab?: string | undefined;
            } | null;
            openDialog: {
                name: "imageExport" | "help" | "jsonExport";
            } | {
                name: "ttd";
                tab: "mermaid" | "text-to-diagram";
            } | {
                name: "commandPalette";
            } | {
                name: "elementLinkSelector";
                sourceElementId: string;
            } | null;
            defaultSidebarDockedPreference: boolean;
            lastPointerDownWith: import("@excalidraw/element/types").PointerType;
            selectedElementIds: Readonly<{
                [id: string]: true;
            }>;
            hoveredElementIds: Readonly<{
                [id: string]: true;
            }>;
            previousSelectedElementIds: {
                [id: string]: true;
            };
            selectedElementsAreBeingDragged: boolean;
            shouldCacheIgnoreZoom: boolean;
            toast: {
                message: string;
                closable?: boolean | undefined;
                duration?: number | undefined;
            } | null;
            zenModeEnabled: boolean;
            theme: import("@excalidraw/element/types").Theme;
            gridSize: number;
            gridStep: number;
            gridModeEnabled: boolean;
            viewModeEnabled: boolean;
            selectedGroupIds: {
                [groupId: string]: boolean;
            };
            editingGroupId: string | null;
            width: number;
            height: number;
            offsetTop: number;
            offsetLeft: number;
            fileHandle: import("browser-fs-access").FileSystemHandle | null;
            collaborators: Map<import("../types").SocketId, Readonly<{
                pointer?: import("../types").CollaboratorPointer | undefined;
                button?: "up" | "down" | undefined;
                selectedElementIds?: Readonly<{
                    [id: string]: true;
                }> | undefined;
                username?: string | null | undefined;
                userState?: import("@excalidraw/common").UserIdleState | undefined;
                color?: {
                    background: string;
                    stroke: string;
                } | undefined;
                avatarUrl?: string | undefined;
                id?: string | undefined;
                socketId?: import("../types").SocketId | undefined;
                isCurrentUser?: boolean | undefined;
                isInCall?: boolean | undefined;
                isSpeaking?: boolean | undefined;
                isMuted?: boolean | undefined;
            }>>;
            stats: {
                open: boolean;
                panels: number;
            };
            currentChartType: import("@excalidraw/element/types").ChartType;
            pasteDialog: {
                shown: false;
                data: null;
            } | {
                shown: true;
                data: import("../charts").Spreadsheet;
            };
            showHyperlinkPopup: false | "editor" | "info";
            snapLines: readonly import("../snapping").SnapLine[];
            originSnapOffset: {
                x: number;
                y: number;
            } | null;
            objectsSnapModeEnabled: boolean;
            userToFollow: import("../types").UserToFollow | null;
            followedBy: Set<import("../types").SocketId>;
            isCropping: boolean;
            croppingElementId: string | null;
            searchMatches: Readonly<{
                focusedId: string | null;
                matches: readonly import("../types").SearchMatch[];
            }> | null;
            activeLockedId: string | null;
            lockedMultiSelections: {
                [groupId: string]: true;
            };
            stylesPanelMode: "compact" | "full" | "mobile";
        };
        captureUpdate: "IMMEDIATELY";
    };
    PanelComponent: ({ appState, updateData, app }: import("./types").PanelComponentProps) => import("react/jsx-runtime").JSX.Element | null;
} & {
    keyTest?: undefined;
};
export declare const actionTogglePolygon: {
    name: "togglePolygon";
    category: string;
    icon: import("react/jsx-runtime").JSX.Element;
    keywords: string[];
    label: (elements: readonly import("@excalidraw/element/types").ExcalidrawElement[], appState: Readonly<import("../types").AppState>, app: import("../types").AppClassProperties) => "labels.polygon.breakPolygon" | "labels.polygon.convertToPolygon";
    trackEvent: {
        category: "element";
    };
    predicate: (elements: readonly import("@excalidraw/element/types").ExcalidrawElement[], appState: import("../types").AppState, _: import("../types").ExcalidrawProps, app: import("../types").AppClassProperties) => boolean;
    perform(elements: readonly import("@excalidraw/element/types").OrderedExcalidrawElement[], appState: Readonly<import("../types").AppState>, _: any, app: import("../types").AppClassProperties): false | {
        elements: ((Readonly<{
            id: string;
            x: number;
            y: number;
            strokeColor: string;
            backgroundColor: string;
            fillStyle: import("@excalidraw/element/types").FillStyle;
            strokeWidth: number;
            strokeStyle: import("@excalidraw/element/types").StrokeStyle;
            roundness: {
                type: import("@excalidraw/element/types").RoundnessType;
                value?: number | undefined;
            } | null;
            roughness: number;
            opacity: number;
            width: number;
            height: number;
            angle: import("@excalidraw/math").Radians;
            seed: number;
            version: number;
            versionNonce: number;
            index: import("@excalidraw/element/types").FractionalIndex | null;
            isDeleted: boolean;
            groupIds: readonly string[];
            frameId: string | null;
            boundElements: readonly Readonly<{
                id: string;
                type: "arrow" | "text";
            }>[] | null;
            updated: number;
            link: string | null;
            locked: boolean;
            customData?: Record<string, any> | undefined;
        }> & Readonly<{
            type: "line" | "arrow";
            points: readonly import("@excalidraw/math").LocalPoint[];
            lastCommittedPoint: import("@excalidraw/math").LocalPoint | null;
            startBinding: import("@excalidraw/element/types").PointBinding | null;
            endBinding: import("@excalidraw/element/types").PointBinding | null;
            startArrowhead: import("@excalidraw/element/types").Arrowhead | null;
            endArrowhead: import("@excalidraw/element/types").Arrowhead | null;
        }> & {
            index: import("@excalidraw/element/types").FractionalIndex;
        }) | (Readonly<{
            id: string;
            x: number;
            y: number;
            strokeColor: string;
            backgroundColor: string;
            fillStyle: import("@excalidraw/element/types").FillStyle;
            strokeWidth: number;
            strokeStyle: import("@excalidraw/element/types").StrokeStyle;
            roundness: {
                type: import("@excalidraw/element/types").RoundnessType;
                value?: number | undefined;
            } | null;
            roughness: number;
            opacity: number;
            width: number;
            height: number;
            angle: import("@excalidraw/math").Radians;
            seed: number;
            version: number;
            versionNonce: number;
            index: import("@excalidraw/element/types").FractionalIndex | null;
            isDeleted: boolean;
            groupIds: readonly string[];
            frameId: string | null;
            boundElements: readonly Readonly<{
                id: string;
                type: "arrow" | "text";
            }>[] | null;
            updated: number;
            link: string | null;
            locked: boolean;
            customData?: Record<string, any> | undefined;
        }> & {
            type: "selection";
        } & {
            index: import("@excalidraw/element/types").FractionalIndex;
        }) | (Readonly<{
            id: string;
            x: number;
            y: number;
            strokeColor: string;
            backgroundColor: string;
            fillStyle: import("@excalidraw/element/types").FillStyle;
            strokeWidth: number;
            strokeStyle: import("@excalidraw/element/types").StrokeStyle;
            roundness: {
                type: import("@excalidraw/element/types").RoundnessType;
                value?: number | undefined;
            } | null;
            roughness: number;
            opacity: number;
            width: number;
            height: number;
            angle: import("@excalidraw/math").Radians;
            seed: number;
            version: number;
            versionNonce: number;
            index: import("@excalidraw/element/types").FractionalIndex | null;
            isDeleted: boolean;
            groupIds: readonly string[];
            frameId: string | null;
            boundElements: readonly Readonly<{
                id: string;
                type: "arrow" | "text";
            }>[] | null;
            updated: number;
            link: string | null;
            locked: boolean;
            customData?: Record<string, any> | undefined;
        }> & {
            type: "rectangle";
        } & {
            index: import("@excalidraw/element/types").FractionalIndex;
        }) | (Readonly<{
            id: string;
            x: number;
            y: number;
            strokeColor: string;
            backgroundColor: string;
            fillStyle: import("@excalidraw/element/types").FillStyle;
            strokeWidth: number;
            strokeStyle: import("@excalidraw/element/types").StrokeStyle;
            roundness: {
                type: import("@excalidraw/element/types").RoundnessType;
                value?: number | undefined;
            } | null;
            roughness: number;
            opacity: number;
            width: number;
            height: number;
            angle: import("@excalidraw/math").Radians;
            seed: number;
            version: number;
            versionNonce: number;
            index: import("@excalidraw/element/types").FractionalIndex | null;
            isDeleted: boolean;
            groupIds: readonly string[];
            frameId: string | null;
            boundElements: readonly Readonly<{
                id: string;
                type: "arrow" | "text";
            }>[] | null;
            updated: number;
            link: string | null;
            locked: boolean;
            customData?: Record<string, any> | undefined;
        }> & {
            type: "blur";
            blur: number;
            filterType: string;
        } & {
            index: import("@excalidraw/element/types").FractionalIndex;
        }) | (Readonly<{
            id: string;
            x: number;
            y: number;
            strokeColor: string;
            backgroundColor: string;
            fillStyle: import("@excalidraw/element/types").FillStyle;
            strokeWidth: number;
            strokeStyle: import("@excalidraw/element/types").StrokeStyle;
            roundness: {
                type: import("@excalidraw/element/types").RoundnessType;
                value?: number | undefined;
            } | null;
            roughness: number;
            opacity: number;
            width: number;
            height: number;
            angle: import("@excalidraw/math").Radians;
            seed: number;
            version: number;
            versionNonce: number;
            index: import("@excalidraw/element/types").FractionalIndex | null;
            isDeleted: boolean;
            groupIds: readonly string[];
            frameId: string | null;
            boundElements: readonly Readonly<{
                id: string;
                type: "arrow" | "text";
            }>[] | null;
            updated: number;
            link: string | null;
            locked: boolean;
            customData?: Record<string, any> | undefined;
        }> & {
            type: "highlight";
            shapeType: "circle" | "rect";
            borderType: "solid" | "dashed" | "dotted" | "none";
            maskColor: string;
            maskOpacity: number;
        } & {
            index: import("@excalidraw/element/types").FractionalIndex;
        }) | (Readonly<{
            id: string;
            x: number;
            y: number;
            strokeColor: string;
            backgroundColor: string;
            fillStyle: import("@excalidraw/element/types").FillStyle;
            strokeWidth: number;
            strokeStyle: import("@excalidraw/element/types").StrokeStyle;
            roundness: {
                type: import("@excalidraw/element/types").RoundnessType;
                value?: number | undefined;
            } | null;
            roughness: number;
            opacity: number;
            width: number;
            height: number;
            angle: import("@excalidraw/math").Radians;
            seed: number;
            version: number;
            versionNonce: number;
            index: import("@excalidraw/element/types").FractionalIndex | null;
            isDeleted: boolean;
            groupIds: readonly string[];
            frameId: string | null;
            boundElements: readonly Readonly<{
                id: string;
                type: "arrow" | "text";
            }>[] | null;
            updated: number;
            link: string | null;
            locked: boolean;
            customData?: Record<string, any> | undefined;
        }> & {
            type: "watermark";
            watermarkText: string;
            watermarkFontSize: number;
        } & {
            index: import("@excalidraw/element/types").FractionalIndex;
        }) | (Readonly<{
            id: string;
            x: number;
            y: number;
            strokeColor: string;
            backgroundColor: string;
            fillStyle: import("@excalidraw/element/types").FillStyle;
            strokeWidth: number;
            strokeStyle: import("@excalidraw/element/types").StrokeStyle;
            roundness: {
                type: import("@excalidraw/element/types").RoundnessType;
                value?: number | undefined;
            } | null;
            roughness: number;
            opacity: number;
            width: number;
            height: number;
            angle: import("@excalidraw/math").Radians;
            seed: number;
            version: number;
            versionNonce: number;
            index: import("@excalidraw/element/types").FractionalIndex | null;
            isDeleted: boolean;
            groupIds: readonly string[];
            frameId: string | null;
            boundElements: readonly Readonly<{
                id: string;
                type: "arrow" | "text";
            }>[] | null;
            updated: number;
            link: string | null;
            locked: boolean;
            customData?: Record<string, any> | undefined;
        }> & {
            type: "diamond";
        } & {
            index: import("@excalidraw/element/types").FractionalIndex;
        }) | (Readonly<{
            id: string;
            x: number;
            y: number;
            strokeColor: string;
            backgroundColor: string;
            fillStyle: import("@excalidraw/element/types").FillStyle;
            strokeWidth: number;
            strokeStyle: import("@excalidraw/element/types").StrokeStyle;
            roundness: {
                type: import("@excalidraw/element/types").RoundnessType;
                value?: number | undefined;
            } | null;
            roughness: number;
            opacity: number;
            width: number;
            height: number;
            angle: import("@excalidraw/math").Radians;
            seed: number;
            version: number;
            versionNonce: number;
            index: import("@excalidraw/element/types").FractionalIndex | null;
            isDeleted: boolean;
            groupIds: readonly string[];
            frameId: string | null;
            boundElements: readonly Readonly<{
                id: string;
                type: "arrow" | "text";
            }>[] | null;
            updated: number;
            link: string | null;
            locked: boolean;
            customData?: Record<string, any> | undefined;
        }> & {
            type: "ellipse";
        } & {
            index: import("@excalidraw/element/types").FractionalIndex;
        }) | (Readonly<{
            id: string;
            x: number;
            y: number;
            strokeColor: string;
            backgroundColor: string;
            fillStyle: import("@excalidraw/element/types").FillStyle;
            strokeWidth: number;
            strokeStyle: import("@excalidraw/element/types").StrokeStyle;
            roundness: {
                type: import("@excalidraw/element/types").RoundnessType;
                value?: number | undefined;
            } | null;
            roughness: number;
            opacity: number;
            width: number;
            height: number;
            angle: import("@excalidraw/math").Radians;
            seed: number;
            version: number;
            versionNonce: number;
            index: import("@excalidraw/element/types").FractionalIndex | null;
            isDeleted: boolean;
            groupIds: readonly string[];
            frameId: string | null;
            boundElements: readonly Readonly<{
                id: string;
                type: "arrow" | "text";
            }>[] | null;
            updated: number;
            link: string | null;
            locked: boolean;
            customData?: Record<string, any> | undefined;
        }> & Readonly<{
            type: "embeddable";
        }> & {
            index: import("@excalidraw/element/types").FractionalIndex;
        }) | (Readonly<{
            id: string;
            x: number;
            y: number;
            strokeColor: string;
            backgroundColor: string;
            fillStyle: import("@excalidraw/element/types").FillStyle;
            strokeWidth: number;
            strokeStyle: import("@excalidraw/element/types").StrokeStyle;
            roundness: {
                type: import("@excalidraw/element/types").RoundnessType;
                value?: number | undefined;
            } | null;
            roughness: number;
            opacity: number;
            width: number;
            height: number;
            angle: import("@excalidraw/math").Radians;
            seed: number;
            version: number;
            versionNonce: number;
            index: import("@excalidraw/element/types").FractionalIndex | null;
            isDeleted: boolean;
            groupIds: readonly string[];
            frameId: string | null;
            boundElements: readonly Readonly<{
                id: string;
                type: "arrow" | "text";
            }>[] | null;
            updated: number;
            link: string | null;
            locked: boolean;
            customData?: Record<string, any> | undefined;
        }> & Readonly<{
            type: "iframe";
            customData?: {
                generationData?: import("@excalidraw/element/types").MagicGenerationData | undefined;
            } | undefined;
        }> & {
            index: import("@excalidraw/element/types").FractionalIndex;
        }) | (Readonly<{
            id: string;
            x: number;
            y: number;
            strokeColor: string;
            backgroundColor: string;
            fillStyle: import("@excalidraw/element/types").FillStyle;
            strokeWidth: number;
            strokeStyle: import("@excalidraw/element/types").StrokeStyle;
            roundness: {
                type: import("@excalidraw/element/types").RoundnessType;
                value?: number | undefined;
            } | null;
            roughness: number;
            opacity: number;
            width: number;
            height: number;
            angle: import("@excalidraw/math").Radians;
            seed: number;
            version: number;
            versionNonce: number;
            index: import("@excalidraw/element/types").FractionalIndex | null;
            isDeleted: boolean;
            groupIds: readonly string[];
            frameId: string | null;
            boundElements: readonly Readonly<{
                id: string;
                type: "arrow" | "text";
            }>[] | null;
            updated: number;
            link: string | null;
            locked: boolean;
            customData?: Record<string, any> | undefined;
        }> & Readonly<{
            type: "image";
            fileId: import("@excalidraw/element/types").FileId | null;
            status: "pending" | "error" | "saved";
            scale: [number, number];
            crop: import("@excalidraw/element/types").ImageCrop | null;
        }> & {
            index: import("@excalidraw/element/types").FractionalIndex;
        }) | (Readonly<{
            id: string;
            x: number;
            y: number;
            strokeColor: string;
            backgroundColor: string;
            fillStyle: import("@excalidraw/element/types").FillStyle;
            strokeWidth: number;
            strokeStyle: import("@excalidraw/element/types").StrokeStyle;
            roundness: {
                type: import("@excalidraw/element/types").RoundnessType;
                value?: number | undefined;
            } | null;
            roughness: number;
            opacity: number;
            width: number;
            height: number;
            angle: import("@excalidraw/math").Radians;
            seed: number;
            version: number;
            versionNonce: number;
            index: import("@excalidraw/element/types").FractionalIndex | null;
            isDeleted: boolean;
            groupIds: readonly string[];
            frameId: string | null;
            boundElements: readonly Readonly<{
                id: string;
                type: "arrow" | "text";
            }>[] | null;
            updated: number;
            link: string | null;
            locked: boolean;
            customData?: Record<string, any> | undefined;
        }> & {
            type: "frame";
            name: string | null;
        } & {
            index: import("@excalidraw/element/types").FractionalIndex;
        }) | (Readonly<{
            id: string;
            x: number;
            y: number;
            strokeColor: string;
            backgroundColor: string;
            fillStyle: import("@excalidraw/element/types").FillStyle;
            strokeWidth: number;
            strokeStyle: import("@excalidraw/element/types").StrokeStyle;
            roundness: {
                type: import("@excalidraw/element/types").RoundnessType;
                value?: number | undefined;
            } | null;
            roughness: number;
            opacity: number;
            width: number;
            height: number;
            angle: import("@excalidraw/math").Radians;
            seed: number;
            version: number;
            versionNonce: number;
            index: import("@excalidraw/element/types").FractionalIndex | null;
            isDeleted: boolean;
            groupIds: readonly string[];
            frameId: string | null;
            boundElements: readonly Readonly<{
                id: string;
                type: "arrow" | "text";
            }>[] | null;
            updated: number;
            link: string | null;
            locked: boolean;
            customData?: Record<string, any> | undefined;
        }> & {
            type: "magicframe";
            name: string | null;
        } & {
            index: import("@excalidraw/element/types").FractionalIndex;
        }) | (Readonly<{
            id: string;
            x: number;
            y: number;
            strokeColor: string;
            backgroundColor: string;
            fillStyle: import("@excalidraw/element/types").FillStyle;
            strokeWidth: number;
            strokeStyle: import("@excalidraw/element/types").StrokeStyle;
            roundness: {
                type: import("@excalidraw/element/types").RoundnessType;
                value?: number | undefined;
            } | null;
            roughness: number;
            opacity: number;
            width: number;
            height: number;
            angle: import("@excalidraw/math").Radians;
            seed: number;
            version: number;
            versionNonce: number;
            index: import("@excalidraw/element/types").FractionalIndex | null;
            isDeleted: boolean;
            groupIds: readonly string[];
            frameId: string | null;
            boundElements: readonly Readonly<{
                id: string;
                type: "arrow" | "text";
            }>[] | null;
            updated: number;
            link: string | null;
            locked: boolean;
            customData?: Record<string, any> | undefined;
        }> & Readonly<{
            type: "text";
            fontSize: number;
            fontFamily: number;
            text: string;
            textAlign: string;
            verticalAlign: string;
            containerId: string | null;
            originalText: string;
            textStrokeColor: string;
            textStrokeWidth: number;
            textBackgroundColor: string;
            textSerialNumberType: "number" | "letter" | "roman";
            autoResize: boolean;
            lineHeight: number & {
                _brand: "unitlessLineHeight";
            };
        }> & {
            index: import("@excalidraw/element/types").FractionalIndex;
        }) | (Readonly<{
            id: string;
            x: number;
            y: number;
            strokeColor: string;
            backgroundColor: string;
            fillStyle: import("@excalidraw/element/types").FillStyle;
            strokeWidth: number;
            strokeStyle: import("@excalidraw/element/types").StrokeStyle;
            roundness: {
                type: import("@excalidraw/element/types").RoundnessType;
                value?: number | undefined;
            } | null;
            roughness: number;
            opacity: number;
            width: number;
            height: number;
            angle: import("@excalidraw/math").Radians;
            seed: number;
            version: number;
            versionNonce: number;
            index: import("@excalidraw/element/types").FractionalIndex | null;
            isDeleted: boolean;
            groupIds: readonly string[];
            frameId: string | null;
            boundElements: readonly Readonly<{
                id: string;
                type: "arrow" | "text";
            }>[] | null;
            updated: number;
            link: string | null;
            locked: boolean;
            customData?: Record<string, any> | undefined;
        }> & Readonly<{
            type: "freedraw";
            points: readonly import("@excalidraw/math").LocalPoint[];
            pressures: readonly number[];
            simulatePressure: boolean;
            lastCommittedPoint: import("@excalidraw/math").LocalPoint | null;
            penMode: import("@excalidraw/element/types").PenMode;
        }> & {
            index: import("@excalidraw/element/types").FractionalIndex;
        }) | (Readonly<{
            id: string;
            x: number;
            y: number;
            strokeColor: string;
            backgroundColor: string;
            fillStyle: import("@excalidraw/element/types").FillStyle;
            strokeWidth: number;
            strokeStyle: import("@excalidraw/element/types").StrokeStyle;
            roundness: {
                type: import("@excalidraw/element/types").RoundnessType;
                value?: number | undefined;
            } | null;
            roughness: number;
            opacity: number;
            width: number;
            height: number;
            angle: import("@excalidraw/math").Radians;
            seed: number;
            version: number;
            versionNonce: number;
            index: import("@excalidraw/element/types").FractionalIndex | null;
            isDeleted: boolean;
            groupIds: readonly string[];
            frameId: string | null;
            boundElements: readonly Readonly<{
                id: string;
                type: "arrow" | "text";
            }>[] | null;
            updated: number;
            link: string | null;
            locked: boolean;
            customData?: Record<string, any> | undefined;
        }> & Readonly<{
            type: "blur_freedraw";
            points: readonly import("@excalidraw/math").LocalPoint[];
            lastCommittedPoint: import("@excalidraw/math").LocalPoint | null;
            pressures: readonly number[];
            simulatePressure: boolean;
            penMode: import("@excalidraw/element/types").PenMode;
            blur: number;
            filterType: string;
        }> & {
            index: import("@excalidraw/element/types").FractionalIndex;
        }))[];
        appState: Readonly<import("../types").AppState>;
        captureUpdate: "IMMEDIATELY";
    };
    PanelComponent: ({ appState, updateData, app }: import("./types").PanelComponentProps) => import("react/jsx-runtime").JSX.Element | null;
} & {
    keyTest?: undefined;
};
