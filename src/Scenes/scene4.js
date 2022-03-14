import "../stylesheets/styles.css";
import { useEffect, useRef, useContext } from "react";
import { UserContext } from "../components/BaseShot";
import { blinkFunc, stopBlinkFunc, setRepeatAudio, startRepeatAudio, stopRepeatAudio } from '../components/CommonFunctions';
import BaseImage from '../components/BaseImage';

let eyeBlinkNumbers = []

let imageCount = 0;
var timerList = []
var stepCount = 0;



export default function Scene({ nextFunc, _baseGeo }) {
    const audioList = useContext(UserContext)
    const eyeList = [
        [
            useRef(),
            useRef(),
            useRef(),
            useRef(),
        ],
        [
            useRef(),
            useRef(),
            useRef(),
            useRef(),
        ]
        , [
            useRef(),
            useRef(),
            useRef(),
            useRef(),
        ]
        , [
            useRef(),
            useRef(),
            useRef(),
            useRef(),
        ], [
            useRef(),
            useRef(),
            useRef(),
            useRef(),
        ]
    ]

    const showingTextList = [useRef(), useRef(), useRef(), useRef()]


    const baseObject = useRef();

    const eggChangeList = [
        [
            useRef(), useRef(), useRef(), useRef(), useRef(), useRef()
        ],
        [
            useRef(), useRef(), useRef(), useRef(), useRef(), useRef()
        ],
        [
            useRef(), useRef(), useRef(), useRef(), useRef(), useRef()
        ],
        [
            useRef(), useRef(), useRef(), useRef(), useRef(), useRef()
        ]
    ]



    function fomartFunc() {

        audioList.bodyAudio.src = "./sounds/EP_52_Audio_34.mp3"
        setRepeatAudio(audioList.bodyAudio)

        audioList.subBodyAudio.src = "./sounds/EP_52_Audio_08.mp3"

        audioList.wordAudio1.src = "./sounds/EP_52_Audio_15.mp3"
        audioList.wordAudio2.src = "./sounds/EP_52_Audio_16.mp3"
        audioList.wordAudio3.src = "./sounds/EP_52_Audio_17.mp3"
        audioList.wordAudio4.src = "./sounds/EP_52_Audio_18.mp3"


        imageCount = 0;
        stepCount = 0;
        setTimeout(() => {
            eyeBlinkNumbers = [
                blinkFunc(eyeList[0], 100, 3000),
                blinkFunc(eyeList[1], 200, 1800),
                blinkFunc(eyeList[2], 400, 2200),
                blinkFunc(eyeList[3], 400, 2600),
                blinkFunc(eyeList[4], 300, 2800)
            ]
        }, 500);

        const timer3 = setTimeout(() => {
            baseObject.current.className = 'aniObject'
        }, 2000);

        const timer2 = setTimeout(() => {
            firstEgg.current.style.zIndex = 500
        }, 500);

        timerList[0] = setTimeout(() => {
            audioList.bodyAudio.play().catch(error => { })
            startRepeatAudio();
            firstEgg.current.className = 'brush-scaleBtn'
        }, 2000);


        return () => {
            for (let i = 0; i < eyeBlinkNumbers.length; i++)
                stopBlinkFunc(eyeBlinkNumbers[i])
        }
    }

    const refDragonAndEggList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]

    const refLetterList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]



    const refDragon = useRef();
    const firstEgg = useRef();

    function showLetter(num) {
        if (num == 0) {
            clearTimeout(timerList[1])
            timerList[1] = setTimeout(() => {
                audioList.subBodyAudio.play().catch(error => { });
            }, 1000);
            audioList.bodyAudio.pause();
            clearTimeout(timerList[0])
        }
        setTimeout(() => {
            refDragonAndEggList[num].current.className = 'show'
            refLetterList[num].current.className = 'show'
        }, 200);

        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                eggChangeList[num][i].current.setClass('character-disappear')
                eggChangeList[num][i + 1].current.setClass('character-appear')
            }, 100 * (i + 1));
        }
    }

    function loadImage() {
        imageCount++;
        if (imageCount == 5)
            baseObject.current.className = 'aniObject'
    }

    function clickDragonFunc() {

        stopRepeatAudio();
        audioList.clickAudio.currentTime = 0
        audioList.clickAudio.play().catch(error => { })

        audioList.clickAudio.currentTime = 0
        audioList.clickAudio.play().catch(error => { })

        refLetterList[stepCount].current.style.pointerEvents = 'none'

        switch (stepCount) {
            case 0: audioList.subBodyAudio.pause(); clearTimeout(timerList[1]); audioList.wordAudio1.play().catch(error => { }); break;
            case 1: audioList.wordAudio2.play().catch(error => { }); break;
            case 2: audioList.wordAudio3.play().catch(error => { }); break;
            case 3: audioList.wordAudio4.play().catch(error => { }); break;
            default:
                break;
        }

        setTimeout(() => {
            if (stepCount < 3) {
                showingTextList[stepCount].current.className = 'bluehalf'
                stepCount++;
                showLetter(stepCount)

                startRepeatAudio(5000, 7000);
            }
            else {
                reviewFunc();
            }
        }, 2500);
    }

    function reviewFunc() {
        setTimeout(() => {
            audioList.wordAudio4.play();
            setTimeout(() => {
                audioList.wordAudio3.play();
                setTimeout(() => {
                    audioList.wordAudio2.play();
                    setTimeout(() => {
                        audioList.wordAudio1.play();
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 300);

        for (let i = 0; i < 4; i++)
            setTimeout(() => {
                showingTextList[3 - i].current.className = 'bluecomeback scaleText'
                setTimeout(() => {
                    showingTextList[3 - i].current.className = 'bluecomeback normalText'
                }, 1800);
            }, 2000 * i);

        setTimeout(() => {
            nextFunc();
        }, 10000);
    }


    useEffect(fomartFunc, [])

    return (
        <div className="hideObject"
            ref={baseObject}
        >
            {/* Dragon */}
            <div
                ref={refDragon} style={{
                    position: "fixed", width: _baseGeo.width * 0.28 + "px",
                    height: _baseGeo.width * 0.28 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.4 + 'px',
                    bottom: _baseGeo.height * 0.35 + 'px'
                }}>

                <BaseImage
                    posInfo={{ l: 0.1, t: 0.14 }}
                    url={"animations/SB_52_Character_Eye-Blink/SB_52_Mother-Dragon.svg"}
                    onLoad={loadImage}
                />

                {
                    [0, 1, 2, 3].map((value) => {
                        return (
                            <BaseImage
                                key={value}
                                ref={eyeList[0][value]}
                                scale={0.19}
                                posInfo={{ l: 0.45, t: 0.28 }}
                                className={value != 0 ? 'character-disappear' : ''}
                                onLoad={value == 0 ? loadImage : null}
                                url={"animations/SB_52_Character_Eye-Blink/SB_52_Mother-Dragon_Eye_" + (value + 1) + ".svg"}
                            />
                        )
                    })
                }
            </div>

            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.8 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.1 + 'px',
                    bottom: _baseGeo.height * 0.12 + 'px',
                    opacity: 1,
                    overflow: 'hidden',
                    pointerEvents: 'none'
                }}>
                <img draggable={false} width={"100%"}
                    style={{ top: '-10%' }}
                    src={"./images/SB_52_Foreground/SB_52_FG_Sand_1.svg"}
                />
            </div>

            {/* letter  - and */}
            <div
                className="hide" ref={refDragonAndEggList[0]}>

                <div style={{
                    position: "fixed", width: _baseGeo.width * 0.103 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.255 + "px",
                    bottom: _baseGeo.height * 0.265 + "px",
                }}>
                    <img draggable={false} width={"100%"}
                        src={"./images/SB_52_Prop-Interactive/SB_52_PI_Egg-Shell_2.svg"}
                    />
                </div>
                <div style={{
                    position: "fixed", width: _baseGeo.width * 0.06 + "px",
                    height: _baseGeo.width * 0.06 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.275 + "px",
                    bottom: _baseGeo.height * 0.38 + "px",
                }}>
                    <BaseImage
                        posInfo={{ l: 0.1, t: 0.14 }}
                        url={"animations/SB_52_Character_Eye-Blink/SB_52_Baby-Dragon_1.svg"}
                    />

                    {
                        [0, 1, 2, 3].map((value) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={eyeList[1][value]}
                                    scale={0.55}
                                    posInfo={{ l: 0.3, t: 0.26 }}
                                    className={value != 0 ? 'character-disappear' : ''}
                                    url={"animations/SB_52_Character_Eye-Blink/SB_52_Baby-Dragon_1_Eye_" + (value + 1) + ".svg"}
                                />
                            )
                        })
                    }

                </div>
            </div>
            {/* letter - go */}
            <div
                className="hide" ref={refDragonAndEggList[1]}>
                <div style={{
                    position: "fixed", width: _baseGeo.width * 0.103 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.385 + "px",
                    bottom: _baseGeo.height * 0.265 + "px",
                }}>
                    <img draggable={false} width={"100%"}
                        src={"./images/SB_52_Prop-Interactive/SB_52_PI_Egg-Shell_2.svg"}
                    />
                </div>
                <div style={{
                    position: "fixed", width: _baseGeo.width * 0.06 + "px",
                    height: _baseGeo.width * 0.06 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.405 + "px",
                    bottom: _baseGeo.height * 0.375 + "px",
                }}>

                    <BaseImage
                        posInfo={{ l: 0.1, t: 0.14 }}
                        url={"animations/SB_52_Character_Eye-Blink/SB_52_Baby-Dragon_2.svg"}
                    />

                    {
                        [0, 1, 2, 3].map((value) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={eyeList[2][value]}
                                    scale={0.6}
                                    posInfo={{ l: 0.2, t: 0.26 }}
                                    className={value != 0 ? 'character-disappear' : ''}
                                    url={"animations/SB_52_Character_Eye-Blink/SB_52_Baby-Dragon_2_Eye_" + (value + 1) + ".svg"}
                                />
                            )
                        })
                    }
                </div>



            </div>
            {/* letter - this */}
            <div
                className="hide" ref={refDragonAndEggList[2]}>
                <div style={{
                    position: "fixed", width: _baseGeo.width * 0.103 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.515 + "px",
                    bottom: _baseGeo.height * 0.265 + "px",
                }}>
                    <img draggable={false} width={"100%"}
                        src={"./images/SB_52_Prop-Interactive/SB_52_PI_Egg-Shell_2.svg"}
                    />
                </div>
                <div style={{
                    position: "fixed", width: _baseGeo.width * 0.06 + "px"
                    , height: _baseGeo.width * 0.06 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.535 + "px",
                    bottom: _baseGeo.height * 0.38 + "px",
                }}>
                    <BaseImage
                        posInfo={{ l: 0.1, t: 0.14 }}
                        url={"animations/SB_52_Character_Eye-Blink/SB_52_Baby-Dragon_3.svg"}
                    />

                    {
                        [0, 1, 2, 3].map((value) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={eyeList[3][value]}
                                    scale={0.55}
                                    posInfo={{ l: 0.26, t: 0.24 }}
                                    className={value != 0 ? 'character-disappear' : ''}
                                    url={"animations/SB_52_Character_Eye-Blink/SB_52_Baby-Dragon_3_Eye_" + (value + 1) + ".svg"}
                                />
                            )
                        })
                    }
                </div>
            </div>
            {/* letter - has */}
            <div
                className="hide" ref={refDragonAndEggList[3]}>
                <div style={{
                    position: "fixed", width: _baseGeo.width * 0.103 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.645 + "px",
                    bottom: _baseGeo.height * 0.265 + "px",
                }}>
                    <img draggable={false} width={"100%"}
                        src={"./images/SB_52_Prop-Interactive/SB_52_PI_Egg-Shell_2.svg"}
                    />
                </div>
                <div style={{
                    position: "fixed", width: _baseGeo.width * 0.06 + "px",
                    height: _baseGeo.width * 0.06 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.665 + "px",
                    bottom: _baseGeo.height * 0.38 + "px",
                }}>
                    <BaseImage
                        posInfo={{ l: 0.1, t: 0.14 }}
                        url={"animations/SB_52_Character_Eye-Blink/SB_52_Baby-Dragon_4.svg"}
                    />

                    {
                        [0, 1, 2, 3].map((value) => {
                            return (
                                <BaseImage
                                    ref={eyeList[4][value]}
                                    scale={0.6}
                                    key={value}
                                    posInfo={{ l: 0.18, t: 0.24 }}
                                    className={value != 0 ? 'character-disappear' : ''}
                                    url={"animations/SB_52_Character_Eye-Blink/SB_52_Baby-Dragon_4_Eye_" + (value + 1) + ".svg"}
                                />
                            )
                        })
                    }
                </div>
            </div>
            {/* eggs */}

            <div style={{
                position: "fixed", width: _baseGeo.width * 0.11 + "px",
                height: _baseGeo.width * 0.15 + "px",
                left: _baseGeo.left + _baseGeo.width * 0.25 + 'px',
                bottom: _baseGeo.height * 0.185 + 'px',
                overflow: 'hidden'
            }}
                onClick={() => {
                    showLetter(0);
                    stopRepeatAudio()
                    setRepeatAudio(audioList.subBodyAudio)
                    startRepeatAudio();

                    firstEgg.current.style.pointerEvents = 'none'
                    firstEgg.current.className = 'disable'
                    firstEgg.current.style.zIndex = 0
                    firstEgg.current.className = 'hideObject'
                }}

                ref={firstEgg}
                className='playBtn'
            >
                <BaseImage
                    scale={2.3}
                    posInfo={{ l: -0.67, t: -0.26 }}
                    url={"animations/SB_52_Prop_Animation/SB_52_Egg_1.svg"}
                />
            </div>
            <div style={{ opacity: 1 }}>
                <div
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.242 + "px",
                        height: _baseGeo.width * 0.245 + "px",
                        left: _baseGeo.left + _baseGeo.width * 0.158 + 'px',
                        bottom: _baseGeo.height * 0.14 + 'px',
                    }}>

                    {
                        [0, 1, 2, 3, 4].map((value) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={eggChangeList[0][value]}
                                    posInfo={{ l: 0.1, t: 0.14 }}
                                    className={value != 0 ? 'character-disappear' : ''}
                                    onLoad={value == 0 ? loadImage : null}
                                    url={"animations/SB_52_Prop_Animation/SB_52_Egg_" + (value + 1) + ".svg"}
                                />
                            )
                        })
                    }
                </div>

                <div
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.242 + "px",
                        height: _baseGeo.width * 0.245 + "px",
                        left: _baseGeo.left + _baseGeo.width * 0.29 + 'px',
                        bottom: _baseGeo.height * 0.14 + 'px'
                    }}>

                    {
                        [0, 1, 2, 3, 4].map((value) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={eggChangeList[1][value]}
                                    posInfo={{ l: 0.1, t: 0.14 }}
                                    className={value != 0 ? 'character-disappear' : ''}
                                    onLoad={value == 0 ? loadImage : null}
                                    url={"animations/SB_52_Prop_Animation/SB_52_Egg_" + (value + 1) + ".svg"}
                                />
                            )
                        })
                    }
                </div>
                <div
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.242 + "px",
                        height: _baseGeo.width * 0.245 + "px",
                        left: _baseGeo.left + _baseGeo.width * 0.42 + 'px',
                        bottom: _baseGeo.height * 0.14 + 'px'
                    }}>

                    {
                        [0, 1, 2, 3, 4].map((value) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={eggChangeList[2][value]}
                                    posInfo={{ l: 0.1, t: 0.14 }}
                                    className={value != 0 ? 'character-disappear' : ''}
                                    onLoad={value == 0 ? loadImage : null}
                                    url={"animations/SB_52_Prop_Animation/SB_52_Egg_" + (value + 1) + ".svg"}
                                />
                            )
                        })
                    }
                </div>
                <div
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.242 + "px",
                        height: _baseGeo.width * 0.245 + "px",
                        left: _baseGeo.left + _baseGeo.width * 0.55 + 'px',
                        bottom: _baseGeo.height * 0.14 + 'px'
                    }}>

                    {
                        [0, 1, 2, 3, 4].map((value) => {
                            return (
                                <BaseImage
                                    key={value}
                                    ref={eggChangeList[3][value]}
                                    posInfo={{ l: 0.1, t: 0.14 }}
                                    className={value != 0 ? 'character-disappear' : ''}
                                    onLoad={value == 0 ? loadImage : null}
                                    url={"animations/SB_52_Prop_Animation/SB_52_Egg_" + (value + 1) + ".svg"}
                                />
                            )
                        })
                    }
                </div>

            </div>


            {/* real letters */}
            <div
                className='hide'
                ref={refLetterList[0]}
            >
                <div
                    onClick={clickDragonFunc}
                    ref={showingTextList[0]}
                    className="commonButton"
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.1 + "px",
                        height: _baseGeo.width * 0.14 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.255 + "px",
                        bottom: _baseGeo.height * 0.17 + "px",

                    }}>
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.07 + "px"
                            , left: _baseGeo.width * 0.012 + "px",
                            bottom: _baseGeo.height * 0.06 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_and_1.svg"}
                        />
                    </div>
                </div>
            </div>
            <div
                className='hide'
                ref={refLetterList[1]}>
                <div
                    onClick={clickDragonFunc}
                    ref={showingTextList[1]}
                    className="commonButton"
                    style={{
                        position: "absolute", width: _baseGeo.width * 0.1 + "px",
                        height: _baseGeo.width * 0.14 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.39 + "px",
                        bottom: _baseGeo.height * 0.16 + "px",

                    }}>
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.07 + "px"
                            , left: _baseGeo.width * 0.015 + "px",
                            bottom: _baseGeo.height * 0.05 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_go_1.svg"}
                        />
                    </div>
                </div>
            </div>

            <div
                className='hide'
                ref={refLetterList[2]}>
                <div
                    onClick={clickDragonFunc}
                    ref={showingTextList[2]}
                    className="commonButton"
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.1 + "px",
                        height: _baseGeo.width * 0.14 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.515 + "px",
                        bottom: _baseGeo.height * 0.17 + "px",

                    }}>
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.07 + "px"
                            , left: _baseGeo.width * 0.015 + "px",
                            bottom: _baseGeo.height * 0.05 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_this_1.svg"}
                        />
                    </div>
                </div>
            </div>


            <div
                className='hide'
                ref={refLetterList[3]}>
                <div
                    onClick={clickDragonFunc}
                    ref={showingTextList[3]}
                    className="commonButton"
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.1 + "px",
                        height: _baseGeo.width * 0.14 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.65 + "px",
                        bottom: _baseGeo.height * 0.17 + "px",

                    }}>
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.07 + "px"
                            , left: _baseGeo.width * 0.015 + "px",
                            bottom: _baseGeo.height * 0.05 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_has_1.svg"}
                        />
                    </div>
                </div>
            </div>



            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 1 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.0 + 'px',
                    bottom: _baseGeo.height * -0.35 + 'px',
                    pointerEvents: 'none'
                }}>
                <img draggable={false} width={"100%"}
                    src={"./images/SB_52_Foreground/SB_52_FG_Grass.svg"}
                />
            </div>

        </div>
    );
}
