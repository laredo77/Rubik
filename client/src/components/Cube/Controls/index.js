import React from 'react';
import classNames from 'classnames';
import buildArrow from './buildArrow';
import RotateArrows from './RotateArrows';
import ShuffleButton from './ShuffleButton';

export const movesStack = []
export default ({actions, disabled}) => {

  const recorder = (activationFunc, piece, forward) => {
    let neg_forward = !forward
    if (movesStack.length > 0) {
      let elm = movesStack[movesStack.length - 1]
      if (elm[1] == piece && elm[2] == forward) {
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
      <Arrow slice={0} forward={true}
             style={{
        transform: 'translate(680px, 180px) rotate(-10deg)'
      }}
      />
      <Arrow slice={1} forward={true}
             style={{
        transform: 'translate(620px, 120px) rotate(-10deg)',
      }}/>
      <Arrow slice={2} forward={true}
             style={{
        transform: 'translate(560px, 70px) rotate(-10deg)'
      }}/>
      {/* Spin Z backward */}
      <Arrow slice={0} forward={false}
             style={{
        transform: 'translate(240px, 520px) rotate(130deg)'
      }}/>
      <Arrow slice={1} forward={false}
             style={{
        transform: 'translate(200px, 450px) rotate(130deg)'
      }}/>
      <Arrow slice={2} forward={false}
             style={{
        transform: 'translate(160px, 380px) rotate(130deg)'
      }}/>

      {/* Spin X forward */}
      <Arrow slice={3} forward={true}
             style={{
        transform: 'translate(350px, 540px) rotate(100deg)',
               //opacity: 1
      }}/>
      <Arrow slice={4} forward={true}
             style={{
        transform: 'translate(440px, 520px) rotate(100deg)',
               //opacity: 1
      }}/>
      <Arrow slice={5} forward={true}
             style={{
        transform: 'translate(530px, 500px) rotate(100deg)',
               //opacity: 1
      }}/>

      {/* Spin X backward */}
      <Arrow slice={3} forward={false}
             style={{
        transform: 'translate(270px, 20px) rotate(240deg)',
               //opacity: 1
      }}/>
      <Arrow slice={4} forward={false}
             style={{
        transform: 'translate(360px, 25px) rotate(240deg)',
               //opacity: 1

      }}/>
      <Arrow slice={5} forward={false}
             style={{
        transform: 'translate(450px, 30px) rotate(240deg)',
      }}/>
      {/* Spin Y forward */}
      <Arrow slice={6} forward={true}
             style={{
        transform: 'translate(680px, 270px)',
               //opacity: 1
      }}/>
      <Arrow slice={7} forward={true}
             style={{
        transform: 'translate(640px, 350px)',
               //opacity: 1
      }}/>
      <Arrow slice={8} forward={true}
             style={{
        transform: 'translate(600px, 430px)',
               //opacity: 1
      }}/>
      {/* Spin Y backward */}
      <Arrow slice={6} forward={false}
             style={{
        transform: 'translate(180px, 60px) rotate(220deg)',
               //opacity: 1
      }}/>
      <Arrow slice={7} forward={false}
             style={{
        transform: 'translate(160px, 160px) rotate(220deg)',
               //opacity: 1
      }}/>
      <Arrow slice={8} forward={false}
             style={{
        transform: 'translate(140px, 260px) rotate(220deg)',
               //opacity: 1

      }}/>
      <div style={{position: 'absolute', top: '35px', left: '65px', transform: 'scale(1.05)'}}>
        <RotateArrows rotate={actions.rotateCube} recorder={recorder}/>
      </div>
      <div style={{position: 'absolute', top: '450px', left: '40px'}}>
        <ShuffleButton onClick={actions.randomize}/>
      </div>
    </section>
  );
};
