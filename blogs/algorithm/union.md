---
title: 并查集详解
date: 2024/04/10
tags:
  - Java
categories:
 - 算法
---

并查集主要用于解决一些元素分组的问题，他管理一系列不相交的集合，支持两种操作：
- 合并（Union）：把两个不相交的集合合并为一个集合。
- 查询（Find）：查询两个元素是否在同一个集合中。

并查集的重要思想在于，用集合中的一个元素代表集合。我曾看过一个有趣的比喻，把集合比喻成帮派，而代表元素则是帮主。相当于一个树状结构，要寻找集合的代表元素，只需要一层层往上访问父节点，
直达树的根节点。

### 初始化
```
// 相当于C++中的fa[MAXN]，用于存储每个元素的父节点
private int[] parent;

// 初始化方法，参数n为元素的数量
public void init(int n) {
    // 初始化数组，大小为n+1是为了保持与C++代码中1-based索引一致
    parent = new int[n + 1];
    // 每个元素的父节点初始化为自身
    for (int i = 1; i <= n; i++) {
        parent[i] = i;
    }
}
```
对于n个元素，用数组parent[]来存储每个元素的父节点。初始时，父节点设为自己。

### 查询
```
public int find(int x) {
    // 如果x的父节点是自身，说明x是根节点
    if (parent[x] == x) {
        return x;
    } else {
        // 否则递归查找父节点的根节点
        return find(parent[x]);
    }
}
```
用递归的写法实现对代表元素的查询：一层一层访问父节点，直至根节点（根节点的标志就是父节点是本身）。要判断两个元素是否属于同一个集合，只需要看它们的根节点是否相同即可。

### 合并
```
public void merge(int i, int j) {
    // 找到i的根节点，并将其 parent 指向j的根节点
    parent[find(i)] = find(j);
}
```
合并操作即先找到两个集合的代表元素，然后将前者的父节点设为后者即可。当然也可以将后者的父节点设为前者。

## 路径压缩
既然我们只关心一个元素对应的根节点，那我们希望每个元素到根节点的路径尽可能短，最好只需要一步。
只要我们在查询的过程中，把沿途的每个节点的父节点都设为根节点即可。下一次再查询时，我们就省事很多。
### 合并（路径压缩）
```
public int find(int x) {
    return x == parent[x] ? x : (parent[x] = find(parent[x]));
}
```

### 按秩合并
我们可以把简单的树往复杂的树上合并，而不是相反。因为这样合并后，到根节点距离变长的节点个数比较少。

我们用一个数组rank[]记录每个根节点对应的树的深度（如果不是根节点，其rank相当于以它作为根节点的子树的深度）。一开始，把所有元素的rank（秩）设为1。合并时比较两个根节点，把rank较小者往较大者上合并。

路径压缩和按秩合并如果一起使用，时间复杂度接近 ，但是很可能会破坏rank的准确性。
```
public class UnionFind {
    private int[] parent; // 对应C++中的fa数组，存储父节点
    private int[] rank;   // 存储每个节点的秩（用于按秩合并）
    
    /**
     * 初始化并查集
     * @param n 元素数量
     */
    public void init(int n) {
        parent = new int[n + 1];
        rank = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            parent[i] = i;  // 每个元素的父节点初始化为自身
            rank[i] = 1;    // 每个元素的初始秩为1
        }
    }
    
    /**
     * 查找元素的根节点（递归实现）
     * @param x 要查找的元素
     * @return 元素所在集合的根节点
     */
    public int find(int x) {
        if (parent[x] == x) {
            return x;
        } else {
            return find(parent[x]);
        }
    }
    
    /**
     * 合并两个元素所在的集合（按秩合并优化）
     * @param i 第一个元素
     * @param j 第二个元素
     */
    public void merge(int i, int j) {
        int x = find(i);  // 找到i的根节点
        int y = find(j);  // 找到j的根节点
        
        // 按秩合并：秩小的树合并到秩大的树下面
        if (rank[x] <= rank[y]) {
            parent[x] = y;
        } else {
            parent[y] = x;
        }
        
        // 如果两个树的秩相同且根节点不同，合并后新根的秩加1
        if (rank[x] == rank[y] && x != y) {
            rank[y]++;
        }
    }
}
```

## 例题
![省份数量](https://leetcode.cn/problems/number-of-provinces/description/)