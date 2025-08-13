---
title: 剑指offer-Java版 1-20
date: 2025/09/10
tags:
  - Java
categories:
 - 算法
---

《剑指offer》题目及Java题解(标 * 表示为热门面试题)

### 1. 赋值运算函数
思路：
- 将返回值类型声明为该类型的引用
- 把传入的参数类型声明为常量引用
- 释放实例自身已有的内存
- 判断传入的参数和当前的实例是不是同一个实例

### 2. 单例设计模式 *
#### 饿汉式
在类加载时就创建并初始化唯一实例，确保实例在使用前已存在。
```
public class Singleton{
    private static final Singtelon instance = new Singleton();
    public static Singleton getInstance(){
        return instance;
    }
    private SIngleton(){}
}
```
线程安全，实现简单；资源浪费；灵活性低
#### 懒汉式
仅在第一次调用`getInstance()`方法时才创建实例，实现延迟初始化。延迟初始化，灵活性高；多线程情况下存在线程安全问题，性能开销比较大。

非线程安全
```
public clas Singleton{
    private static Singleton instance;
    public static Singleton getInstance(){
        if(instance==null){
            instance = new Singleton();
        }
    } 
}
```

线程安全：给方法加锁
```
public clas Singleton{
    private static Singleton instance;
    public synchronized static Singleton getInstance(){
        if(instance==null){
            instance = new Singleton();
        }
    } 
}
```

线程安全：双重校验
```
public clas Singleton{

    private Singleton(){}
    public static Singleton getInstance(){
        if(instance==null){
            synchronized(Singleton.class){
                if(instance==null){
                    instance = new Singleton();
                }
            }
        }
        return instance;
    } 
}
```

### 3. 二维数组中查找目标值 *
在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
```
public static boolean findTarget(int[][] array,int target){
    if(array==null||array.length==0){
        return false;
    }
    int l=0,r=array[0].length-1;
    while(l<array.length&&人>=0){
        if(array[l][r]==target){
            return true;
        }else if(array[l][r]>target){
            r--;
        }else{
            l++;
        }
    }
    return false;
}
```

### 4. 替换字符串中的空格 *
将一个字符串中的空格替换成“%20”。 例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。
```
public static String replaceSpace(String s){
    if(s==null||s.length==0){
        return s;
    }
    StringBuilder res = new StringBuilder();
    for(char c:s.toCharArray()){
        if(c==' '){
            res.append("%20");
        }else{
            res.append(c);
        }
    }
    return res.toString();
}
```
### 5. 从尾到头打印链表 *
输入一个链表，从尾到头打印链表每个节点的值。

思路：借助栈实现，或使用递归的方法。
```
private static List<Integer> res = new ArrayLisr<>();
//栈
public static void printReversely(ListNode head){
    if (head == null) return;
    Stack<Integer> stack = new Stack<>();
    while (head != null) {
        stack.push(haed.val);
        head = head.next;
    }
    while (!stack.isEmpty()) {
        list.add(stack.pop());
    }
}

//递归
public static void printReversely(ListNode head){
    if(head==null){
        return;
    }
    printReversely(head.next);
    res.add(head.val);
}
```

### 6. 由前序和中序遍历重建二叉树 *
输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

思路：先找出根节点，然后利用递归方法构造二叉树
```
public static TreeNode{
    int vsl;
    TreeNode left;
    TreeNode right;
    TreeNode(int val){this.val=val;}
}
public TreeNode reConstructBinaryTree(int[] preorder, int[] inorder){
    if(preorder==null||inorder==null||preorder.length==0||inorder.length==0||preorder.length!=inorder.length){
        return null;
    }
    TreeNode root = new TreeNode(pre[0]);
    for(int i=0;i<preorder.length;i++){
        if(preorder[0]==inorder[i]){
            root.left = reConstructBinaryTree(Arrays.copyOfRange(preorder,1,i+1),Arrays.copyOfRange(inorder,0,i));
            root.right = reConstructBinaryTree(Arrays.copyOfRange(preorder,i+1,pre.length),Arrays.copyOfRange(inorder,i+1,inorder.length));
        }
    }
    return root;
}
```

### 7. 用两个栈实现队列 *
用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。

思路：一个栈压入元素，而另一个栈作为缓冲，将栈1的元素出栈后压入栈2中。也可以将栈1中的最后一个元素直接出栈，而不用压入栈2中再出栈。
```
class Queue{
    Stack<Integer> a,b;
    public MyQueue(){
        a = new Stack();
        b = new Stack();
    }
    public void push(int x){
        a.push(x);
    }
    public int pop(){
        int peek = peek();
        b.pop();
        return peek;
    }
    public int peek(){
        if(!b.isEmpty()) return b.peek();
        if(a.isEmpty()) return a.peek();
        while(!a.isEmpty()){
            b.push(a.pop());
        }
        return b.peek();
    }
    public boolean empty() {
        return a.isEmpty()&&b.isEmpty();
    }
}
```

### 8. 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。 
例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。 NOTE：给出的所有元素都大于0，若数组大小为0，请返回0 

利用二分法，找到中间的数，然后和最左边的值进行比较，若大于最左边的数，则最左边从mid开始，若小于最右边值，则最右边从mid开始。若左中右三值相等，则取mid前后值中较小的数。
```
public int minNum(int[] nums){
    if(nums==null||nums.length==0){
        return 0;
    }
    int l=0,r=nums.length;
    while(l<=r){
        int mid = l+(r-l)/2;
        if(nums[mid]<nums[r]){
            r=mid;
        }else{
            l=mid+1;
        }
    }
    return nums[r];
}
```

### 9. 斐波那契数列的第n项（青蛙跳台阶） *
```
public long fibonacci(int n){
    long f0=0;
    long f1=1;
    long f2=0;
    if(n==0) return f0;
    if(n==1) return f1;
    for(int i=2;i<=n;i++){
        f2 = f1+f0;
        f0 = f1;
        f1 = f2;
    }
    return f2;
}
```

我们可以用21的小矩形横着或者竖着去覆盖更大的矩形。请问用n个21的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？
```
public int Fibonaccik(int n){
    int number=1;
    int sum=1;
    if(n<=0) return 0;
    if(n==1) return 1;
    while(n-->=2){
        sum += number;
        number = sum - number;
    }
    return sum;
}
```

### 10. 二进制中1的个数 *
输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。

思路：a&(a-1)的结果会将a最右边的1变为0，直到a = 0，还可以先将a&1 != 0，然后右移1位，但不能计算负数的值.
```
public int numberOf1(int n){
    count = 0;
    while(n!=0){
        count++;
        n=(n-1)&n;
    }
    return count;
}
```

### 11. 数值的整数次方
给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。不得使用库函数，不需要考虑大数问题

思路：可以使用快速幂计算，采用分而治之的思想。先处理次方数为负数的情况，将底数化为分数解决；使用快速幂计算次方：将已乘出来的部分求次方，可以每次缩小一半要求的次方数。
```
public class Solution{
    public double Power(double base, int exponent){
        if(exponet<0){
            base=1/base;
            exponet=-exponet;
        }
        return Pow(base,exponent);
    }
    public double Pow(double x,int y){
        double res=1;
        while(y!=0){
            if((y&1)!=0) res *= x;
            
            x *=x;
            y = y>>1;
        }
        return res;
    }
}
```

### 12. 打印1到最大的n位数
输入数字n，按顺序打印出从1到最大的n位进制数。比如输入3，则打印出1、2、3一直到999.
```
public class Solution{
    public int[] printNumbers (int n) {
        int count=1;
        for(int i=0;i<n;i++){
            count *= 10;
        }
        int[] res = new int[count-1];
        for(int i=1;i<count;i++){
            res[i-1]=i;
        }
        return res;
    }
}
```
### 13. 删除链表节点 *
```
public class Solution{
    public ListNode deleteNode (ListNode head, int val) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode curr = dummy.next;
        ListNode prev = dummy;
        while(curr!=null){
            if(curr.val==val){
                prev.next = curr.next;
            }
            prev = prev.next;
            curr = curr.next;
        }
        return dummy.next;
    }
}
```
### 14. 使数组中的奇数位于偶数前面 *
输入一个整数数组，实现一个函数来调整该函数数组中数字的顺序，使得所有奇数位于数组的前半部分，所有的数组位于数组的后半部分。

思路：采用类似插入排序的思路，用一个指针标记当前奇数区域的末尾位置；遍历数组，当遇到奇数时，将其移动到奇数区域的末尾；移动过程中保持中间的偶数依次后移，从而保证相对顺序不变
```
public class Solution{
    public int[] reOrderArray(int[] array) {
        if (array == null || array.length <= 1) {
            return array;
        }
        int n = array.length;
        int oddIndex = 0; 
        for (int i = 0; i < n; i++) {
            if (array[i] % 2 != 0) {
                int temp = array[i]; 
                for (int j = i; j > oddIndex; j--) {
                    array[j] = array[j - 1];
                }
                array[oddIndex] = temp;
                oddIndex++; 
            }
        }
        return array;
    }
}
```

### 15. 找链表中倒数第K个节点 *
输入一个链表，输出该链表中倒数第k个结点。

思路：用两个指针：第一个先向前走k-1步，然后再和第二个指针一起向前运动 当第一个指针的下一个值为null时，第二个指针所在的位置就是要找的节点。
```
public class Solution{
public ListNode FindKthToTail(ListNode head,int k) {
        if(head == null || k == 0){
            return null;
        }
        ListNode h1 = head;
        ListNode h2 = head;
        for(int i = 0; i < k-1; i++){
             h1 = h1.next;
            if(h1 == null){
               return null;
            }
        }      
        while(null != h1.next){
            h1 = h1.next;
            h2 = h2.next;
        }       
        return h2;     
    }

}
```
### 16. 输出反转后的链表 *
```
public class Solution{
    public ListNode ReverseList (ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while(curr!=null){
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}
```
### 17. 合并两个有序链表 *
```
public class Solution{
    public ListNode Merge (ListNode pHead1, ListNode pHead2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        while(pHead1!=null&&pHead2!=null){
            if(pHead1.val<pHead2.val){
                curr.next = pHead1;
                pHead1 = pHead1.next;
            }else{
                curr.next = pHead2;
                pHead2 = pHead2.next;
            }
            curr = curr.next;
        }
        curr.next = pHead1==null?pHead2:pHead1;
        return dummy.next;
    }
}
```
### 18. 判断二叉树A中是否包含子树B *
输入两棵二叉树A，B，判断B是不是A的子结构。

思路：先判断根节点是否相同，如果都为null，那么就是子树，如果一个为null，一个不为null，那么就不是子树，然后判断是不是A的左右子树的子树。
```
public class Solution{
    public boolean siSame(TreeNode root1,TreeNode root2){
        if(root2==null) return true;
        if(root1==null) return false;
        return root1.val==root2.val&&siSame(root1.left,root2.left)&&siSame(root1.right,root2.right);
    }
    public boolean HasSubtree(TreeNode root1,TreeNode root2) {
        if(root1==null||root2==null) return false;
        return siSame(root1,root2)||siSame(root1.left,root2)||siSame(root1.right,root2);
    }
}
```
### 19. 二叉树的镜像 *
操作给定的二叉树，将其变换为源二叉树的镜像。

思路：因为我们需要将二叉树镜像，意味着每个左右子树都会交换位置，如果我们从上到下对遍历到的节点交换位置，但是它们后面的节点无法跟着他们一起被交换，
因此我们可以考虑自底向上对每两个相对位置的节点交换位置，
这样往上各个子树也会被交换位置。
自底向上的遍历方式，我们可以采用后序递归的方法。
```
public class Solution{
    public TreeNode Mirror (TreeNode pRoot) {
        if(pRoot==null) return null;
        TreeNode left = Mirror(pRoot.left);
        TreeNode right = Mirror(pRoot.right);
        pRoot.left = right;
        pRoot.right=left;
        return pRoot;
    }
}
```
### 20. 顺时针打印矩阵 *
输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

思路：定义四个变量代表范围，up、down、left、right
- 向右走存入整行的值，当存入后，该行再也不会被遍历，代表上边界的 up 加一，同时判断是否和代表下边界的 down 交错
- 向下走存入整列的值，当存入后，该列再也不会被遍历，代表右边界的 right 减一，同时判断是否和代表左边界的 left 交错
- 向左走存入整行的值，当存入后，该行再也不会被遍历，代表下边界的 down 减一，同时判断是否和代表上边界的 up 交错
- 向上走存入整列的值，当存入后，该列再也不会被遍历，代表左边界的 left 加一，同时判断是否和代表右边界的 right 交错
```
public class Solution{
    public ArrayList<Integer> printMatrix(int [][] matrix) {
        ArrayList<Integer> res = new ArrayList<>();
        if(matrix==null||matrix.length==0||matrix[0].length==0){
            return res;
        }
        int up=0;
        int down=matrix.length-1;
        int left=0;
        int right=matrix[0].length-1;
        while(true){
            for(int col=left;col<=right;col++){
                res.add(matrix[up][col]);
            }
            up++;
            if(up>down) break;
            for(int row=up;row<=down;row++){
                res.add(matrix[row][right]);
            }
            right--;
            if(left>right) break;
            for(int col=right;col>=left;col--){
                res.add(matrix[down][col]);
            }
            down--;
            if(up>down) break;
            for(int row=down;row>=up;row--){
                res.add(matrix[row][left]);
            }
            left++;
            if(left>right) break;
        }
        return res;
    }
}
```

