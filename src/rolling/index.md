---
title: Rolling 无限滚动组建
nav:
  title: 组件
  order: 2
group:
  title: 反馈
  order: 1
---

# Rolling 无限滚动

其内部插入的元素组建可以自适应实现无限滚动

## 代码演示

### 基本用法
给定组建外部一个盒子，它就会自动撑满内容，这个时候我们在其内部插入我们需要无限滚动的组建即可  
`time` 属性可以设置滚动完一周的时间
<code src="./demo/basic.tsx"></code>

### 设置速度
`speed` 可以设置滚动的速度，默认是50，优先级高于`time` 属性
<code src="./demo/speed.tsx"></code>


### 受控最酷
传入`value` 可以控制动画的暂停和继续
<code src="./demo/control.tsx"></code>

### 设置暂停事件
设置 `action` 的值可以来控制何时动画停止，默认是 `hover`
<code src="./demo/stop.tsx"></code>

### 拖拽控制组建
设置 `isDragControl` 可以拖拽控制动画
<code src="./demo/drag-control.tsx"></code>