/*
 * @Author: mjh
 * @Date: 2024-04-25 15:47:47
 * @LastEditors: mjh
 * @LastEditTime: 2024-04-26 16:32:05
 * @Description: 
 */
import React, { useState } from 'react';
import { Rolling } from 'freedom-ui';
import './index.less'

export default function Basic() {
  const [isRolling, setIsRolling] = useState(true)
  return (
    <>
      <button onClick={() => setIsRolling(!isRolling)}>点击改变状态</button>
      <br />
      <br />
      <div className='rolling-demo'>
        <Rolling value={isRolling}>
          <div className='model-box'>
            {new Array(5).fill(0).map((_, index) => {
              return <div className="rolling-item"  key={index}>hello world {index}</div>
            })}
          </div>
        </Rolling>
      </div>
    </>
  )
};
