import React, { useState, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';


export interface RollingProps {
  children?: React.ReactNode
  direction?: 'x' | 'y',
  value?: boolean,
  className?: string
  style?: React.CSSProperties
  // 滚动时长
  time?: number,
  action?: 'hover' | 'click' | 'dblclick' | 'none',
  scrollAble?: boolean
  isDragControl?: boolean
  speed?: number
  onChange?: (val: boolean) => void
  onDomChange?: (currDistance: number, MutationObserver: MutationRecord[]) => void
}
const prefixCls = 'fd-rolling';
const Rolling: React.FC<RollingProps> = forwardRef((props: RollingProps, ref) => {
  const { style, className, children, time = 10, direction = 'y', value, action = 'hover', speed, isDragControl, scrollAble, onDomChange, onChange } = props
  // 是否滚动
  const [isRolling, setRolling] = useState<boolean>(value ?? true)
  // 动画名称
  const animationNameRef = useRef(`rollingsAnnualTasks${Math.floor(Math.random() * 100000)}`) // 动画名称
  // 滚动盒子dom
  const rollingBodyRef = useRef<HTMLDivElement>(null)
  const rollingBoxBodyRef = useRef<HTMLDivElement>(null)
  const [forcedStop, setForcedStop] = useState(false) // 是否强制无需滚动(当内容没有占满轮播显示空间时)
  const [hasAnimation, setHasAnimation] = useState(false)
  const observer = useRef<null | MutationObserver>(null) // dom 监听
  const distanceRef = useRef(0) // 滚的距离

  const checkDistance = (MutationObserver?: MutationRecord[]) => {
    const { fatherDistance, currDistance } = getDistance()
    if (currDistance === distanceRef.current) return
    distanceRef.current = currDistance
    if(MutationObserver && onDomChange) onDomChange(currDistance, MutationObserver)
    setForcedStop(fatherDistance > currDistance)
    if (!isRolling) return
    changeForcedStop(fatherDistance > currDistance)
  }
  const observerRefCheckDistance = useRef<(MutationObserver?: MutationRecord[]) => void>(checkDistance)
  observerRefCheckDistance.current = checkDistance



  useEffect(() => {
    observerRefCheckDistance.current()
    observer.current = new MutationObserver((MutationObserver) => {
      observerRefCheckDistance.current(MutationObserver)
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



  useEffect(() => {
    if(typeof value === 'boolean') changeRolling(value)
  }, [value])
  
  useEffect(() => {
    if(!hasAnimation && isRolling) controlAnimation()
  }, [isRolling, hasAnimation])

  useEffect(() => {
    if (forcedStop) clearAnimation()
    else controlAnimation()
  }, [forcedStop])
  
  // 获取dom大小
  const getDistance = () => {
      const dom = rollingBodyRef.current
      const domFather = rollingBoxBodyRef.current
      if (!dom || !domFather) return { currDistance: 0, fatherDistance: 0 }
      const currDistance = (direction === 'x' ? dom.offsetWidth : dom.offsetHeight) / (forcedStop ? 1 : 2)
      const fatherDistance = (direction === 'x' ? domFather.offsetWidth : domFather.offsetHeight)
      return { fatherDistance, currDistance }
  }
  

  const animationTime = useMemo(() => {
    const { currDistance } = getDistance()
    if (typeof speed === 'number') {
      return currDistance / speed
    }
    return time
  }, [time, speed, isRolling, forcedStop, hasAnimation])

  const changeRolling = (val: boolean) => {
    if (typeof value !== 'boolean') return
    setRolling(val)
  }



  const startAnimation = () => {
      changeRolling(true)
      controlAnimation()
  }

  
  const clearAnimation = () => {
      const currStyle = document.styleSheets[0]
      if (!currStyle) return
      const styleArray: any[] = [].slice.call(currStyle.cssRules) // 将伪数组变成数组
      const index = styleArray.findIndex(item => item.name === animationNameRef.current)
      if (index !== -1) currStyle.deleteRule(index) // 如果有此动画就先删除
      return currStyle
  }



  const controlAnimation = () => {
      const dom = rollingBodyRef.current
      if (!dom) return
      const { currDistance } = getDistance()
      distanceRef.current = currDistance
      const currStyle = clearAnimation()
      if (!isRolling || !currStyle) return
      dom.style.animationPlayState = '' // 继续动画
      currStyle.insertRule(`@keyframes ${animationNameRef.current} {0%{ transform: translateX(0%);}100%{transform: translate${direction === 'x' ? 'X' : 'Y'}(-${currDistance}px);}}`, 0)
      if(!hasAnimation) setHasAnimation(true)
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
      const currSpeed = currDistance / (animationTime)
      let rememberTime: number
      const mouseMoveHandler = (currEvent: MouseEvent) => {
        const endDis = direction === 'y' ? currEvent.clientY : currEvent.clientX
        const distance = endDis - startDis
        animation.forEach((item) => {
          if (!rememberTime) rememberTime = (item.currentTime as number) || 0
          const currTime = rememberTime - (distance / currSpeed * 1000)
          item.currentTime = (currTime < 0 ? animationTime * 1000 + currTime : currTime) 
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

  useImperativeHandle(ref, () => ({
    clearAnimation,
    controlAnimation,
    changeForcedStop,
    startAnimation,
    animationName: animationNameRef.current,
    isRolling,
    forcedStop,
    checkDistance
  }))
  
  return (
    <div className={prefixCls} ref={rollingBoxBodyRef}>
      <div
        id={animationNameRef.current}
        ref={rollingBodyRef}
        className={`${className} ${prefixCls}-box ${direction === 'x' ? prefixCls + '-flex' : ''}`}
        style={{
          ...(style || {}),
          animation: `${animationNameRef.current} ${animationTime}s linear infinite`,
          animationPlayState: isRolling ? 'running' : 'paused',
          height: direction === 'x' ? '100%' : undefined,
          width: direction === 'y' ? '100%' : undefined,
        }}
        onMouseEnter={mouseenter}
        onMouseLeave={mouseleave}
        onMouseDown={onMouseDownBorder}
        onClick={handleClick}
        onDoubleClick={handleDblclick}
        onWheel={mousewheel}
      >
        {children}
        {!forcedStop && children}
      </div>
    </div>
  )
})

export default Rolling;
