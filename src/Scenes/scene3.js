import "../stylesheets/styles.css";
import { useContext, useEffect, useRef } from "react";
import BaseImage from "../components/BaseImage";
import { UserContext } from "../components/BaseShot";

let imageCount = 0;
export default function Scene({ _geo, startTransition, nextFunc, _clickedRoomNum }) {
    const audioList = useContext(UserContext)
    useEffect(() => {
        audioList.bodyAudio.src = "./sounds/EP_52_Audio_07.mp3"

        imageCount = 0;
        let timer = setTimeout(() => {
            baseObject.current.className = 'aniObject'
        }, 2000);
        
        let timer1 = setTimeout(() => {
            audioList.bodyAudio.play()
        }, 1500);

        return () => {
            audioList.bodyAudio.pause();
            clearTimeout(timer)
            clearTimeout(timer1)
        }

      
    }, [])



    const baseObject = useRef();
    const sceneNumList = [3, 6]
    const highLightList = [
        useRef(),
        useRef()
    ]

    function loadImage() {
        imageCount++;
        if (imageCount == 2)
            baseObject.current.className = 'aniObject'
    }

    const clickFunc = (num) => {
        if (highLightList[num].current != null)
            highLightList[num].current.setStyle([{ key: 'opacity', value: 1 }])

        startTransition(num)
        audioList.bodyAudio.pause();
        setTimeout(() => {
            audioList.wooAudio.play().catch(error => { })
        }, 300);
        setTimeout(() => {
            nextFunc(sceneNumList[num]);
        }, 600);
    }

    return (
        <div
            ref={baseObject}
            className="hide">
            <div
                className="commonButton"
                onClick={() => { clickFunc(0) }}
                style={{
                    position: "fixed", width: _geo.width * 0.33 + "px",
                    height: _geo.width * 0.38 + "px"
                    , left: _geo.left + _geo.width * 0.1 + "px",
                    bottom: _geo.top + _geo.height * 0.15 + "px",
                    // opacity: _clickedRoomNum == 1 ? '0.7' : '1',
                    // pointerEvents: _clickedRoomNum == 1 ? 'none' : ''
                }}>
                <BaseImage
                    onLoad={loadImage}

                    url={"SB_52_Icons/SB_52_Dragon_Icon.svg"}
                />
                {_clickedRoomNum != 0 &&
                    < BaseImage
                        ref={highLightList[0]}
                        posInfo={{ t: -0.012 }}
                        url={"SB_52_Icons/SB_52_Dragon-Penguin_Icon_Highlight.svg"}
                        style={{ opacity: 0 }}
                    />
                }
            </div>
            <div

                className="commonButton"
                onClick={() => { clickFunc(1) }}
                style={{
                    position: "fixed", width: _geo.width * 0.33 + "px",
                    height: _geo.width * 0.38 + "px"
                    , right: _geo.left + _geo.width * 0.1 + "px",
                    bottom: _geo.top + _geo.height * 0.15 + "px",
                    // opacity: _clickedRoomNum == 2 ? '0.7' : '1',
                    // pointerEvents: _clickedRoomNum == 2 ? 'none' : ''
                }}>

                <BaseImage
                    onLoad={loadImage}
                    url={"SB_52_Icons/SB_52_Penguin_Icon.svg"}
                />
                {_clickedRoomNum != 1 &&
                    < BaseImage
                        ref={highLightList[1]}
                        url={"SB_52_Icons/SB_52_Dragon-Penguin_Icon_Highlight.svg"}
                        style={{ opacity: 0 }}
                    />
                }
            </div>

        </div>
    );
}
