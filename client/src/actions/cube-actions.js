export const SPIN_SLICE = Symbol('SPIN_SLICE');
export const ROTATE_CUBE = Symbol('ROTATE_CUBE');

export const COMMIT_ROTATE = Symbol('COMMIT_ROTATE');
export const COMMIT_SPIN = Symbol('COMMIT_SPIN');

export const CONTROLS_STATUS = Symbol('CONTROLS_STATUS');

// Action creators for spinning a slice
export const spinSlice = (slice, direction) => ({
    type: SPIN_SLICE,
    slice,
    direction,
});

// Action creators for rotating the cube
export const rotateCube = (axis, direction) => ({
    type: ROTATE_CUBE,
    axis,
    direction,
});

// Action creator for committing the cube rotation
export const commitRotate = () => ({
    type: COMMIT_ROTATE,
});

// Action creator for committing the slice spin
export const commitSpin = () => ({
    type: COMMIT_SPIN,
});

// Action creator for getting the controls status
export const controlsStatus = () => ({
    type: CONTROLS_STATUS,
});

// Exporting the action creators as an object
export default {
    spinSlice,
    rotateCube,
    commitRotate,
    commitSpin,
    controlsStatus,
};
