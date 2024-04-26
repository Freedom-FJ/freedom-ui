/*
 * @Author: mjh
 * @Date: 2024-04-25 15:47:47
 * @LastEditors: mjh
 * @LastEditTime: 2024-04-26 16:30:06
 * @Description: 
 */
import React from 'react';
import { Rolling } from 'freedom-ui';
import './index.less'

export default function Basic() {
  return (
    <div className='rolling-demo'>
      <Rolling action='click'>
        <div className='model-box'>
          {new Array(5).fill(0).map((_, index) => {
            return <div className="rolling-item"  key={index}>hello world {index}</div>
          })}
        </div>
      </Rolling>
    </div>
  )
};
