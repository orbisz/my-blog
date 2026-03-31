---
title: 零碎Java源码了解
date: 2025/06/14
tags:
- 源码
categories:
- reference
---



Java 源码 ThreadLocal 中 HASH_INCREMENT = 0x61c88647 这样一个常量的定义。因为这用作数据散列的特殊值 0x61c88647 就是基于黄金分割点计算得来的，
ThreadLocal 是基于斐波那契散列计算的下标索引 。

公式：(1L << 32) - (long) ((1L << 32) * (Math.sqrt(5) - 1))/2 。