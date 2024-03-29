import React from 'react';
import {changeCubeStringDefinition} from "../CubeDefinition"

export default (spinSlice, recorder) => ({slice, forward, style, id}) =>
    (
        <svg className='Arrow' width='36px' height='36px' viewBox='0 0 64 64'
             onClick={() => {
                 spinSlice(slice, forward);
                 recorder(spinSlice, slice, forward, id)
                 changeCubeStringDefinition(id)
             }} style={style} id={id}>
            <circle fill='#4B61A1' cx='31.628' cy='31.627' r='29.628'/>
            <polyline fill='#8088BA' points='40.344,27.261 8.258,27.261 8.258,36.367
                                    40.344,36.367 31.329,47.751 56.298,31.815
                                    31.329,15.215'
            />
        </svg>
    );
