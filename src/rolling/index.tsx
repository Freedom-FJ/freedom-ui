import React, { useState, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';


export interface RollingProps {
  children?: React.ReactNode
  direction?: 'x' | 'y',
  value?: boolean,
  // 滚动时长
  time?: number,
  action?: 'hover' | 'click' | 'dblclick' | 'none',
  scrollAble?: boolean
  isDragControl?: boolean
  speed?: number
  onChange?: (val: boolean) => void
  onDomChange?: (currDistance: number, MutationObserver: MutationRecord[]) => void
}

const Rolling: React.FC<RollingProps> = forwardRef((props: RollingProps, ref) => {
  const { children, time = 10, direction = 'y', value, action = 'hover', speed = 1, isDragControl, scrollAble, onDomChange, onChange } = props
  // 是否滚动
  const [isRolling, setRolling] = useState<boolean>(value ?? true)
  // 动画名称
  const animationNameRef = useRef(`rollingsAnnualTasks${Math.floor(Math.random() * 100000)}`) // 动画名称
  // 滚动盒子dom
  const rollingBodyRef = useRef<HTMLDivElement>(null)
  const rollingBoxBodyRef = useRef<HTMLDivElement>(null)
  const [forcedStop, setForcedStop] = useState(false) // 是否强制无需滚动(当内容没有占满轮播显示空间时)
  const hasAnimation = useRef(false)
  const observer = useRef<null | MutationObserver>(null) // dom 监听
  const distanceRef = useRef(0) // 滚的距离

  useEffect(() => {
    if(typeof value === 'boolean') changeRolling(value)
  }, [value])
  
  useEffect(() => {
    if(!hasAnimation.current && isRolling) controlAnimation()
  }, [isRolling])
  
  useEffect(() => {
    checkDistance()
    observer.current = new MutationObserver((MutationObserver) => {
        checkDistance(MutationObserver)
    })
    if (rollingBodyRef.current) {
      (observer.current as MutationObserver).observe(rollingBodyRef.current, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      })
    }
    return () => {
      clearAnimation()
      observer.current?.disconnect()
    }
  }, [])

  const changeRolling = (val: boolean) => {
    if (typeof value === 'boolean') return
    setRolling(val)
  }

  const checkDistance = (MutationObserver?: MutationRecord[]) => {
      const { fatherDistance, currDistance } = getDistance()
      if (currDistance === distanceRef.current) return
      distanceRef.current = currDistance
      if(MutationObserver && onDomChange) onDomChange(currDistance, MutationObserver)
      if (!isRolling) return
      changeForcedStop(fatherDistance > currDistance)
  }

  const startAnimation = () => {
      changeRolling(true)
      controlAnimation()
  }
  // 获取dom大小
  const getDistance = () => {
      const dom = rollingBodyRef.current
      const domFather = rollingBoxBodyRef.current
      if(!dom || !domFather)  return { currDistance: 0, fatherDistance: 0 }
      const currDistance = (direction === 'x' ? dom.offsetWidth : dom.offsetHeight) / (forcedStop ? 1 : 2)
      const fatherDistance = (direction === 'x' ? domFather.offsetWidth : domFather.offsetHeight)
      return { fatherDistance, currDistance }
  }
  
  
  const clearAnimation = () => {
      const style = document.styleSheets[0]
      if (!style) return
      const styleArray: any[] = [].slice.call(style.cssRules) // 将伪数组变成数组
      const index = styleArray.findIndex(item => item.name === animationNameRef.current)
      if (index !== -1) style.deleteRule(index) // 如果有此动画就先删除
      return style
  }



  const controlAnimation = () => {
      const dom = rollingBodyRef.current
      if (!dom) return
      const { currDistance } = getDistance()
      distanceRef.current = currDistance
      const style = clearAnimation()
      if (!isRolling || !style) return
      dom.style.animationPlayState = '' // 继续动画
      style.insertRule(`@keyframes ${animationNameRef.current} {0%{ transform: translateX(0%);}100%{transform: translate${direction === 'x' ? 'X' : 'Y'}(-${currDistance}px);}}`, 0)
      hasAnimation.current = true
  }



  const mouseenter = () => {
      if (forcedStop) return
      if (action === 'hover') {
          changeRolling(false)
          onChange?.(false)
      }
  }

  const mouseleave = () => {
      if (forcedStop) return
      if (action === 'hover') {
          changeRolling(true)
          onChange?.(true)
      }
  }

  const handleClick = () => {
      if (forcedStop) return
      if (props.action === 'click') {
        onChange?.(!isRolling)
        changeRolling(!isRolling)
      }
  }
  const handleDblclick = () => {
      if (forcedStop) return
      if (props.action === 'dblclick') {
        onChange?.(!isRolling)
        changeRolling(!isRolling)
      }
  }

  const changeForcedStop = (val: boolean) => {
      setForcedStop(val)
      if (val) clearAnimation()
      else controlAnimation()
      return forcedStop
  }


  /**
   * 鼠标按下边
   */
  const onMouseDownBorder = (e: any) => {
      if (!isDragControl || forcedStop) return
      const element = document.getElementById(animationNameRef.current)
      if (!element) return
      const animation = element.getAnimations()
      const startDis = direction === 'y' ? e.clientY : e.clientX
      const currDistance = getDistance().currDistance
      const currSpeed = currDistance / (time * 1000)
      let rememberDis: number
      const mouseMoveHandler = (currEvent: MouseEvent) => {
        const endDis = direction === 'y' ? currEvent.clientY : currEvent.clientX
        const distance = endDis - startDis
        animation.forEach((item) => {
          if (!rememberDis) rememberDis = (item.currentTime as number) || 0
          const currTime = rememberDis - (distance / currSpeed)
          item.currentTime = currTime < 0 ? time * 1000 + currTime : currTime
        })
      }
      document.addEventListener('mousemove', mouseMoveHandler)
      const mouseUpHandler = () => {
        document.removeEventListener('mousemove', mouseMoveHandler)
        document.removeEventListener('mouseup', mouseUpHandler)
      }
      document.addEventListener('mouseup', mouseUpHandler)
  }

  const mousewheel = (e: any) => {
      if (!scrollAble || forcedStop) return
      e.preventDefault()
      let offset = direction === 'y' ? e.wheelDeltaY : e.wheelDeltaX
      const { fatherDistance } = getDistance()
      const currMaxDis = fatherDistance / 5 * 2
      offset = offset > currMaxDis ? currMaxDis : offset < -currMaxDis ? -currMaxDis : offset
      const element = document.getElementById(animationNameRef.current)
      if (!element) return
      const animation = element.getAnimations()
      animation.forEach((item) => {
          const currTime = ((item.currentTime as number) || 0) - offset * 10
          item.currentTime = currTime < 0 ? time * 1000 + currTime : currTime
      })
  }

  const animationTime = useMemo(() => {
    return time
  }, [time])

  useImperativeHandle(ref, () => ({
    clearAnimation,
    controlAnimation,
    changeForcedStop,
    startAnimation,
    animationName: animationNameRef.current,
    isRolling,
    forcedStop
  }))
  
  return (
    <div className="rolling-box" ref={rollingBoxBodyRef}>
      <div
        id={animationNameRef.current}
        ref={rollingBodyRef}
        className={`rolling-offset-box ${direction === 'x' ? 'fpi-el-rolling-flex' : ''}`}
        onMouseEnter={mouseenter}
        onMouseLeave={mouseleave}
        onMouseDown={onMouseDownBorder}
        onClick={handleClick}
        onDoubleClick={handleDblclick}
        onWheel={mousewheel}
        style={{
          animation: `${animationNameRef.current} ${animationTime}s linear infinite`,
          animationPlayState: isRolling ? 'running' : 'paused',
          height: direction === 'x' ? '100%' : undefined,
          width: direction === 'y' ? '100%' : undefined,
        }}>
        {children}
        {children}
      </div>
    </div>
  )
})

export default Rolling;
