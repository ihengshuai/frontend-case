var u=Object.defineProperty,c=Object.defineProperties;var m=Object.getOwnPropertyDescriptors;var a=Object.getOwnPropertySymbols;var d=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var s=(r,o,i)=>o in r?u(r,o,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[o]=i,l=(r,o)=>{for(var i in o||(o={}))d.call(o,i)&&s(r,i,o[i]);if(a)for(var i of a(o))h.call(o,i)&&s(r,i,o[i]);return r},e=(r,o)=>c(r,m(o));const n={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},x=e(l({},n),{vertex:e(l({},n.vertex),{header:n.vertex.header.replace("group(1)","group(2)")})}),b={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}};class v{constructor(){this.batcherName="default",this.topology="triangle-list",this.attributeSize=4,this.indexSize=6,this.packAsQuad=!0,this.roundPixels=0,this._attributeStart=0,this._batcher=null,this._batch=null}get blendMode(){return this.renderable.groupBlendMode}get color(){return this.renderable.groupColorAlpha}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.bounds=null}destroy(){}}function p(r,o,i){const t=(r>>24&255)/255;o[i++]=(r&255)/255*t,o[i++]=(r>>8&255)/255*t,o[i++]=(r>>16&255)/255*t,o[i++]=t}export{v as B,n as a,b,p as c,x as l};
