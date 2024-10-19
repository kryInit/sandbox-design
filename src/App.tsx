import React, {ReactNode, useState} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

type CenteringDivProps = {
    children: ReactNode;
};
const CenteringDiv: React.FC<CenteringDivProps> = ({ children }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            {children}
        </div>
    );
}

interface TornPaperImageProps {
    src: string;
    alt?: string;
}

const TornPaperImage: React.FC<TornPaperImageProps> = ({ src, alt = "Torn Paper Image" }) => {
    return (
        <div style={{ width: "500px", height: "500px" }}>
            <CenteringDiv>
                <div style={{ display: "inline-block", position: "relative", filter: "drop-shadow(3px 3px 4px rgba(0,0,0,0.3)" }}>
                    <svg width="0" height="0">
                        <filter id="torn-paper-filter">
                            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                        </filter>

                        <mask id="torn-paper-mask">
                            <rect x="25" y="25" width="150px" height="300px" fill="white" filter="url(#torn-paper-filter)" />
                        </mask>
                    </svg>

                    <img
                        src={src}
                        alt={alt}
                        style={{
                            width: "400px",
                            height: "400px",
                            backgroundColor: "#fcf9ef",
                            // filter: 'url(#torn-paper-filter)', // SVGフィルターを適用
                            // clipPath: 'url(#torn-paper-clip)',  // 画像をノイズで切り取る

                            mask: "url(#torn-paper-mask)", // 画像をマスクで切り抜く
                            // WebkitMask: 'url(#torn-paper-mask)', // WebKitブラウザ対応

                            // borderRadius: '5px', // 少し角を丸める
                            // boxShadow: '0 40px 10px rgba(0, 0, 0)',
                        }}
                    />
                </div>
            </CenteringDiv>
        </div>
    );
};

function App() {
    const [count, setCount] = useState(0);

    return (
        <TornPaperImage src={"https://www.transparenttextures.com/patterns/black-linen.png"} />
    );
}

export default App;
