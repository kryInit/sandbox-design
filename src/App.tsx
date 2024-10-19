import React, { ReactNode } from "react";
import { TornPaperMask } from "./components/TornPaperMask.tsx";
import CloneChildren from "./components/CloneChildren.tsx";

type CenteringDivProps = {
    style?: React.CSSProperties;
    children: ReactNode;
};
const CenteringDiv: React.FC<CenteringDivProps> = (props: CenteringDivProps) => {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", ...props.style }}>{props.children}</div>;
};

type TornPaperImageProps = {
    src: string;
    alt?: string;
};

const TornPaperImage: React.FC<TornPaperImageProps> = ({ src, alt = "Torn Paper Image" }) => {
    return (
        <div style={{ width: "800px", height: "800px", backgroundColor: "red" }}>
            <CenteringDiv>
                <div
                    style={{
                        display: "inline-block",
                        position: "relative",
                        filter: "drop-shadow(3px 3px 4px rgba(0,0,0,0.3)",
                    }}
                >
                    <TornPaperMask width={500} height={400} baseFrequency={0.07}>
                        <CloneChildren containerWidth={500} containerHeight={400}>
                            <img
                                src={src}
                                alt={alt}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    backgroundColor: "#00a381",
                                }}
                            />
                        </CloneChildren>
                        <img
                            src={src}
                            alt={alt}
                            style={{
                                width: "500px",
                                height: "400px",
                                backgroundColor: "#00a381",
                            }}
                        />
                    </TornPaperMask>
                </div>
            </CenteringDiv>
        </div>
    );
};

function App() {
    return (
        <CenteringDiv style={{ height: "100vh", width: "100vw" }}>
            <TornPaperImage src={"https://www.transparenttextures.com/patterns/black-linen.png"} />
        </CenteringDiv>
        // <div>
        //     <h1>Clone Children Example</h1>
        //     <CloneChildren
        //         containerWidth={500}
        //         containerHeight={400}
        //     >
        //         <div style={{ backgroundColor: "lightblue", width: 100, height: 100 }}>Box</div>
        //     </CloneChildren>
        // </div>
    );
}

export default App;
