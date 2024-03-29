import React from 'react';
import {changeCubeStringDefinition} from "../CubeDefinition";

export default ({rotate, recorder, id}) => (
    <svg className='RotateArrows'
         width='740px' height='650px' viewBox='0 0 727.464 649.468'>
        <g onClick={() => {
            rotate('x', false);
            recorder(rotate, 'x', false, "ax0")
            changeCubeStringDefinition("ax0")
        }} id={`ax0${id}`}>
            <polygon fill='transparent' points='617.417,111.892 655.393,139.9 674.013,186.892 698.393,202.892 719.763,198.831
        719.763,143.892 674.013,107.331 635.393,96.892 			'/>
            <path fill='#4a5fa3' d='M628.263,107.331c0,0,68.298,20.261,68.298,68.298l-19.28-19.28l28.758,42.482l13.725-42.482l-11.11,18.3
  			C708.652,174.649,717.802,116.481,628.263,107.331z'/>
        </g>
        <g onClick={() => {
            rotate('x', true);
            recorder(rotate, 'x', true, "ax1")
            changeCubeStringDefinition("ax1")
        }} id={`ax1${id}`}
        >
            <polygon fill='transparent'
                     points='485.766,58.361 511.393,17.892 551.393,5.892 617.417,70.892 628.263,96.892 			'/>
            <path fill='#4a5fa3' d='M617.417,93.15c0,0-42.132-57.446-87.347-41.228l24.657,11.639L505.03,50.835l35.353-27.263L526.909,40.21
  			C526.909,40.21,578.572,11.958,617.417,93.15z'/>
        </g>
        <g onClick={() => {
            rotate('z', true);
            recorder(rotate, 'z', true, "az1")
            changeCubeStringDefinition("az1")
        }}
           id={`az1${id}`}>
            <polygon fill='transparent'
                     points='68.393,23.573 35.348,67.892 42.393,139.9 89.254,153.081 134.393,29.554 			'/>
            <path fill='#4a5fa3' d='M70.387,139.9c0,0-12.214-70.185,30.814-91.541l-8.698,25.842l25.268-44.647l-44.155,6.592l21.332,1.817
  			C94.949,37.963,38.777,55.628,70.387,139.9z'/>
        </g>
        <g onClick={() => {
            rotate('z', false);
            recorder(rotate, 'z', false, "az0")
            changeCubeStringDefinition("az0")
        }}
           id={`az0${id}`}>
            <polygon fill='transparent'
                     points='25.393,179.92 9.957,243.892 9.957,288.892 44.393,308.892 60.738,258.892 70.393,179.92 			'/>
            <path fill='#4a5fa3' d='M60.738,179.92c0,0-46.685,53.811-20.852,94.31l5.887-26.624l-1.399,51.282L9.957,270.454l19.209,9.452
  			C29.166,279.906-9.831,235.787,60.738,179.92z'/>
        </g>
        <g onClick={() => {
            rotate('y', false);
            recorder(rotate, 'y', false, "ay0")
            changeCubeStringDefinition("ay0")
        }}
           id={`ay0${id}`}>
            <polygon fill='transparent' points='268.228,576.892 256.393,610.883 268.228,639.892 326.358,643.892 384.489,634.686
				397.393,602.892 			'/>
            <path fill='#4a5fa3' d='M384.488,617.159c0,0-67.515,22.731-95.157-16.557l26.863,4.674l-47.966-18.197l13.221,42.642
  			l-1.443-21.358C280.006,608.362,305.994,661.198,384.488,617.159z'/>
        </g>
        <g onClick={() => {
            rotate('y', true);
            recorder(rotate, 'y', true, "ay1")
            changeCubeStringDefinition("ay1")
        }}
           id={`ay1${id}`}>
            <polygon fill='transparent' points='423.393,613.883 423.393,587.079 533.393,547.892 552.393,556.062 545.393,601.892
          487.893,628.892 			'/>
            <path fill='#4a5fa3' d='M430.889,604.796c0,0,70.328,11.352,91.154-31.935l-25.732,9.014l44.333-25.813l-6.05,44.232l-2.08-21.308
    			C532.514,578.986,515.541,635.37,430.889,604.796z'/>
        </g>
    </svg>
);
