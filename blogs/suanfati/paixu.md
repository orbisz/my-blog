---
title: 排序算法详解
date: 2024/04/09
tags:
  - Java
categories:
 - 算法
---
## 选择排序
### 算法原理
每一轮选一个最小（或最大）值放到已排序部分的尾部。
遍历数组，找到最小值的下标 minIndex。把 minIndex 位置的元素与当前位置交换。对剩下未排序部分重复步骤。
### 算法框架
```java
public static void selectionSort(int[] arr) {
int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;

            // 找到从 i 开始的最小值位置
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }

            // 将最小值交换到当前位置 i
            if (minIndex != i) {
                int temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
        }
    }
```

## 归并排序
### 算法原理
递归把数组一分为二，分到只剩一个元素，然后从下往上合并，并且在合并时排好序。
递归将数组从中间一分为二（mid）。递归地对左边和右边排序。用一个辅助数组把两个有序子数组合并为一个有序数组。

### 算法框架
```java
private static void mergeSortHelper(int[] arr, int left, int right) {
        if (left >= right) return; // 分到只剩一个元素

        int mid = left + (right - left) / 2;

        // 分别递归排序左右两边
        mergeSortHelper(arr, left, mid);
        mergeSortHelper(arr, mid + 1, right);

        // 合并两个有序子数组
        merge(arr, left, mid, right);
    }

    private static void merge(int[] arr, int left, int mid, int right) {
        // 创建辅助数组
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;

        // 合并两个有序数组
        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) temp[k++] = arr[i++];
            else temp[k++] = arr[j++];
        }

        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];

        // 拷贝回原数组
        for (int m = 0; m < temp.length; m++) {
            arr[left + m] = temp[m];
        }
    }
```
## 快速排序
### 算法原理
选取一个基准 pivot（常选第一个/中间/随机一个）。用两个指针：i 从左，j 从右。移动 j 找 < pivot 的，移动 i 找 > pivot 的，交换。最后把 pivot 放到合适位置。对左右子数组递归执行同样的操作。

### 算法框架
```java
public static void quickSort(int[] arr, int left, int right) {
    if (left >= right) return;
    // 1. 选取基准值（这里选择最左边元素）
    int pivot = arr[left];
    int i = left + 1;
    int j = right;
    // 2. 双指针分区
    while (i <= j) {
        // 向右找 > pivot 的元素
        while (i <= j && arr[i] <= pivot) i++;
        // 向左找 < pivot 的元素
        while (i <= j && arr[j] >= pivot) j--;
        // 交换 arr[i] 和 arr[j]
        if (i < j) {
            swap(arr, i, j);
        }
    }
    // 3. 把 pivot 放到合适位置（j 所在位置）
    swap(arr, left, j);
    // 4. 递归处理左右子数组
    quickSort(arr, left, j - 1);
    quickSort(arr, j + 1, right);
}

private static void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
```

## 插入排序
### 算法原理
将数组划分为已排序和未排序两部分，每次从未排序部分取出一个元素，插入到前面已排序部分的合适位置，直到整个数组有序。
### 算法框架
```java
public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];      // 当前待插入元素
            int j = i - 1;
            // 将比 key 大的元素都右移一位
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            // 插入 key 到正确位置
            arr[j + 1] = key;
        }
    }
```
## 冒泡排序
### 算法原理
对相邻的两个元素进行比较，如果顺序错误就交换它们.每一轮会将未排序部分的最大元素移到最后,重复多轮，直到整个数组有序。
### 算法框架
```java
 public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            // 每轮将最大的数冒到末尾
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    // 交换相邻元素
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
```
## 堆排序
### 算法原理
把数组看成一棵完全二叉树，构造成最大堆（或最小堆）（自底向上建堆），这样根节点就是当前的最大（或最小）值,然后将其与末尾元素交换.堆大小减 1（将末尾视为已排序），缩小堆范围，继续调整堆，直到排序完成

### 算法框架
```java
public static void heapSort(int[] arr) {
        int n = arr.length;
        // 1️⃣ 建堆：从最后一个非叶子节点开始向上 heapify
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
        // 2️⃣ 排序：交换堆顶与末尾，并缩小堆
        for (int i = n - 1; i > 0; i--) {
            // 将最大值（堆顶）交换到末尾
            swap(arr, 0, i);
            // 重新对堆顶进行下沉调整（堆大小减 1）
            heapify(arr, i, 0);
        }
    }

    // 下沉调整（维护大顶堆）
    private static void heapify(int[] arr, int heapSize, int rootIndex) {
        int largest = rootIndex;
        int left = 2 * rootIndex + 1;
        int right = 2 * rootIndex + 2;
        // 找出 root、left、right 中最大值
        if (left < heapSize && arr[left] > arr[largest]) {
            largest = left;
        }
        if (right < heapSize && arr[right] > arr[largest]) {
            largest = right;
        }
        // 如果最大值不是 root，交换并递归调整
        if (largest != rootIndex) {
            swap(arr, rootIndex, largest);
            heapify(arr, heapSize, largest);
        }
    }

    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
```


## 例题
[排序数组](https://leetcode.cn/problems/sort-an-array/description/?envType=problem-list-v2&envId=7gG9b626)