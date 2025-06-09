---
title: 栈、队列和堆详解
date: 2024/04/09
tags:
  - Java
categories:
 - 算法
---

## 栈

栈是一种后进先出的数据结构，Java提供了Stack类，它是Vector的子类。不过，在实际开发中，更推荐使用Deque接口的实现类，像ArrayDeque。

### 操作

只能在栈顶插入 / 删除
- push(x)：入栈
- pop()：出栈
- peek()：查看栈顶
- isEmpty(): 判断栈是否为空
- size(): 获取栈的大小

适用于回溯、括号匹配问题

## 队列

队列遵循先进先出（FIFO）的规则。Queue是一个接口，其常用实现类有LinkedList和PriorityQueue。

### 操作

元素按加入顺序排队；头部出队，尾部入队
- offer(x)：入队
- poll()：出队（无元素返回 null）
- peek()：查看队首
- isEmpty(): 判断栈是否为空
- size(): 获取栈的大小

适用于任务调度、广度优先搜索等。

## 堆

堆通常指的是优先队列（PriorityQueue），它会根据元素的自然顺序或者自定义比较器来排序。

### 操作

局部有序的完全二叉树，用数组实现；Java 默认实现是最小堆（堆顶最小）
- offer(x)：插入
- poll()：弹出最小值
- peek()：查看堆顶
- isEmpty(): 判断栈是否为空
- size(): 获取栈的大小
- 大顶堆：((a,b)->b-a)；小顶堆：((a,b)->a-b);