
import React, { useState, useEffect, useRef, useContext } from 'react';

import Scene1 from "../Scenes/scene1";
import Scene2 from "../Scenes/scene2";
import Scene3 from "../Scenes/scene3";
import Scene4 from "../Scenes/scene4";
import Scene5 from "../Scenes/scene5";
import WellDone from "../Scenes/welldone";
import Scene7 from "../Scenes/scene7";
import Scene8 from "../Scenes/scene8";
import Excellent from "../Scenes/Excellent";

import { MusicButton } from './CommonButtons';

var __geo;
var backgroundImageIndex = 0;

var clickedRoomNum = -1;
var isOneStepFinished = true;

var completedList = []


var backgroundImageList = [
  "SB_52_Intro_BG_1_Sky", //1
  "SB_52_Transition_BG_1_Wall",//2
  "SB_52_Selection_BG_1",//3 

  "SB_52_Forest_BG_1",//4
  "SB_52_Forest_BG_2",//5

  "ExcellentBG", //6

  "SB_52_Snow_BG_1", //7
  "SB_52_Snow_BG_2", // 8

  "ExcellentBG"//9
];
import { UserContext } from "./BaseShot";


const Switch = props => {
  const { test, children } = props
  // filter out only children with a matching prop
  return children.find(child => {
    return child.props.value === test
  })
}


const App = React.forwardRef(({ geo, _setBackground, _startTransition, baseGeo, _isBackloaded }, ref) => {
  const audioList = useContext(UserContext)



  const [index, setIndex] = useState(0);

  const refScene1 = useRef();
  const musicRef = useRef();

  __geo = geo;

  useEffect(
    () => {
      // screenRef.current.className = 'hide'
      musicRef.current.className = 'hideObject'
      return () => {
      }
    }, []
  )


  // 1 - center center, 2 - center bottom , 3-left center ,  4 - left bottom, 5 - left top
  const transitionSceneList = [4]
  const centerBottomBackList = [1, 3, 6, 11, 12]

  const leftTopBackList = [4]
  const leftBottomBackList = [7]

  function changeBackgroundImage(judgeNum) {
    let sendNum = -1;
    if (judgeNum == 0)
      sendNum = 0;
    if (transitionSceneList.includes(judgeNum))
      sendNum = 1;    //mean - transition
    if (judgeNum != backgroundImageIndex) {
      backgroundImageIndex = judgeNum;

      let backState = 1;
      if (centerBottomBackList.includes(judgeNum))
        backState = 2
      else if (leftTopBackList.includes(judgeNum))
        backState = 5;
      else if (leftBottomBackList.includes(judgeNum))
        backState = 4;

      _setBackground(backgroundImageList[judgeNum], sendNum, backState);
    }
  }

  function setFomart(judgeNum) {
    if (judgeNum == 1) {
      if (musicRef.current.className != 'commonButton') {
        setTimeout(() => {
          musicRef.current.className = 'introText'
        }, 500);

        setTimeout(() => {
          musicRef.current.className = 'commonButton'
        }, 2000);
      }

    }
    setIndex(judgeNum);


    changeBackgroundImage(judgeNum);
  }

  function nextFunc() {
    setFomart(index + 1);
  }


  function goHome() {
    musicRef.current.className = 'hideObject'

    audioList.backAudio.pause();
    audioList.backAudio.currentTime = 0

    isOneStepFinished = true
    setFomart(0);
    completedList = []

    clickedRoomNum = -1;
  }


  function setGameRoomNum(num) {
    setFomart(num)

    if (num == 3)
      clickedRoomNum = 1;
    else if (num == 6)
      clickedRoomNum = 2;
  }

  function goNextStep() {
    if (clickedRoomNum == -1 || isOneStepFinished)
      setFomart(2)
    else if (clickedRoomNum == 1 && !isOneStepFinished)
      setFomart(4)
    else if (clickedRoomNum == 2 && !isOneStepFinished)
      setFomart(7)

  }

  return (
    <div >
      <div className={_isBackloaded ? 'aniObject' : 'hideObject'}>
        <Switch test={index}>
          <Scene1 ref={refScene1} nextFunc={nextFunc} _baseGeo={baseGeo} _geo={__geo} value={0} />
          <Scene2 nextFunc={() => { goNextStep(0) }} _baseGeo={baseGeo} _geo={__geo} value={1}
            isOneStepFinished={isOneStepFinished} completedCount={completedList.length} />
          <Scene3 nextFunc={setGameRoomNum} _baseGeo={baseGeo} startTransition={_startTransition} _geo={__geo} value={2} _clickedRoomNum={clickedRoomNum} />
          <Scene4 nextFunc={() => { isOneStepFinished = false; setFomart(4); }} _baseGeo={baseGeo} startTransition={_startTransition} _geo={__geo} value={3} />
          <Scene5 nextFunc={() => {
            if (!completedList.includes(clickedRoomNum))
              completedList.push(clickedRoomNum)
            if (completedList.length == 2)
              setFomart(8)
            else {
              isOneStepFinished = true; setFomart(5);
            }
          }} _baseGeo={baseGeo} startTransition={_startTransition} _geo={__geo} value={4} />

          <WellDone _baseGeo={baseGeo} nextFunc={() => {
            setFomart(2)
          }} startTransition={_startTransition} _geo={__geo} value={5} />

          <Scene7 nextFunc={() => { isOneStepFinished = false; setFomart(7); }} _baseGeo={baseGeo} _geo={__geo} value={6} />
          <Scene8 nextFunc={() => {
            if (!completedList.includes(clickedRoomNum))
              completedList.push(clickedRoomNum)

            if (completedList.length == 2)
              setFomart(8)
            else {
              isOneStepFinished = true; setFomart(5);
            }
          }}
            _baseGeo={baseGeo} _geo={__geo} value={7} />

          <Excellent nextFunc={goHome} _baseGeo={baseGeo} _geo={__geo} value={8} />

        </Switch>

      </div>
      <MusicButton ref={musicRef} _geo={__geo} backAudio={audioList.backAudio} />
    </div >
  );
})
export default App;