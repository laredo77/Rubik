import React from 'react';
import classNames from 'classnames';
import buildArrow from './buildArrow';
import RotateArrows from './RotateArrows';

export const movesStack = []
export default ({actions, disabled}) => {

  const recorder = (activationFunc, piece, forward) => {
    let neg_forward = !forward
    if (movesStack.length > 0) {
      let elm = movesStack[movesStack.length - 1]
      if (elm[1] === piece && elm[2] === forward) {
        movesStack.pop()
        return
      }
    }
    movesStack.push([activationFunc, piece, +neg_forward])
  };

  const Arrow = buildArrow(actions.spinSlice, recorder);

  return (
    <section className={classNames('Controls', {
      'disabled': disabled
    })}>
      {/* Spin Z forward */}
      <Arrow id={"01"} slice={0} forward={true}
             style={{
        transform: 'translate(570px, 145px) rotate(-10deg)'
      }}
      />
      <Arrow id={"11"} slice={1} forward={true}
             style={{
        transform: 'translate(510px, 90px) rotate(-10deg)',
      }}/>
      <Arrow id={"21"} slice={2} forward={true}
             style={{
        transform: 'translate(450px, 40px) rotate(-10deg)'
      }}/>
      {/* Spin Z backward */}
      <Arrow id={"00"} slice={0} forward={false}
             style={{
        transform: 'translate(120px, 490px) rotate(130deg)'
      }}/>
      <Arrow id={"10"} slice={1} forward={false}
             style={{
        transform: 'translate(80px, 420px) rotate(130deg)'
      }}/>
      <Arrow id={"20"} slice={2} forward={false}
             style={{
        transform: 'translate(40px, 350px) rotate(130deg)'
      }}/>

      {/* Spin X forward */}
      <Arrow id={"31"} slice={3} forward={true}
             style={{
        transform: 'translate(230px, 525px) rotate(100deg)',
               //opacity: 1
      }}/>
      <Arrow id={"41"} slice={4} forward={true}
             style={{
        transform: 'translate(320px, 515px) rotate(100deg)',
               //opacity: 1
      }}/>
      <Arrow id={"51"} slice={5} forward={true}
             style={{
        transform: 'translate(410px, 495px) rotate(100deg)',
               //opacity: 1
      }}/>

      {/* Spin X backward */}
      <Arrow id={"30"} slice={3} forward={false}
             style={{
        transform: 'translate(150px, -10px) rotate(240deg)',
               //opacity: 1
      }}/>
      <Arrow id={"40"} slice={4} forward={false}
             style={{
        transform: 'translate(240px, -5px) rotate(240deg)',
               //opacity: 1

      }}/>
      <Arrow id={"50"} slice={5} forward={false}
             style={{
        transform: 'translate(330px, 0px) rotate(240deg)',
      }}/>
      {/* Spin Y forward */}
      <Arrow id={"61"} slice={6} forward={true}
             style={{
        transform: 'translate(600px, 240px)',
               //opacity: 1
      }}/>
      <Arrow id={"71"} slice={7} forward={true}
             style={{
        transform: 'translate(560px, 320px)',
               //opacity: 1
      }}/>
      <Arrow id={"81"} slice={8} forward={true}
             style={{
        transform: 'translate(520px, 400px)',
               //opacity: 1
      }}/>
      {/* Spin Y backward */}
      <Arrow id={"60"} slice={6} forward={false}
             style={{
        transform: 'translate(60px, 30px) rotate(220deg)',
               //opacity: 1
      }}/>
      <Arrow id={"70"} slice={7} forward={false}
             style={{
        transform: 'translate(40px, 130px) rotate(220deg)',
               //opacity: 1
      }}/>
      <Arrow id={"80"} slice={8} forward={false}
             style={{
        transform: 'translate(20px, 230px) rotate(220deg)',
               //opacity: 1

      }}/>
      <div style={{position: 'absolute', top: '35px', left: '65px', transform: 'scale(1.05)'}}>
        <RotateArrows rotate={actions.rotateCube} recorder={recorder}/>
      </div>
    </section>
  );
};
