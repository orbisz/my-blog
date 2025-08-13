---
title: 剑指offer-Java版 21-40
date: 2025/09/12
tags:
  - Java
categories:
 - 算法
---

### 21. 包含min函数的栈
定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的 min 函数，输入操作时保证 pop、top 和 min 函数操作时，栈中一定有元素。
此栈包含的方法有：
push(value):将value压入栈中
pop():弹出栈顶元素
top():获取栈顶元素
min():获取栈中最小元素

思路：一个用来存所有的元素“stackTotal”,另一个用来存加入新的元素后当前stackTotal中对应的最小值。
两个栈中的元素数量始终保持一致，当新的元素小于“stackLittle”栈顶元素时，“stackLittle”像栈顶push新来的元素，否则，“stackLittle”向栈顶加入原栈顶元素。
执行“pop”方法时，两个栈同时弹出各自的栈顶元素。
```
public class Solution{
    Stack<Integer> stackTotal = new Stack<>();
    Stack<Integer> stackLittle = new Stack<>();
    public void push(int node) {
        stackTotal.push(node);
        if(stackLittle.isEmpty()){
            stackLittle.push(node);
        }else{
            if(node<=stackLittle.peek()){
                stackLittle.push(node);
            }else{
                stackLittle.push(stackLittle.peek());
            }
        }
    }
    
    public void pop() {
        stackTotal.pop();
        stackLittle.pop();
    }
    
    public int top() {
        return stackTotal.peek();
    }
    
    public int min() {
        return stackLittle.peek();
    }
}
```
### 22. 判断一个栈是否是另一个栈的弹出序列
输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。假设压入栈的所有数字均不相等。
例如序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。

思路：用栈来模拟，对于入栈序列，只要栈为空，序列就要依次入栈，当元素等于当前的出栈序列，就放弃入栈。
- 准备一个辅助栈，两个下标分别访问两个序列。
- 辅助栈为空或者栈顶不等于出栈数组当前元素，就持续将入栈数组加入栈中。
- 栈顶等于出栈数组当前元素就出栈。
- 当入栈数组访问完，出栈数组无法依次弹出，就是不匹配的，否则两个序列都访问完就是匹配的。
```
public class Solution{
    public boolean IsPopOrder (int[] pushV, int[] popV) {
        int n=pushV.length;
        Stack<Integer> s = new Stack<>();
        int j=0;
        for(int i=0;i<n;i++){
            while(j<n&&(s.isEmpty()||s.peek()!=popV[i])){
                s.push(pushV[j]);
                j++;
            }
            if(s.peek()==popV[i]){
                s.pop();
            }else{
                return false;
            }
        }
        return true;
    }
}
```
### 23. 层序遍历二叉树
```
public class Solution{
    public ArrayList<Integer> PrintFromTopToBottom(TreeNode root) {
        ArrayList<Integer> res = new ArrayList<>();
        if(root==null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while(!q.isEmpty()){
            int size = q.size();
            for(int i=0;i<size;i++){
                TreeNode node = q.poll();
                res.add(node.val);
                if(node.left!=null) q.offer(node.left);
                if(node.right!=null) q.offer(node.right);
            }
        }
        return res;
    }
}
```
### 24. 二叉搜索树的后序遍历序列
输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则返回 true ,否则返回 false 。假设输入的数组的任意两个数字都互不相同。

思路：倒序输出的时候是：根→右→左，其中左子节点的值恒小于根和右，于是便有遍历满足条件：①递增时候无任何问题，②递减时候要求必须小于以前所有数。依次为条件，先遍历入栈，再在递减时出栈对比即可。
```
public class Solution{
    public boolean VerifySquenceOfBST(int [] sequence) {
        if(sequence==null||sequence.length==0) return false;
        Stack<Integer> s = new Stack<>();
        int root = Integer.MAX_VALUE;
        for(int i=sequence.length-1;i>=0;i--){
            if(sequence[i]>root) return false;
            while(!s.isEmpty()&&s.peek()>sequence[i]){
                root = s.pop();
            }
            s.add(sequence[i]);
        }
        return true;
    }
}
```
### 25. 二叉树中和为某值的路径
输入一颗二叉树的根节点root和一个整数expectNumber，找出二叉树中结点值的和为expectNumber的所有路径。
- 该题路径定义为从树的根结点开始往下一直到叶子结点所经过的结点
- 叶子节点是指没有子节点的节点
- 路径只能从父节点到子节点，不能从子节点到父节点
- 总节点数目为n

思路：我们从根节点开始向左右子树进行递归，递归函数中需要处理的是：
- 当前的路径path要更新
- 当前的目标值expectNumber要迭代，减去当前节点的值
- 若当前节点是叶子节点，考虑是否满足路径的期待值，并考虑是否将路径添加到返回列表中
```
public class Solution{
    private ArrayList<ArrayList<Integer>> res = new ArrayList<>();
    private ArrayList<Integer> path = new ArrayList<>();
    public ArrayList<ArrayList<Integer>> FindPath (TreeNode root, int target) {
        dfs(root,target);
        return res;
    }
    private void dfs(TreeNode node,int target){
        if(node==null) return;
        path.add(node.val);
        target -= node.val;
        if(node.left==null&&node.right==null&&target==0){
            res.add(new ArrayList<>(path));
        }
        dfs(node.left,target);
        dfs(node.right,target);
        path.remove(path.size()-1);
    }
}
```
### 26. 复杂链表的复制
请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。

思路：创建一个Map集合，存储key为原链表节点，value为复制链表节点。如果Map中存在原链表节点，就直接返回复制链表节点。否则就创建原链表节点的复制链表节点，放入Map中。
迭代查找、设置复制链表节点的next指针和random指针。
```
public class Solution{
    Map<Node,Node> map = new HashMap<>();
    public Node copyRandomList(Node head) {
        if(head == null) return null;
        if(map.containsKey(head)) return map.get(head);
        Node clonenode = new Node(head.val);
        map.put(head,clonenode);
        clonenode.next = copyRandomList(head.next);
        clonenode.random = copyRandomList(head.random);
        return clonenode;
    }
}
```
### 27. 二叉搜索树转换为双向链表
输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表

思路：二叉搜索树的中序遍历为递增序列。使用中序遍历访问树的各节点 cur ；并在访问每个节点时构建 cur 和前驱节点 pre 的引用指向；中序遍历完成后，最后构建头节点和尾节点的引用指向即可。
```
public class Solution{
    Node pre, head;
    public Node treeToDoublyList(Node root) {
        if(root == null) return null;
        dfs(root);
        head.left = pre;
        pre.right = head;
        return head;
    }
    void dfs(Node cur) {
        if(cur == null) return;
        dfs(cur.left);
        if(pre != null) pre.right = cur;
        else head = cur;
        cur.left = pre;
        pre = cur;
        dfs(cur.right);
    }
}
```
### 28. 打印字符串中所有字符的排列
输入一个长度为 n 字符串，打印出该字符串中字符的所有排列，你可以以任意顺序返回这个字符串数组。

思路：回溯思想实现，Set去重
```
public class Solution{
    Set<String> res = new HashSet<>();
    public ArrayList<String> Permutation(String str) {
         boolean[] visited = new boolean[str.length()];
         recursion(str,"",visited);
         ArrayList<String> list = new ArrayList<>(res);
         Collections.sort(list);
        return list;
    }
    public void recursion(String str,String current,boolean[] visited){
        if(str.length()==current.length()){
            res.add(current);
            return;
        }
        for(int i = 0;i<str.length();i++)
        {
          if(!visited[i]){
              current+=str.charAt(i);
              visited[i] = true;
              recursion(str,current,visited);
              current = current.substring(0,current.length()-1);
              visited[i] = false;
            }
        }
    }
}
```
### 29. 数组中出现次数超过一半的数字
给一个长度为 n 的数组，数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。

思路：摩尔投票，每次将两个不同的元素进行「抵消」，如果最后有元素剩余，则「可能」为元素个数大于总数一半的那个。
```
public class Solution{
    public int MoreThanHalfNum_Solution (int[] numbers) {
        int n=numbers.length;
        int x=-1,cnt=0;
        for(int i:numbers){
            if(cnt==0){
                x=i;
                cnt=1;
            }else{
                cnt += x==i ? 1:-1;
            }
        }
        cnt=0;
        for(int i:numbers) if(x==i) cnt++;
        return cnt>n/2?x:-1;
    }
}
```
### 30. 找出最小的K个数
给定一个长度为 n 的可能有重复值的数组，找出其中不去重的最小的 k 个数。例如数组元素是4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4(任意顺序皆可)。

思路：优先队列（大根堆）
```
public class Solution{
    public int[] smallestK(int[] arr, int k) {
        PriorityQueue<Integer> q = new PriorityQueue<>((a,b)->b-a);
        int[] res = new int[k];
        if(k==0) return res;
        for(int i:arr){
            if(q.size()==k&&q.peek()<=i) continue;
            if(q.size()==k) q.poll();
            q.add(i);
        }
        for(int i=0;i<k;i++) res[i]=q.poll();
        return res;
    }
}
```
### 31. 连续子数组的最大和
思路：维护一个最小前缀和，和当前前缀和，相减就是最大和的连续子数组。
```
public class Solution{
    public int FindGreatestSumOfSubArray (int[] array) {
        if(array==null||array.length==0) return 0;
        int precurr=0;
        int premin=0;
        int maxsum=array[0];
        for(int i:array){
            precurr += i;
            maxsum = Math.max(maxsum,precurr-premin);
            premin=Math.min(precurr,premin);
        }
        return maxsum;
    }
}
```
### 32. 从1到整数n中1出现的次数
输入一个整数 n ，求 1～n 这 n 个整数的十进制表示中 1 出现的次数
例如， 1~13 中包含 1 的数字有 1 、 10 、 11 、 12 、 13 因此共出现 6 次

思路：数字都是由位数构成的，某一位上1的个数都是固定的，以百位上的1为例，对于100-199，百位上一共出现100个，1100-1199也出现100个.
因此，每过1000个数就会出现100个百位上的1，于是就是`⌊n/1000⌋∗100`，细分一下
- 对于`n%1000<100`,百位上不会出现1
- 当`100<=n%1000<200`，百位上出现`n%1000-100+1`个1
- 当`n%1000>=200`,百位上出现100个1

因此可以得出结论 $\left\lfloor \frac{n}{10^{i+1}} \right\rfloor \times 10^i + \min\left( \max\left( n \% 10^{i+1} - 10^i \right) \right)$,公式中$10^i$表示第i位，前半部分表示完整在循环中的，后半部分表示需要讨论的。
```
public class Solution{
    public int NumberOf1Between1AndN_Solution(int n) {
        int res=0;
        long mulbase=1;
        for(int i=0;mulbase<=n;i++){
            res += Math.floor(n/(mulbase*10))*mulbase+Math.min(Math.max(n%(mulbase*10)-mulbase+1,(long)0),mulbase);
            mulbase *= 10;
        }
        return res;
    }
}
```
### 33. 把数组中的数排成一个最小的数
输入一个非负整数数组numbers，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。

思路：考虑组装数字的顺序使其最小，只考虑首字符的大小不可靠，但是如果字符串a拼接b的得到的数字大于b拼接a，那么肯定b应该排在a的前面，因此重载排序的方法即可。
```
public class Solution{
    public String PrintMinNumber (int[] numbers) {
        if(numbers==null||numbers.length==0) return "";
        String[] nums = new String[numbers.length];
        for(int i=0;i<numbers.length;i++){
            nums[i] = numbers[i]+"";
        }
        Arrays.sort(nums,new Comparator<String>(){
            public int compare(String s1,String s2){
                return (s1+s2).compareTo(s2+s1);
            }
        });
        StringBuilder sb = new StringBuilder();
        for(int i=0;i<nums.length;i++){
            sb.append(nums[i]);
        }
        return sb.toString();
    }
}
```
### 34. 求第N个丑数


思路：应维护三个指针i2、i3、i5（初始均为 0），指向已生成的丑数数组dp的索引，每次取dp[i2]*2、dp[i3]*3、dp[i5]*5的最小值作为新丑数，并移动对应指针。
```
public class Solution{
    public int GetUglyNumber_Solution (int n) {
        if(n==0) return 0;
        int[] dp = new int[n];
        dp[0]=1;
        int a=0,b=0,c=0;
        for(int i=1;i<n;i++){
            int p2 =dp[a]*2;
            int p3 =dp[b]*3;
            int p5 =dp[c]*5;
            dp[i] = Math.min(p2,Math.min(p3,p5));
            if(dp[i]==p2) a++;
            if(dp[i]==p3) b++;
            if(dp[i]==p5) c++;
        }
        return dp[n-1];
    }
}
```
### 35. 第一个出现一次的字符
思路：哈希表存储每个字符出现的次数，遍历每个字符，返回哈希表中第一个字符出现次数为1的字符索引。
```
public class Solution{
    public int FirstNotRepeatingChar (String str) {
        if(str==null||str.length()==0) return -1;
        HashMap<Character,Integer> map = new HashMap<>();
        for(char c:str.toCharArray()){
            map.put(c,map.getOrDefault(c,0)+1);
        }
        for(int i=0;i<str.length();i++){
            if(map.get(str.charAt(i))==1){
                return i;
            }
        }
        return -1;
    }
}
```
### 36. 数组中逆序对的个数
在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组,求出这个数组中的逆序对的总数P。并将P对1000000007取模的结果输出。 即输出P mod 1000000007

思路：归并排序，首先将数组分成两个子数组，在递归继续划分，知道数组中元素个数为1，当我们从下从上合并时，就可以通过比较左右
两个数的大小来统计逆序对。对于已经排好序的两组，如果右边的元素小于左边第一个元素，那么逆序对的个数就增加左边数组的元素个数。
如果右边的元素大于左边最后一个元素，就没有逆序对。可以减少运算次数。将排序好的序列合并，累计逆序对。
```
public class Solution{
    private int mod = 1000000007;
    public int InversePairs (int[] nums) {
        int n = nums.length;
        int[] temp = new int[n];
        return mergeSort(0,n-1,nums,temp);
    }
    public int mergeSort(int left,int right,int[] nums,int[] temp){
        if(left>=right) return 0;
        int mid = left + (right-left)/2;
        int res = mergeSort(left,mid,nums,temp)+mergeSort(mid+1,right,nums,temp);
        res %= mod;
        int i=left;
        int j=mid+1;
        for(int k=left;k<=right;k++){
            temp[k]=nums[k];
        }
        for(int k=left;k<=right;k++){
            if(i==mid+1){
                nums[k]=temp[j++];
            }else if(j==right+1||temp[i]<=temp[j]){
                nums[k] = temp[i++];
            }else{
                nums[k] = temp[j++];
                res += mid-i+1;
            }
        }
        return res%mod;
    }
}
```
### 37. 两个链表的第一个公共节点
输入两个无环的单向链表，找出它们的第一个公共结点，如果没有公共节点则返回空。（注意因为传入数据是链表，所以错误测试数据的提示是用其他方式显示的，保证传入数据是正确的）

思路：两个指针，同样的速度，走完同样长度（链表1+链表2），不管两条链表有无相同节点，都能够到达相同的节点或者同时到达终点。
```
public class Solution{
    public ListNode FindFirstCommonNode(ListNode pHead1, ListNode pHead2) {
        ListNode l1 = pHead1, l2 = pHead2;
        while(l1 != l2){
            l1 = (l1==null)?pHead2:l1.next;
            l2 = (l2==null)?pHead1:l2.next;
        }
        return l1;
    }
}
```
### 38. 数字在排序数组中出现的次数
给定一个长度为 n 的非降序数组和一个非负数整数 k ，要求统计 k 在数组中出现的次数

思路：通过二分法找到k出现的左边界和右边界，相减即可
```
public class Solution{
    public int GetNumberOfK (int[] nums, int k) {
        if(nums==null||nums.length==0) return 0;
        return (rightnumber(nums,k)==-1)||(leftnumber(nums,k)==-1)?0:rightnumber(nums,k)-leftnumber(nums,k)+1;
    }
    public int leftnumber(int[] nums,int k){
        int l=0,r=nums.length-1;
        int res=-1;
        while(l<=r){
            int mid=l+(r-l)/2;
            if(nums[mid]>=k){
                r=mid-1;
            }else{
                l=mid+1;
            }
            if(nums[mid]==k) res=mid;
        }
        return res;
    }
    public int rightnumber(int[] nums,int k){
        int l=0,r=nums.length-1;
        int res=-1;
        while(l<=r){
            int mid=l+(r-l)/2;
            if(nums[mid]<=k){
                l=mid+1;
            }else{
                r=mid-1;
            }
            if(nums[mid]==k) res=mid;
        }
        return res;
    }
}
```
### 39. 二叉树的深度
思路:DFS（深度优先搜索）
```
public class Solution{
    public int TreeDepth(TreeNode root) {
        if(root==null) return 0;
        int left = TreeDepth(root.left);
        int right = TreeDepth(root.right);
        return Math.max(left,right)+1;
    }
}
```
### 40. 数组中只出现一次的两个数，而其他数都出现两次。
一个整型数组里除了两个数字只出现一次，其他的数字都出现了两次。请写程序找出这两个只出现一次的数字。

思路：异或运算，相同的数字会抵消掉，因此数组中的所有数字做异或操作就可以得到只出现一次的两个数的异或和。
对于两个异或的数的结果，可以根据第一个为1的二进制位来分辨两个不同的数，找到这个二进制位。
因此当求出所有数字的异或值后，遍历数组，根据每个数与该位的值与运算来将两个数分成两堆，对每一堆的数做异或，就可以分别得到这两个数。
```
public class Solution{
    public int[] FindNumsAppearOnce (int[] nums) {
        int res1=0;
        int res2=0;
        int temp=0;
        for(int num:nums){
            temp ^= num;
        }
        int k=1;
        while((k&temp)==0){
            k<<=1;
        }
        for(int num:nums){
            if((k&num)==0) res1 ^= num;
            else res2 ^= num;
        }
        return res1<res2?new int[]{res1,res2}:new int[]{res2,res1};
    }
}
```