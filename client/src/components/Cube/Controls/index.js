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
        transform: 'translate(680px, 180px) rotate(-10deg)'
      }}
      />
      <Arrow id={"11"} slice={1} forward={true}
             style={{
        transform: 'translate(620px, 120px) rotate(-10deg)',
      }}/>
      <Arrow id={"21"} slice={2} forward={true}
             style={{
        transform: 'translate(560px, 70px) rotate(-10deg)'
      }}/>
      {/* Spin Z backward */}
      <Arrow id={"00"} slice={0} forward={false}
             style={{
        transform: 'translate(240px, 520px) rotate(130deg)'
      }}/>
      <Arrow id={"10"} slice={1} forward={false}
             style={{
        transform: 'translate(200px, 450px) rotate(130deg)'
      }}/>
      <Arrow id={"20"} slice={2} forward={false}
             style={{
        transform: 'translate(160px, 380px) rotate(130deg)'
      }}/>

      {/* Spin X forward */}
      <Arrow id={"31"} slice={3} forward={true}
             style={{
        transform: 'translate(350px, 540px) rotate(100deg)',
               //opacity: 1
      }}/>
      <Arrow id={"41"} slice={4} forward={true}
             style={{
        transform: 'translate(440px, 520px) rotate(100deg)',
               //opacity: 1
      }}/>
      <Arrow id={"51"} slice={5} forward={true}
             style={{
        transform: 'translate(530px, 500px) rotate(100deg)',
               //opacity: 1
      }}/>

      {/* Spin X backward */}
      <Arrow id={"30"} slice={3} forward={false}
             style={{
        transform: 'translate(270px, 20px) rotate(240deg)',
               //opacity: 1
      }}/>
      <Arrow id={"40"} slice={4} forward={false}
             style={{
        transform: 'translate(360px, 25px) rotate(240deg)',
               //opacity: 1

      }}/>
      <Arrow id={"50"} slice={5} forward={false}
             style={{
        transform: 'translate(450px, 30px) rotate(240deg)',
      }}/>
      {/* Spin Y forward */}
      <Arrow id={"61"} slice={6} forward={true}
             style={{
        transform: 'translate(680px, 270px)',
               //opacity: 1
      }}/>
      <Arrow id={"71"} slice={7} forward={true}
             style={{
        transform: 'translate(640px, 350px)',
               //opacity: 1
      }}/>
      <Arrow id={"81"} slice={8} forward={true}
             style={{
        transform: 'translate(600px, 430px)',
               //opacity: 1
      }}/>
      {/* Spin Y backward */}
      <Arrow id={"60"} slice={6} forward={false}
             style={{
        transform: 'translate(180px, 60px) rotate(220deg)',
               //opacity: 1
      }}/>
      <Arrow id={"70"} slice={7} forward={false}
             style={{
        transform: 'translate(160px, 160px) rotate(220deg)',
               //opacity: 1
      }}/>
      <Arrow id={"80"} slice={8} forward={false}
             style={{
        transform: 'translate(140px, 260px) rotate(220deg)',
               //opacity: 1

      }}/>
      <div style={{position: 'absolute', top: '35px', left: '65px', transform: 'scale(1.05)'}}>
        <RotateArrows rotate={actions.rotateCube} recorder={recorder}/>
      </div>
    </section>
  );
};
