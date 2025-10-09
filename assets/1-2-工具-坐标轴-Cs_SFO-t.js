import{S as l,a as i,c as d,M as p,b as f,P as h,A as u,W as x}from"./three-BTgjnmg8.js";import{u as w}from"./index-PIROj617.js";import{d as S,o as M}from"./vue-COdKRjzD.js";import"./index.CZ3f-b.js";import"./antd-CXXDDKC_.js";import"./dynamic-import-helper-BheWnx7M.js";const H=S({name:"ThreeJSAxes",setup(){const{elemState:e}=w();function s(){const r=new l;r.background=new i(0);const m=new d(100,30,30),c=new p({color:"#f40",transparent:!0,opacity:.7,wireframe:!1}),t=new f(m,c);r.add(t);const n=new h(90,e.w/e.h,.1,3e3);n.position.set(100,150,300),n.lookAt(t.position),r.add(n);const a=new u(300);a.setColors(16711680,65280,255),r.add(a);const o=new x;o.setSize(e.w,e.h),o.render(r,n),e.elem.appendChild(o.domElement)}return M(s),()=>null}}),E=`import { defineComponent, onMounted } from "vue";
import * as Three from "three";
import { useMountElement } from "../helper";

const ThreeJSAxes = defineComponent({
  name: "ThreeJSAxes",
  setup() {
    const { elemState } = useMountElement();

    function launch() {
      // 1. 创建场景
      const scene = new Three.Scene();
      scene.background = new Three.Color(0x000000);

      // 2. 创建物体
      // 创建几何体
      const boxGeometry = new Three.SphereGeometry(100, 30, 30);
      // 创建材质
      const material = new Three.MeshBasicMaterial({
        color: "#f40",
        transparent: true,
        opacity: 0.7,
        wireframe: false,
      });
      // 创建物体
      const box = new Three.Mesh(boxGeometry, material);
      scene.add(box);

      // 3. 创建相机
      // 透视镜
      const camera = new Three.PerspectiveCamera(90, elemState.w! / elemState.h!, 0.1, 3000);
      camera.position.set(100, 150, 300);
      camera.lookAt(box.position);
      scene.add(camera);

      // 坐标轴
      const axesHelper = new Three.AxesHelper(300);
      // 设置坐标轴颜色
      axesHelper.setColors(0xff0000, 0x00ff00, 0x0000ff);
      scene.add(axesHelper);

      // 4. 创建渲染器
      const renderer = new Three.WebGLRenderer();
      renderer.setSize(elemState.w!, elemState.h!);
      renderer.render(scene, camera);

      // 5. 挂载
      elemState.elem!.appendChild(renderer.domElement);
    }

    onMounted(launch);

    return () => null;
  },
});`;export{H as default,E as sourceCode};
