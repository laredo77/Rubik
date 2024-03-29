import React from 'react';
import classNames from 'classnames';
import buildArrow from './buildArrow';
import RotateArrows from './RotateArrows';
import Client from "../../../services/GameService"

export const movesStack = []

// Function to get the current moves stack
export const getMoveStack = () => {
    return movesStack
}

// Component for Cube Controls
export default ({actions, disabled, controlsStatus, isMatch, user, id}) => {

    // Function to record moves
    const recorder = async (activationFunc, piece, forward, id) => {
        piece = id[1]
        forward = id[2]
        if (movesStack.length > 0) {
            let elm = movesStack[movesStack.length - 1]
            let tempForward
            forward == 1 ? tempForward = 0 : tempForward = 1
            if (elm[1] == piece && elm[2] == tempForward) {
                movesStack.pop()
                return
            }
        }
        movesStack.push([activationFunc, piece, +forward])
        if (isMatch) { // record to DB
            await Client.applyMoveInMatch({
                user: user.email,
                func: activationFunc,
                piece: piece,
                direction: +forward
            })
        }
    };

    const Arrow = buildArrow(actions.spinSlice, recorder);

    return (
        <section className={classNames('Controls', {
            'disabled': disabled
        })}>
            {/* Spin Z forward */}
            <Arrow
                id={`a11${id}`}
                slice={0}
                forward={true}
                style={{
                    transform: 'translate(490px, 145px) rotate(-10deg)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />
            <Arrow
                id={`a21${id}`}
                slice={1}
                forward={true}
                style={{
                    transform: 'translate(430px, 90px) rotate(-10deg)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />
            <Arrow
                id={`a31${id}`}
                slice={2}
                forward={true}
                style={{
                    transform: 'translate(370px, 40px) rotate(-10deg)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />
            {/* Spin Z backward */}
            <Arrow
                id={`a10${id}`}
                slice={0}
                forward={false}
                style={{
                    transform: 'translate(10px, 500px) rotate(130deg)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />
            <Arrow
                id={`a20${id}`}
                slice={1}
                forward={false}
                style={{
                    transform: 'translate(-40px, 420px) rotate(130deg)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />
            <Arrow
                id={`a30${id}`}
                slice={2}
                forward={false}
                style={{
                    transform: 'translate(-80px, 350px) rotate(130deg)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />

            {/* Spin X forward */}
            <Arrow
                id={`a41${id}`}
                slice={3}
                forward={true}
                style={{
                    transform: 'translate(150px, 545px) rotate(100deg)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />
            <Arrow
                id={`a51${id}`}
                slice={4}
                forward={true}
                style={{
                    transform: 'translate(230px, 535px) rotate(100deg)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />
            <Arrow
                id={`a61${id}`}
                slice={5}
                forward={true}
                style={{
                    transform: 'translate(330px, 515px) rotate(100deg)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />

            {/* Spin X backward */}
            <Arrow
                id={`a40${id}`}
                slice={3}
                forward={false}
                style={{
                    transform: 'translate(50px, -20px) rotate(240deg)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />
            <Arrow
                id={`a50${id}`}
                slice={4}
                forward={false}
                style={{
                    transform: 'translate(140px, -15px) rotate(240deg)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />
            <Arrow
                id={`a60${id}`}
                slice={5}
                forward={false}
                style={{
                    transform: 'translate(230px, -10px) rotate(240deg)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />
            {/* Spin Y forward */}
            <Arrow
                id={`a71${id}`}
                slice={6}
                forward={true}
                style={{
                    transform: 'translate(500px, 260px)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />
            <Arrow
                id={`a81${id}`}
                slice={7}
                forward={true}
                style={{
                    transform: 'translate(480px, 340px)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />
            <Arrow
                id={`a91${id}`}
                slice={8}
                forward={true}
                style={{
                    transform: 'translate(460px, 420px)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />
            {/* Spin Y backward */}
            <Arrow
                id={`a70${id}`}
                slice={6}
                forward={false}
                style={{
                    transform: 'translate(-40px, 30px) rotate(220deg)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />
            <Arrow
                id={`a80${id}`}
                slice={7}
                forward={false}
                style={{
                    transform: 'translate(-60px, 130px) rotate(220deg)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />
            <Arrow
                id={`a90${id}`}
                slice={8}
                forward={false}
                style={{
                    transform: 'translate(-80px, 230px) rotate(220deg)',
                    opacity: controlsStatus ? undefined : 0
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '15px',
                    left: '-140px',
                    transform: 'scale(1.05)',
                    opacity: controlsStatus ? undefined : 0
                }}
            >
                <RotateArrows rotate={actions.rotateCube} recorder={recorder} id={id}/>
            </div>
        </section>
    );
};
