import "../stylesheets/styles.css";
import { useEffect, useRef, useContext } from "react";
import { UserContext } from "../components/BaseShot";
import { blinkFunc, stopBlinkFunc, startRepeatAudio, setRepeatAudio, stopRepeatAudio } from '../components/CommonFunctions';
import BaseImage from '../components/BaseImage';

let eyeBlinkNumbers = []
var stepCount = 0;
var posPenguinList = [
    { x: 0.225, y: 0.56 },
    { x: 0.37, y: 0.55 },
    { x: 0.52, y: 0.503 },
    { x: 0.66, y: 0.47 },
    { x: 0.69, y: 0.15 }
]

var posComplexPenguinPaths = [
    { x: 0.66, y: 0.14 },
    { x: 0.53, y: 0.18 },
    { x: 0.38, y: 0.16 },
    { x: 0.2, y: 0.20 }
]


var movePos = { x: 0.11, y: 0.32 }
var currentPos = { x: -0.1, y: 0.3 }
var timerList = []

export default function Scene({ nextFunc, _geo, startTransition, _baseGeo }) {

    const audioList = useContext(UserContext)

    const refLetterList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]

    const showLetterList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]

    const snowBaseList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]

    const penguinList = [
        useRef(),  //mum
        useRef(),
    ]

    const baseRef = useRef();


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
        ],
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
        ,
        [
            useRef(),
            useRef(),
            useRef(),
            useRef(),
        ]
        ,
        [
            useRef(),
            useRef(),
            useRef(),
            useRef(),
        ]
    ]

    const refPenguin = useRef();

    setTimeout(() => {
        changePos(currentPos);
    }, 100);

    useEffect(() => {

        stepCount = 0;


        audioList.bodyAudio.src = "./sounds/EP_52_Audio_02.mp3"

        audioList.subBodyAudio.src = "./sounds/EP_52_Audio_08.mp3"
        setRepeatAudio(audioList.subBodyAudio);

        audioList.wordAudio1.src = "./sounds/EP_52_Audio_09.mp3"
        audioList.wordAudio2.src = "./sounds/EP_52_Audio_10.mp3"
        audioList.wordAudio3.src = "./sounds/EP_52_Audio_12.mp3"
        audioList.wordAudio4.src = "./sounds/EP_52_Audio_11.mp3"


        refPenguin.current.className = 'hide'
        eyeBlinkNumbers = [
            blinkFunc(eyeList[0], 100, 3000),
            blinkFunc(eyeList[3], 200, 2000),
        ]

        setTimeout(() => {
            stopBlinkFunc(eyeBlinkNumbers[1])
            eyeBlinkNumbers[1] = blinkFunc(eyeList[4], 10, 1000, eyeList[3])
        }, 3500);

        setTimeout(() => {
            stopBlinkFunc(eyeBlinkNumbers[1])
            eyeBlinkNumbers[1] = blinkFunc(eyeList[5], 10, 1500, eyeList[4])
        }, 6500);

        penguinList[1].current.setClass('character-disappear')

        snowBaseList.map(snow => {
            snow.current.style.pointerEvents = 'none'
        })


        setTimeout(() => {
            refPenguin.current.style.left = _baseGeo.left + _baseGeo.width * currentPos.x + "px"
            refPenguin.current.style.bottom = _baseGeo.height * currentPos.y + "px"
            // refPenguin.current.style.transform = 'rotateY(-180deg)'
            refPenguin.current.style.transition = '1.2s ease-in-out'
        }, 200);

        setTimeout(() => {
            refPenguin.current.className = 'show'
            changePos(movePos, true);
        }, 1000);


        const timer1 = setTimeout(() => {
            audioList.bodyAudio.play();

        }, 1500);

        setTimeout(() => {
            changePos(posPenguinList[0], true);
            timerList[0] = setTimeout(() => {
                audioList.subBodyAudio.play();
                startRepeatAudio();
            }, 1000);
            setTimeout(() => {
                refPenguin.current.style.transition = '0.7s ease-in-out'
                refLetterList[0].current.className = 'show'
            }, 500);
        }, 6000);



        return () => {
            clearTimeout(timer1)
            currentPos = { x: -0.1, y: 0.3 }
            eyeBlinkNumbers = []
        }
    }, [])

    function clickPenguinFunc() {
        refPenguin.current.style.pointerEvents = 'none'
        baseRef.current.style.pointerEvents = 'none'

        audioList.clickAudio.currentTime = 0
        audioList.clickAudio.play().catch(error => { })

        stopRepeatAudio();

        switch (stepCount) {
            case 0: audioList.subBodyAudio.pause(); clearTimeout(timerList[0]); audioList.wordAudio1.play().catch(error => { }); break;
            case 1: audioList.wordAudio2.play().catch(error => { }); break;
            case 2: audioList.wordAudio3.play().catch(error => { }); break;
            case 3: audioList.wordAudio4.play().catch(error => { }); break;
            default:
                break;
        }
        setTimeout(() => {
            if (stepCount < 3) {


                setTimeout(() => {
                    refPenguin.current.style.transition = '0.7s ease-in-out'
                    refLetterList[stepCount + 1].current.className = 'show'
                    stepCount++;
                    refLetterList[stepCount - 1].current.style.pointerEvents = 'none'
                    baseRef.current.style.pointerEvents = ''
                    showLetterList[stepCount - 1].current.className = "bluehalf"

                    startRepeatAudio();
                }, 500);
            }


            changePos(posPenguinList[stepCount + 1], true);

            if (stepCount == 2) {
                stopBlinkFunc(eyeBlinkNumbers[0])
                eyeBlinkNumbers[0] = blinkFunc(eyeList[2], 300, 1500, eyeList[0])

            }
            if (stepCount == 3) {




                console.log('hi12')

                setTimeout(() => {
                    showLetterList[3].current.className = "bluehalf"
                    penguinList[0].current.setClass('character-disappear')
                    penguinList[1].current.setClass('character-appear')

                    audioList.successAudio.play();

                    console.log('hi1')

                    console.log(eyeBlinkNumbers)
                    stopBlinkFunc(eyeBlinkNumbers[0])
                    eyeBlinkNumbers[2] = blinkFunc(eyeList[1], 100, 2100, eyeList[2])

                    stopBlinkFunc(eyeBlinkNumbers[1])
                    eyeBlinkNumbers[3] = blinkFunc(eyeList[4], 100, 2500, eyeList[5])

                }, 500);

                setTimeout(() => {
                    reviewFunc();
                }, 5500);
            }

        }, 2500);
    }


    function reviewFunc() {
        baseRef.current.style.pointerEvents = 'none'

        // stopBlinkFunc(eyeBlinkNumbers[1])
        // eyeBlinkNumbers[1] = blinkFunc(eyeList[3], 0, 2000, eyeList[4])

        // refLetterList[3].current.style.pointerEvents = 'none'
        // refPenguin.current.style.transform = 'rotateY(0deg)'
        // refPenguin.current.style.transition = 'none'
        // changePos(posComplexPenguinPaths[0], true);

        setTimeout(() => {
            showLetterList[3].current.className = 'scaleText bluecomeback'
            setTimeout(() => {
                showLetterList[3].current.className = 'bluecomeback normalText'
                showLetterList[2].current.className = 'bluecomeback scaleText'
                setTimeout(() => {
                    showLetterList[2].current.className = 'bluecomeback normalText'
                    showLetterList[1].current.className = 'bluecomeback scaleText'
                    setTimeout(() => {
                        showLetterList[1].current.className = 'bluecomeback normalText'
                        showLetterList[0].current.className = 'bluecomeback scaleText'
                        setTimeout(() => {
                            showLetterList[0].current.className = 'bluecomeback normalText'
                        }, 2000);
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 600);

        setTimeout(() => {
            audioList.wordAudio4.play().catch(error => { });
            setTimeout(() => {
                audioList.wordAudio3.play().catch(error => { });
                setTimeout(() => {
                    audioList.wordAudio2.play().catch(error => { });
                    setTimeout(() => {
                        audioList.wordAudio1.play().catch(error => { });
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 200);

        // setTimeout(() => {
        //     // refPenguin.current.style.transition = '0.5s'
        //     refLetterList[2].current.style.opacity = '1'
        //     // changePos(posComplexPenguinPaths[1] , true);

        //     // penguinList[1].current.setClass('character-disappear')
        //     // penguinList[0].current.setClass('character-appear')

        //     // stopBlinkFunc(eyeBlinkNumbers[0])
        //     // eyeBlinkNumbers[0] = blinkFunc(eyeList[0], 0, 2000, eyeList[1])


        //     setTimeout(() => {
        //         refLetterList[1].current.style.opacity = '1'
        //         // changePos(posComplexPenguinPaths[2] , true);

        //         setTimeout(() => {
        //             refLetterList[0].current.style.opacity = '1'
        //             // changePos(posComplexPenguinPaths[3] , true);
        //         }, 2000);
        //     }, 2000);
        // }, 2600);

        setTimeout(() => {
            nextFunc();
        }, 10000);
    }

    function changePos(pos, isManual = false) {
        if (pos != currentPos) {
            if (isManual) {
                audioList.jumpAudio.pause()
                audioList.jumpAudio.currentTime = 0
                audioList.jumpAudio.play();
            }

            var xValue = (pos.x - currentPos.x) * 0.8 + currentPos.x;
            let middlePos = {
                x: xValue,
                y: 0.1 + currentPos.y
            }

            if (stepCount == 0)
                middlePos.y = pos.y + 0.1


            currentPos = pos;

            refPenguin.current.style.transition = '0.3s'
            refPenguin.current.style.left = _baseGeo.left + _baseGeo.width * middlePos.x + "px"
            refPenguin.current.style.bottom = _baseGeo.height * middlePos.y + "px"

            setTimeout(() => {
                refPenguin.current.style.transition = '0.2s'
                refPenguin.current.style.left = _baseGeo.left + _baseGeo.width * currentPos.x + "px"
                refPenguin.current.style.bottom = _baseGeo.height * currentPos.y + "px"
            }, 300);
        }
        else {
            // refPenguin.current.style.transition = '0.5s'
            refPenguin.current.style.left = _baseGeo.left + _baseGeo.width * currentPos.x + "px"
            refPenguin.current.style.bottom = _baseGeo.height * currentPos.y + "px"
        }



    }


    return (
        <div className="aniObject"
            ref={baseRef}
        >

            {/* base snow ball */}
            <div
                ref={snowBaseList[0]}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.19 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.18 + "px",
                    bottom: _baseGeo.height * 0.2 + "px",
                }}>
                <img draggable={false} width={"100%"}
                    src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_1.svg"}
                />
            </div>

            {/* letter  - a */}
            <div

                className="hide" ref={refLetterList[0]}>
                <div style={{
                    position: "fixed", width: _baseGeo.width * 0.19 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.18 + "px",
                    bottom: _baseGeo.height * 0.2 + "px",
                }}>
                    <img draggable={false} width={"100%"}
                        src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_1a.svg"}
                    />
                </div>


                <div
                    onClick={clickPenguinFunc}
                    className='commonButton'
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.14 + "px",
                        height: _baseGeo.width * 0.14 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.21 + "px",
                        bottom: _baseGeo.height * 0.24 + "px",

                    }}
                >
                    <div
                        ref={showLetterList[0]}
                        className='commonButton'
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.07 + "px"
                            , left: _baseGeo.width * 0.04 + "px",
                            bottom: _baseGeo.width * 0.03 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_the_1.svg"}
                        />
                    </div>
                </div>
            </div>

            <div
                ref={snowBaseList[2]}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.18 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.48 + "px",
                    bottom: _baseGeo.height * 0.18 + "px",
                }}>
                <img draggable={false} width={"100%"}
                    src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_1.svg"}
                />
            </div>

            {/* letter - to */}
            <div
                className="hide" ref={refLetterList[2]}>
                <div style={{
                    position: "fixed", width: _baseGeo.width * 0.18 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.48 + "px",
                    bottom: _baseGeo.height * 0.18 + "px",
                }}>
                    <img draggable={false} width={"100%"}
                        src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_1a.svg"}
                    />
                </div>

                <div
                    onClick={clickPenguinFunc}
                    className='commonButton'
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.13 + "px",
                        height: _baseGeo.width * 0.13 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.51 + "px",
                        bottom: _baseGeo.height * 0.22 + "px",

                    }}
                >
                    <div
                        ref={showLetterList[2]}
                        className='commonButton'
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.06 + "px"
                            , left: _baseGeo.width * 0.04 + "px",
                            bottom: _baseGeo.width * 0.03 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_to_3.svg"}
                        />
                    </div>
                </div>
            </div>

            <div
                ref={snowBaseList[1]}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.25 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.29 + "px",
                    bottom: _baseGeo.height * 0.12 + "px",
                }}>
                <img draggable={false} width={"100%"}
                    src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_1.svg"}
                />
            </div>
            {/* letter - you */}
            <div

                className="hide" ref={refLetterList[1]}>
                <div style={{
                    position: "fixed", width: _baseGeo.width * 0.25 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.29 + "px",
                    bottom: _baseGeo.height * 0.12 + "px",
                }}>
                    <img draggable={false} width={"100%"}
                        src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_1a.svg"}
                    />
                </div>
                <div
                    onClick={clickPenguinFunc}
                    className='commonButton'
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.2 + "px",
                        height: _baseGeo.width * 0.2 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.328 + "px",
                        bottom: _baseGeo.height * 0.14 + "px",

                    }}
                >
                    <div
                        ref={showLetterList[1]}
                        className='commonButton'
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.075 + "px"
                            , left: _baseGeo.width * 0.06 + "px",
                            bottom: _baseGeo.width * 0.06 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_you_1.svg"}
                        />
                    </div>
                </div>
            </div>


            <div
                ref={snowBaseList[3]}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.21 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.58 + "px",
                    bottom: _baseGeo.height * 0.1 + "px",
                }}>
                <img draggable={false} width={"100%"}
                    src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_1.svg"}
                />
            </div>

            {/* letter - I */}
            <div
                onClick={clickPenguinFunc}
                className="hide" ref={refLetterList[3]}>
                <div

                    style={{
                        position: "fixed", width: _baseGeo.width * 0.21 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.58 + "px",
                        bottom: _baseGeo.height * 0.1 + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_1a.svg"}
                    />
                </div>
                <div
                    onClick={clickPenguinFunc}
                    className='commonButton'
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.16 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.615 + "px",
                        bottom: _baseGeo.height * 0.135 + "px",

                    }}
                >
                    <div
                        ref={showLetterList[3]}
                        className='commonButton'
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.06 + "px"
                            , left: _baseGeo.width * 0.05 + "px",
                            bottom: _baseGeo.width * 0.05 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_i_3.svg"}
                        />
                    </div>
                </div>
            </div>

            {/* Penguin */}
            <div
                ref={refPenguin} style={{
                    position: "fixed", width: _baseGeo.width * 0.1 + "px",
                    height: _baseGeo.width * 0.08 + "px"
                    , transition: '0.5s',
                    transform: 'rotateY(180deg)'
                }}>
                <BaseImage
                    url={"animations/SB_52_Character_Eye-Blink/SB_52_Penguin_Dance_1.svg"}
                />
                {
                    [0, 1, 2, 3].map((value) => {
                        return (
                            <BaseImage key={value}

                                ref={eyeList[3][value]}
                                scale={0.27}
                                posInfo={{ l: 0.35, t: 0.477 }}
                                className={value != 0 ? 'character-disappear' : ''}
                                style={{ transform: 'rotateY(180deg)' }}
                                url={"animations/SB_52_Character_Eye-Blink/SB_52_Baby-Penguin_1_Eye_" + (value + 1) + ".svg"}
                            />
                        )
                    })
                }


                {
                    [0, 1, 2, 3].map((value) => {
                        return (
                            <BaseImage key={value}

                                ref={eyeList[4][value]}
                                scale={0.27}
                                posInfo={{ l: 0.35, t: 0.477 }}
                                className={'character-disappear'}
                                style={{ transform: 'rotateY(180deg)' }}
                                url={"animations/SB_52_Character_Eye-Blink/SB_52_Baby-Penguin_3_Eye_" + (value + 1) + ".svg"}
                            />
                        )
                    })
                }

                {
                    [0, 1, 2, 3].map((value) => {
                        return (
                            <BaseImage key={value}

                                ref={eyeList[5][value]}
                                scale={0.27}
                                posInfo={{ l: 0.35, t: 0.477 }}
                                className={'character-disappear'}
                                style={{ transform: 'rotateY(180deg)' }}
                                url={"animations/SB_52_Character_Eye-Blink/SB_52_Baby-Penguin_2_Eye_" + (value + 1) + ".svg"}
                            />
                        )
                    })
                }


            </div>

            <div style={{
                position: "fixed", width: _baseGeo.width * 0.12 + "px",
                height: _baseGeo.width * 0.12 + "px"
                , left: _baseGeo.left + _baseGeo.width * 0.745 + "px",
                bottom: _baseGeo.height * 0.2 + "px",
            }}>

                <BaseImage
                    ref={penguinList[0]}
                    posInfo={{ l: 0.1, t: 0.14 }}
                    url={"animations/SB_52_Character_Eye-Blink/SB_52_Mother-Penguin_1.svg"}
                />
                <BaseImage

                    ref={penguinList[1]}
                    posInfo={{ l: 0.1, t: 0.14 }}
                    url={"animations/SB_52_Character_Eye-Blink/SB_52_Mother-Penguin_3.svg"}
                />



                {
                    [0, 1, 2, 3].map((value) => {
                        return (
                            <BaseImage key={value}

                                ref={eyeList[0][value]}
                                scale={0.35}
                                posInfo={{ l: 0.4, t: 0.28 }}
                                className={value != 10 ? 'character-disappear' : ''}
                                url={"animations/SB_52_Character_Eye-Blink/SB_52_Mother-Penguin_1_Eye_" + (value + 1) + ".svg"}
                            />
                        )
                    })
                }
                {
                    [0, 1, 2, 3].map((value) => {
                        return (
                            <BaseImage key={value}

                                ref={eyeList[1][value]}
                                scale={0.35}
                                posInfo={{ l: 0.34, t: 0.28 }}
                                className={'character-disappear'}
                                url={"animations/SB_52_Character_Eye-Blink/SB_52_Mother-Penguin_3_Eye_" + (value + 1) + ".svg"}
                            />
                        )
                    })
                }
                {
                    [0, 1, 2, 3].map((value) => {
                        return (
                            <BaseImage key={value}
                                ref={eyeList[2][value]}
                                scale={0.35}
                                posInfo={{ l: 0.4, t: 0.28 }}
                                className={value != 10 ? 'character-disappear' : ''}
                                url={"animations/SB_52_Character_Eye-Blink/SB_52_Mother-Penguin_2_Eye_" + (value + 1) + ".svg"}
                            />
                        )
                    })
                }



            </div>
        </div>
    );
}
