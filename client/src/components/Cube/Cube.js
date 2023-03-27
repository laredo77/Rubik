import React, { Component } from "react";
import { getTouchPositions, getYawPitchRollMatrix } from "./utilities";
import PropTypes from "prop-types";

export const cubeWidth = 50;
export const faceArray = ["front", "back", "top", "bottom", "left", "right"];
export const facePosition = {
  left: [-cubeWidth, 0, 0],
  right: [cubeWidth, 0, 0],
  front: [0, 0, cubeWidth],
  back: [0, 0, -cubeWidth],
  top: [0, -cubeWidth, 0],
  bottom: [0, cubeWidth, 0],
};

export default class Cube extends Component {
  constructor(props) {
    super(props);
    this.onTouchStart = this.onTouchStart.bind(this);
    let faceColors = {};
    faceColors.top = this.props.translate[1] === -cubeWidth ? "#fff" : "";
    faceColors.bottom = this.props.translate[1] === cubeWidth ? "#FDCC09" : "";
    faceColors.left = this.props.translate[0] === -cubeWidth ? "#DC422F" : "";
    faceColors.right = this.props.translate[0] === cubeWidth ? "#FF6C00" : "";
    faceColors.front = this.props.translate[2] === cubeWidth ? "#009D54" : "";
    faceColors.back = this.props.translate[2] === -cubeWidth ? "#3D81F6" : "";

    if (
      Math.abs(this.props.translate[0]) +
        Math.abs(this.props.translate[1]) +
        Math.abs(this.props.translate[2]) ===
      cubeWidth
    ) {
      this.disableFaceRotation = true;
    }
    this.state = { touchStarted: false, faceColors: faceColors };

    this.position = {
      front: [
        this.props.translate[0],
        this.props.translate[1],
        this.props.translate[2] + 25,
      ],
      back: [
        this.props.translate[0],
        this.props.translate[1],
        this.props.translate[2] - 25,
      ],
      top: [
        this.props.translate[0],
        this.props.translate[1] - 25,
        this.props.translate[2],
      ],
      bottom: [
        this.props.translate[0],
        this.props.translate[1] + 25,
        this.props.translate[2],
      ],
      left: [
        this.props.translate[0] - 25,
        this.props.translate[1],
        this.props.translate[2],
      ],
      right: [
        this.props.translate[0] + 25,
        this.props.translate[1],
        this.props.translate[2],
      ],
    };
  }

  componentDidMount() {
    this.elem.addEventListener("mouseup", this.onTouchEnd);
    this.elem.addEventListener("touchend", this.onTouchEnd);
    this.elem.addEventListener("touchcancel", this.onTouchEnd);
  }

  componentWillUnmount() {
    this.elem.removeEventListener("mouseup", this.onTouchEnd);
    this.elem.removeEventListener("touchend", this.onTouchEnd);
    this.elem.removeEventListener("touchcancel", this.onTouchEnd);
  }

  dynamicFacePosition() {
    // return this.props.translate
    //     ? {
    //       transform: `translate3d(${this.props.translate[0]}px,${this.props.translate[1]}px,${this.props.translate[2]}px)`
    //     }
    //     : {};
    let arr = [];
    let left_face_pos = [
      this.props.translate[0],
      this.props.translate[1],
      this.props.translate[2] + 25,
    ];
    let top_face_pos = [
      this.props.translate[0],
      this.props.translate[1] - 25,
      this.props.translate[2],
    ];
    arr.push(left_face_pos);
    arr.push(top_face_pos);
    console.log(arr);
  }

  cubePosition() {
    return this.props.translate
      ? {
          transform: `translate3d(${this.props.translate[0]}px,${this.props.translate[1]}px,${this.props.translate[2]}px)
         rotate3d(${this.props.orientation[0]},${this.props.orientation[1]},${this.props.orientation[2]},${this.props.orientation[3]}deg)`,
        }
      : {};
  }

  MyGetCubePos() {
    return [
      this.props.translate[0],
      this.props.translate[1],
      this.props.translate[2],
      this.props.orientation[0],
      this.props.orientation[1],
      this.props.orientation[2],
      this.props.orientation[3],
    ];
  }

  onTouchStart(eve, face, index) {
    console.log(getTouchPositions(eve));
    // console.log(this.props.translate);
    // var offsets = document.getElementById("14").getBoundingClientRect();
    // var offsets_left = document.getElementById("234").getBoundingClientRect();
    // var offsets_top = document.getElementById("232").getBoundingClientRect();
    // var top = offsets.top;
    // var left = offsets.left;
    // console.log(offsets);
    // console.log(offsets_left);
    // console.log(offsets_top);
    //this.dynamicFacePosition();
    if (this.disableFaceRotation) return true;
    eve.stopPropagation();
    this.props.faceRotationInit(
      { x: getTouchPositions(eve).clientX, y: getTouchPositions(eve).clientY },
      face
    );
  }

  render() {
    return (
      <div
        id={this.props.id}
        ref={(elem) => (this.elem = elem)}
        className="cube"
        style={this.cubePosition()}
      >
        {faceArray.map((face, index) => {
          return (
            <div
              id={this.props.id + index.toString()}
              key={index}
              onMouseDown={(evt) => this.onTouchStart(evt, face)}
              onTouchStart={(evt) => this.onTouchStart(evt, face)}
              className={"face " + face}
              style={{ backgroundColor: this.state.faceColors[face] }}
            ></div>
          );
        })}
      </div>
    );
  }
}

Cube.propTypes = {
  faceRotationInit: PropTypes.func,
  translate: PropTypes.array,
  orientation: PropTypes.array,
};
