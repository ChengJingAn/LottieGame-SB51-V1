import "../stylesheets/styles.css";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../components/BaseShot";
import { blinkFunc, stopBlinkFunc, setRepeatAudio, startRepeatAudio, stopRepeatAudio, setExtraVolume } from '../components/CommonFunctions';
import BaseImage from '../components/BaseImage';

let eyeBlinkNumbers = []
var varCurrentStep = 0;

var movePos = { x: 0.68, y: 0.27 }
var currentPos = { x: 1.2, y: 0.38 }
var correctAudioList = [];
var timerList = []
let penguinTimer

var randomList = []

export default function Scene({ nextFunc, _geo, _baseGeo }) {
    const audioList = useContext(UserContext)

    const refLetterToRight = useRef()
    const refLetterIMiddle = useRef()
    const refLetterYouLeft = useRef()
    const refLetterYouMiddle = useRef()
    const refLetterTheLeft = useRef()
    const refLetterTheRight = useRef()
    const refLetterYouRight = useRef()
    const refLetterTheMiddle = useRef()
    const refLetterToLeft = useRef()

    const musicBtn = useRef();

    const refMarkList = [
        useRef(), useRef(), useRef(), useRef()
    ]

    const eyeList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]

    const characterList = [
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef()

    ]

    const backObject = useRef()
    const refPenguin = useRef()

    const varAnswerList = [refLetterYouLeft, refLetterToRight, refLetterIMiddle, refLetterTheMiddle]
    const Letterlist = [
        refLetterToRight, refLetterIMiddle, refLetterYouLeft,
        refLetterToRight, refLetterYouMiddle, refLetterTheLeft,
        refLetterTheRight, refLetterIMiddle, refLetterYouLeft,
        refLetterYouRight, refLetterTheMiddle, refLetterToLeft,
    ]

    const refBaseSnowList = [
        useRef(), useRef(), useRef(),
        useRef(), useRef(), useRef(),
        useRef(), useRef(), useRef(),
        useRef(), useRef(), useRef()
    ]

    useEffect(() => {

        randomList = []

        while (randomList.length != 4) {
            let randomNumber = Math.floor(Math.random() * 4);
            if (!randomList.includes(randomNumber))
                randomList.push(randomNumber)
        }

        varCurrentStep = 0;
        audioList.bodyAudio.src = "./sounds/EP_52_Audio_36.mp3"
        setExtraVolume(audioList.bodyAudio, 1.5)
        setRepeatAudio(audioList.bodyAudio)
        backObject.current.style.pointerEvents = 'none'


        correctAudioList = [
            audioList.wordAudio2,
            audioList.wordAudio3,
            audioList.wordAudio4,
            audioList.wordAudio1
        ]

        timerList[0] = setTimeout(() => {
            audioList.bodyAudio.play().catch(error => { })
            timerList[1] = setTimeout(() => {

                correctAudioList[randomList[0]].play().catch(error => { })
                startRepeatAudio();
                backObject.current.style.pointerEvents = ''

            }, audioList.bodyAudio.duration * 1000);

        }, 1800);



        eyeBlinkNumbers = [
            blinkFunc(eyeList, 100, 3000),
        ]

        setTimeout(() => {
            currentPos = movePos;
            refPenguin.current.style.transition = '1s'
            changePos();
        }, 500);


        setTimeout(() => {
            [0, 1, 2].map(value => {
                Letterlist[randomList[0] * 3 + value].current.className = 'appear'
            })
        }, 1000);

        return () => {
            clearTimeout(penguinTimer)
            setExtraVolume(audioList.bodyAudio, 1)
            currentPos = { x: 1.2, y: 0.28 }

            eyeBlinkNumbers = []
        }
    }, [])




    setTimeout(() => {
        changePos();
    }, 100);

    function changePos() {
        if (refPenguin.current != null) {
            refPenguin.current.style.left = _baseGeo.left + _baseGeo.width * currentPos.x + "px"
            refPenguin.current.style.bottom = _baseGeo.height * currentPos.y + "px"
        }
    }


    function funcClick(clickedValue) {

        stopRepeatAudio();

        correctAudioList[randomList[varCurrentStep]].currentTime = 0;
        audioList.buzzAudio.currentTime = 0;

        correctAudioList[randomList[varCurrentStep]].pause();
        audioList.buzzAudio.pause()
        clearTimeout(timerList[2])
        clickedValue.current.className = 'repearWord'
        backObject.current.style.pointerEvents = ''
        refPenguin.current.className = ''

        correctAudioList[randomList[0]].pause();
        audioList.bodyAudio.pause();

        if (varCurrentStep < 4) {
            if (clickedValue == varAnswerList[randomList[varCurrentStep]]) {
                backObject.current.style.pointerEvents = 'none'
                audioList.tingAudio.play().catch(event => { })
                let currentNum = 0;
                stopBlinkFunc(eyeBlinkNumbers[eyeBlinkNumbers.length - 1])

                eyeList.forEach(element => {
                    element.current.setClass('character-disappear')
                });

                refMarkList[varCurrentStep].current.src = "./images/SB_52_Icons/SB_52_Snow-Flake_Icon.svg"

                let timeinterval = setInterval(() => {
                    characterList[currentNum].current.setClass('character-disappear')
                    if (currentNum < 5)
                        currentNum++;
                    else {
                        currentNum = 0;
                        clearInterval(timeinterval)
                        eyeBlinkNumbers[eyeBlinkNumbers.length] = blinkFunc(eyeList, 450, 3000)
                    }
                    characterList[currentNum].current.setClass('character-appear')
                }, 150);

                for (let i = 0; i < 3; i++) {
                    if (Letterlist[randomList[varCurrentStep] * 3 + i] != clickedValue) {
                        Letterlist[randomList[varCurrentStep] * 3 + i].current.className = 'disapear'

                        for (let j = 0; j < 3; j++) {
                            setTimeout(() => {
                                refBaseSnowList[j * 3 + i].current.className = 'disapear-snow'
                                refBaseSnowList[(j + 1) * 3 + i].current.className = 'appear-snow'
                            }, 500 * (j + 1));
                        }
                        setTimeout(() => {
                            refBaseSnowList[3 * 3 + i].current.className = 'disapear-snow'
                        }, 2000);
                    }
                }
                varCurrentStep++;

                setTimeout(() => {
                    if (varCurrentStep < 4) {
                        clickedValue.current.className = 'disapear'
                        setTimeout(() => {
                            for (let i = 0; i < 3; i++) {
                                Letterlist[randomList[varCurrentStep] * 3 + i].current.className = 'appear'
                                refBaseSnowList[i].current.className = 'appear'
                                backObject.current.style.pointerEvents = ''
                            }
                        }, 500);

                        setTimeout(() => {
                            correctAudioList[randomList[varCurrentStep]].pause();
                            correctAudioList[randomList[varCurrentStep]].currentTime = 0;
                            correctAudioList[randomList[varCurrentStep]].play();
                        }, 1200);

                        startRepeatAudio();

                    }
                    else
                        setTimeout(() => {
                            nextFunc();
                        }, 1000);

                }, 2000);
            }
            else {
                correctAudioList[randomList[varCurrentStep]].currentTime = 0;
                audioList.buzzAudio.currentTime = 0;

                correctAudioList[randomList[varCurrentStep]].pause();
                audioList.buzzAudio.play().catch(error => { })
                clickedValue.current.className = 'wrongWord'
                timerList[2] = setTimeout(() => {
                    correctAudioList[randomList[varCurrentStep]].play().catch(error => { })
                    clickedValue.current.className = 'repearWord'
                    startRepeatAudio();
                }, 1000);
            }
        }

    }

    return (
        <div className="aniObject"
            ref={backObject}
        >
            {/* baseSnows */}
            <div>

                <div className="hide"
                    ref={refBaseSnowList[10]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.21 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.26 + "px",
                        bottom: _baseGeo.height * 0.18 + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_3e.svg"}
                    />
                </div>

                <div className="hide"
                    ref={refBaseSnowList[9]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.22 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.45 + "px",
                        bottom: _baseGeo.height * 0.15 + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_3e.svg"}
                    />
                </div>

                <div className="hide"
                    ref={refBaseSnowList[11]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.24 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.09 + "px",
                        bottom: _baseGeo.height * 0.12 + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_3e.svg"}
                    />
                </div>



                <div className="hide"
                    ref={refBaseSnowList[7]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.21 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.26 + "px",
                        bottom: _baseGeo.height * 0.18 + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_3d.svg"}
                    />
                </div>

                <div className="hide"
                    ref={refBaseSnowList[6]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.22 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.45 + "px",
                        bottom: _baseGeo.height * 0.15 + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_3d.svg"}
                    />
                </div>
                <div className="hide"
                    ref={refBaseSnowList[8]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.24 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.09 + "px",
                        bottom: _baseGeo.height * 0.12 + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_3d.svg"}
                    />
                </div>
                <div className="hide"
                    ref={refBaseSnowList[4]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.21 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.26 + "px",
                        bottom: _baseGeo.height * 0.18 + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_3c.svg"}
                    />
                </div>

                <div className="hide"
                    ref={refBaseSnowList[3]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.22 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.45 + "px",
                        bottom: _baseGeo.height * 0.15 + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_3c.svg"}
                    />
                </div>
                <div className="hide"
                    ref={refBaseSnowList[5]}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.24 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.09 + "px",
                        bottom: _baseGeo.height * 0.12 + "px",
                    }}>
                    <img draggable={false} width={"100%"}
                        src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_3c.svg"}
                    />
                </div>


                <div style={{ opacity: 1 }}>
                    <div className="hide1"
                        ref={refBaseSnowList[1]}
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.23 + "px"
                            , left: _baseGeo.left + _baseGeo.width * 0.25 + "px",
                            bottom: _baseGeo.height * 0.18 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_1a.svg"}
                        />
                    </div>

                    <div className="hide1"
                        ref={refBaseSnowList[0]}
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.24 + "px"
                            , left: _baseGeo.left + _baseGeo.width * 0.44 + "px",
                            bottom: _baseGeo.height * 0.15 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_1a.svg"}
                        />
                    </div>
                    <div className="hide1"
                        ref={refBaseSnowList[2]}
                        style={{
                            position: "fixed", width: _baseGeo.width * 0.26 + "px"
                            , left: _baseGeo.left + _baseGeo.width * 0.08 + "px",
                            bottom: _baseGeo.height * 0.12 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            src={"./images/SB_52_Prop-Interactive/SB_52_PI_Snow-Ball_1a.svg"}
                        />
                    </div>
                </div>
            </div>

            {/* letter the middle */}
            <div ref={refLetterTheMiddle} className="hide"
            >

                <div
                    onClick={() => { funcClick(refLetterTheMiddle) }}
                    className='commonButton'
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.18 + "px",
                        height: _baseGeo.width * 0.18 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.29 + "px",
                        bottom: _baseGeo.height * 0.21 + "px",

                    }}>
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.08 + "px"
                            , left: _baseGeo.width * 0.055 + "px",
                            bottom: _baseGeo.width * 0.055 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_the_3.svg"}
                        />
                    </div>
                </div>
            </div>
            {/* letter you middle */}
            <div className="hide" ref={refLetterYouMiddle}>
                <div
                    onClick={() => { funcClick(refLetterYouMiddle) }}
                    className='commonButton'
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.18 + "px",
                        height: _baseGeo.width * 0.18 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.29 + "px",
                        bottom: _baseGeo.height * 0.21 + "px",

                    }}>
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.08 + "px"
                            , left: _baseGeo.width * 0.055 + "px",
                            bottom: _baseGeo.width * 0.045 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_you_3.svg"}
                        />
                    </div>
                </div>
            </div>
            {/* letter i middle */}
            <div ref={refLetterIMiddle} className="hide">
                <div
                    onClick={() => { funcClick(refLetterIMiddle) }}
                    className='commonButton'
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.18 + "px",
                        height: _baseGeo.width * 0.18 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.29 + "px",
                        bottom: _baseGeo.height * 0.21 + "px",

                    }}>
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.07 + "px"
                            , left: _baseGeo.width * 0.06 + "px",
                            bottom: _baseGeo.width * 0.045 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_i_3.svg"}
                        />
                    </div>
                </div>
            </div>

            {/* letter to right */}
            <div
                ref={refLetterToRight}
                className="hide">
                <div
                    onClick={() => { funcClick(refLetterToRight) }}
                    className='commonButton'
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.2 + "px",
                        height: _baseGeo.width * 0.2 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.47 + "px",
                        bottom: _baseGeo.height * 0.18 + "px",

                    }}>
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.07 + "px"
                            , left: _baseGeo.width * 0.07 + "px",
                            bottom: _baseGeo.width * 0.055 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_to_3.svg"}
                        />
                    </div>
                </div>
            </div>

            {/* letter you left */}
            <div className="hide"
                ref={refLetterYouLeft}
            >
                <div
                    onClick={() => { funcClick(refLetterYouLeft) }}
                    className='commonButton'
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.22 + "px",
                        height: _baseGeo.width * 0.22 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.11 + "px",
                        bottom: _baseGeo.height * 0.14 + "px",

                    }}>
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.08 + "px"
                            , left: _baseGeo.width * 0.08 + "px",
                            bottom: _baseGeo.width * 0.065 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_you_3.svg"}
                        />
                    </div>
                </div>
            </div>



            {/* letter the left */}
            <div ref={refLetterTheLeft} className="hide">
                <div
                    onClick={() => { funcClick(refLetterTheLeft) }}
                    className='commonButton'
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.22 + "px",
                        height: _baseGeo.width * 0.22 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.11 + "px",
                        bottom: _baseGeo.height * 0.14 + "px",

                    }}>
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.08 + "px"
                            , left: _baseGeo.width * 0.08 + "px",
                            bottom: _baseGeo.height * 0.14 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_the_3.svg"}

                        />
                    </div>
                </div>
            </div>


            {/* letter the right */}
            <div ref={refLetterTheRight} className="hide"
            >
                <div
                    onClick={() => { funcClick(refLetterTheRight) }}
                    className='commonButton'
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.2 + "px",
                        height: _baseGeo.width * 0.2 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.47 + "px",
                        bottom: _baseGeo.height * 0.18 + "px",

                    }}>
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.08 + "px"
                            , left: _baseGeo.width * 0.065 + "px",
                            bottom: _baseGeo.width * 0.06 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_the_3.svg"}
                        />
                    </div>
                </div>
            </div>


            {/* letter you right */}
            <div className="hide" ref={refLetterYouRight}
            >
                <div
                    onClick={() => { funcClick(refLetterYouRight) }}
                    className='commonButton'
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.2 + "px",
                        height: _baseGeo.width * 0.2 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.47 + "px",
                        bottom: _baseGeo.height * 0.18 + "px",

                    }}>
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.08 + "px"
                            , left: _baseGeo.width * 0.065 + "px",
                            bottom: _baseGeo.width * 0.055 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_you_3.svg"}
                        />
                    </div>
                </div>

            </div>


            {/* letter to left */}
            <div ref={refLetterToLeft} className="hide"
            >
                <div
                    onClick={() => { funcClick(refLetterToLeft) }}
                    className='commonButton'
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.22 + "px",
                        height: _baseGeo.width * 0.22 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.11 + "px",
                        bottom: _baseGeo.height * 0.14 + "px",

                    }}>
                    <div
                        style={{
                            position: "absolute", width: _baseGeo.width * 0.07 + "px"
                            , left: _baseGeo.width * 0.08 + "px",
                            bottom: _baseGeo.width * 0.07 + "px",
                        }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_to_3.svg"}
                        />
                    </div>
                </div>
            </div>



            <div
                ref={refPenguin}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.15 + "px",
                    height: _baseGeo.width * 0.15 + "px"
                    , left: _baseGeo.width * 0.8 + "px",
                    bottom: _baseGeo.height * 0.2 + "px",

                }}>
                {
                    [0, 1, 2, 3, 4, 5].map((value) => {
                        return <BaseImage
                            key={value}
                            ref={characterList[value]}
                            className={value != 0 ? 'character-disappear' : ''}
                            url={"animations/SB_52_Character_Eye-Blink/SB_52_Penguin_Dance_" + (value + 1) + ".svg"}
                        />
                    })
                }

                {
                    [0, 1, 2, 3].map((value) => {
                        return (
                            <BaseImage
                                key={value}
                                ref={eyeList[value]}
                                scale={0.27}
                                posInfo={{ l: 0.35, t: 0.375 }}
                                className={value != 0 ? 'character-disappear' : ''}
                                style={{ transform: 'rotateY(180deg)' }}
                                url={"animations/SB_52_Character_Eye-Blink/SB_52_Baby-Penguin_1_Eye_" + (value + 1) + ".svg"}
                            />
                        )
                    })
                }
            </div>

            {/* marks */}
            <div
                className="aniObject"
                style={{
                    position: "fixed", width: _baseGeo.width * 0.16 + "px"
                    , right: "2%",
                    top: "0.2%",
                }}>
                <img draggable={false} width={"100%"}
                    src={"./images/SB_52_Icons/SB_52_Fire_Icon_Pogress-Bar.svg"}
                />
                <img draggable={false} width={"100%"}
                    ref={refMarkList[3]}
                    style={{
                        position: "absolute", width: _baseGeo.width * 0.07 + "px"
                        , right: "-8%",
                        top: "8%",
                    }}
                    src={"./images/SB_52_Icons/SB_52_Grey-Snow-Flake_Icon.svg"}
                />
                <img draggable={false} width={"100%"}
                    ref={refMarkList[2]}
                    style={{
                        position: "absolute", width: _baseGeo.width * 0.07 + "px"
                        , right: "13%",
                        top: "8%",
                    }}
                    src={"./images/SB_52_Icons/SB_52_Grey-Snow-Flake_Icon.svg"}
                />
                <img draggable={false} width={"100%"}
                    ref={refMarkList[1]}
                    style={{
                        position: "absolute", width: _baseGeo.width * 0.07 + "px"
                        , right: "35%",
                        top: "8%",
                    }}
                    src={"./images/SB_52_Icons/SB_52_Grey-Snow-Flake_Icon.svg"}
                />
                <img draggable={false} width={"100%"}
                    ref={refMarkList[0]}
                    style={{
                        position: "absolute", width: _baseGeo.width * 0.07 + "px"
                        , right: "57%",
                        top: "8%",
                    }}
                    src={"./images/SB_52_Icons/SB_52_Grey-Snow-Flake_Icon.svg"}
                />
            </div>

            <div>
                <div
                    ref={musicBtn}
                    onClick={() => {
                        correctAudioList[randomList[varCurrentStep]].pause();
                        correctAudioList[randomList[varCurrentStep]].currentTime = 0;
                        correctAudioList[randomList[varCurrentStep]].play().catch(error => { });
                    }}
                    className='commonButton'
                    style={{
                        position: "fixed", width: _geo.width * 0.055 + "px",
                        right: "2%"
                        , top: "46%", cursor: "pointer",
                    }}>
                    <img draggable={false} width={"100%"}
                        className='playBtn'
                        src={'./images/Buttons/Audio.svg'}
                    />
                </div>
            </div>



        </div >
    );
}
