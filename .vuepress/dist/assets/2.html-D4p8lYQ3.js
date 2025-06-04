import{_ as n,c as a,a as e,o as l}from"./app-CkTMiQGE.js";const i={};function p(t,s){return l(),a("div",null,s[0]||(s[0]=[e(`<h2 id="手动部署" tabindex="-1"><a class="header-anchor" href="#手动部署"><span>手动部署</span></a></h2><p>打开项目设置的 <code>GitHub Pages</code> 模块，将 <code>Source</code> 设置为 <code>gh-pages</code>，这样我们就可以将博客项目放在 <code>master</code> 分支，而部署到 <code>gh-pages</code> 分支。</p><p>在根目录建一个 <code>deploy.sh</code> 文件：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 确保脚本抛出遇到的错误</span></span>
<span class="line"><span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 生成静态文件</span></span>
<span class="line"><span class="token function">npm</span> run docs:build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 进入生成的文件夹</span></span>
<span class="line"><span class="token builtin class-name">cd</span> docs/.vuepress/dist</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 如果是发布到自定义域名</span></span>
<span class="line"><span class="token comment"># echo &#39;www.example.com&#39; &gt; CNAME</span></span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> init</span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;deploy&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 如果发布到 https://&lt;USERNAME&gt;.github.io</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-f</span> git@github.com:<span class="token operator">&lt;</span>USERNAME<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>USERNAME<span class="token operator">&gt;</span>.github.io.git master</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 如果发布到 https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-f</span> git@github.com:<span class="token operator">&lt;</span>USERNAME<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>REPO<span class="token operator">&gt;</span>.git master:gh-pages</span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">cd</span> -</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你用的 <code>MAC</code>，在项目根目录借助 终端 执行 <code>bash deploy.sh</code> 即可；如果你使用的是 WINDOWS，在项目根目录借助 <code>Git Bash</code> 执行 <code>bash deplo.sh</code> 即可。</p><p><strong>对于自动部署，等后面找到合适简洁的操作再更新</strong></p>`,6)]))}const o=n(i,[["render",p]]),d=JSON.parse('{"path":"/blogs/zatan/2.html","title":"使用github pages部署vuepress搭建的博客","lang":"en-US","frontmatter":{"title":"使用github pages部署vuepress搭建的博客","date":"2025/01/09","tags":["blogs"],"categories":["科技杂谈"]},"headers":[{"level":2,"title":"手动部署","slug":"手动部署","link":"#手动部署","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"filePathRelative":"blogs/zatan/2.md"}');export{o as comp,d as data};
