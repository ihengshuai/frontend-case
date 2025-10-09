import{S as i,a as u,B as p,M as d,b as h,P as b,W as f}from"./three-BTgjnmg8.js";import{u as w}from"./index-PIROj617.js";import{u as C,a as x}from"./use-axeshelper-VDB1C6Km.js";import{d as S,o as M}from"./vue-COdKRjzD.js";import"./index.CZ3f-b.js";import"./antd-CXXDDKC_.js";import"./dynamic-import-helper-BheWnx7M.js";import"./OrbitControls-DY0Wr2xe.js";const k=S({name:"ThreeJSOrbitControl",setup(){const{elemState:e}=w();function s(){const r=new i;r.background=new u(0);const m=new p(100,100,100),l=new d({color:"#f40",transparent:!0,opacity:.7,wireframe:!1}),n=new h(m,l);r.add(n);const t=new b(90,e.w/e.h,.1,3e3);t.position.set(200,100,200),t.lookAt(n.position);const c=C(t,e.elem,{maxDistance:1e3,minDistance:100,enableDamping:!0,dampingFactor:.1,maxPolarAngle:Math.PI/2.5,minPolarAngle:Math.PI/4});x(r);const o=new f;o.setSize(e.w,e.h),o.render(r,t),e.elem.appendChild(o.domElement);function a(){requestAnimationFrame(a),o.render(r,t),c.update()}a()}return M(s),()=>null}}),B=`import * as Three from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { defineComponent, onMounted } from "vue";
import { useAxesHelper, useMountElement, useOrbitControls } from "../helper";

const ThreeJSOrbitControl = defineComponent({
  name: "ThreeJSOrbitControl",
  setup() {
    const { elemState } = useMountElement();

    function launch() {
      // 1. 创建场景
      const scene = new Three.Scene();
      scene.background = new Three.Color(0x000000);

      // 2. 创建物体
      // 创建几何体
      const boxGeometry = new Three.BoxGeometry(100, 100, 100);
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
      camera.position.set(200, 100, 200);
      camera.lookAt(box.position);

      // 创建控制器
      const controls = useOrbitControls(camera, elemState.elem!); // 封装hooks
      // const controls = new OrbitControls(camera, elemState.elem!);
      // // controls.autoRotate = true;
      // controls.dampingFactor = 0.1;
      // controls.enableDamping = true; // 阻尼
      // // controls.enablePan = false; // 是否可以拖拽相机
      // controls.maxDistance = 1000; // 缩放的最远距离
      // controls.minDistance = 100; // 缩放的最近距离
      // controls.update();

      // 坐标轴
      useAxesHelper(scene);

      // 4. 创建渲染器
      const renderer = new Three.WebGLRenderer();
      renderer.setSize(elemState.w!, elemState.h!);
      renderer.render(scene, camera);

      // 挂载
      elemState.elem!.appendChild(renderer.domElement);

      // 采用requestAnimationFrame的原因是
      // 使用了 OrbitControls 后，拖动、滚动、缩放会改变相机参数
      // 所以循环渲染
      function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        controls.update();
      }

      render();
    }

    onMounted(launch);

    return () => null;
  },
});
`;export{k as default,B as sourceCode};
