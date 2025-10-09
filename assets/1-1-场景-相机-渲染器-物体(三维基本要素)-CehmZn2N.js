import{S as m,a as c,B as l,M as d,b as p,P as h,W as u}from"./three-BTgjnmg8.js";import{u as w}from"./index-PIROj617.js";import{d as S,o as f}from"./vue-COdKRjzD.js";import"./index.CZ3f-b.js";import"./antd-CXXDDKC_.js";import"./dynamic-import-helper-BheWnx7M.js";const G=S({name:"ThreeJSScene",setup(){const{elemState:e}=w();let t;const o=new m;function a(){o.background=new c(0);const s=new l(100,100,100),i=new d({color:"#f40",transparent:!0,opacity:.7,wireframe:!1}),r=new p(s,i);o.add(r),r.position.set(100,0,0),t=new h(90,e.w/e.h,.1,3e3),t.position.set(200,100,200),t.lookAt(r.position);let n=new u({antialias:!0});n.setSize(e.w,e.h),n.setPixelRatio(window.devicePixelRatio),n.render(o,t),e.elem.appendChild(n.domElement)}return f(a),()=>null}}),v=`
import { defineComponent, onMounted } from "vue";
import * as Three from "three";
import { useMountElement } from "../helper";

const ThreeJSScene = defineComponent({
  name: "ThreeJSScene",
  setup() {
    const { elemState } = useMountElement();
    let camera: Three.PerspectiveCamera;

    // 1. 创建场景
    const scene: Three.Scene = new Three.Scene();

    function launch() {
      scene.background = new Three.Color(0x000000);

      // 2. 创建场景对象
      // 创建几何体
      const boxGeometry = new Three.BoxGeometry(100, 100, 100);
      // 创建材质
      const material = new Three.MeshBasicMaterial({
        color: "#f40",
        wireframe: false,
      });
      // 创建物体
      const box = new Three.Mesh(boxGeometry, material);
      // 将物体添加到场景中
      scene.add(box);
      // 设置物体坐标
      box.position.set(100, 0, 0);

      // 3. 创建相机
      // 创建透视镜
      camera = new Three.PerspectiveCamera(90, elemState.w! / elemState.h!, 0.1, 3000);
      // 设置相机位置
      camera.position.set(200, 100, 200);
      // 设置相机对准点
      camera.lookAt(box.position);

      // 4. 创建渲染器
      let renderer = new Three.WebGLRenderer({ antialias: true });
      renderer.setSize(elemState.w!, elemState.h!);
      renderer.setPixelRatio(window.devicePixelRatio);

      // 5. 渲染舞台、相机
      renderer.render(scene, camera);
      // 将渲染器节点挂载到dom上
      elemState.elem!.appendChild(renderer.domElement);
    }

    onMounted(launch);

    return () => null;
  },
});
`;export{G as default,v as sourceCode};
