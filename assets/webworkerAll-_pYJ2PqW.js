var Je=Object.defineProperty;var ne=Object.getOwnPropertySymbols;var Ze=Object.prototype.hasOwnProperty,et=Object.prototype.propertyIsEnumerable;var se=(a,e,t)=>e in a?Je(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,R=(a,e)=>{for(var t in e||(e={}))Ze.call(e,t)&&se(a,t,e[t]);if(ne)for(var t of ne(e))et.call(e,t)&&se(a,t,e[t]);return a};var U=(a,e,t)=>new Promise((r,n)=>{var i=u=>{try{o(t.next(u))}catch(l){n(l)}},s=u=>{try{o(t.throw(u))}catch(l){n(l)}},o=u=>u.done?r(u.value):Promise.resolve(u.value).then(i,s);o((t=t.apply(a,e)).next())});import{E as p,U as tt,T as ie,F as rt,G as xe,v as _e,M as w,l as B,d as be,I as T,t as F,a7 as $,R as Q,w as H,H as ye,a4 as I,a5 as ve,c as D,B as P,D as J,S as E,y as V,ae as nt,af as Z,L as K,ag as k,s as ee,a0 as st,$ as N,n as Te,q as Pe,a9 as we,ac as Ce,o as it,p as at,aa as ot,ab as ut,ad as lt,ah as ct,ai as dt,aj as ht,ak as j,al as ft,am as pt,m as Se,an as ae,ao as Y,e as b,ap as mt}from"./base-CNpXHWvX.js";import{c as W,a as gt,b as xt,B as Fe}from"./colorToUniform-BCOWJuGW.js";import"./index.CZ3f-b.js";import"./vue-COdKRjzD.js";import"./antd-CXXDDKC_.js";class Re{static init(e){Object.defineProperty(this,"resizeTo",{set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let t,r;if(this._resizeTo===globalThis.window)t=globalThis.innerWidth,r=globalThis.innerHeight;else{const{clientWidth:n,clientHeight:i}=this._resizeTo;t=n,r=i}this.renderer.resize(t,r),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener("resize",this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}Re.extension=p.Application;class Ue{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,tt.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?ie.shared:new ie,e.autoStart&&this.start()}static destroy(){if(this._ticker){const e=this._ticker;this.ticker=null,e.destroy()}}}Ue.extension=p.Application;var _t=`in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,bt=`in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
void main() {
    finalColor = texture(uTexture, vTextureCoord);
}
`,oe=`struct GlobalFilterUniforms {
  uInputSize: vec4<f32>,
  uInputPixel: vec4<f32>,
  uInputClamp: vec4<f32>,
  uOutputFrame: vec4<f32>,
  uGlobalFrame: vec4<f32>,
  uOutputTexture: vec4<f32>,
};

@group(0) @binding(0) var <uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler: sampler;

struct VSOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>
};

fn filterVertexPosition(aPosition: vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0 * gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord(aPosition: vec2<f32>) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

@vertex
fn mainVertex(
  @location(0) aPosition: vec2<f32>,
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
) -> @location(0) vec4<f32> {
    return textureSample(uTexture, uSampler, uv);
}
`;class yt extends rt{constructor(){const e=xe.from({vertex:{source:oe,entryPoint:"mainVertex"},fragment:{source:oe,entryPoint:"mainFragment"},name:"passthrough-filter"}),t=_e.from({vertex:_t,fragment:bt,name:"passthrough-filter"});super({gpuProgram:e,glProgram:t})}}class Be{constructor(e){this._renderer=e}push(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}Be.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"filter"};const ue=new w;function vt(a,e){var r;e.clear();const t=e.matrix;for(let n=0;n<a.length;n++){const i=a[n];if(i.globalDisplayStatus<7)continue;const s=(r=i.renderGroup)!=null?r:i.parentRenderGroup;s!=null&&s.isCachedAsTexture?e.matrix=ue.copyFrom(s.textureOffsetInverseTransform).append(i.worldTransform):s!=null&&s._parentCacheAsTextureRenderGroup?e.matrix=ue.copyFrom(s._parentCacheAsTextureRenderGroup.inverseWorldTransform).append(i.groupTransform):e.matrix=i.worldTransform,e.addBounds(i.bounds)}return e.matrix=t,e}const Tt=new $({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:2*4,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class Pt{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new ye,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.globalFrame={x:0,y:0,width:0,height:0},this.firstEnabledIndex=-1,this.lastEnabledIndex=-1}}class Ge{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new B({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new be({}),this.renderer=e}get activeBackTexture(){var e;return(e=this._activeFilterData)==null?void 0:e.backTexture}push(e){const t=this.renderer,r=e.filterEffect.filters,n=this._pushFilterData();n.skip=!1,n.filters=r,n.container=e.container,n.outputRenderSurface=t.renderTarget.renderSurface;const i=t.renderTarget.renderTarget.colorTexture.source,s=i.resolution,o=i.antialias;if(r.every(f=>!f.enabled)){n.skip=!0;return}const u=n.bounds;if(this._calculateFilterArea(e,u),this._calculateFilterBounds(n,t.renderTarget.rootViewPort,o,s,1),n.skip)return;const l=this._getPreviousFilterData(),h=this._findFilterResolution(s);let d=0,c=0;l&&(d=l.bounds.minX,c=l.bounds.minY),this._calculateGlobalFrame(n,d,c,h,i.width,i.height),this._setupFilterTextures(n,u,t,l)}generateFilteredTexture({texture:e,filters:t}){const r=this._pushFilterData();this._activeFilterData=r,r.skip=!1,r.filters=t;const n=e.source,i=n.resolution,s=n.antialias;if(t.every(f=>!f.enabled))return r.skip=!0,e;const o=r.bounds;if(o.addRect(e.frame),this._calculateFilterBounds(r,o.rectangle,s,i,0),r.skip)return e;const u=i;this._calculateGlobalFrame(r,0,0,u,n.width,n.height),r.outputRenderSurface=T.getOptimalTexture(o.width,o.height,r.resolution,r.antialias),r.backTexture=F.EMPTY,r.inputTexture=e,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(r,!0);const c=r.outputRenderSurface;return c.source.alphaMode="premultiplied-alpha",c}pop(){const e=this.renderer,t=this._popFilterData();t.skip||(e.globalUniforms.pop(),e.renderTarget.finishRenderPass(),this._activeFilterData=t,this._applyFiltersToTexture(t,!1),t.blendRequired&&T.returnTexture(t.backTexture),T.returnTexture(t.inputTexture))}getBackTexture(e,t,r){const n=e.colorTexture.source._resolution,i=T.getOptimalTexture(t.width,t.height,n,!1);let s=t.minX,o=t.minY;r&&(s-=r.minX,o-=r.minY),s=Math.floor(s*n),o=Math.floor(o*n);const u=Math.ceil(t.width*n),l=Math.ceil(t.height*n);return this.renderer.renderTarget.copyToTexture(e,i,{x:s,y:o},{width:u,height:l},{x:0,y:0}),i}applyFilter(e,t,r,n){const i=this.renderer,s=this._activeFilterData,u=s.outputRenderSurface===r,l=i.renderTarget.rootRenderTarget.colorTexture.source._resolution,h=this._findFilterResolution(l);let d=0,c=0;if(u){const x=this._findPreviousFilterOffset();d=x.x,c=x.y}this._updateFilterUniforms(t,r,s,d,c,h,u,n);const f=e.enabled?e:this._getPassthroughFilter();this._setupBindGroupsAndRender(f,t,i)}calculateSpriteMatrix(e,t){const r=this._activeFilterData,n=e.set(r.inputTexture._source.width,0,0,r.inputTexture._source.height,r.bounds.minX,r.bounds.minY),i=t.worldTransform.copyTo(w.shared),s=t.renderGroup||t.parentRenderGroup;return s&&s.cacheToLocalTransform&&i.prepend(s.cacheToLocalTransform),i.invert(),n.prepend(i),n.scale(1/t.texture.orig.width,1/t.texture.orig.height),n.translate(t.anchor.x,t.anchor.y),n}destroy(){var e;(e=this._passthroughFilter)==null||e.destroy(!0),this._passthroughFilter=null}_getPassthroughFilter(){var e;return(e=this._passthroughFilter)!=null||(this._passthroughFilter=new yt),this._passthroughFilter}_setupBindGroupsAndRender(e,t,r){if(r.renderPipes.uniformBatch){const n=r.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(n,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,r.encoder.draw({geometry:Tt,shader:e,state:e._state,topology:"triangle-list"}),r.type===Q.WEBGL&&r.renderTarget.finishRenderPass()}_setupFilterTextures(e,t,r,n){if(e.backTexture=F.EMPTY,e.inputTexture=T.getOptimalTexture(t.width,t.height,e.resolution,e.antialias),e.blendRequired){r.renderTarget.finishRenderPass();const i=r.renderTarget.getRenderTarget(e.outputRenderSurface);e.backTexture=this.getBackTexture(i,t,n==null?void 0:n.bounds)}r.renderTarget.bind(e.inputTexture,!0),r.globalUniforms.push({offset:t})}_calculateGlobalFrame(e,t,r,n,i,s){const o=e.globalFrame;o.x=t*n,o.y=r*n,o.width=i*n,o.height=s*n}_updateFilterUniforms(e,t,r,n,i,s,o,u){const l=this._filterGlobalUniforms.uniforms,h=l.uOutputFrame,d=l.uInputSize,c=l.uInputPixel,f=l.uInputClamp,x=l.uGlobalFrame,m=l.uOutputTexture;o?(h[0]=r.bounds.minX-n,h[1]=r.bounds.minY-i):(h[0]=0,h[1]=0),h[2]=e.frame.width,h[3]=e.frame.height,d[0]=e.source.width,d[1]=e.source.height,d[2]=1/d[0],d[3]=1/d[1],c[0]=e.source.pixelWidth,c[1]=e.source.pixelHeight,c[2]=1/c[0],c[3]=1/c[1],f[0]=.5*c[2],f[1]=.5*c[3],f[2]=e.frame.width*d[2]-.5*c[2],f[3]=e.frame.height*d[3]-.5*c[3];const g=this.renderer.renderTarget.rootRenderTarget.colorTexture;x[0]=n*s,x[1]=i*s,x[2]=g.source.width*s,x[3]=g.source.height*s,t instanceof F&&(t.source.resource=null);const _=this.renderer.renderTarget.getRenderTarget(t);this.renderer.renderTarget.bind(t,!!u),t instanceof F?(m[0]=t.frame.width,m[1]=t.frame.height):(m[0]=_.width,m[1]=_.height),m[2]=_.isRoot?-1:1,this._filterGlobalUniforms.update()}_findFilterResolution(e){let t=this._filterStackIndex-1;for(;t>0&&this._filterStack[t].skip;)--t;return t>0&&this._filterStack[t].inputTexture?this._filterStack[t].inputTexture.source._resolution:e}_findPreviousFilterOffset(){let e=0,t=0,r=this._filterStackIndex;for(;r>0;){r--;const n=this._filterStack[r];if(!n.skip){e=n.bounds.minX,t=n.bounds.minY;break}}return{x:e,y:t}}_calculateFilterArea(e,t){if(e.renderables?vt(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){const n=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;n&&t.applyMatrix(n)}}_applyFiltersToTexture(e,t){const r=e.inputTexture,n=e.bounds,i=e.filters,s=e.firstEnabledIndex,o=e.lastEnabledIndex;if(this._globalFilterBindGroup.setResource(r.source.style,2),this._globalFilterBindGroup.setResource(e.backTexture.source,3),s===o)i[s].apply(this,r,e.outputRenderSurface,t);else{let u=e.inputTexture;const l=T.getOptimalTexture(n.width,n.height,u.source._resolution,!1);let h=l;for(let d=s;d<o;d++){const c=i[d];if(!c.enabled)continue;c.apply(this,u,h,!0);const f=u;u=h,h=f}i[o].apply(this,u,e.outputRenderSurface,t),T.returnTexture(l)}}_calculateFilterBounds(e,t,r,n,i){var _,S;const s=this.renderer,o=e.bounds,u=e.filters;let l=1/0,h=0,d=!0,c=!1,f=!1,x=!0,m=-1,g=-1;for(let v=0;v<u.length;v++){const y=u[v];if(!y.enabled)continue;if(m===-1&&(m=v),g=v,l=Math.min(l,y.resolution==="inherit"?n:y.resolution),h+=y.padding,y.antialias==="off"?d=!1:y.antialias==="inherit"&&d&&(d=r),y.clipToViewport||(x=!1),!!!(y.compatibleRenderers&s.type)){f=!1;break}if(y.blendRequired&&!((S=(_=s.backBuffer)==null?void 0:_.useBackBuffer)==null||S)){H("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),f=!1;break}f=!0,c||(c=y.blendRequired)}if(!f){e.skip=!0;return}if(x&&o.fitBounds(0,t.width/n,0,t.height/n),o.scale(l).ceil().scale(1/l).pad((h|0)*i),!o.isPositive){e.skip=!0;return}e.antialias=d,e.resolution=l,e.blendRequired=c,e.firstEnabledIndex=m,e.lastEnabledIndex=g}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){let e,t=this._filterStackIndex-1;for(;t>0&&(t--,e=this._filterStack[t],!!e.skip););return e}_pushFilterData(){let e=this._filterStack[this._filterStackIndex];return e||(e=this._filterStack[this._filterStackIndex]=new Pt),this._filterStackIndex++,e}}Ge.extension={type:[p.WebGLSystem,p.WebGPUSystem],name:"filter"};const Me=class ze extends ${constructor(...e){var h;let t=(h=e[0])!=null?h:{};t instanceof Float32Array&&(I(ve,"use new MeshGeometry({ positions, uvs, indices }) instead"),t={positions:t,uvs:e[1],indices:e[2]}),t=R(R({},ze.defaultOptions),t);const r=t.positions||new Float32Array([0,0,1,0,1,1,0,1]);let n=t.uvs;n||(t.positions?n=new Float32Array(r.length):n=new Float32Array([0,0,1,0,1,1,0,1]));const i=t.indices||new Uint32Array([0,1,2,0,2,3]),s=t.shrinkBuffersToFit,o=new D({data:r,label:"attribute-mesh-positions",shrinkToFit:s,usage:P.VERTEX|P.COPY_DST}),u=new D({data:n,label:"attribute-mesh-uvs",shrinkToFit:s,usage:P.VERTEX|P.COPY_DST}),l=new D({data:i,label:"index-mesh-buffer",shrinkToFit:s,usage:P.INDEX|P.COPY_DST});super({attributes:{aPosition:{buffer:o,format:"float32x2",stride:2*4,offset:0},aUV:{buffer:u,format:"float32x2",stride:2*4,offset:0}},indexBuffer:l,topology:t.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(e){this.attributes.aPosition.buffer.data=e}get uvs(){return this.attributes.aUV.buffer.data}set uvs(e){this.attributes.aUV.buffer.data=e}get indices(){return this.indexBuffer.data}set indices(e){this.indexBuffer.data=e}};Me.defaultOptions={topology:"triangle-list",shrinkBuffersToFit:!1};let te=Me;const le="http://www.w3.org/2000/svg",ce="http://www.w3.org/1999/xhtml";class Ae{constructor(){this.svgRoot=document.createElementNS(le,"svg"),this.foreignObject=document.createElementNS(le,"foreignObject"),this.domElement=document.createElementNS(ce,"div"),this.styleElement=document.createElementNS(ce,"style");const{foreignObject:e,svgRoot:t,styleElement:r,domElement:n}=this;e.setAttribute("width","10000"),e.setAttribute("height","10000"),e.style.overflow="hidden",t.appendChild(e),e.appendChild(r),e.appendChild(n),this.image=J.get().createImage()}destroy(){this.svgRoot.remove(),this.foreignObject.remove(),this.styleElement.remove(),this.domElement.remove(),this.image.src="",this.image.remove(),this.svgRoot=null,this.foreignObject=null,this.styleElement=null,this.domElement=null,this.image=null,this.canvasAndContext=null}}let de;function wt(a,e,t,r){r||(r=de||(de=new Ae));const{domElement:n,styleElement:i,svgRoot:s}=r;n.innerHTML=`<style>${e.cssStyle};</style><div style='padding:0'>${a}</div>`,n.setAttribute("style","transform-origin: top left; display: inline-block"),t&&(i.textContent=t),document.body.appendChild(s);const o=n.getBoundingClientRect();s.remove();const u=e.padding*2;return{width:o.width-u,height:o.height-u}}class Ct{constructor(){this.batches=[],this.batched=!1}destroy(){this.batches.forEach(e=>{V.return(e)}),this.batches.length=0}}class De{constructor(e,t){this.state=E.for2d(),this.renderer=e,this._adaptor=t,this.renderer.runners.contextChange.add(this)}contextChange(){this._adaptor.contextChange(this.renderer)}validateRenderable(e){const t=e.context,r=!!e._gpuData,n=this.renderer.graphicsContext.updateGpuContext(t);return!!(n.isBatchable||r!==n.isBatchable)}addRenderable(e,t){const r=this.renderer.graphicsContext.updateGpuContext(e.context);e.didViewUpdate&&this._rebuild(e),r.isBatchable?this._addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add(e))}updateRenderable(e){const r=this._getGpuDataForRenderable(e).batches;for(let n=0;n<r.length;n++){const i=r[n];i._batcher.updateElement(i)}}execute(e){if(!e.isRenderable)return;const t=this.renderer,r=e.context;if(!t.graphicsContext.getGpuContext(r).batches.length)return;const i=r.customShader||this._adaptor.shader;this.state.blendMode=e.groupBlendMode;const s=i.resources.localUniforms.uniforms;s.uTransformMatrix=e.groupTransform,s.uRound=t._roundPixels|e._roundPixels,W(e.groupColorAlpha,s.uColor,0),this._adaptor.execute(this,e)}_rebuild(e){const t=this._getGpuDataForRenderable(e),r=this.renderer.graphicsContext.updateGpuContext(e.context);t.destroy(),r.isBatchable&&this._updateBatchesForRenderable(e,t)}_addToBatcher(e,t){const r=this.renderer.renderPipes.batch,n=this._getGpuDataForRenderable(e).batches;for(let i=0;i<n.length;i++){const s=n[i];r.addToBatch(s,t)}}_getGpuDataForRenderable(e){return e._gpuData[this.renderer.uid]||this._initGpuDataForRenderable(e)}_initGpuDataForRenderable(e){const t=new Ct;return e._gpuData[this.renderer.uid]=t,t}_updateBatchesForRenderable(e,t){const r=e.context,n=this.renderer.graphicsContext.getGpuContext(r),i=this.renderer._roundPixels|e._roundPixels;t.batches=n.batches.map(s=>{const o=V.get(nt);return s.copyTo(o),o.renderable=e,o.roundPixels=i,o})}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null}}De.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"graphics"};const ke=class Oe extends te{constructor(...e){var r;super({});let t=(r=e[0])!=null?r:{};typeof t=="number"&&(I(ve,"PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"),t={width:t,height:e[1],verticesX:e[2],verticesY:e[3]}),this.build(t)}build(e){var d,c,f,x;e=R(R({},Oe.defaultOptions),e),this.verticesX=(d=this.verticesX)!=null?d:e.verticesX,this.verticesY=(c=this.verticesY)!=null?c:e.verticesY,this.width=(f=this.width)!=null?f:e.width,this.height=(x=this.height)!=null?x:e.height;const t=this.verticesX*this.verticesY,r=[],n=[],i=[],s=this.verticesX-1,o=this.verticesY-1,u=this.width/s,l=this.height/o;for(let m=0;m<t;m++){const g=m%this.verticesX,_=m/this.verticesX|0;r.push(g*u,_*l),n.push(g/s,_/o)}const h=s*o;for(let m=0;m<h;m++){const g=m%s,_=m/s|0,S=_*this.verticesX+g,v=_*this.verticesX+g+1,y=(_+1)*this.verticesX+g,C=(_+1)*this.verticesX+g+1;i.push(S,v,y,v,C,y)}this.buffers[0].data=new Float32Array(r),this.buffers[1].data=new Float32Array(n),this.indexBuffer.data=new Uint32Array(i),this.buffers[0].update(),this.buffers[1].update(),this.indexBuffer.update()}};ke.defaultOptions={width:100,height:100,verticesX:10,verticesY:10};let St=ke;class re{constructor(){this.batcherName="default",this.packAsQuad=!1,this.indexOffset=0,this.attributeOffset=0,this.roundPixels=0,this._batcher=null,this._batch=null,this._textureMatrixUpdateId=-1,this._uvUpdateId=-1}get blendMode(){return this.renderable.groupBlendMode}get topology(){return this._topology||this.geometry.topology}set topology(e){this._topology=e}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.geometry=null,this._uvUpdateId=-1,this._textureMatrixUpdateId=-1}setTexture(e){this.texture!==e&&(this.texture=e,this._textureMatrixUpdateId=-1)}get uvs(){const t=this.geometry.getBuffer("aUV"),r=t.data;let n=r;const i=this.texture.textureMatrix;return i.isSimple||(n=this._transformedUvs,(this._textureMatrixUpdateId!==i._updateID||this._uvUpdateId!==t._updateID)&&((!n||n.length<r.length)&&(n=this._transformedUvs=new Float32Array(r.length)),this._textureMatrixUpdateId=i._updateID,this._uvUpdateId=t._updateID,i.multiplyUvs(r,n))),n}get positions(){return this.geometry.positions}get indices(){return this.geometry.indices}get color(){return this.renderable.groupColorAlpha}get groupTransform(){return this.renderable.groupTransform}get attributeSize(){return this.geometry.positions.length/2}get indexSize(){return this.geometry.indices.length}}class he{destroy(){}}class Ie{constructor(e,t){this.localUniforms=new B({uTransformMatrix:{value:new w,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),this.localUniformsBindGroup=new be({0:this.localUniforms}),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=this._getMeshData(e),r=t.batched,n=e.batched;if(t.batched=n,r!==n)return!0;if(n){const i=e._geometry;if(i.indices.length!==t.indexSize||i.positions.length!==t.vertexSize)return t.indexSize=i.indices.length,t.vertexSize=i.positions.length,!0;const s=this._getBatchableMesh(e);return s.texture.uid!==e._texture.uid&&(s._textureMatrixUpdateId=-1),!s._batcher.checkAndUpdateTexture(s,e._texture)}return!1}addRenderable(e,t){var i,s;const r=this.renderer.renderPipes.batch,n=this._getMeshData(e);if(e.didViewUpdate&&(n.indexSize=(i=e._geometry.indices)==null?void 0:i.length,n.vertexSize=(s=e._geometry.positions)==null?void 0:s.length),n.batched){const o=this._getBatchableMesh(e);o.setTexture(e._texture),o.geometry=e._geometry,r.addToBatch(o,t)}else r.break(t),t.add(e)}updateRenderable(e){if(e.batched){const t=this._getBatchableMesh(e);t.setTexture(e._texture),t.geometry=e._geometry,t._batcher.updateElement(t)}}execute(e){if(!e.isRenderable)return;e.state.blendMode=Z(e.groupBlendMode,e.texture._source);const t=this.localUniforms;t.uniforms.uTransformMatrix=e.groupTransform,t.uniforms.uRound=this.renderer._roundPixels|e._roundPixels,t.update(),W(e.groupColorAlpha,t.uniforms.uColor,0),this._adaptor.execute(this,e)}_getMeshData(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new he),e._gpuData[this.renderer.uid].meshData||this._initMeshData(e)}_initMeshData(e){return e._gpuData[this.renderer.uid].meshData={batched:e.batched,indexSize:0,vertexSize:0},e._gpuData[this.renderer.uid].meshData}_getBatchableMesh(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new he),e._gpuData[this.renderer.uid].batchableMesh||this._initBatchableMesh(e)}_initBatchableMesh(e){const t=new re;return t.renderable=e,t.setTexture(e._texture),t.transform=e.groupTransform,t.roundPixels=this.renderer._roundPixels|e._roundPixels,e._gpuData[this.renderer.uid].batchableMesh=t,t}destroy(){this.localUniforms=null,this.localUniformsBindGroup=null,this._adaptor.destroy(),this._adaptor=null,this.renderer=null}}Ie.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"mesh"};class Ft{execute(e,t){const r=e.state,n=e.renderer,i=t.shader||e.defaultShader;i.resources.uTexture=t.texture._source,i.resources.uniforms=e.localUniforms;const s=n.gl,o=e.getBuffers(t);n.shader.bind(i),n.state.set(r),n.geometry.bind(o.geometry,i.glProgram);const l=o.geometry.indexBuffer.data.BYTES_PER_ELEMENT===2?s.UNSIGNED_SHORT:s.UNSIGNED_INT;s.drawElements(s.TRIANGLES,t.particleChildren.length*6,l,0)}}class Rt{execute(e,t){const r=e.renderer,n=t.shader||e.defaultShader;n.groups[0]=r.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms,!0),n.groups[1]=r.texture.getTextureBindGroup(t.texture);const i=e.state,s=e.getBuffers(t);r.encoder.draw({geometry:s.geometry,shader:t.shader||e.defaultShader,state:i,size:t.particleChildren.length*6})}}function fe(a,e=null){const t=a*6;if(t>65535?e||(e=new Uint32Array(t)):e||(e=new Uint16Array(t)),e.length!==t)throw new Error(`Out buffer length is incorrect, got ${e.length} and expected ${t}`);for(let r=0,n=0;r<t;r+=6,n+=4)e[r+0]=n+0,e[r+1]=n+1,e[r+2]=n+2,e[r+3]=n+0,e[r+4]=n+2,e[r+5]=n+3;return e}function Ut(a){return{dynamicUpdate:pe(a,!0),staticUpdate:pe(a,!1)}}function pe(a,e){const t=[];t.push(`

        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);let r=0;for(const i in a){const s=a[i];if(e!==s.dynamic)continue;t.push(`offset = index + ${r}`),t.push(s.code);const o=K(s.format);r+=o.stride/4}t.push(`
            index += stride * 4;
        }
    `),t.unshift(`
        var stride = ${r};
    `);const n=t.join(`
`);return new Function("ps","f32v","u32v",n)}class Bt{constructor(e){var h;this._size=0,this._generateParticleUpdateCache={};const t=this._size=(h=e.size)!=null?h:1e3,r=e.properties;let n=0,i=0;for(const d in r){const c=r[d],f=K(c.format);c.dynamic?i+=f.stride:n+=f.stride}this._dynamicStride=i/4,this._staticStride=n/4,this.staticAttributeBuffer=new k(t*4*n),this.dynamicAttributeBuffer=new k(t*4*i),this.indexBuffer=fe(t);const s=new $;let o=0,u=0;this._staticBuffer=new D({data:new Float32Array(1),label:"static-particle-buffer",shrinkToFit:!1,usage:P.VERTEX|P.COPY_DST}),this._dynamicBuffer=new D({data:new Float32Array(1),label:"dynamic-particle-buffer",shrinkToFit:!1,usage:P.VERTEX|P.COPY_DST});for(const d in r){const c=r[d],f=K(c.format);c.dynamic?(s.addAttribute(c.attributeName,{buffer:this._dynamicBuffer,stride:this._dynamicStride*4,offset:o*4,format:c.format}),o+=f.size):(s.addAttribute(c.attributeName,{buffer:this._staticBuffer,stride:this._staticStride*4,offset:u*4,format:c.format}),u+=f.size)}s.addIndex(this.indexBuffer);const l=this.getParticleUpdate(r);this._dynamicUpload=l.dynamicUpdate,this._staticUpload=l.staticUpdate,this.geometry=s}getParticleUpdate(e){const t=Gt(e);return this._generateParticleUpdateCache[t]?this._generateParticleUpdateCache[t]:(this._generateParticleUpdateCache[t]=this.generateParticleUpdate(e),this._generateParticleUpdateCache[t])}generateParticleUpdate(e){return Ut(e)}update(e,t){e.length>this._size&&(t=!0,this._size=Math.max(e.length,this._size*1.5|0),this.staticAttributeBuffer=new k(this._size*this._staticStride*4*4),this.dynamicAttributeBuffer=new k(this._size*this._dynamicStride*4*4),this.indexBuffer=fe(this._size),this.geometry.indexBuffer.setDataWithSize(this.indexBuffer,this.indexBuffer.byteLength,!0));const r=this.dynamicAttributeBuffer;if(this._dynamicUpload(e,r.float32View,r.uint32View),this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View,e.length*this._dynamicStride*4,!0),t){const n=this.staticAttributeBuffer;this._staticUpload(e,n.float32View,n.uint32View),this._staticBuffer.setDataWithSize(n.float32View,e.length*this._staticStride*4,!0)}}destroy(){this._staticBuffer.destroy(),this._dynamicBuffer.destroy(),this.geometry.destroy()}}function Gt(a){const e=[];for(const t in a){const r=a[t];e.push(t,r.code,r.dynamic?"d":"s")}return e.join("_")}var Mt=`varying vec2 vUV;
varying vec4 vColor;

uniform sampler2D uTexture;

void main(void){
    vec4 color = texture2D(uTexture, vUV) * vColor;
    gl_FragColor = color;
}`,zt=`attribute vec2 aVertex;
attribute vec2 aUV;
attribute vec4 aColor;

attribute vec2 aPosition;
attribute float aRotation;

uniform mat3 uTranslationMatrix;
uniform float uRound;
uniform vec2 uResolution;
uniform vec4 uColor;

varying vec2 vUV;
varying vec4 vColor;

vec2 roundPixels(vec2 position, vec2 targetSize)
{       
    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

void main(void){
    float cosRotation = cos(aRotation);
    float sinRotation = sin(aRotation);
    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;
    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;

    vec2 v = vec2(x, y);
    v = v + aPosition;

    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    if(uRound == 1.0)
    {
        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
    }

    vUV = aUV;
    vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uColor;
}
`,me=`
struct ParticleUniforms {
  uTranslationMatrix:mat3x3<f32>,
  uColor:vec4<f32>,
  uRound:f32,
  uResolution:vec2<f32>,
};

fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32>
{
  return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;

@group(1) @binding(0) var uTexture: texture_2d<f32>;
@group(1) @binding(1) var uSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
  };
@vertex
fn mainVertex(
  @location(0) aVertex: vec2<f32>,
  @location(1) aPosition: vec2<f32>,
  @location(2) aUV: vec2<f32>,
  @location(3) aColor: vec4<f32>,
  @location(4) aRotation: f32,
) -> VSOutput {
  
   let v = vec2(
       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),
       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)
   ) + aPosition;

   var position = vec4((uniforms.uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

   if(uniforms.uRound == 1.0) {
       position = vec4(roundPixels(position.xy, uniforms.uResolution), position.zw);
   }

    let vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uniforms.uColor;

  return VSOutput(
   position,
   aUV,
   vColor,
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color: vec4<f32>,
  @builtin(position) position: vec4<f32>,
) -> @location(0) vec4<f32> {

    var sample = textureSample(uTexture, uSampler, uv) * color;
   
    return sample;
}`;class At extends ee{constructor(){const e=_e.from({vertex:zt,fragment:Mt}),t=xe.from({fragment:{source:me,entryPoint:"mainFragment"},vertex:{source:me,entryPoint:"mainVertex"}});super({glProgram:e,gpuProgram:t,resources:{uTexture:F.WHITE.source,uSampler:new N({}),uniforms:{uTranslationMatrix:{value:new w,type:"mat3x3<f32>"},uColor:{value:new st(16777215),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}}})}}class Ee{constructor(e,t){this.state=E.for2d(),this.localUniforms=new B({uTranslationMatrix:{value:new w,type:"mat3x3<f32>"},uColor:{value:new Float32Array(4),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}),this.renderer=e,this.adaptor=t,this.defaultShader=new At,this.state=E.for2d()}validateRenderable(e){return!1}addRenderable(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}getBuffers(e){return e._gpuData[this.renderer.uid]||this._initBuffer(e)}_initBuffer(e){return e._gpuData[this.renderer.uid]=new Bt({size:e.particleChildren.length,properties:e._properties}),e._gpuData[this.renderer.uid]}updateRenderable(e){}execute(e){const t=e.particleChildren;if(t.length===0)return;const r=this.renderer,n=this.getBuffers(e);e.texture||(e.texture=t[0].texture);const i=this.state;n.update(t,e._childrenDirty),e._childrenDirty=!1,i.blendMode=Z(e.blendMode,e.texture._source);const s=this.localUniforms.uniforms,o=s.uTranslationMatrix;e.worldTransform.copyTo(o),o.prepend(r.globalUniforms.globalUniformData.projectionMatrix),s.uResolution=r.globalUniforms.globalUniformData.resolution,s.uRound=r._roundPixels|e._roundPixels,W(e.groupColorAlpha,s.uColor,0),this.adaptor.execute(this,e)}destroy(){this.renderer=null,this.defaultShader&&(this.defaultShader.destroy(),this.defaultShader=null)}}class Ve extends Ee{constructor(e){super(e,new Ft)}}Ve.extension={type:[p.WebGLPipes],name:"particle"};class We extends Ee{constructor(e){super(e,new Rt)}}We.extension={type:[p.WebGPUPipes],name:"particle"};const Le=class Ye extends St{constructor(e={}){e=R(R({},Ye.defaultOptions),e),super({width:e.width,height:e.height,verticesX:4,verticesY:4}),this.update(e)}update(e){var t,r,n,i,s,o,u,l,h,d;this.width=(t=e.width)!=null?t:this.width,this.height=(r=e.height)!=null?r:this.height,this._originalWidth=(n=e.originalWidth)!=null?n:this._originalWidth,this._originalHeight=(i=e.originalHeight)!=null?i:this._originalHeight,this._leftWidth=(s=e.leftWidth)!=null?s:this._leftWidth,this._rightWidth=(o=e.rightWidth)!=null?o:this._rightWidth,this._topHeight=(u=e.topHeight)!=null?u:this._topHeight,this._bottomHeight=(l=e.bottomHeight)!=null?l:this._bottomHeight,this._anchorX=(h=e.anchor)==null?void 0:h.x,this._anchorY=(d=e.anchor)==null?void 0:d.y,this.updateUvs(),this.updatePositions()}updatePositions(){const e=this.positions,{width:t,height:r,_leftWidth:n,_rightWidth:i,_topHeight:s,_bottomHeight:o,_anchorX:u,_anchorY:l}=this,h=n+i,d=t>h?1:t/h,c=s+o,f=r>c?1:r/c,x=Math.min(d,f),m=u*t,g=l*r;e[0]=e[8]=e[16]=e[24]=-m,e[2]=e[10]=e[18]=e[26]=n*x-m,e[4]=e[12]=e[20]=e[28]=t-i*x-m,e[6]=e[14]=e[22]=e[30]=t-m,e[1]=e[3]=e[5]=e[7]=-g,e[9]=e[11]=e[13]=e[15]=s*x-g,e[17]=e[19]=e[21]=e[23]=r-o*x-g,e[25]=e[27]=e[29]=e[31]=r-g,this.getBuffer("aPosition").update()}updateUvs(){const e=this.uvs;e[0]=e[8]=e[16]=e[24]=0,e[1]=e[3]=e[5]=e[7]=0,e[6]=e[14]=e[22]=e[30]=1,e[25]=e[27]=e[29]=e[31]=1;const t=1/this._originalWidth,r=1/this._originalHeight;e[2]=e[10]=e[18]=e[26]=t*this._leftWidth,e[9]=e[11]=e[13]=e[15]=r*this._topHeight,e[4]=e[12]=e[20]=e[28]=1-t*this._rightWidth,e[17]=e[19]=e[21]=e[23]=1-r*this._bottomHeight,this.getBuffer("aUV").update()}};Le.defaultOptions={width:100,height:100,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10,originalWidth:100,originalHeight:100};let Dt=Le;class kt extends re{constructor(){super(),this.geometry=new Dt}destroy(){this.geometry.destroy()}}class Xe{constructor(e){this._renderer=e}addRenderable(e,t){const r=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,r),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,t),t._batcher.updateElement(t)}validateRenderable(e){const t=this._getGpuSprite(e);return!t._batcher.checkAndUpdateTexture(t,e._texture)}_updateBatchableSprite(e,t){t.geometry.update(e),t.setTexture(e._texture)}_getGpuSprite(e){return e._gpuData[this._renderer.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=e._gpuData[this._renderer.uid]=new kt,r=t;return r.renderable=e,r.transform=e.groupTransform,r.texture=e._texture,r.roundPixels=this._renderer._roundPixels|e._roundPixels,e.didViewUpdate||this._updateBatchableSprite(e,r),t}destroy(){this._renderer=null}}Xe.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"nineSliceSprite"};const Ot={name:"tiling-bit",vertex:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `},fragment:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            }

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `}},It={name:"tiling-bit",vertex:{header:`
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;

        `,main:`
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `},fragment:{header:`
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,main:`

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0

        `}};let G,M;class Et extends ee{constructor(){G!=null||(G=Te({name:"tiling-sprite-shader",bits:[gt,Ot,Pe]})),M!=null||(M=we({name:"tiling-sprite-shader",bits:[xt,It,Ce]}));const e=new B({uMapCoord:{value:new w,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new w,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,100,.5,.5]),type:"vec4<f32>"}});super({glProgram:M,gpuProgram:G,resources:{localUniforms:new B({uTransformMatrix:{value:new w,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),tilingUniforms:e,uTexture:F.EMPTY.source,uSampler:F.EMPTY.source.style}})}updateUniforms(e,t,r,n,i,s){const o=this.resources.tilingUniforms,u=s.width,l=s.height,h=s.textureMatrix,d=o.uniforms.uTextureTransform;d.set(r.a*u/e,r.b*u/t,r.c*l/e,r.d*l/t,r.tx/e,r.ty/t),d.invert(),o.uniforms.uMapCoord=h.mapCoord,o.uniforms.uClampFrame=h.uClampFrame,o.uniforms.uClampOffset=h.uClampOffset,o.uniforms.uTextureTransform=d,o.uniforms.uSizeAnchor[0]=e,o.uniforms.uSizeAnchor[1]=t,o.uniforms.uSizeAnchor[2]=n,o.uniforms.uSizeAnchor[3]=i,s&&(this.resources.uTexture=s.source,this.resources.uSampler=s.source.style)}}class Vt extends te{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}function Wt(a,e){const t=a.anchor.x,r=a.anchor.y;e[0]=-t*a.width,e[1]=-r*a.height,e[2]=(1-t)*a.width,e[3]=-r*a.height,e[4]=(1-t)*a.width,e[5]=(1-r)*a.height,e[6]=-t*a.width,e[7]=(1-r)*a.height}function Lt(a,e,t,r){let n=0;const i=a.length/e,s=r.a,o=r.b,u=r.c,l=r.d,h=r.tx,d=r.ty;for(t*=e;n<i;){const c=a[t],f=a[t+1];a[t]=s*c+u*f+h,a[t+1]=o*c+l*f+d,t+=e,n++}}function Yt(a,e){const t=a.texture,r=t.frame.width,n=t.frame.height;let i=0,s=0;a.applyAnchorToTexture&&(i=a.anchor.x,s=a.anchor.y),e[0]=e[6]=-i,e[2]=e[4]=1-i,e[1]=e[3]=-s,e[5]=e[7]=1-s;const o=w.shared;o.copyFrom(a._tileTransform.matrix),o.tx/=a.width,o.ty/=a.height,o.invert(),o.scale(a.width/r,a.height/n),Lt(e,2,0,o)}const O=new Vt;class Xt{constructor(){this.canBatch=!0,this.geometry=new te({indices:O.indices.slice(),positions:O.positions.slice(),uvs:O.uvs.slice()})}destroy(){var e;this.geometry.destroy(),(e=this.shader)==null||e.destroy()}}class He{constructor(e){this._state=E.default2d,this._renderer=e}validateRenderable(e){const t=this._getTilingSpriteData(e),r=t.canBatch;this._updateCanBatch(e);const n=t.canBatch;if(n&&n===r){const{batchableMesh:i}=t;return!i._batcher.checkAndUpdateTexture(i,e.texture)}return r!==n}addRenderable(e,t){const r=this._renderer.renderPipes.batch;this._updateCanBatch(e);const n=this._getTilingSpriteData(e),{geometry:i,canBatch:s}=n;if(s){n.batchableMesh||(n.batchableMesh=new re);const o=n.batchableMesh;e.didViewUpdate&&(this._updateBatchableMesh(e),o.geometry=i,o.renderable=e,o.transform=e.groupTransform,o.setTexture(e._texture)),o.roundPixels=this._renderer._roundPixels|e._roundPixels,r.addToBatch(o,t)}else r.break(t),n.shader||(n.shader=new Et),this.updateRenderable(e),t.add(e)}execute(e){const{shader:t}=this._getTilingSpriteData(e);t.groups[0]=this._renderer.globalUniforms.bindGroup;const r=t.resources.localUniforms.uniforms;r.uTransformMatrix=e.groupTransform,r.uRound=this._renderer._roundPixels|e._roundPixels,W(e.groupColorAlpha,r.uColor,0),this._state.blendMode=Z(e.groupBlendMode,e.texture._source),this._renderer.encoder.draw({geometry:O,shader:t,state:this._state})}updateRenderable(e){const t=this._getTilingSpriteData(e),{canBatch:r}=t;if(r){const{batchableMesh:n}=t;e.didViewUpdate&&this._updateBatchableMesh(e),n._batcher.updateElement(n)}else if(e.didViewUpdate){const{shader:n}=t;n.updateUniforms(e.width,e.height,e._tileTransform.matrix,e.anchor.x,e.anchor.y,e.texture)}}_getTilingSpriteData(e){return e._gpuData[this._renderer.uid]||this._initTilingSpriteData(e)}_initTilingSpriteData(e){const t=new Xt;return t.renderable=e,e._gpuData[this._renderer.uid]=t,t}_updateBatchableMesh(e){const t=this._getTilingSpriteData(e),{geometry:r}=t,n=e.texture.source.style;n.addressMode!=="repeat"&&(n.addressMode="repeat",n.update()),Yt(e,r.uvs),Wt(e,r.positions)}destroy(){this._renderer=null}_updateCanBatch(e){const t=this._getTilingSpriteData(e),r=e.texture;let n=!0;return this._renderer.type===Q.WEBGL&&(n=this._renderer.context.supports.nonPowOf2wrapping),t.canBatch=r.textureMatrix.isSimple&&(n||r.source.isPowerOfTwo),t.canBatch}}He.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"tilingSprite"};const Ht={name:"local-uniform-msdf-bit",vertex:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `},fragment:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,main:`
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `}},Kt={name:"local-uniform-msdf-bit",vertex:{header:`
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `},fragment:{header:`
            uniform float uDistance;
         `,main:`
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `}},Nt={name:"msdf-bit",fragment:{header:`
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {

                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;

            }
        `}},jt={name:"msdf-bit",fragment:{header:`
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {

                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);

                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);

                return coverage;
            }
        `}};let z,A;class qt extends ee{constructor(e){const t=new B({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new w,type:"mat3x3<f32>"},uDistance:{value:4,type:"f32"},uRound:{value:0,type:"f32"}});z!=null||(z=Te({name:"sdf-shader",bits:[it,at(e),Ht,Nt,Pe]})),A!=null||(A=we({name:"sdf-shader",bits:[ot,ut(e),Kt,jt,Ce]})),super({glProgram:A,gpuProgram:z,resources:{localUniforms:t,batchSamplers:lt(e)}})}}class $t extends ft{destroy(){this.context.customShader&&this.context.customShader.destroy(),super.destroy()}}class Ke{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuBitmapText(e);return this._renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){const r=this._getGpuBitmapText(e);ge(e,r),e._didTextUpdate&&(e._didTextUpdate=!1,this._updateContext(e,r)),this._renderer.renderPipes.graphics.addRenderable(r,t),r.context.customShader&&this._updateDistanceField(e)}updateRenderable(e){const t=this._getGpuBitmapText(e);ge(e,t),this._renderer.renderPipes.graphics.updateRenderable(t),t.context.customShader&&this._updateDistanceField(e)}_updateContext(e,t){const{context:r}=t,n=ct.getFont(e.text,e._style);r.clear(),n.distanceField.type!=="none"&&(r.customShader||(r.customShader=new qt(this._renderer.limits.maxBatchableTextures)));const i=dt.graphemeSegmenter(e.text),s=e._style;let o=n.baseLineOffset;const u=ht(i,s,n,!0),l=s.padding,h=u.scale;let d=u.width,c=u.height+u.offsetY;s._stroke&&(d+=s._stroke.width/h,c+=s._stroke.width/h),r.translate(-e._anchor._x*d-l,-e._anchor._y*c-l).scale(h,h);const f=n.applyFillAsTint?s._fill.color:16777215;let x=n.fontMetrics.fontSize,m=n.lineHeight;s.lineHeight&&(x=s.fontSize/h,m=s.lineHeight/h);let g=(m-x)/2;g-n.baseLineOffset<0&&(g=0);for(let _=0;_<u.lines.length;_++){const S=u.lines[_];for(let v=0;v<S.charPositions.length;v++){const y=S.chars[v],C=n.chars[y];if(C!=null&&C.texture){const L=C.texture;r.texture(L,f||"black",Math.round(S.charPositions[v]+C.xOffset),Math.round(o+C.yOffset+g),L.orig.width,L.orig.height)}}o+=m}}_getGpuBitmapText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new $t;return e._gpuData[this._renderer.uid]=t,this._updateContext(e,t),t}_updateDistanceField(e){const t=this._getGpuBitmapText(e).context,r=e._style.fontFamily,n=j.get(`${r}-bitmap`),{a:i,b:s,c:o,d:u}=e.groupTransform,l=Math.sqrt(i*i+s*s),h=Math.sqrt(o*o+u*u),d=(Math.abs(l)+Math.abs(h))/2,c=n.baseRenderedFontSize/e._style.fontSize,f=d*n.distanceField.range*(1/c);t.customShader.resources.localUniforms.uniforms.uDistance=f}destroy(){this._renderer=null}}Ke.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"bitmapText"};function ge(a,e){e.groupTransform=a.groupTransform,e.groupColorAlpha=a.groupColorAlpha,e.groupColor=a.groupColor,e.groupBlendMode=a.groupBlendMode,e.globalDisplayStatus=a.globalDisplayStatus,e.groupTransform=a.groupTransform,e.localDisplayStatus=a.localDisplayStatus,e.groupAlpha=a.groupAlpha,e._roundPixels=a._roundPixels}class Qt extends Fe{constructor(e){super(),this.generatingTexture=!1,this.currentKey="--",this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){const{htmlText:e}=this._renderer;e.getReferenceCount(this.currentKey)===null?e.returnTexturePromise(this.texturePromise):e.decreaseReferenceCount(this.currentKey),this._renderer.runners.resolutionChange.remove(this),this.texturePromise=null,this._renderer=null}}function q(a,e){const{texture:t,bounds:r}=a,n=e._style._getFinalPadding();pt(r,e._anchor,t);const i=e._anchor._x*n*2,s=e._anchor._y*n*2;r.minX-=n-i,r.minY-=n-s,r.maxX-=n-i,r.maxY-=n-s}class Ne{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),r=e.styleKey;return t.currentKey!==r}addRenderable(e,t){const r=this._getGpuText(e);if(e._didTextUpdate){const n=e._autoResolution?this._renderer.resolution:e.resolution;(r.currentKey!==e.styleKey||e.resolution!==n)&&this._updateGpuText(e).catch(i=>{console.error(i)}),e._didTextUpdate=!1,q(r,e)}this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){return U(this,null,function*(){e._didTextUpdate=!1;const t=this._getGpuText(e);if(t.generatingTexture)return;const r=t.texturePromise;t.texturePromise=null,t.generatingTexture=!0,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;let n=this._renderer.htmlText.getTexturePromise(e);r&&(n=n.finally(()=>{this._renderer.htmlText.decreaseReferenceCount(t.currentKey),this._renderer.htmlText.returnTexturePromise(r)})),t.texturePromise=n,t.currentKey=e.styleKey,t.texture=yield n;const i=e.renderGroup||e.parentRenderGroup;i&&(i.structureDidChange=!0),t.generatingTexture=!1,q(t,e)})}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new Qt(this._renderer);return t.renderable=e,t.transform=e.groupTransform,t.texture=F.EMPTY,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}Ne.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"htmlText"};function Jt(){const{userAgent:a}=J.get().getNavigator();return/^((?!chrome|android).)*safari/i.test(a)}const Zt=new ye;function je(a,e,t,r){const n=Zt;n.minX=0,n.minY=0,n.maxX=a.width/r|0,n.maxY=a.height/r|0;const i=T.getOptimalTexture(n.width,n.height,r,!1);return i.source.uploadMethodId="image",i.source.resource=a,i.source.alphaMode="premultiply-alpha-on-upload",i.frame.width=e/r,i.frame.height=t/r,i.source.emit("update",i.source),i.updateUvs(),i}function er(a,e){const t=e.fontFamily,r=[],n={},i=/font-family:([^;"\s]+)/g,s=a.match(i);function o(u){n[u]||(r.push(u),n[u]=!0)}if(Array.isArray(t))for(let u=0;u<t.length;u++)o(t[u]);else o(t);s&&s.forEach(u=>{const l=u.split(":")[1].trim();o(l)});for(const u in e.tagStyles){const l=e.tagStyles[u].fontFamily;o(l)}return r}function tr(a){return U(this,null,function*(){const t=yield(yield J.get().fetch(a)).blob(),r=new FileReader;return yield new Promise((i,s)=>{r.onloadend=()=>i(r.result),r.onerror=s,r.readAsDataURL(t)})})}function rr(a,e){return U(this,null,function*(){const t=yield tr(e);return`@font-face {
        font-family: "${a.fontFamily}";
        font-weight: ${a.fontWeight};
        font-style: ${a.fontStyle};
        src: url('${t}');
    }`})}const X=new Map;function nr(a){return U(this,null,function*(){const e=a.filter(t=>j.has(`${t}-and-url`)).map(t=>{if(!X.has(t)){const{entries:r}=j.get(`${t}-and-url`),n=[];r.forEach(i=>{const s=i.url,u=i.faces.map(l=>({weight:l.weight,style:l.style}));n.push(...u.map(l=>rr({fontWeight:l.weight,fontStyle:l.style,fontFamily:t},s)))}),X.set(t,Promise.all(n).then(i=>i.join(`
`)))}return X.get(t)});return(yield Promise.all(e)).join(`
`)})}function sr(a,e,t,r,n){const{domElement:i,styleElement:s,svgRoot:o}=n;i.innerHTML=`<style>${e.cssStyle}</style><div style='padding:0;'>${a}</div>`,i.setAttribute("style",`transform: scale(${t});transform-origin: top left; display: inline-block`),s.textContent=r;const{width:u,height:l}=n.image;return o.setAttribute("width",u.toString()),o.setAttribute("height",l.toString()),new XMLSerializer().serializeToString(o)}function ir(a,e){const t=Se.getOptimalCanvasAndContext(a.width,a.height,e),{context:r}=t;return r.clearRect(0,0,a.width,a.height),r.drawImage(a,0,0),t}function ar(a,e,t){return new Promise(r=>U(this,null,function*(){t&&(yield new Promise(n=>setTimeout(n,100))),a.onload=()=>{r()},a.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`,a.crossOrigin="anonymous"}))}class qe{constructor(e){this._activeTextures={},this._renderer=e,this._createCanvas=e.type===Q.WEBGPU}getTexture(e){return this.getTexturePromise(e)}getManagedTexture(e){const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].promise;const r=this._buildTexturePromise(e).then(n=>(this._activeTextures[t].texture=n,n));return this._activeTextures[t]={texture:null,promise:r,usageCount:1},r}getReferenceCount(e){var t,r;return(r=(t=this._activeTextures[e])==null?void 0:t.usageCount)!=null?r:null}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(t.texture?this._cleanUp(t.texture):t.promise.then(r=>{t.texture=r,this._cleanUp(t.texture)}).catch(()=>{H("HTMLTextSystem: Failed to clean texture")}),this._activeTextures[e]=null))}getTexturePromise(e){return this._buildTexturePromise(e)}_buildTexturePromise(e){return U(this,null,function*(){const{text:t,style:r,resolution:n,textureStyle:i}=e,s=V.get(Ae),o=er(t,r),u=yield nr(o),l=wt(t,r,u,s),h=Math.ceil(Math.ceil(Math.max(1,l.width)+r.padding*2)*n),d=Math.ceil(Math.ceil(Math.max(1,l.height)+r.padding*2)*n),c=s.image,f=2;c.width=(h|0)+f,c.height=(d|0)+f;const x=sr(t,r,n,u,s);yield ar(c,x,Jt()&&o.length>0);const m=c;let g;this._createCanvas&&(g=ir(c,n));const _=je(g?g.canvas:m,c.width-f,c.height-f,n);return i&&(_.source.style=i),this._createCanvas&&(this._renderer.texture.initSource(_.source),Se.returnCanvasAndContext(g)),V.return(s),_})}returnTexturePromise(e){e.then(t=>{this._cleanUp(t)}).catch(()=>{H("HTMLTextSystem: Failed to clean texture")})}_cleanUp(e){T.returnTexture(e,!0),e.source.resource=null,e.source.uploadMethodId="unknown"}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexturePromise(this._activeTextures[e].promise);this._activeTextures=null}}qe.extension={type:[p.WebGLSystem,p.WebGPUSystem,p.CanvasSystem],name:"htmlText"};class or extends Fe{constructor(e){super(),this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){const{canvasText:e}=this._renderer;e.getReferenceCount(this.currentKey)>0?e.decreaseReferenceCount(this.currentKey):this.texture&&e.returnTexture(this.texture),this._renderer.runners.resolutionChange.remove(this),this._renderer=null}}class $e{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),r=e.styleKey;return t.currentKey!==r?!0:e._didTextUpdate}addRenderable(e,t){const r=this._getGpuText(e);if(e._didTextUpdate){const n=e._autoResolution?this._renderer.resolution:e.resolution;(r.currentKey!==e.styleKey||e.resolution!==n)&&this._updateGpuText(e),e._didTextUpdate=!1,q(r,e)}this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){const t=this._getGpuText(e);t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=this._renderer.canvasText.getManagedTexture(e),t.currentKey=e.styleKey}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new or(this._renderer);return t.currentKey="--",t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}$e.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"text"};class Qe{constructor(e){this._activeTextures={},this._renderer=e}getTexture(e,t,r,n){var c;typeof e=="string"&&(I("8.0.0","CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"),e={text:e,style:r,resolution:t}),e.style instanceof ae||(e.style=new ae(e.style)),e.textureStyle instanceof N||(e.textureStyle=new N(e.textureStyle)),typeof e.text!="string"&&(e.text=e.text.toString());const{text:i,style:s,textureStyle:o}=e,u=(c=e.resolution)!=null?c:this._renderer.resolution,{frame:l,canvasAndContext:h}=Y.getCanvasAndContext({text:i,style:s,resolution:u}),d=je(h.canvas,l.width,l.height,u);if(o&&(d.source.style=o),s.trim&&(l.pad(s.padding),d.frame.copyFrom(l),d.frame.scale(1/u),d.updateUvs()),s.filters){const f=this._applyFilters(d,s.filters);return this.returnTexture(d),Y.returnCanvasAndContext(h),f}return this._renderer.texture.initSource(d._source),Y.returnCanvasAndContext(h),d}returnTexture(e){const t=e.source;t.resource=null,t.uploadMethodId="unknown",t.alphaMode="no-premultiply-alpha",T.returnTexture(e,!0)}renderTextToCanvas(){I("8.10.0","CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead")}getManagedTexture(e){e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].texture;const r=this.getTexture({text:e.text,style:e.style,resolution:e._resolution,textureStyle:e.textureStyle});return this._activeTextures[t]={texture:r,usageCount:1},r}decreaseReferenceCount(e){const t=this._activeTextures[e];t.usageCount--,t.usageCount===0&&(this.returnTexture(t.texture),this._activeTextures[e]=null)}getReferenceCount(e){var t,r;return(r=(t=this._activeTextures[e])==null?void 0:t.usageCount)!=null?r:0}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}_applyFilters(e,t){const r=this._renderer.renderTarget.renderTarget,n=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind(r,!1),n}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexture(this._activeTextures[e].texture);this._activeTextures=null}}Qe.extension={type:[p.WebGLSystem,p.WebGPUSystem,p.CanvasSystem],name:"canvasText"};b.add(Re);b.add(Ue);b.add(De);b.add(mt);b.add(Ie);b.add(Ve);b.add(We);b.add(Qe);b.add($e);b.add(Ke);b.add(qe);b.add(Ne);b.add(He);b.add(Xe);b.add(Ge);b.add(Be);
