---
title: 剑指offer-Java版 41-67
date: 2025/09/14
tags:
  - Java
categories:
 - 算法
---

### 41. 和为s的连续整数序列
#### 和为S的两个数字
输入一个递增排序的数组array和一个数字S，在数组中查找两个数，使得他们的和正好是S，如果有多对数字的和等于S，返回任意一组即可，如果无法找出这样的数字，返回一个空数组即可。

思路：双指针，哈希表
```
public class Solution{
    public ArrayList<Integer> FindNumbersWithSum(int [] array,int sum) {
        ArrayList<Integer> res = new ArrayList<Integer>();
        //左右双指针
        int left = 0, right = array.length - 1;
        //对撞双指针
        while(left < right){
            //相加等于sum，找到目标
            if(array[left] + array[right] == sum){
                res.add(array[left]);
                res.add(array[right]);
                break;
            //和太大，缩小右边
            }else if(array[left] + array[right] > sum)
                right--;
            //和太小，扩大左边
            else
                left++;
        }
        return res;
    }
}
```

#### 和为S的连续正数序列
小明很喜欢数学,有一天他在做数学作业时,要求计算出9~16的和,他马上就写出了正确答案是100。但是他并不满足于此,他在想究竟有多少种连续的正数序列的和为100(至少包括两个数)。没多久,他就得到另一组连续正数和为100的序列:18,19,20,21,22。现在把问题交给你,你能不能也很快的找出所有和为S的连续正数序列?

思路：滑动窗口，从某一个数字开始的连续序列和等于目标数如果有，只能有一个，于是我们可以用这个性质来使区间滑动。
两个指针l,r分别指向区间首和区间尾，公式`(l+r)*(r-l+1)/2`计算区间和。如果和目标结果相等，记录该序列，然后l++，如果区间和大于该序列，l++，如果区间和小于该序列，r--；
```
public class Solution{
    public ArrayList<ArrayList<Integer>> FindContinuousSequence (int sum) {
        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        int l=1,r=2;
        while(l<r){
            int sum2 = (r+l)*(r-l+1)/2;
            if(sum2==sum){
                ArrayList<Integer> temp = new ArrayList<>();
                for(int i=l;i<=r;i++){
                    temp.add(i);
                }
                res.add(temp);
                l++;
            }else if(sum2>sum){
                l++;
            }else{
                r++;
            }
        }
        return res;
    }
}
```
### 42. 翻转字符串
#### 翻转单词序列
把单词序列反转，每一个单词都是正常的

思路：把序列去掉空格转换成数组，然后倒序输出
```
public class Solution{
    public String ReverseSentence(String str) {
        if(str==null||str.length()==0) return new String();
        String[] s = str.split(" ");
        StringBuilder res = new StringBuilder();
        for(int i=s.length-1;i>=0;i--){
            res.append(s[i]).append(" ");
        }
        res.deleteCharAt(res.length()-1);
        return res.toString();
    }
}
```
#### 左旋转字符串
汇编语言中有一种移位指令叫做循环左移（ROL），现在有个简单的任务，就是用字符串模拟这个指令的运算结果。对于一个给定的字符序列  S ，请你把其循环左移 K 位后的序列输出。

思路：反转三次即可，循环左移相当于从第n个位置开始，左右两部分视作整体翻转。即abcdefg左移3位defgabc可以看成AB翻转成BA（这里小写字母看成字符元素，大写字母看成整体）。
```
public class Solution{
    public String LeftRotateString (String str, int n) {
        if(str==null||str.length()==0) return "";
        int m = str.length();
        n = n%m;
        char[] s = str.toCharArray();
        reverse(s,0,m-1);
        reverse(s,0,m-n-1);
        reverse(s,m-n,m-1);
        return new String(s);
    }
    private void reverse(char[] s,int start, int end){
        while(start<end){
            char temp = s[start];
            s[start] = s[end];
            s[end] = temp;
            start++;
            end--;
        }
    }
}   
```
### 43. n个骰子的点数及出现的概率
你选择掷出 n 个色子，请返回所有点数总和的概率。

思路：动态规划，根据i个骰子的概率推算出i+1个骰子的概率。
```
public class Solution{
    public double[] statisticsProbability(int num) {
        int maxSum = 6 * num;
        int minSum = num;
        int total = (int) Math.pow(6, num); // 所有可能情况数
        int[][] dp = new int[num + 1][maxSum + 1];
        for (int i = 1; i <= 6; i++) {
            dp[1][i] = 1;
        }
        for (int i = 2; i <= num; i++) {
            for (int j = i; j <= 6 * i; j++) {
                for (int k = 1; k <= 6; k++) {
                    if (j - k >= i - 1) {
                        dp[i][j] += dp[i - 1][j - k];
                    }
                }
            }
        }
        double[] result = new double[maxSum - minSum + 1];
        for (int i = minSum; i <= maxSum; i++) {
            result[i - minSum] = (double) dp[num][i] / total;
        }
        return result;
    }
}
```
### 44. 扑克牌的顺子
现在有2副扑克牌，从扑克牌中随机五张扑克牌，我们需要来判断一下是不是顺子。

思路：遍历数组，遇到零牌计数，遇到非零牌计算与其后的间隔数，最后比较零牌数与间隔数，若是间隔数大于零牌数则不能组成顺子。
```
public class Solution{
    public boolean IsContinuous (int[] numbers) {
        Arrays.sort(numbers);
        int zeros=0;
        int gap=0;
        for(int i=0;i<numbers.length-1;i++){
            if(numbers[i]==0) zeros++;
            else{
                if(numbers[i]-numbers[i+1]==0) return false;
                else gap += numbers[i+1]-numbers[i]-1;
            }
        }
        return gap<=zeros;
    }
}
```
### 45. 圆圈中最后剩下的数
每年六一儿童节，牛客都会准备一些小礼物和小游戏去看望孤儿院的孩子们。其中，有个游戏是这样的：首先，让 n 个小朋友们围成一个大圈，小朋友们的编号是0~n-1。然后，随机指定一个数 m ，让编号为0的小朋友开始报数。每次喊到 m-1 的那个小朋友要出列唱首歌，然后可以在礼品箱中任意的挑选礼物，并且不再回到圈中，从他的下一个小朋友开始，继续0... m-1报数....这样下去....直到剩下最后一个小朋友，可以不用表演，并且拿到牛客礼品，请你试着想下，哪个小朋友会得到这份礼品呢？

思路：约瑟夫环问题，迭代实现，空间复杂度较低，递推关系：`J(n, m) = (J(n-1, m) + m) % n`,定义 J(n, m)：表示 n 个小朋友围成圈、每次数 m 个（报数到 m-1）时，最后剩余小朋友的编号（编号从 0 开始）。
```
public class Solution{
    public int LastRemaining_Solution (int n, int m) {
        if(n==0||m==0) return -1;
        int x=0;
        for(int i=2;i<=n;i++){
            x=(m+x)%i;
        }
        return x;
    }
}
```
### 46. 1+2+3+…+n的和
求1+2+3+...+n，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。

思路：不用 for/while 循环，改用递归实现累加（每次递归计算 n + sum (n-1)）。利用逻辑与（&&）的短路特性替代 if 判断终止条件。
- 逻辑与的规则：A && B中，若 A 为 false，则 B 不会执行。
- 当 n=0 时，递归终止；当 n>0 时，继续递归计算 sum (n-1)。
```
public class Solution{
    public int Sum_Solution(int n) {
        boolean flag = (n>1)&&((n+=Sum_Solution(n-1))>0);
        return n;
    }
}
```
### 47. 不用加减乘除做加法
写一个函数，求两个整数之和，要求在函数体内不得使用+、-、*、/四则运算符号。空间复杂度 O(1)，时间复杂度 O(1)。

思路：加法运算可拆解为两个独立过程，循环执行直至无进位产生。
- 无进位相加：用异或（^） 运算实现。异或的特性是 “相同位为 0，不同位为 1”，恰好对应二进制中 “不考虑进位时的加法结果”。
- 进位计算：用与（&） 运算结合左移（<<1） 实现。与运算的特性是 “只有两位都为 1 时结果为 1”，可定位进位发生的位置；左移 1 位则将进位值移动到正确的高位（如个位进位需移到十位）。
```
public class Solution{
    public int Add(int num1,int num2) {
        while(num2!=0){
            int sum = num1^num2;
            int carry = (int)((long)(num1&num2)<<1);
            num1=sum;
            num2=carry;
        }
        return num1;
    }
}
```
### 49. 字符串转换为整数
```
public class Solution{
    public int myAtoi(String str) {
        int n=str.length();
        int i=0;
        while(i<n&&str.charAt(i)==' '){
            i++;
        }
        if(i==n) return 0;
        int sign=1;
        if(str.charAt(i)=='-'||str.charAt(i)=='+'){
            sign  = str.charAt(i)=='-'?-1:1;
            i++;
        }
        int res=0;
        while(i<n&&Character.isDigit(str.charAt(i))){
            int didgit = str.charAt(i)-'0';
            if(res>((Integer.MAX_VALUE-didgit)/10)){
                return sign==-1?Integer.MIN_VALUE:Integer.MAX_VALUE;
            }
            res = res*10+didgit;
            i++;
        }
        return res*sign;
    }
}
```
### 50. 树中两个节点的最低公共祖先
```
public class Solution{
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if(root==null||p==root||q==root) return root;
        TreeNode left = lowestCommonAncestor(root.left,p,q);
        TreeNode right = lowestCommonAncestor(root.right,p,q);
        if(left!=null&&right!=null){
            return root;
        }
        return left!=null?left:right;
    }
}
```
### 51. 找出重复的数
```
public class Solution{
    public int duplicate (int[] numbers) {
        if(numbers==null||numbers.length<2) return -1;
        Set<Integer> set = new HashSet<>();
        for(int num:numbers){
            if(set.contains(num)) return num;
            set.add(num);
        }
        return -1;
    }
}
```
### 52. 构建乘积数组
```
public class Solution{
    public int[] multiply (int[] A) {
        if(A == null||A.length==0) return new int[0];
        int n=A.length;
        int[] pre = new int[n];
        pre[0]=1;
        for(int i=1;i<n;i++){
            pre[i] = pre[i-1]*A[i-1];
        }
        int[] res = new int[n];
        int back=1;
        for(int i=n-1;i>=0;i--){
            res[i]=pre[i]*back;
            back *= A[i];
        }
        return res;
    }
}
```
### 53. 正则表达式匹配
给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 s 的，而不是部分字符串。

思路：设$s $ 的长度为 $ n $，$ p $ 的长度为 $ m $；将 $ s $ 的第 $ i $ 个字符记为 $ s_i $，$ p $ 的第 $ j $ 个字符记为 $ p_j $，将 $ s $ 的前 $ i $ 个字符组成的子字符串记为 $ s[:i] $，同理将 $ p $ 的前 $ j $ 个字符组成的子字符串记为 $ p[:j] $。本题可转化为求 $ s[:n] $ 是否能和 $ p[:m] $ 匹配。

总体思路是从 $ s[:1] $ 和 $ p[:1] $ 开始判断是否能匹配，每轮添加一个字符并判断是否能匹配，直至添加完整个字符串 $ s $ 和 $ p $。

展开来看，假设 $ s[:i] $ 与 $ p[:j] $ 可以匹配，那么下一状态有两种：
1. 添加一个字符 $ s_{i+1} $ 后是否能匹配？
2. 添加字符 $ p_{j+1} $ 后是否能匹配？
```
public class Solution{
    public boolean isMatch(String s, String p) {
        int m = s.length() + 1, n = p.length() + 1;
        boolean[][] dp = new boolean[m][n];
        dp[0][0] = true;
        for(int j = 2; j < n; j += 2)
            dp[0][j] = dp[0][j - 2] && p.charAt(j - 1) == '*';
        for(int i = 1; i < m; i++) {
            for(int j = 1; j < n; j++) {
                dp[i][j] = p.charAt(j - 1) == '*' ?
                    dp[i][j - 2] || dp[i - 1][j] && (s.charAt(i - 1) == p.charAt(j - 2) || p.charAt(j - 2) == '.') :
                    dp[i - 1][j - 1] && (p.charAt(j - 1) == '.' || s.charAt(i - 1) == p.charAt(j - 1));
            }
        }
        return dp[m - 1][n - 1];
    }
}
```
### 54. 表示数值的字符串
有效数字（按顺序）可以分成以下几个部分：
1. 若干空格
2. 一个 小数 或者 整数
3. （可选）一个 'e' 或 'E' ，后面跟着一个 整数
4. 若干空格

小数（按顺序）可以分成以下几个部分：
1. （可选）一个符号字符（'+' 或 '-'）
2. 下述格式之一：
   1. 至少一位数字，后面跟着一个点 '.'
   2. 至少一位数字，后面跟着一个点 '.' ，后面再跟着至少一位数字
   3. 一个点 '.' ，后面跟着至少一位数字
   
整数（按顺序）可以分成以下几个部分：
1. （可选）一个符号字符（'+' 或 '-'）
2. 至少一位数字

思路：有限状态自动机。根据字符类型和合法数值的特点，先定义状态，再画出状态转移图，最后编写代码。

字符类型：

空格 「 」、数字「 0—9 」 、正负号 「 +, − 」 、小数点 「 . 」 、幂符号 「 e, E 」 。

状态定义：

按照字符串从左到右的顺序，定义以下 9 种状态。

0. 开始的空格
1. 幂符号前的正负号
2. 小数点前的数字
3. 小数点、小数点后的数字
4. 当小数点前为空格时，小数点、小数点后的数字
5. 幂符号
6. 幂符号后的正负号
7. 幂符号后的数字
8. 结尾的空格

结束状态：
合法的结束状态有 2, 3, 7, 8 。

```
public class Solution{
    public boolean validNumber(String s) {
        Map[] states = {
            new HashMap<>(){{put(' ',0);put('s',1);put('d',2);put('.',4);}},
            new HashMap<>(){{put('d',2);put('.',4);}},
            new HashMap<>(){{put('d',2);put('.',3);put('e',5);put(' ',8);}},
            new HashMap<>(){{put('d',3);put('e',5);put(' ',8);}},
            new HashMap<>() {{ put('d', 3); }},
            new HashMap<>() {{ put('s', 6); put('d', 7); }},
            new HashMap<>() {{ put('d', 7); }},
            new HashMap<>() {{ put('d', 7); put(' ', 8); }},
            new HashMap<>() {{ put(' ', 8); }}
        };
        int p = 0;
        char t;
        for(char c:s.toCharArray()){
            if(c >= '0' && c <= '9') t='d';
            else if(c=='+'||c=='-') t='s';
            else if(c=='e'||c=='E') t='e';
            else if(c=='.'||c==' ') t =c;
            else t='?';
            if(!states[p].containsKey(t)) return false;
            p = (int)states[p].get(t);

        }
        return p==2||p==3||p==7||p==8;
    }
}
```
### 55. 字符流中第一个不重复的字符
请实现一个函数用来找出字符流中第一个只出现一次的字符。例如，当从字符流中只读出前两个字符 "go" 时，第一个只出现一次的字符是 "g" 。当从该字符流中读出前六个字符 “google" 时，第一个只出现一次的字符是"l"。

思路:查找是否重复的问题，使用哈希表来记录各个字符出现的次数。
```
public class Solution{
   private StringBuilder s = new StringBuilder();
    private HashMap<Character,Integer> mp = new HashMap<>();
    public void Insert(char ch)
    {
        s.append(ch);
        mp.put(ch,mp.getOrDefault(ch,0)+1);
    }
  //return the first appearence once char in current stringstream
    public char FirstAppearingOnce()
    {
        for(int i=0;i<s.length();i++){
            if(mp.get(s.charAt(i))==1) return s.charAt(i);
        }
        return '#';
    }
}
```
### 56. 链表中环的入口节点
```
public class Solution{
   public ListNode EntryNodeOfLoop(ListNode pHead) {
        if(pHead == null) return null;
        ListNode fast = pHead;
        ListNode slow = pHead;
        while(fast != null && fast.next != null){
            fast = fast.next.next;
            slow = slow.next;
            if(fast==slow){
                ListNode curr = pHead;
                while(slow!=curr){
                    curr = curr.next;
                    slow = slow.next;
                }
                return slow;
            }
        }
        return null;
    }
}
```
### 57. 删除链表中重复的节点
在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。

思路：升序链表，重复的节点都连在一起，我们就可以很轻易地比较到重复的节点，然后将所有的连续相同的节点都跳过，连接不相同的第一个节点。
给链表前加上表头，方便可能的话删除第一个节点。
```
public class Solution{
   public ListNode deleteDuplication(ListNode pHead) {
        if(pHead==null) return null;
        ListNode dummy = new ListNode(0);
        dummy.next = pHead;
        ListNode cur = dummy;
        while(cur.next!=null&&cur.next.next!=null){
            if(cur.next.val == cur.next.next.val){
                int temp = cur.next.val;
                while(cur.next!=null&&cur.next.val==temp){
                    cur.next = cur.next.next;
                }
            }else{
                cur = cur.next;
            }
        }
        return dummy.next;
    }
}
```
### 58. 二叉树的下一个节点
给定一个二叉树其中的一个结点，请找出中序遍历顺序的下一个结点并且返回。注意，树中的结点不仅包含左右子结点，同时包含指向父结点的next指针。

思路：直接找下一个节点，分三种情况讨论
1. 有右子树，下一结点是右子树中的最左结点，例如 B，下一结点是 H
2. 无右子树，且结点是该结点父结点的左子树，则下一结点是该结点的父结点，例如 H，下一结点是 E
3. 无右子树，且结点是该结点父结点的右子树，则我们一直沿着父结点追朔，直到找到某个结点是其父结点的左子树，如果存在这样的结点，那么这个结点的父结点就是我们要找的下一结点。例如 I，下一结点是 A；例如 G，并没有符合情况的结点，所以 G 没有下一结点
```
public class Solution{
   public TreeLinkNode GetNext(TreeLinkNode pNode) {
        if(pNode.right!=null){
            TreeLinkNode cur = pNode.right;
            while(cur.left!=null){
                cur = cur.left;
            }
            return cur;
        }
        if(pNode.next!=null&&pNode.next.left == pNode){
            return pNode.next;
        }
        if(pNode.next!=null){
            TreeLinkNode pnext = pNode.next;
            while(pnext.next!=null&&pnext.next.right==pnext){
                pnext=pnext.next;
            }
            return pnext.next;
        }
        return null;
    }
}
```
### 59. 对称的二叉树
给定一棵二叉树，判断其是否是自身的镜像（即：是否对称）

思路：递归实现，
- step 1：两种方向的前序遍历，同步过程中的当前两个节点，同为空，属于对称的范畴。
- step 2：当前两个节点只有一个为空或者节点值不相等，已经不是对称的二叉树了。
- step 3：第一个节点的左子树与第二个节点的右子树同步递归对比，第一个节点的右子树与第二个节点的左子树同步递归比较。
```
public class Solution{
   public boolean isSymmetrical (TreeNode pRoot) {
        return recursion(pRoot,pRoot);
    }
    public boolean recursion(TreeNode root1,TreeNode root2){
        if(root1==null&&root2==null) return true;
        if(root1==null||root2==null) return false;
        return root1.val==root2.val&&recursion(root1.left,root2.right)&&recursion(root1.right,root2.left);
    }
}
```
### 60. 按之字形顺序打印二叉树
给定一个二叉树，返回该二叉树的之字形层序遍历，（第一层从左向右，下一层从右向左，一直这样交替）

思路：层序遍历，用一个变量记录是偶数层还是奇数层，修改遍历顺序（从左到右->从右到左->从左到右）
```
public class Solution{
   public ArrayList<ArrayList<Integer>> Print (TreeNode pRoot) {
        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        if(pRoot==null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(pRoot);
        boolean falg = true;
        while(!q.isEmpty()){
            ArrayList<Integer> ans = new ArrayList<>();
            int n = q.size();
            falg = !falg;
            for(int i=0;i<n;i++){
                TreeNode node = q.poll();
                ans.add(node.val);
                if(node.left!=null) q.offer(node.left);
                if(node.right!=null) q.offer(node.right);
            }
            if(falg){
                Collections.reverse(ans);
            }
            res.add(ans);
        }
        return res;
    }
}
```
### 61. 把二叉树打印成多行
二叉树层序遍历
```
public class Solution{
   public ArrayList<ArrayList<Integer> > Print(TreeNode pRoot) {
        TreeNode head = pRoot;
        ArrayList<ArrayList<Integer> > res = new ArrayList<ArrayList<Integer> >();
        if(head == null) return res;
        Queue<TreeNode> temp = new LinkedList<TreeNode>();
        temp.offer(head);
        TreeNode p;
        while(!temp.isEmpty()){
            ArrayList<Integer> row = new ArrayList<Integer>();
            int n = temp.size();
            for(int i = 0; i < n; i++){
                p = temp.poll();
                row.add(p.val);
                if(p.left != null)
                    temp.offer(p.left);
                if(p.right != null)
                    temp.offer(p.right);
            }
            res.add(row);
        }
        return res;
    }
}
```
### 62. 序列化二叉树
请实现两个函数，分别用来序列化和反序列化二叉树，不对序列化之后的字符串进行约束，但要求能够根据序列化之后的字符串重新构造出一棵与原二叉树相同的树。

思路：使用层序遍历的方式进行存储，对于某个叶子节点的空节点进行存储，同时确保不递归存储空节点对应的子节点。
```
public class Solution{
   int INF = 0x3f3f3f3f;
    TreeNode emptyNode = new TreeNode(INF);
    String Serialize(TreeNode root) {
        if(root==null) return "";
        StringBuilder sb = new StringBuilder();
        Deque<TreeNode> d = new ArrayDeque<>();
        d.addLast(root);
        while(!d.isEmpty()){
            TreeNode poll = d.pollFirst();
            sb.append(poll.val+"_");
            if(!poll.equals(emptyNode)){
                d.addLast(poll.left!=null?poll.left:emptyNode);
                d.addLast(poll.right != null ? poll.right : emptyNode);
            }
        }
        return sb.toString();
    }
    TreeNode Deserialize(String data) {
       if (data.equals("")) return null;
        String[] ss = data.split("_");
        int n = ss.length;
        TreeNode root = new TreeNode(Integer.parseInt(ss[0]));
        Deque<TreeNode> d = new ArrayDeque<>();
        d.addLast(root);
        for (int i = 1; i < n - 1; i += 2) {
            TreeNode poll = d.pollFirst();
            int a = Integer.parseInt(ss[i]), b = Integer.parseInt(ss[i + 1]);
            if (a != INF) {
                poll.left = new TreeNode(a);
                d.addLast(poll.left);
            }
            if (b != INF) {
                poll.right = new TreeNode(b);
                d.addLast(poll.right);
            }
        }
        return root;
    }
}
```
### 63. 二叉搜索树的第K个节点
给定一棵结点数为n 二叉搜索树，请找出其中的第 k 小的TreeNode结点值。

思路：根据二叉搜索树的性质，左子树的元素都小于根节点，右子树的元素都大于根节点。因此它的中序遍历（左中右）序列正好是由小到大的次序，因此我们可以尝试递归中序遍历，也就是从最小的一个节点开始，找到k个就是我们要找的目标。
```
public class Solution{
   private int count=0;
    private TreeNode res=null;
    public int KthNode (TreeNode proot, int k) {
        midOrder(proot,k);
        if(res!=null) return res.val;
        else return -1;
    }
    public void midOrder(TreeNode root,int k){
        if(root==null||count>k) return;
        midOrder(root.left,k);
        count++;
        if(count==k) res = root;
        midOrder(root.right,k);
    }
}
```
### 64. 数据流中的中位数
如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。我们使用Insert()方法读取数据流，使用GetMedian()方法获取当前读取数据的中位数。

思路：优先队列，中位数是数组较小的一半元素中最大的那个，优势数组中较大的一半元素中较小的那个。因此只需要维护最小的一半元素和最大的一半元素，就可以快速找到最大值和最小值
```
public class Solution{
   private PriorityQueue<Integer> max = new PriorityQueue<>();
    private PriorityQueue<Integer> min = new PriorityQueue<>((o1, o2)->o2.compareTo(o1));
    public void Insert(Integer num) {
        min.offer(num);
        max.offer(min.poll());
        if(min.size()<max.size()) min.offer(max.poll());
    }

    public Double GetMedian() {
        if(min.size()>max.size()) return (double) min.peek();
        else return (double) (min.peek()+max.peek())/2;
    }
}
```
### 65. 滑动窗口的最大值
给定一个长度为 n 的数组 num 和滑动窗口的大小 size ，找出所有滑动窗口里数值的最大值。

思路：若是一个数字A进入窗口后，若是比窗口内其他数字都大，那么这个数字之前的数字都没用了，因为它们必定会比A早离开窗口，在A离开之前都争不过A，所以A在进入时依次从尾部排除掉之前的小值再进入，而每次窗口移动要弹出窗口最前面值，因此队首也需要弹出，所以我们选择双向队列。
```
public class Solution{
   public ArrayList<Integer> maxInWindows (int[] num, int size) {
        ArrayList<Integer> res = new ArrayList<Integer>();
        if(size <= num.length && size != 0){
            ArrayDeque <Integer> dq = new ArrayDeque<Integer>(); 
            for(int i = 0; i < size; i++){
                while(!dq.isEmpty() && num[dq.peekLast()] < num[i])
                     dq.pollLast();
                dq.add(i);
            }
            for(int i = size; i < num.length; i++){
                res.add(num[dq.peekFirst()]);
                while(!dq.isEmpty() && dq.peekFirst() < (i - size + 1))
                    dq.pollFirst();
                while(!dq.isEmpty() && num[dq.peekLast()] < num[i])
                    dq.pollLast();
                dq.add(i);
            }
            res.add(num[dq.pollFirst()]);
        }    
        return res;
    }
}
```
### 66. 矩阵中的路径
请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左，向右，向上，向下移动一个格子。如果一条路径经过了矩阵中的某一个格子，则该路径不能再进入该格子。

思路：DFS方法，矩阵中的每个格子都可能是路径的起点，因此需要遍历矩阵的每个元素。从起点开始，向上下左右四个方向递归探索，检查是否匹配字符串的下一个字符。
- 标记当前格子为已访问（避免重复进入）
- 若当前路径不匹配，则回溯（恢复标记，尝试其他方向）
- 若匹配到字符串末尾，则返回 true
```
public class Solution{
   public boolean hasPath(char[][] matrix, String word) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0 || word == null) {
            return false;
        }
        int rows = matrix.length;
        int cols = matrix[0].length;
        boolean[][] visited = new boolean[rows][cols]; 
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (dfs(matrix, word, i, j, 0, visited)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    /**
     * 深度优先搜索
     * @param matrix 矩阵
     * @param word 目标字符串
     * @param i 当前行索引
     * @param j 当前列索引
     * @param index 匹配到字符串的第几个字符
     * @param visited 访问标记数组
     * @return 是否找到匹配路径
     */
    private boolean dfs(char[][] matrix, String word, int i, int j, int index, boolean[][] visited) {
        if (index == word.length()) {
            return true;
        }
        int rows = matrix.length;
        int cols = matrix[0].length;
        if (i < 0 || i >= rows || j < 0 || j >= cols || 
            visited[i][j] || matrix[i][j] != word.charAt(index)) {
            return false;
        }
        visited[i][j] = true;
        
        boolean found = dfs(matrix, word, i - 1, j, index + 1, visited) ||
                        dfs(matrix, word, i + 1, j, index + 1, visited) ||
                        dfs(matrix, word, i, j - 1, index + 1, visited) ||
                        dfs(matrix, word, i, j + 1, index + 1, visited);
        if (!found) {
            visited[i][j] = false;
        }
        return found;
    }
}
```
### 67. 机器人的运动范围
地上有一个 rows 行和 cols 列的方格。坐标从 [0,0] 到 [rows-1,cols-1] 。一个机器人从坐标 [0,0] 的格子开始移动，每一次只能向左，右，上，下四个方向移动一格，但是不能进入行坐标和列坐标的数位之和大于 threshold 的格子。

思路：DFS,我们从[0,0]开始，每次选择一个方向开始检查能否访问，如果能访问进入该节点，该节点作为子问题，继续按照这个思路访问，一条路走到黑，然后再回溯，回溯的过程中每个子问题再选择其他方向，正是深度优先搜索。
```
public class Solution{
    int[][] dir = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    int res = 0;
    int cal(int n){
        int sum = 0;
        while(n != 0){
            sum += (n % 10);
            n /= 10;
        }
        return sum;
    }
    void dfs(int i, int j, int rows, int cols, int threshold, boolean[][] vis){
        if(i < 0 || i >= rows || j < 0 || j >= cols || vis[i][j] == true)
            return;
        if(cal(i) + cal(j) > threshold)
            return;
        res += 1;
        vis[i][j] = true;
        for(int k = 0; k < 4; k++)
            dfs(i + dir[k][0], j + dir[k][1], rows, cols, threshold, vis);
    }
    public int movingCount(int threshold, int rows, int cols) {
        if(threshold <= 0)
            return 1;
        boolean[][] vis = new boolean[rows][cols];
        dfs(0, 0, rows, cols, threshold, vis);
        return res;
    }
}
```