import{W as e}from"./WebGL-CX0sXxDC.js";import{a as o}from"./antd-CXXDDKC_.js";import{d as r,o as a}from"./vue-COdKRjzD.js";const u=r({name:"ThreeJSBase1",setup(){function s(){if(e.isWebGLAvailable())o.success("支持...");else{const n=e.getWebGLErrorMessage();console.warn("warning",n)}}return a(s),()=>null}}),c=`// @ts-ignore
import WebGL from "three/addons/capabilities/WebGL.js";

const ThreeJSBase1 = defineComponent({
  name: "ThreeJSBase1",
  setup() {
    function isSupport() {
      if (WebGL.isWebGLAvailable()) {
        message.success("支持...");
        // 开始渲染...
      } else {
        const warning = WebGL.getWebGLErrorMessage();
        console.warn("warning", warning);
      }
    }

    onMounted(isSupport);

    return () => <div>判断浏览器支持</div>;
  },
});
`;export{u as default,c as sourceCode};
