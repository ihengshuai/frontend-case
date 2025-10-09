import{d,o as h,k as a}from"./vue-COdKRjzD.js";const l=d({name:"ChatGPTTyping",setup(){function i(t,n){let o=0;t.innerHTML="";function e(){o<n.length*2?setTimeout(()=>{const r=Math.floor(Math.random()*n.length),c=n[r];t.innerHTML+=c,t.scrollTop=t.scrollHeight,o++,e()},10+Math.random()*200):setTimeout(()=>{t.innerHTML+="<br>"},500)}e()}const s=`
        我是人工智能助手ChatGPT。我可以帮助你回答问题、提供信息和进行对话。
        你可以问我任何你感兴趣的问题，我会尽力为你提供详细的解答。
        例如，你可以问我关于科技、历史、文化、科学、数学、编程等方面的知识。
        我还可以帮助你完成一些任务，比如编写代码片段、解释技术概念或者提供建议。
        请告诉我你需要什么帮助！
    `;return h(()=>{const t=document.getElementById("chat-output");i(t,s)}),()=>a("div",{class:"chatgpt-typing"},[a("div",{id:"chat-output"},null)])}});export{l as default};
