import "../stylesheets/styles.css";
import { useEffect, useRef, useContext } from "react";
import { UserContext } from "../components/BaseShot"
import {
    blinkFunc, stopBlinkFunc, startRepeatAudio,
    stopRepeatAudio, setRepeatAudio, setExtraVolume
} from '../components/CommonFunctions';
import BaseImage from '../components/BaseImage';

var varCurrentStep = 0;
var varAnswerList = [1, 0, 2, 1]

var makeFireFirstPos = { x: 0.34, y: 0.27 }

var makeFirePosList = [
    { x: 0.82, y: 0.25 },
    { x: 0.65, y: 0.25 },
    { x: 0.5, y: 0.25 }
]

var chooseFirePosList = [
    { x: 0.79, y: 0.25 },
    { x: 0.64, y: 0.25 },
    { x: 0.48, y: 0.25 }
]

var makingTimeList = [
    1.1,
    0.7,
    0.4
]

var currentPosNum = 0
var selectedNum = 2;
let eyeBlinkNumbers = []
let intervalList = []
var correctAudioList = [];
var timerList = []
let randomList = []

export default function Scene({ nextFunc, _baseGeo, _geo }) {

    const audioList = useContext(UserContext)

    const musicBtn = useRef();

    const refLetterList = [
        useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()
    ]

    const refRestList = [
        useRef(), useRef(), useRef()
    ]

    const refBaseFireList = [
        useRef(),
        useRef(),
        useRef()
    ]


    const refMarkList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]


    const fixFireList = [
        [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
    ]

    const movingFireList = [
        useRef(), useRef(), useRef(), useRef()
    ]

    const fireRestList = [
        [useRef(), useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef(), useRef()]
    ]

    const eyeList = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]

    const dragonList = [
        useRef(),
        useRef()
    ]

    const refSelectFire = useRef()
    const baseRef = useRef()
    const fireBottomList = [
        0.75, 0.55, 0.15, 0, 0, 0
    ]

    useEffect(() => {

        randomList = []

        while (randomList.length != 4) {
            let randomNumber = Math.floor(Math.random() * 4);
            if (!randomList.includes(randomNumber))
                randomList.push(randomNumber)
        }

        currentPosNum = 0
        selectedNum = 2;

        baseRef.current.style.pointerEvents = 'none'
        refSelectFire.current.className = 'hide'

        // musicBtn.current.style.opacity = 0.6

        audioList.bodyAudio.src = "./sounds/EP_52_Audio_36.mp3"
        setExtraVolume(audioList.bodyAudio, 1.5)
        setRepeatAudio(audioList.bodyAudio)

        correctAudioList = [
            audioList.wordAudio2,
            audioList.wordAudio1,
            audioList.wordAudio4,
            audioList.wordAudio3
        ]


        eyeBlinkNumbers = [
            blinkFunc(eyeList, 100, 2000)
        ]

        for (let i = 0; i < refLetterList.length; i++)
            refLetterList[i].current.style.pointerEvents = 'none'

        setTimeout(() => {
            makingFire();
        }, 1000);

        setTimeout(() => {
            audioList.bodyAudio.play().catch(error => { })
            timerList[1] = setTimeout(() => {
                correctAudioList[randomList[0]].play().catch(error => { })
                startRepeatAudio();
                baseRef.current.style.pointerEvents = ''
            }, audioList.bodyAudio.duration * 1000 + 300);
        }, 7000);


        return () => {
            eyeBlinkNumbers.map(eyeBlink => {
                stopBlinkFunc(eyeBlink)
            })
            setExtraVolume(audioList.bodyAudio, 1)
        }


    }, [])

    function makingFireFomart() {

        refSelectFire.current.style.transition = '0.0s'
        refSelectFire.current.style.left = makeFireFirstPos.x * _baseGeo.width + _baseGeo.left + "px"
        refSelectFire.current.style.width = _baseGeo.width * 0.10 + "px"
        refSelectFire.current.style.bottom = makeFireFirstPos.y * _baseGeo.height + "px"
        refSelectFire.current.style.opacity = 0.0
        refSelectFire.current.style.transform = 'rotateZ(0deg)'
        setTimeout(() => {
            refSelectFire.current.style.transition = '0.2s'
            refSelectFire.current.style.opacity = 0.3
        }, 100);

    }

    function selectFire() {

        audioList.fireAudio.pause();
        audioList.fireAudio.currentTime = 0;
        audioList.fireAudio.play();

        dragonList[0].current.setClass('character-disappear')
        dragonList[1].current.setClass('character-appear')
        setTimeout(() => {
            dragonList[1].current.setClass('character-disappear')
            dragonList[0].current.setClass('character-appear')
        }, 200);

        refSelectFire.current.style.transition = '0.0s'
        refSelectFire.current.style.left = makeFireFirstPos.x * _baseGeo.width + _baseGeo.left + "px"
        refSelectFire.current.style.width = _baseGeo.width * 0.10 + "px"
        refSelectFire.current.style.bottom = makeFireFirstPos.y * _baseGeo.height + "px"
        refSelectFire.current.style.opacity = 0.0
        refSelectFire.current.style.transform = 'rotateZ(0deg)'

        setTimeout(() => {
            refSelectFire.current.style.transition = '0.2s'
            refSelectFire.current.style.opacity = 0.8
        }, 100);

        setTimeout(() => {
            refSelectFire.current.style.transition = makingTimeList[selectedNum] + 's'

            refSelectFire.current.style.left = chooseFirePosList[selectedNum].x * _baseGeo.width + _baseGeo.left + "px"
            refSelectFire.current.style.bottom = chooseFirePosList[selectedNum].y * _baseGeo.height + "px"
            refSelectFire.current.style.transform = 'rotateZ(15deg)'
            refSelectFire.current.style.opacity = 1
        }, 300);


        movingFireList[3].current.setClass('character-disappear')
        setTimeout(() => {
            let cNum = 0;
            movingFireList[cNum].current.setClass('character-appear')

            let flyingInterval = setInterval(() => {
                movingFireList[cNum].current.setClass('character-disappear')
                cNum++;
                movingFireList[cNum].current.setClass('character-appear')
                if (cNum == 3) {
                    clearInterval(flyingInterval)
                }
            }, 150);
        }, 300);

        setTimeout(() => {
            refSelectFire.current.style.transition = '0.4s'
            refSelectFire.current.style.opacity = '0'
        }, makingTimeList[selectedNum] * 1000);

    }

    function makingFire() {

        audioList.fireAudio.pause();
        audioList.fireAudio.currentTime = 0;
        audioList.fireAudio.play();

        makingFireFomart();
        dragonList[0].current.setClass('character-disappear')
        dragonList[1].current.setClass('character-appear')
        setTimeout(() => {
            dragonList[1].current.setClass('character-disappear')
            dragonList[0].current.setClass('character-appear')
        }, 200);

        setTimeout(() => {
            refSelectFire.current.style.transition = makingTimeList[currentPosNum] + 's'

            refSelectFire.current.style.left = makeFirePosList[currentPosNum].x * _baseGeo.width + _baseGeo.left + "px"
            refSelectFire.current.style.bottom = makeFirePosList[currentPosNum].y * _baseGeo.height + "px"
            refSelectFire.current.style.transform = 'rotateZ(15deg)'
            refSelectFire.current.style.opacity = 1
        }, 300);

        setTimeout(() => {
            let curNum = 0;
            refBaseFireList[currentPosNum].current.className = 'show'


            let interval = setInterval(() => {
                fixFireList[currentPosNum][curNum].current.setClass('character-disappear')
                fixFireList[currentPosNum][curNum + 1].current.setClass('character-appear')
                if (curNum < 2)
                    curNum++
                else {
                    refLetterList[currentPosNum + randomList[varCurrentStep] * 3].current.className = 'appear'
                    clearInterval(interval)

                    fixFireList[currentPosNum][2].current.setClass('character-disappear')
                    fixFireList[currentPosNum][3].current.setClass('character-appear')

                    playFixFireAni(currentPosNum)
                }
            }, 300);

            refSelectFire.current.style.transition = '0.4s'
            refSelectFire.current.style.opacity = '0'
        }, makingTimeList[currentPosNum] * 600);

        movingFireList[3].current.setClass('character-disappear')
        setTimeout(() => {
            let cNum = 0;
            movingFireList[cNum].current.setClass('character-appear')


            let flyingInterval = setInterval(() => {
                movingFireList[cNum].current.setClass('character-disappear')
                cNum++;
                movingFireList[cNum].current.setClass('character-appear')
                if (cNum == 3) {
                    clearInterval(flyingInterval)
                }
            }, 150);
        }, 300);


        setTimeout(() => {
            if (currentPosNum < 2) {
                makingFire()
            }
            else {
                for (let i = 0; i < 3; i++)
                    refLetterList[randomList[varCurrentStep] * 3 + i].current.style.pointerEvents = ''

            }
            currentPosNum++;
        }, 2000);
    }

    function playFixFireAni(currentPosNum) {

        let isPlus = true;
        let curNum = 3;

        intervalList[currentPosNum] = setInterval(() => {
            fixFireList[currentPosNum][curNum].current.setClass('character-disappear')
            if (isPlus) {
                if (curNum < 5)
                    curNum++
                else {
                    curNum--
                    isPlus = false;
                }
            }
            else {
                if (curNum > 3)
                    curNum--
                else {
                    curNum++
                    isPlus = true;
                }
            }

            fixFireList[currentPosNum][curNum].current.setClass('character-appear')
        }, 300);
    }


    function funcClick(isUpClicked) {


        stopRepeatAudio();
        audioList.buzzAudio.pause();
        refLetterList[randomList[varCurrentStep] * 3 + isUpClicked].current.style.opacity = '1'
        audioList.bodyAudio.pause();

        correctAudioList[randomList[varCurrentStep]].pause();
        correctAudioList[randomList[0]].pause();

        clearTimeout(timerList[2])

        if (varAnswerList[randomList[varCurrentStep]] == isUpClicked) {
            baseRef.current.style.pointerEvents = 'none'
            selectedNum = isUpClicked
            // selectFire()
            audioList.tingAudio.play();
            for (let i = 0; i < 3; i++)
                if (i != isUpClicked) {
                    refLetterList[randomList[varCurrentStep] * 3 + i].current.className = 'disapear'
                    refBaseFireList[i].current.className = 'disapear'
                    refLetterList[randomList[varCurrentStep] * 3 + i].current.style.pointerEvents = 'none'
                    refRestList[i].current.className = 'appear'
                    let currentNum = 0;
                    fireRestList[i][currentNum].current.setClass('character-appear')

                    let restFireInterval = setInterval(() => {
                        fireRestList[i][currentNum].current.setClass('character-disappear')
                        currentNum++;
                        fireRestList[i][currentNum].current.setClass('character-appear')
                        if (currentNum == 3)
                            clearInterval(restFireInterval)
                    }, 150);


                    clearInterval(intervalList[i])
                    for (let j = 0; j < 6; j++)
                        fixFireList[i][j].current.setClass('character-disappear')
                }

            setTimeout(() => {


                for (let i = 0; i < 3; i++)
                    refRestList[i].current.className = 'disapear'

                refLetterList[randomList[varCurrentStep] * 3 + isUpClicked].current.className = 'disapear'

                refBaseFireList[isUpClicked].current.className = 'disapear'

                for (let i = 0; i < 6; i++)
                    fixFireList[isUpClicked][i].current.setClass('character-disappear')
                clearInterval(intervalList[isUpClicked])
                refLetterList[randomList[varCurrentStep] * 3 + isUpClicked].current.style.pointerEvents = 'none'

                setTimeout(() => {
                    if (varCurrentStep < 4) {
                        currentPosNum = 0;
                        makingFire();

                        setTimeout(() => {
                            correctAudioList[randomList[varCurrentStep]].pause();
                            correctAudioList[randomList[varCurrentStep]].currentTime = 0;
                            correctAudioList[randomList[varCurrentStep]].play().catch(error => { });

                            startRepeatAudio();
                        }, 6000);
                        setTimeout(() => {
                            baseRef.current.style.pointerEvents = ''
                            //musicBtn.current.style.opacity = 1
                        }, 6000);
                    }
                }, 1000);

                refMarkList[varCurrentStep].current.src = "./images/SB_52_Icons/SB_52_Fire_Icon.svg"

                if (varCurrentStep == 3) {
                    setTimeout(() => {
                        nextFunc();
                    }, 1000);
                }
                varCurrentStep++;
            }, 1000);




        }
        else {
            correctAudioList[randomList[varCurrentStep]].currentTime = 0;
            audioList.buzzAudio.currentTime = 0;

            audioList.buzzAudio.play();
            correctAudioList[randomList[varCurrentStep]].pause();

            refLetterList[randomList[varCurrentStep] * 3 + isUpClicked].current.style.opacity = '0.3'
            timerList[2] = setTimeout(() => {
                refLetterList[randomList[varCurrentStep] * 3 + isUpClicked].current.style.opacity = '1'
                correctAudioList[randomList[varCurrentStep]].play();
                startRepeatAudio();
            }, 1000);
        }
    }
    return (
        <div className="aniObject"
            ref={baseRef}
        >
            <div
                ref={refSelectFire}
                className='hide'
                style={{
                    position: "fixed", width: _baseGeo.width * 0.12 + "px"

                }}>

                <img draggable={false} width={"100%"}
                    src={"./images/SB_52_Prop-Interactive/SB_52_PI_Fire_1a.svg"}
                />
            </div>


            <div
                className="hide"
                ref={refBaseFireList[0]}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.08 + "px",
                    height: _baseGeo.width * 0.08 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.788 + 'px',
                    bottom: _baseGeo.height * 0.475 + 'px', pointerEvents: 'none'
                }}>


                {
                    [0, 1, 2, 3, 4, 5].map((value) => {
                        return (
                            <BaseImage
                                key={value}

                                ref={fixFireList[0][value]}
                                posInfo={{ l: 0.0, t: fireBottomList[value] }}
                                className={value != 0 ? 'character-disappear' : ''}
                                url={"animations/SB_52_Prop_Animation/SB_52_Fire_" + (value + 1) + ".svg"}
                            />
                        )
                    })
                }
            </div>

            <div
                className="hide"
                ref={refBaseFireList[1]}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.08 + "px",
                    height: _baseGeo.width * 0.08 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.67 + 'px',
                    bottom: _baseGeo.height * 0.475 + 'px', pointerEvents: 'none'
                }}>


                {
                    [0, 1, 2, 3, 4, 5].map((value) => {
                        return (
                            <BaseImage
                                key={value}
                                ref={fixFireList[1][value]}
                                posInfo={{ l: 0.0, t: fireBottomList[value] }}
                                className={value != 0 ? 'character-disappear' : ''}
                                url={"animations/SB_52_Prop_Animation/SB_52_Fire_" + (value + 1) + ".svg"}
                            />
                        )
                    })
                }
            </div>

            <div
                className="hide"
                ref={refBaseFireList[2]}
                style={{
                    position: "fixed", width: _baseGeo.width * 0.08 + "px",
                    height: _baseGeo.width * 0.08 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.54 + 'px',
                    bottom: _baseGeo.height * 0.475 + 'px', pointerEvents: 'none'
                }}>


                {
                    [0, 1, 2, 3, 4, 5].map((value) => {
                        return (
                            <BaseImage
                                key={value}
                                ref={fixFireList[2][value]}
                                posInfo={{ l: 0.0, t: fireBottomList[value] }}
                                className={value != 0 ? 'character-disappear' : ''}
                                url={"animations/SB_52_Prop_Animation/SB_52_Fire_" + (value + 1) + ".svg"}
                            />
                        )
                    })
                }
            </div>



            {/* letter This right*/}
            <div
                ref={refLetterList[0]}
                className="hide">

                <div
                    className="commonButton"
                    onClick={() => { funcClick(0) }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.075 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.79 + "px",
                        bottom: _baseGeo.height * 0.32 + "px",

                    }}>

                    <div style={{
                        position: "absolute", width: _baseGeo.width * 0.058 + "px"
                        , left: _baseGeo.width * 0.01 + "px",
                        bottom: _baseGeo.height * 0.02 + "px",
                    }}>
                        <img draggable={false} width={"100%"}
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_this_3.svg"}
                        />
                    </div>
                </div>
            </div>
            {/* letter Go middle*/}
            <div ref={refLetterList[1]} className="hide">
                <div
                    className="commonButton"
                    onClick={() => { funcClick(1) }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.075 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.675 + "px",
                        bottom: _baseGeo.height * 0.32 + "px",

                    }}>

                    <div style={{
                        position: "absolute", width: _baseGeo.width * 0.042 + "px"
                        , left: _baseGeo.width * 0.015 + "px",
                        bottom: _baseGeo.height * 0.01 + "px",
                    }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_go_3.svg"}
                        />
                    </div>
                </div>
            </div>
            {/* letter And left */}
            <div ref={refLetterList[2]} className="hide">
                <div
                    className="commonButton"
                    onClick={() => { funcClick(2) }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.075 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.545 + "px",
                        bottom: _baseGeo.height * 0.32 + "px",

                    }}>

                    <div style={{
                        position: "absolute", width: _baseGeo.width * 0.06 + "px"
                        , left: _baseGeo.width * 0.005 + "px",
                        bottom: _baseGeo.height * 0.02 + "px",
                    }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_and_3.svg"}
                        />
                    </div>
                </div>
            </div>

            {/* letter And right */}
            <div ref={refLetterList[3]} className="hide">
                <div
                    className="commonButton"
                    onClick={() => { funcClick(0) }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.075 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.79 + "px",
                        bottom: _baseGeo.height * 0.32 + "px",

                    }}>

                    <div style={{
                        position: "absolute", width: _baseGeo.width * 0.06 + "px"
                        , left: _baseGeo.width * 0.01 + "px",
                        bottom: _baseGeo.height * 0.02 + "px",
                    }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_and_3.svg"}
                        />
                    </div>
                </div>
            </div>
            {/* letter has middle*/}
            <div ref={refLetterList[4]} className="hide">
                <div
                    className="commonButton"
                    onClick={() => { funcClick(1) }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.075 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.675 + "px",
                        bottom: _baseGeo.height * 0.32 + "px",

                    }}>

                    <div style={{
                        position: "absolute", width: _baseGeo.width * 0.055 + "px"
                        , left: _baseGeo.width * 0.01 + "px",
                        bottom: _baseGeo.height * 0.02 + "px",
                    }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_has_3.svg"}
                        />
                    </div>
                </div>
            </div>

            {/* letter This left*/}
            <div
                ref={refLetterList[5]}
                className="hide">

                <div
                    className="commonButton"
                    onClick={() => { funcClick(2) }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.075 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.545 + "px",
                        bottom: _baseGeo.height * 0.32 + "px",

                    }}>

                    <div style={{
                        position: "absolute", width: _baseGeo.width * 0.058 + "px"
                        , left: _baseGeo.width * 0.008 + "px",
                        bottom: _baseGeo.height * 0.02 + "px",
                    }}>
                        <img draggable={false} width={"100%"}
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_this_3.svg"}
                        />
                    </div>
                </div>
            </div>

            {/* letter go right*/}
            <div ref={refLetterList[6]} className="hide">
                <div
                    className="commonButton"
                    onClick={() => { funcClick(0) }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.075 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.79 + "px",
                        bottom: _baseGeo.height * 0.32 + "px",

                    }}>

                    <div style={{
                        position: "absolute", width: _baseGeo.width * 0.042 + "px"
                        , left: _baseGeo.width * 0.02 + "px",
                        bottom: _baseGeo.height * 0.01 + "px",
                    }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_go_3.svg"}
                        />
                    </div>
                </div>
            </div>

            {/* letter And middle */}
            <div ref={refLetterList[7]} className="hide">
                <div
                    className="commonButton"
                    onClick={() => { funcClick(1) }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.075 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.675 + "px",
                        bottom: _baseGeo.height * 0.32 + "px",

                    }}>

                    <div style={{
                        position: "absolute", width: _baseGeo.width * 0.06 + "px"
                        , left: _baseGeo.width * 0.005 + "px",
                        bottom: _baseGeo.height * 0.02 + "px",
                    }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_and_3.svg"}
                        />
                    </div>
                </div>
            </div>
            {/* letter has left*/}
            <div ref={refLetterList[8]} className="hide">
                <div
                    className="commonButton"
                    onClick={() => { funcClick(2) }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.075 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.545 + "px",
                        bottom: _baseGeo.height * 0.32 + "px",

                    }}>

                    <div style={{
                        position: "absolute", width: _baseGeo.width * 0.055 + "px"
                        , left: _baseGeo.width * 0.01 + "px",
                        bottom: _baseGeo.height * 0.02 + "px",
                    }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_has_3.svg"}
                        />
                    </div>
                </div>
            </div>

            {/* letter has right*/}
            <div ref={refLetterList[9]} className="hide">
                <div
                    className="commonButton"
                    onClick={() => { funcClick(0) }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.075 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.79 + "px",
                        bottom: _baseGeo.height * 0.32 + "px",

                    }}>

                    <div style={{
                        position: "absolute", width: _baseGeo.width * 0.055 + "px"
                        , left: _baseGeo.width * 0.012 + "px",
                        bottom: _baseGeo.height * 0.02 + "px",
                    }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_has_3.svg"}
                        />
                    </div>
                </div>
            </div>
            {/* letter This middle*/}
            <div
                ref={refLetterList[10]}
                className="hide">

                <div
                    className="commonButton"
                    onClick={() => { funcClick(1) }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.075 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.675 + "px",
                        bottom: _baseGeo.height * 0.32 + "px",

                    }}>

                    <div style={{
                        position: "absolute", width: _baseGeo.width * 0.058 + "px"
                        , left: _baseGeo.width * 0.008 + "px",
                        bottom: _baseGeo.height * 0.02 + "px",
                    }}>
                        <img draggable={false} width={"100%"}
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_this_3.svg"}
                        />
                    </div>
                </div>
            </div>
            {/* letter Go left*/}
            <div ref={refLetterList[11]} className="hide">
                <div
                    className="commonButton"
                    onClick={() => { funcClick(2) }}
                    style={{
                        position: "fixed", width: _baseGeo.width * 0.075 + "px",
                        height: _baseGeo.width * 0.16 + "px"
                        , left: _baseGeo.left + _baseGeo.width * 0.545 + "px",
                        bottom: _baseGeo.height * 0.32 + "px",

                    }}>

                    <div style={{
                        position: "absolute", width: _baseGeo.width * 0.042 + "px"
                        , left: _baseGeo.width * 0.015 + "px",
                        bottom: _baseGeo.height * 0.01 + "px",
                    }}>
                        <img draggable={false} width={"100%"}
                            className="playBtn"
                            src={"./images/SB_52_Text-Interactive/SB_52_TI_go_3.svg"}
                        />
                    </div>
                </div>
            </div>



            {/* rest of fire*/}
            <div
                ref={refRestList[2]}
                className="hide"
                style={{
                    position: "fixed", width: _baseGeo.width * 0.09 + "px",
                    height: _baseGeo.width * 0.09 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.55 + "px",
                    bottom: _baseGeo.height * 0.28 + "px",
                }}>

                {
                    [[0.6, 0.05, 0.2], [1, -0.15, 0.1], [1, -0.15, 1.05], [1, -0.15, 1.35]].map((value, index) => {
                        return (
                            <BaseImage
                                key={value}
                                ref={fireRestList[2][index]}
                                scale={value[0]}
                                posInfo={{ l: value[1], t: value[2] }}
                                className={index != 0 ? 'character-disappear' : ''}
                                url={"animations/SB_52_Prop_Animation/SB_52_Fire-Ash_" + (index + 1) + ".svg"}
                            />
                        )
                    })
                }
            </div>

            <div
                ref={refRestList[1]}
                className="hide"
                style={{
                    position: "fixed", width: _baseGeo.width * 0.09 + "px",
                    height: _baseGeo.width * 0.09 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.68 + "px",
                    bottom: _baseGeo.height * 0.28 + "px",
                }}>

                {
                    [[0.6, 0.05, 0.2], [1, -0.15, 0.1], [1, -0.15, 1.05], [1, -0.15, 1.35]].map((value, index) => {
                        return (
                            <BaseImage
                                key={value}
                                ref={fireRestList[1][index]}
                                scale={value[0]}
                                posInfo={{ l: value[1], t: value[2] }}
                                className={index != 0 ? 'character-disappear' : ''}
                                url={"animations/SB_52_Prop_Animation/SB_52_Fire-Ash_" + (index + 1) + ".svg"}
                            />
                        )
                    })
                }
            </div>
            <div
                ref={refRestList[0]}
                className="hide"
                style={{
                    position: "fixed", width: _baseGeo.width * 0.09 + "px",
                    height: _baseGeo.width * 0.09 + "px"
                    , left: _baseGeo.left + _baseGeo.width * 0.8 + "px",
                    bottom: _baseGeo.height * 0.28 + "px",
                }}>

                {
                    [[0.6, 0.05, 0.2], [1, -0.15, 0.1], [1, -0.15, 1.05], [1, -0.15, 1.35]].map((value, index) => {
                        return (
                            <BaseImage
                                key={value}
                                ref={fireRestList[0][index]}
                                scale={value[0]}
                                posInfo={{ l: value[1], t: value[2] }}
                                className={index != 3 ? 'character-disappear' : ''}
                                url={"animations/SB_52_Prop_Animation/SB_52_Fire-Ash_" + (index + 1) + ".svg"}
                            />
                        )
                    })
                }
            </div>

            {/* marks */}
            <div
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
                        position: "absolute", width: _baseGeo.width * 0.09 + "px"
                        , right: "-10%",
                        top: "-5%",
                    }}
                    src={"./images/SB_52_Icons/SB_52_Grey-Fire_Icon.svg"}
                />
                <img draggable={false} width={"100%"}
                    ref={refMarkList[2]}
                    style={{
                        position: "absolute", width: _baseGeo.width * 0.09 + "px"
                        , right: "10%",
                        top: "-5%",
                    }}
                    src={"./images/SB_52_Icons/SB_52_Grey-Fire_Icon.svg"}
                />
                <img draggable={false} width={"100%"}
                    ref={refMarkList[1]}
                    style={{
                        position: "absolute", width: _baseGeo.width * 0.09 + "px"
                        , right: "30%",
                        top: "-5%",
                    }}
                    src={"./images/SB_52_Icons/SB_52_Grey-Fire_Icon.svg"}
                />
                <img draggable={false} width={"100%"}
                    ref={refMarkList[0]}
                    style={{
                        position: "absolute", width: _baseGeo.width * 0.09 + "px"
                        , right: "50%",
                        top: "-5%",
                    }}
                    src={"./images/SB_52_Icons/SB_52_Grey-Fire_Icon.svg"}
                />
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

            <div
                ref={refSelectFire}
                className='hide'
                style={{
                    position: "fixed",
                    width: _baseGeo.width * 0.1 + "px",
                    height: _baseGeo.width * 0.1 + "px",
                    pointerEvents: 'none'
                }}>

                {
                    [0, 1, 2, 3].map((value) => {
                        return (
                            <BaseImage
                                key={value}
                                ref={movingFireList[value]}
                                // posInfo={{ l: 0.0, t: fireBottomList[value] }}
                                className={value != 0 ? 'character-disappear' : ''}
                                url={"animations/SB_52_Prop_Animation/SB_52_Breathing-Fire_" + (value + 1) + ".svg"}
                            />
                        )
                    })
                }
            </div>

            {/* Dragon */}
            <div
                style={{
                    position: "fixed", width: _baseGeo.width * 0.26 + "px",
                    height: _baseGeo.width * 0.3 + "px",
                    left: _baseGeo.left + _baseGeo.width * 0.125 + 'px',
                    bottom: _baseGeo.height * 0.06 + 'px'
                }}>
                <BaseImage
                    ref={dragonList[0]}
                    posInfo={{ l: 0.0, t: 0.12 }}
                    url={"animations/SB_52_Character_Eye-Blink/SB_52_Dragon_Side_Pose_1.svg"}
                />
                <BaseImage

                    ref={dragonList[1]}
                    posInfo={{ l: 0.0, t: 0.12 }}
                    className='character-disappear'
                    url={"animations/SB_52_Character_Eye-Blink/SB_52_Dragon_Side_Pose_2.svg"}
                />

                {
                    [0, 1, 2, 3].map((value) => {
                        return (
                            <BaseImage
                                key={value}
                                ref={eyeList[value]}
                                scale={0.1}
                                posInfo={{ l: 0.74, t: 0.24 }}
                                className={value != 0 ? 'character-disappear' : ''}
                                url={"animations/SB_52_Character_Eye-Blink/SB_52_Dragon_Side_Pose_Eye_" + (value + 1) + ".svg"}
                            />
                        )
                    })
                }
            </div>

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
        </div >
    );
}
