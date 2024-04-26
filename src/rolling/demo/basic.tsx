/*
 * @Author: mjh
 * @Date: 2024-04-25 15:47:47
 * @LastEditors: mjh
 * @LastEditTime: 2024-04-26 16:15:06
 * @Description: 
 */
import React, { useState, useEffect } from 'react';
import './index.less'
import { Rolling } from 'freedom-ui';

export default function Basic() {
  const [length, setLength] = useState(5);
  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   setLength(1)
  //   // }, 3000)

  //   setTimeout(() => {
  //     setLength(5)
  //   }, 6000)
  // }, [])
  return (
    <div className='rolling-demo'>
      <Rolling isDragControl speed={80}>
        <div className='model-box'>
          {new Array(length).fill(0).map((_, index) => {
            return <div className="rolling-item"  key={index}>hello world {index}</div>
          })}
        </div>
      </Rolling>
    </div>
  )
};
