import React, { ReactNode, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

const defaultBaseFrequency = 0.03;
const defaultNumOctaves = 4;
const defaultScale = 20;
export type TornPaperMaskProps = {
    width: string | number;
    height: string | number;
    baseFrequency?: number;
    numOctaves?: number;
    scale?: number;

    children: ReactNode;
};
export const TornPaperMask: React.FC<TornPaperMaskProps> = (props) => {
    const uuid = useMemo(() => uuidv4(), []);
    const filterID = `${uuid}-filter`;
    const maskID = `${uuid}-mask`;

    const TextureSVG = useCallback(() => {
        const scale = props.scale ?? defaultScale;
        const padding = scale / 2;
        const baseFrequency = props.baseFrequency ?? defaultBaseFrequency;
        const numOctaves = props.numOctaves ?? defaultNumOctaves;
        const strWidth = typeof props.width === "number" ? `${props.width}px` : props.width;
        const strHeight = typeof props.height === "number" ? `${props.height}px` : props.height;
        const width = `calc(${strWidth} - ${scale}px)`;
        const height = `calc(${strHeight} - ${scale}px)`;

        return (
            <svg width="0" height="0">
                <filter id={filterID}>
                    <feTurbulence type="fractalNoise" baseFrequency={`${baseFrequency}`} numOctaves={`${numOctaves}`} result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale={scale} />
                </filter>

                <mask id={maskID}>
                    <rect x={`${padding}`} y={`${padding}`} width={`${width}`} height={`${height}`} fill="white" filter={`url(#${filterID})`} />
                </mask>
            </svg>
        );
    }, [props.width, props.height, props.baseFrequency, props.numOctaves, props.scale, filterID, maskID]);

    const StyledChildren = useMemo(
        () =>
            React.Children.map(props.children, (child) => {
                if (React.isValidElement(child)) {
                    return <div style={{ mask: `url(#${maskID})` }}>{child}</div>;
                }
                return child;
            }),
        [props.children, maskID],
    );

    return (
        <>
            <TextureSVG />
            {StyledChildren}
        </>
    );
};
