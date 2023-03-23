import React, { Component } from "react";
import Cube, { cubeWidth, facePosition } from "./Cube";
import {
  calcPosition,
  calculateResultantAngle,
  getCubePositionDiffrence,
  getTouchPositions,
} from "./utilities";

export default class CubeContainer extends Component {
  constructor(props) {
    super(props);
    this.getOrientation = this.getOrientation.bind(this);
    this.state = {
      positions: [
        [0, 0, 0],
        [-cubeWidth, 0, 0],
        [cubeWidth, 0, 0],
        [0, -cubeWidth, 0],
        [0, cubeWidth, 0],
        [-cubeWidth, -cubeWidth, 0],
        [-cubeWidth, cubeWidth, 0],
        [cubeWidth, -cubeWidth, 0],
        [cubeWidth, cubeWidth, 0],

        [0, 0, -cubeWidth],
        [-cubeWidth, 0, -cubeWidth],
        [cubeWidth, 0, -cubeWidth],
        [0, -cubeWidth, -cubeWidth],
        [0, cubeWidth, -cubeWidth],
        [-cubeWidth, -cubeWidth, -cubeWidth],
        [-cubeWidth, cubeWidth, -cubeWidth],
        [cubeWidth, -cubeWidth, -cubeWidth],
        [cubeWidth, cubeWidth, -cubeWidth],

        [0, 0, cubeWidth],
        [-cubeWidth, 0, cubeWidth],
        [cubeWidth, 0, cubeWidth],
        [0, -cubeWidth, cubeWidth],
        [0, cubeWidth, cubeWidth],
        [-cubeWidth, -cubeWidth, cubeWidth],
        [-cubeWidth, cubeWidth, cubeWidth],
        [cubeWidth, -cubeWidth, cubeWidth],
        [cubeWidth, cubeWidth, cubeWidth],
      ],
      angleOfRotation: Array(27).fill(0),
      rotationVector: Array(27).fill([1, 0, 0]),
      faceRotationAngle: 0,
    };
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.rotateCube = this.rotateCube.bind(this);
    this.reArrangeCubes = this.reArrangeCubes.bind(this);
    this.rotateCubeSpace = this.rotateCubeSpace.bind(this);
    this.faceRotationInit = this.faceRotationInit.bind(this);
  }

  componentDidMount() {
    //adding listener for mouseup
    this.elem.addEventListener("mouseup", this.onTouchEnd);
    this.elem.addEventListener("touchend", this.onTouchEnd);
    this.elem.addEventListener("touchcancel", this.onTouchEnd);

    //Initial position
    //this.rotateCubeSpace(120, 0);
    this.rotateCubeSpace(0, 0);
  }

  componentWillUnmount() {
    //removeEventListener
    this.elem.removeEventListener("mouseup", this.onTouchEnd);
    this.elem.removeEventListener("touchend", this.onTouchEnd);
    this.elem.removeEventListener("touchcancel", this.onTouchEnd);
  }

  /**return css parameters for orientation */
  getOrientation(index) {
    return [
      this.state.rotationVector[index][0],
      this.state.rotationVector[index][1],
      this.state.rotationVector[index][2],
      this.state.angleOfRotation[index],
    ];
  }

  vectorDistance(a, b) {
    return Math.sqrt(
      Math.pow(a[0] - b[0], 2) +
        Math.pow(a[1] - b[1], 2) +
        Math.pow(a[2] - b[2], 2)
    );
  }

  getCubeNotation() {
    console.log(this.elem.children);
    // var offsets2 = document.getElementById("232").getBoundingClientRect();
    // console.log(offsets2);
    // Get the element to be transformed
    // const element14 = document.getElementById("14");
    // // Get the computed style of the element
    // const computedStyle = window.getComputedStyle(element14);
    // console.log(computedStyle);
    // // Extract the individual transform values
    // const transformValues = computedStyle
    //   .getPropertyValue("transform")
    //   .split(/\s+/);
    // // // Extract the translate3d values
    // const translateX = parseFloat(transformValues[4]);
    // const translateY = parseFloat(transformValues[5]);
    // const translateZ = parseFloat(transformValues[6]);
    // //
    // // // Extract the rotate3d values
    // const rotateX = parseFloat(transformValues[9]);
    // const rotateY = parseFloat(transformValues[10]);
    // const rotateZ = parseFloat(transformValues[11]);
    // //
    // // // Calculate the transformed coordinates
    // const transformedX = translateX;
    // const transformedY = translateY;
    // const transformedZ = translateZ;
    // //
    // // // Display the transformed coordinates
    // console.log(`Transformed X: ${transformedX}`);
    // console.log(`Transformed Y: ${transformedY}`);
    // console.log(`Transformed Z: ${transformedZ}`);
    //
    // const boundingRect = element14.getBoundingClientRect();
    //
    // // Calculate the position of the element
    // const x = boundingRect.left + transformedX;
    // const y = boundingRect.top + transformedY;
    // const z = transformedZ;
    // console.log(`X: ${x}`);
    // console.log(`Y: ${y}`);
    // console.log(`Z: ${z}`);
    let all_values = [];
    for (const child of this.elem.children) {
      let obj_style = child.attributes["style"];
      let string_attr = obj_style.value;
      //console.log(string_attr);
      let start_of_pos = string_attr.indexOf("(");
      let end_of_pos = string_attr.indexOf(")") + 1;
      let position = string_attr.substring(start_of_pos, end_of_pos); // (0px,0px,0px)
      //console.log(position);
      let tokens = position.split("px");
      let values = [];
      values.push(parseFloat(tokens[0].split("(")[1]));
      values.push(parseFloat(tokens[1].split(", ")[1]));
      values.push(parseFloat(tokens[2].split(", ")[1])); // [0,0,0]
      all_values.push(values);
    }
    let red_cube_face = [
      [[], Infinity, 0],
      [[], Infinity, 0],
      [[], Infinity, 0],
      [[], Infinity, 0],
      [[], Infinity, 0],
      [[], Infinity, 0],
      [[], Infinity, 0],
      [[], Infinity, 0],
    ];
    let middle_faces_index = [1, 2, 3, 4, 9, 18];
    for (let i = 2; i < all_values.length; i++) {
      if (middle_faces_index.includes(i)) continue;
      let distance = this.vectorDistance(all_values[1], all_values[i]);
      if (distance < red_cube_face[0][1]) {
        red_cube_face.shift();
        red_cube_face.push([all_values[i], distance, i]);
        red_cube_face.sort(function (a, b) {
          return b[1] - a[1];
        });
      }
    }
    //transform: rotateY(270deg) translateX(-25px);
    //console.log(red_cube_face);
    // var bodyRect = document.body.getBoundingClientRect(),
    //     elemRect = element.getBoundingClientRect(),
    //     offset   = elemRect.top - bodyRect.top;
    //let offsets = document.getElementById("14").getBoundingClientRect();
    //console.log(offsets);
    for (const c of red_cube_face) {
      //console.log(c);
      let cube_number = c[2].toString();
      let cube_faces = [];
      for (let i = 0; i < 6; i++) {
        let elm = document.getElementById(`${cube_number}${i}`);
        if (!elm.attributes["style"]) continue;
        let z_index = c[0][2];
        let y_index = c[0][1];
        let x_index = c[0][0];
        //console.log(c[0]);
        switch (i) {
          case 0:
            z_index += 25;
            break;
          case 1:
            //z_index -= 25;
            x_index += 75;
            break;
          case 2:
            y_index -= 25;
            break;
          case 3:
            y_index += 25;
            break;
          case 4:
            x_index -= 25;
            break;
          case 5:
            x_index += 25;
            break;
        }
        //cube_faces.push([elm.getBoundingClientRect(), z_index, elm.id]);
        cube_faces.push([x_index, y_index, z_index, elm.id]);
      }
      //console.log(c);
      console.log([all_values[1][0] - 25, all_values[1][1], all_values[1][2]]);
      let mmin = Infinity;
      let closet_face = cube_faces[0];
      //console.log(cube_faces);
      for (const a of cube_faces) {
        console.log(a);
        // let dis = Math.sqrt(
        //   Math.pow(offsets.x - a[0].x, 2) +
        //     Math.pow(offsets.y - a[0].y, 2) +
        //     Math.pow(50 - a[1], 2)
        // );
        let dis = Math.sqrt(
          Math.pow(all_values[1][0] - 25 - a[0], 2) +
            Math.pow(all_values[1][1] - a[1], 2) +
            Math.pow(all_values[1][2] - a[2], 2)
        );
        console.log(dis);
        if (dis < mmin) {
          mmin = dis;
          closet_face = a;
        }
      }
      //break;
      //console.log(closet_face);
      let x = document.getElementById(closet_face[3]);
      console.log(x);
      //break;
    }
    // var offsets2 = document.getElementById("235").getBoundingClientRect();
    // console.log(offsets2);
    //console.log(mid_left);
    // for (const c of red_cube_face) {
    //   if (c[1] <= 55) {
    //     // distance <= 55 its {up,down,left,right}
    //     if (c[0][0] <= mid_left[0][0]) {
    //       mid_left = c;
    //     } else if (c[0][0] >= mid_right[0][0]) {
    //       mid_right = c;
    //     } else if (c[0][1] <= up_mid[0][1]) {
    //       up_mid = c;
    //     } else if (c[0][1] >= down_mid[0][1]) {
    //       down_mid = c;
    //     }
    //   }
    // }
    // console.log(mid_left);
    // console.log(mid_right);
    // console.log(up_mid);
    // console.log(down_mid);
    //console.log(this.facePosition(this.state.touchedFace));
    // let ret_arr = [];
    // for (const f of red_cube_face) {
    //   if (f[0][1] === -cubeWidth) ret_arr.push([f, "white"]);
    //   else if (f[0][1] === cubeWidth) ret_arr.push([f, "yellow"]);
    //   else if (f[0][0] === -cubeWidth) ret_arr.push([f, "red"]);
    //   else if (f[0][0] === cubeWidth) ret_arr.push([f, "orange"]);
    //   else if (f[0][2] === cubeWidth) ret_arr.push([f, "green"]);
    //   else if (f[0][2] === -cubeWidth) ret_arr.push([f, "blue"]);
    // }
    // console.log(ret_arr);
  }

  /**Touch events */
  onTouchStart(eve) {
    this.getCubeNotation();
    this.setState({
      touchStarted: true,
      mousePoint: {
        x: getTouchPositions(eve).clientX,
        y: getTouchPositions(eve).clientY,
      },
    });
  }

  rotateCubeSpace(diffX, diffY) {
    let arr = this.state.positions.slice();
    let angleOfRotationArr = [];
    let rotationVectorArr = [];
    for (let i = 0; i < arr.length; i++) {
      arr[i] =
        Math.abs(diffY) > Math.abs(diffX)
          ? calcPosition(this.state.positions[i], [1, 0, 0], -diffY)
          : calcPosition(this.state.positions[i], [0, 1, 0], diffX);
      let rotationResult =
        Math.abs(diffY) > Math.abs(diffX)
          ? calculateResultantAngle(
              -diffY,
              [1, 0, 0],
              this.state.rotationVector[i],
              this.state.angleOfRotation[i]
            )
          : calculateResultantAngle(
              diffX,
              [0, 1, 0],
              this.state.rotationVector[i],
              this.state.angleOfRotation[i]
            );
      angleOfRotationArr[i] = rotationResult.gama;
      rotationVectorArr[i] = rotationResult.rotationVector;
    }

    this.setState({
      positions: arr,
      angleOfRotation: angleOfRotationArr,
      rotationVector: rotationVectorArr,
    });
  }

  onTouchMove(eve) {
    if (this.state.touchStarted) {
      let diffY = getTouchPositions(eve).clientY - this.state.mousePoint.y;
      let diffX = getTouchPositions(eve).clientX - this.state.mousePoint.x;
      this.setState(
        {
          mousePoint: {
            x: getTouchPositions(eve).clientX,
            y: getTouchPositions(eve).clientY,
          },
        },
        () => {
          this.rotateCubeSpace(diffX, diffY);
        }
      );
    } else if (this.state.touchedFace) {
      let diffY = getTouchPositions(eve).clientY - this.state.mousePoint.y;
      let diffX = getTouchPositions(eve).clientX - this.state.mousePoint.x;
      this.setState({
        mousePoint: {
          x: getTouchPositions(eve).clientX,
          y: getTouchPositions(eve).clientY,
        },
      });
      this.rotateCube(
        diffX / 2,
        diffY / 2,
        this.state.positions[this.state.facePositionIndex],
        this.state.touchedFace,
        this.getOrientation(this.state.facePositionIndex)
      );
    }
  }

  onTouchEnd() {
    this.setState({
      touchStarted: false,
      mousePoint: {},
      touchedFace: undefined,
    });
    if (this.state.faceRotationIndex) {
      this.reArrangeCubes();
    }
  }

  reArrangeCubes() {
    if (this.state.faceRotationAngle % 90 === 0) {
      this.setState({
        faceRotationAngle: 0,
        faceRotationIndex: null,
        autoRotation: undefined,
      });
      return;
    }
    const currentMove =
      Math.abs(this.state.faceRotationAngle % 90) < 80 &&
      Math.abs(this.state.faceRotationAngle % 90) > 10
        ? 3
        : 1;

    this.setState(
      {
        autoRotation: true,
        currentMove,
        reverseAngle:
          !this.state.autoRotation &&
          Math.abs(this.state.faceRotationAngle % 90) < 30
            ? !this.state.reverseAngle
            : this.state.reverseAngle,
      },
      () => {
        this.rotateCube(Math.sqrt(0.5), Math.sqrt(0.5), null);
        setTimeout(this.reArrangeCubes, 0.001);
      }
    );
  }

  /**Method triggered by child cube on cube movement*/
  rotateCube(xAxisMove, yAxisMove, cubePosition, touchedFace, cubeOrientation) {
    // console.log(facePosition[touchedFace]);
    //avoid face roation while auto move.
    if (this.state.autoRotation && touchedFace) return;

    /** check for no movement*/
    if (xAxisMove === 0 && yAxisMove === 0) return;

    /**resultant move */
    const currentMove = touchedFace
      ? Math.round(Math.sqrt(xAxisMove * xAxisMove + yAxisMove * yAxisMove))
      : this.state.currentMove;

    /**fetching state data */
    let rotationVector = this.state.rotationVector.slice();
    let angleOfRotation = this.state.angleOfRotation;
    let arr = this.state.positions.slice();

    /**face vectors for all six faces */
    const sixFaceAxis = [
      [0, 0, 1],
      [0, 0, -1],
      [0, 1, 0],
      [0, -1, 0],
      [1, 0, 0],
      [-1, 0, 0],
    ];

    sixFaceAxis.forEach((faceAxis, f) => {
      sixFaceAxis[f] = calcPosition(
        faceAxis,
        rotationVector[0],
        angleOfRotation[0]
      );
    });

    let index = 0;
    let reverseAngle = false;
    if (touchedFace) {
      let movedPosition;
      let diff = 1000;

      //check for face roation vector defined
      if (this.state.faceRotationAngle) {
        index = this.state.faceRotationIndex;
        movedPosition = calcPosition(
          cubePosition.slice(),
          sixFaceAxis[index].slice(),
          currentMove
        );
        if (
          diff >
          getCubePositionDiffrence(
            movedPosition,
            cubePosition,
            xAxisMove,
            yAxisMove
          )
        ) {
          diff = getCubePositionDiffrence(
            movedPosition,
            cubePosition,
            xAxisMove,
            yAxisMove
          );
          reverseAngle = false;
        }

        movedPosition = calcPosition(
          cubePosition.slice(),
          sixFaceAxis[index].slice(),
          -currentMove
        );
        if (
          diff >
          getCubePositionDiffrence(
            movedPosition,
            cubePosition,
            xAxisMove,
            yAxisMove
          )
        ) {
          diff = getCubePositionDiffrence(
            movedPosition,
            cubePosition,
            xAxisMove,
            yAxisMove
          );
          reverseAngle = true;
        }
      }
      //fresh rotation
      else {
        let faceVector = [];
        faceVector = calcPosition(
          facePosition[touchedFace],
          [cubeOrientation[0], cubeOrientation[1], cubeOrientation[2]],
          cubeOrientation[3]
        );
        /**Finding face on which rotation gives matching cube movement */
        for (let i in sixFaceAxis) {
          if (
            Math.abs(
              cubePosition[0] * sixFaceAxis[i][0] +
                cubePosition[1] * sixFaceAxis[i][1] +
                cubePosition[2] * sixFaceAxis[i][2] -
                cubeWidth
            ) < 0.1 &&
            Math.abs(
              faceVector[0] * sixFaceAxis[i][0] +
                faceVector[1] * sixFaceAxis[i][1] +
                faceVector[2] * sixFaceAxis[i][2] -
                cubeWidth
            ) > 0.1
          ) {
            movedPosition = calcPosition(
              cubePosition.slice(),
              sixFaceAxis[i].slice(),
              currentMove
            );
            if (
              diff >
              getCubePositionDiffrence(
                movedPosition,
                cubePosition,
                xAxisMove,
                yAxisMove
              )
            ) {
              diff = getCubePositionDiffrence(
                movedPosition,
                cubePosition,
                xAxisMove,
                yAxisMove
              );
              index = i;
              reverseAngle = false;
            }

            movedPosition = calcPosition(
              cubePosition.slice(),
              sixFaceAxis[i].slice(),
              -currentMove
            );
            if (
              diff >
              getCubePositionDiffrence(
                movedPosition,
                cubePosition,
                xAxisMove,
                yAxisMove
              )
            ) {
              diff = getCubePositionDiffrence(
                movedPosition,
                cubePosition,
                xAxisMove,
                yAxisMove
              );
              index = i;
              reverseAngle = true;
            }
          }
        }
      }

      this.setState({ faceRotationIndex: index, reverseAngle: reverseAngle });
    } else {
      reverseAngle = this.state.reverseAngle;
      index = this.state.faceRotationIndex;
    }

    /** calculating position of cubes in the face rotation */
    for (let j = 0; j < arr.length; j++) {
      let lineSum1 = arr[j][0] * sixFaceAxis[index][0];
      let lineSum2 = arr[j][1] * sixFaceAxis[index][1];
      let lineSum3 = arr[j][2] * sixFaceAxis[index][2];

      /** filter for identifying cubes in the rotating face*/
      if (Math.abs(lineSum1 + lineSum2 + lineSum3 - cubeWidth) < 0.1) {
        arr[j] = calcPosition(
          this.state.positions[j],
          sixFaceAxis[index],
          reverseAngle ? -currentMove : currentMove
        );
        const rotationResult = calculateResultantAngle(
          reverseAngle ? -currentMove : currentMove,
          sixFaceAxis[index],
          rotationVector[j].slice(),
          angleOfRotation[j]
        );
        rotationVector[j] = rotationResult.rotationVector;
        angleOfRotation[j] = rotationResult.gama;
      }
    }

    /** setting u the state */
    this.setState({
      positions: arr,
      angleOfRotation: angleOfRotation,
      rotationVector: rotationVector,
      faceRotationAngle:
        this.state.faceRotationAngle +
        (reverseAngle ? -currentMove : currentMove),
    });
  }

  getScalingFactor() {
    const minSize =
      window.innerHeight > window.innerWidth
        ? window.innerWidth
        : window.innerHeight;
    return Math.min(Math.max(minSize / 300, 1), 1.5);
  }

  faceRotationInit(mousePoint, face, index) {
    this.setState({
      touchedFace: face,
      mousePoint: mousePoint,
      facePositionIndex: index,
    });
  }

  render() {
    return (
      <div
        ref={(elem) => (this.elem = elem)}
        className="cube-container"
        style={{ transform: `scale(${this.getScalingFactor()})` }}
        onMouseDown={this.onTouchStart}
        onTouchStart={this.onTouchStart}
        onMouseMove={this.onTouchMove}
        onTouchMove={this.onTouchMove}
      >
        {this.state.positions.map((val, index) => {
          return (
            <Cube
              id={index.toString()}
              key={index}
              faceRotationInit={(mousePoint, face) => {
                this.faceRotationInit(mousePoint, face, index);
              }}
              translate={this.state.positions[index]}
              orientation={this.getOrientation(index)}
            />
          );
        })}
      </div>
    );
  }
}
