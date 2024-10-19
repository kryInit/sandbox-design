import React, { useEffect, useRef, useState } from "react";

interface CloneChildrenProps {
    children: React.ReactNode;
    containerWidth: number; // 親コンテナの横幅
    containerHeight: number; // 親コンテナの縦幅
}

const CloneChildren: React.FC<CloneChildrenProps> = ({ children, containerWidth, containerHeight }) => {
    const childRef = useRef<HTMLDivElement>(null); // 子要素の参照を作成
    const [childSize, setChildSize] = useState({ width: 0, height: 0 });

    // 初期レンダリング後に子要素のサイズを取得
    useEffect(() => {
        if (childRef.current) {
            const { width, height } = childRef.current.getBoundingClientRect();
            setChildSize({ width, height });
        }
    }, []);

    // 横に何列配置できるか計算
    const columns = Math.ceil(containerWidth / childSize.width);
    // 縦に何行配置できるか計算
    const rows = Math.ceil(containerHeight / childSize.height);

    // 子要素のサイズが取得されていない場合は何も表示しない
    if (childSize.width === 0 || childSize.height === 0) {
        return (
            <div ref={childRef} style={{ display: "inline-block", visibility: "hidden" }}>
                {children}
            </div>
        );
    }

    // childrenを複製して配置
    const clonedChildren = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            clonedChildren.push(
                React.cloneElement(children as React.ReactElement<any>, {
                    key: `${row}-${col}`, // 重複しないキーを設定
                    style: {
                        ...((children as React.ReactElement<any>).props.style || {}),
                        position: "absolute",
                        top: row * childSize.height,
                        left: col * childSize.width,
                        width: `${childSize.width}px`,
                        height: `${childSize.height}px`,
                    },
                }),
            );
        }
    }

    return (
        <div
            style={{
                position: "relative",
                width: `${containerWidth}px`,
                height: `${containerHeight}px`,
                overflow: "hidden", // 親コンテナのサイズを超えないように
            }}
        >
            {clonedChildren}
        </div>
    );
};

export default CloneChildren;
