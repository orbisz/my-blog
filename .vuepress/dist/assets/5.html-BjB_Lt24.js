import{_ as a,c as t,a as r,b as s,d as i,e as l,r as d,o as p}from"./app-Dg3iwL4C.js";const c={},m={href:"https://leetcode.cn/problems/search-insert-position/description/?envType=study-plan-v2&envId=top-100-liked",target:"_blank",rel:"noopener noreferrer"},v={href:"https://leetcode.cn/problems/search-in-rotated-sorted-array/?envType=study-plan-v2&envId=top-100-liked",target:"_blank",rel:"noopener noreferrer"},u={href:"https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/?envType=study-plan-v2&envId=top-100-liked",target:"_blank",rel:"noopener noreferrer"};function o(b,n){const e=d("ExternalLinkIcon");return p(),t("div",null,[n[3]||(n[3]=r(`<p>二分查找法（Binary Search）是一种高效的搜索算法，其核心思想是将搜索范围每次缩小一半，从而显著降低时间复杂度。</p><p><strong>基本原理</strong></p><p>要求数据结构已排序（如升序数组）。</p><ul><li><strong>确定搜索区间</strong>：初始时覆盖整个数组。</li><li>计算中间点：取区间中间位置的元素。</li><li><strong>比较中间元素</strong>： <ul><li>若中间元素等于目标值，返回位置。</li><li>若中间元素大于目标值，说明目标在左半区间，更新右边界。</li><li>若中间元素小于目标值，说明目标在右半区间，更新左边界。</li></ul></li><li>重复步骤 2-3，直到找到目标值或区间为空。</li></ul><p><strong>复杂度</strong></p><p>时间复杂度：<code>O(logn)</code></p><p><strong>代码模板</strong> 查找目标值</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">int binarySearch(int[] nums, int target) {</span>
<span class="line">int left = 0;</span>
<span class="line">int right = nums.length - 1;</span>
<span class="line"></span>
<span class="line">    while (left &lt;= right) {</span>
<span class="line">        int mid = left + (right - left) / 2;  // 防止整数溢出</span>
<span class="line">        if (nums[mid] == target) {</span>
<span class="line">            return mid;  // 找到目标值</span>
<span class="line">        } else if (nums[mid] &gt; target) {</span>
<span class="line">            right = mid - 1;  // 目标在左半区间</span>
<span class="line">        } else {</span>
<span class="line">            left = mid + 1;  // 目标在右半区间</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">    return -1;  // 未找到目标值</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查找元素第一次出现的位置</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public int searchleft(int[] nums, int target){</span>
<span class="line">        int l=0,r=nums.length-1;</span>
<span class="line">        int res=-1;</span>
<span class="line">        while(l&lt;=r){</span>
<span class="line">            int mid = l+(r-l)/2;</span>
<span class="line">            if(nums[mid]&gt;=target){</span>
<span class="line">                r=mid-1;</span>
<span class="line">            }else{</span>
<span class="line">                l=mid+1;</span>
<span class="line">            }</span>
<span class="line">            if(nums[mid]==target) res=mid;</span>
<span class="line">        }</span>
<span class="line">        return res;</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查找元素最后一次出现的位置</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">public int searchright(int[] nums,int target){</span>
<span class="line">        int l=0,r=nums.length-1;</span>
<span class="line">        int res=-1;</span>
<span class="line">        while(l&lt;=r){</span>
<span class="line">            int mid = l+(r-l)/2;</span>
<span class="line">            if(nums[mid]&lt;=target){</span>
<span class="line">                l=mid+1;</span>
<span class="line">            }else{</span>
<span class="line">                r=mid-1;</span>
<span class="line">            }</span>
<span class="line">            if(nums[mid]==target) res=mid;</span>
<span class="line">        }</span>
<span class="line">        return res;</span>
<span class="line">    }</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>例题</strong>：</p>`,13)),s("p",null,[s("a",m,[n[0]||(n[0]=i("搜索插入位置")),l(e)]),s("a",v,[n[1]||(n[1]=i("搜索排序数组")),l(e)]),s("a",u,[n[2]||(n[2]=i("寻找排序数组最小值")),l(e)])])])}const h=a(c,[["render",o]]),f=JSON.parse('{"path":"/blogs/suanfati/5.html","title":"二分法","lang":"en-US","frontmatter":{"title":"二分法","date":"2024/04/18","tags":["Java"],"categories":["算法"]},"headers":[],"git":{"createdTime":1749099634000,"updatedTime":1749099634000,"contributors":[{"name":"zxy","email":"zxy0613zxy@outlook.com","commits":1}]},"filePathRelative":"blogs/suanfati/5.md"}');export{h as comp,f as data};
