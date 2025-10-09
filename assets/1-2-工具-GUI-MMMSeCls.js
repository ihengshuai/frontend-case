import{S as c,a as u,P as p,B as h,M as f,b as x,W as w}from"./three-BTgjnmg8.js";import{u as b}from"./index-PIROj617.js";import{a as G,u as S}from"./use-axeshelper-VDB1C6Km.js";import{g as C}from"./lil-gui.module.min-Vka56b52.js";import{b as d,d as g,o as U}from"./vue-COdKRjzD.js";import"./index.CZ3f-b.js";import"./antd-CXXDDKC_.js";import"./dynamic-import-helper-BheWnx7M.js";import"./OrbitControls-DY0Wr2xe.js";function M(e){const o=new C(e);return d(()=>{o.destroy()}),o}const v=g({name:"ThreeJSGUI",setup(){const{elemState:e}=b(),o=M();function i(){const n=new c;n.background=new u(3355443);const r=new p(60,e.w/e.h,1,1e3);r.position.set(100,10,200),r.lookAt(0,0,0),n.add(r);const l=new h(60,60,60),s=new f({color:16776960}),t=new x(l,s);n.add(t);const a=new w;a.setSize(e.w,e.h),a.render(n,r),e.elem.appendChild(a.domElement),G(n),S(r,e.elem),o.title("坐标测试").add(t.position,"x",-100,100,1).name("x坐标"),o.add(t.position,"y",-100,100,1).name("y坐标"),o.add(t.position,"z",-100,100,1).name("z坐标"),o.addFolder("颜色测试").addColor(s,"color").name("颜色");function m(){requestAnimationFrame(m),a.render(n,r)}m()}return U(i),d(()=>{o.destroy()}),()=>null}}),H=`// import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";
import * as Three from "three";
import { defineComponent, onMounted, onUnmounted } from "vue";
import { useAxesHelper, useGUI, useMountElement, useOrbitControls } from "../helper";

const ThreeJSGUI = defineComponent({
  name: "ThreeJSGUI",
  setup() {
    const { elemState } = useMountElement();
    // const gui = new GUI();
    const gui = useGUI();

    function launch() {
      // 1. 创建场景
      const scene = new Three.Scene();
      scene.background = new Three.Color(0x333333);

      // 2. 创建相机
      const camera = new Three.PerspectiveCamera(60, elemState.w! / elemState.h!, 1, 1000);
      camera.position.set(100, 10, 200);
      camera.lookAt(0, 0, 0);
      scene.add(camera);

      // 3. 创建物体
      const boxGeometry = new Three.BoxGeometry(60, 60, 60);
      const material = new Three.MeshBasicMaterial({
        color: 0xffff00,
      });
      const box = new Three.Mesh(boxGeometry, material);
      scene.add(box);

      // 4. 创建渲染器
      const renderer = new Three.WebGLRenderer();
      renderer.setSize(elemState.w!, elemState.h!);
      renderer.render(scene, camera);

      elemState.elem!.appendChild(renderer.domElement);

      // 辅助工具
      useAxesHelper(scene);
      useOrbitControls(camera, elemState.elem!);

      // 创建GUI
      // const gui = new GUI();
      gui.title("坐标测试").add(box.position, "x", -100, 100, 1).name("x坐标");
      gui.add(box.position, "y", -100, 100, 1).name("y坐标");
      gui.add(box.position, "z", -100, 100, 1).name("z坐标");

      const colorFolder = gui.addFolder("颜色测试");
      colorFolder.addColor(material, "color").name("颜色");

      function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
      }

      render();
    }

    onMounted(launch);

    onUnmounted(() => {
      gui.destroy();
    });

    return () => null;
  },
});
`;export{v as default,H as sourceCode};
