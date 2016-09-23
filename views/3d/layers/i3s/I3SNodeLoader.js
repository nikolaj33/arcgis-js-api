// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.

define(["require","exports","dojo/_base/lang","../../webgl-engine/lib/Util","./I3SUtil","./I3SBinaryReader","../../support/PromiseLightweight","../../support/projectionUtils","../../lib/glMatrix","../../support/PromiseNativeOrShim","../../../../core/urlUtils"],function(e,t,r,a,n,i,o,u,s,l,d){var f=a.assert,c=s.vec4d,h={},m=function(){function e(t,r,a,n,i,o,u,s,f,c,h,m,p,g,v){this.bundleLoadedCallback=r,this.queueFunctionCall=a,this.debugVis=n,this.renderCoordsHelper=i,this.indexSR=o,this.calcDesiredTextureLOD=u,this.imageIsPartOfTextureBundle=s,this.matId2Meta=f,this.texId2Meta=c,this.useCompressedTextures=h,this.logger=m,this.defaultGeometrySchema=p,this.requiredAttributes=g,this.bypassFeatureData=v,this.texIdToPromises={},this.loadShared=function(t){if(null==t.sharedResource)return l.resolve({});var r=d.makeAbsolute(t.sharedResource.href,t.baseUrl)+"/";return t.sharedResource.hrefConcat=r,this.loadJSON(r).then(function(t){return e.fixTextureEncodings(t),e.addAbsoluteHrefTexture(t,r),t})},this.loader=t,this.cancelled=!1}return e.prototype.waitForAnimationFrame=function(){var e=this;return new l(function(t,r){e.queueFunctionCall(t,null,[],r)})},e.prototype.cancel=function(){this.cancelled=!0},e.prototype.loadJSON=function(e){var t=this.loader.request(e,"json");return new l(function(r,a){t.then(function(e,t){r(t)},function(t){a(new Error("Failed to load: "+e))})})},e.prototype.loadBinary=function(e){var t=this.loader.request(e,"binary");return new l(function(r,a){t.then(function(e,t){r(t)},function(t){a(new Error("Failed to load: "+e))})})},e.prototype.loadImage=function(e){var t=this.loader.request(e,"image");return new l(function(r,a){t.then(function(e,t){r(t)},function(t){a(new Error("Failed to load: "+e))})})},e.prototype.loadAttribute=function(e,t,r){var a=n.addTrailingSlash(d.makeAbsolute(r,e));return this.loadBinary(a).then(function(e){return i.readBinaryAttribute(t,e)})},e.prototype.loadAttributes=function(e,t,r){var a=this,n=r.map(function(r){return a.loadAttribute(t,r.attributeStorageInfo,e.attributeData[r.index].href)});return l.all(n).then(function(e){for(var t={},a=0;a<r.length;++a)e[a]&&(t[r[a].name]=e[a]);return t})},e.prototype.prepareBinaryGeometryData=function(e,t,a,n){var o=e.geometries[0];if(r.mixin(o.params,a),e.faceRanges[0][0]=0,e.faceRanges[0][1]=a.header.fields.vertexCount/3-1,n||null!=a.vertexAttributes.region||delete a.vertexAttributes.region,null!=a.featureAttributes){var u=a.featureAttributes;if(u.faceRange){e.faceRanges=[];for(var s=i.createTypedView(t,u.faceRange),l=u.faceRange.valuesPerElement,d=0;d<a.header.fields.featureCount;d++)e.faceRanges[d]=[s[d*l],s[d*l+1]]}if(u.id){e.featureIds=[];var f=1,c=i.valueType2TypedArrayClassMap[u.id.valueType];"UInt64"===u.id.valueType&&(c=Uint32Array,f=2);for(var h=new c(t,u.id.byteOffset,u.id.count*u.id.valuesPerElement*f),d=0;d<a.header.fields.featureCount;d++)if(e.featureIds[d]=h[d*u.id.valuesPerElement*f],2===f){var m=h[d*u.id.valuesPerElement*f+1];if(m>=2097150)throw new Error("ID exceeded maximum range supported by javascript (max = 53bit-1 = 9007199254740991)");e.featureIds[d]+=4294967296*m}}}},e.prototype.loadNodeData=function(t,a,n,o,u){var s=this,f=null==t.features,c=t.baseUrl,h={},m=this.loadShared(t),p=m.then(function(e){return s.loadReferencedShared(e,c)}),g=null;null!=this.requiredAttributes&&(g=this.loadAttributes(t,c,this.requiredAttributes));var v=null;null!=t.geometryData&&(v=t.geometryData.map(function(e,t){if(-1===a.indexOf(t))return null;var r=d.makeAbsolute(e.href,c);return e.hrefConcat=r,s.loadBinary(r)})),l.all([m,p]).then(function(n){var d=n[0],c=n[1];s.handleCancelled(),t.sharedResource&&(h[t.sharedResource.hrefConcat]=d,r.mixin(h,c));var m=a.map(function(r){var a=s.loadFeatureData(t,r,d);return a.then(function(a){s.handleCancelled(),f&&e.buildNodeFeatures(t,r,a);var n=s.collectGeometries(t,r,a,d),u=null;u=null!=v&&null!=v[r]?v[r].then(function(e){h[t.geometryData[r].hrefConcat]=e;var a=Object.keys(d.materialDefinitions)[0],o=d.materialDefinitions[a].params.vertexRegions,u=i.createGeometryDataIndex(e,s.defaultGeometrySchema,o);return s.prepareBinaryGeometryData(n[0],e,u,o),n}):l.resolve(n);var c=o?s.loadTextures(n,d,s.matId2Meta,s.texId2Meta).then(function(e){var t={};return e.forEach(function(e){var r=e.i3sTexId;t[r]={i3sTexId:r,data:e.data,encoding:e.encoding,desiredLOD:e.desiredLOD,createdTextureForDomImage:function(){s.texIdToPromises[r]&&delete s.texIdToPromises[r]}}}),t}):null;return l.all([c,u,g])}).then(function(e){var a=e[0],n=e[1],i=e[2];s.handleCancelled(),void 0!==s.debugVis&&s.debugVis.show(t,s.indexSR,"green");var o=null;return i&&(o={attributeData:i,loadedAttributes:s.requiredAttributes}),s.callbackWrapped(t,n,o,h,a,r,u)})["catch"](function(e){return s.handleCancelled(),s.callbackWrapped(t,null,null,h,null,r,u)})});return l.all(m)})["catch"](function(e){if(!s.cancelled){var r=a.map(function(e){return s.callbackWrapped(t,null,null,h,null,e,u)});return l.all(r)}}).then(function(){n.done()})},e.prototype.callbackWrapped=function(e,t,r,a,n,i,u){var s=this;return this.waitForAnimationFrame().then(function(){return new l(function(l,d){var f=new o.Promise,c=s.bundleLoadedCallback;c(e,t,r,a,f,n,i,u),f.then(l,d)})})},e.addAbsoluteHrefTexture=function(e,t){var r=e.textureDefinitions;if(void 0!==r)for(var a in r)if(r.hasOwnProperty(a))for(var n=r[a],i=0;i<n.images.length;i++){var o=n.images[i];Array.isArray(n.encoding)?o.hrefConcat=o.href.map(function(e){return d.makeAbsolute(e,t)}):o.hrefConcat=d.makeAbsolute(o.href,t)}},e.fixTextureEncodings=function(e){var t=e.textureDefinitions;if(null!=t)for(var r in t){var a=t[r];if(Array.isArray(a.encoding))for(var n=0;n<a.encoding.length;n++){var i=a.encoding[n];"data:"===i.substring(0,5)&&(a.encoding[n]=i.substring(5))}else{var i=a.encoding;"data:"===i.substring(0,5)&&(a.encoding=i.substring(5))}}},e.prototype.loadReferencedShared=function(t,r){var a=this;if(null==t||null==t.materialDefinitions)return l.resolve({});var n=Object.keys(t.materialDefinitions).filter(function(e){return t.materialDefinitions[e]&&null!=t.materialDefinitions[e].href}).map(function(e){return d.makeAbsolute(t.materialDefinitions[e].href,r)+"/"});return l.all(n.map(function(e){return a.loadJSON(e).then(function(t){return[e,t]})})).then(function(t){for(var r={},a=0,n=t;a<n.length;a++){var i=n[a],o=i[0],u=i[1];e.fixTextureEncodings(u),e.addAbsoluteHrefTexture(u,o),r[o]=u}return r})},e.prototype.loadTexture=function(e,t,r,a,i,o){var u=this,s=o>-1?r.encoding[o]:r.encoding,d=s===n.DDS_ENCODING_STRING,c=this.imageIsPartOfTextureBundle(a);return f(!(d&&c),"DDS in multi texture bundles not supported at the moment"),d?this.loadBinary(e).then(function(e){return u.cancelled?l.reject():{i3sTexId:t,data:e,encoding:s,desiredLOD:i}}):c?this.loadBinary(e).then(function(r){var n;try{var d,c=void 0;o>-1?(f(Array.isArray(a.byteOffset)&&Array.isArray(a.length),"texture encoding is array, but image byteOffset/length isn't"),c=a.byteOffset[o],d=a.length[o]):(c=a.byteOffset,d=a.length);var h=new Uint8Array(r,c,d),m=new Blob([h],{type:s});n=window.URL.createObjectURL(m)}catch(p){n="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIElEQVQ4T2P8zyD6n4ECwDhqAMNoGDCMhgEwDw2DdAAAdzkhQdS8dl8AAAAASUVORK5CYII=",u.logger.error("error loading texture "+e+": "+p)}var g=new Image,v=new l(function(e,r){var a=function(){window.URL.revokeObjectURL(n),g.onerror=void 0,g.onload=void 0};g.onerror=function(e){a(),r(e)},g.onload=function(){a(),u.cancelled?r():e({i3sTexId:t,data:g,encoding:s,desiredLOD:i})}});return g.src=n,v}):this.loadImage(e).then(function(e){return u.cancelled?l.reject():{i3sTexId:t,data:e,encoding:s,desiredLOD:i}})},e.getAllEngineMBS=function(e){for(var t=[],r=0;r<e.length;r++)t.push(e[r].engineMBS);return t},e.prototype.loadTextures=function(t,r,a,i){for(var o=[],u=0;u<t.length;u++)for(var s=t[u].geometries,d=e.getAllEngineMBS(t[u].features),c=0;c<s.length;++c)for(var h=s[c],m=h.params.components.length,p=0;m>p;p++){var g=h.params.components[p],v=g.materialID,b=g.textureID||"none";if((!a[v]||null==a[v][b])&&null==i[b]&&"none"!==b){if(null!=this.texIdToPromises[b]){o.push(this.texIdToPromises[b]);continue}(null==r.textureDefinitions||null==r.textureDefinitions[b])&&this.logger.warn("textureDefinitions missing in shared resource. i3sTexId: "+b);var y=r.textureDefinitions[b];f(void 0!==y,"geometry wants unknown texture "+b);var D=this.calcDesiredTextureLOD(d,y.images);if(0===y.images.length)continue;var A=y.images[D],x=n.getAppropriateTextureEncoding(y.encoding,this.useCompressedTextures()),I=x>-1?A.hrefConcat[x]:A.hrefConcat,R=this.loadTexture(I,b,y,A,D,x);o.push(R),this.texIdToPromises[b]=R}}return l.all(o)},e.getIdFromJsonPointer=function(e){var t=e.split("/");return t[t.length-1]},e.buildNodeFeatures=function(e,t,r){null==e.features&&(e.features=[]);for(var a in r.featureData){var n=r.featureData[a];e.features.push({id:n.id,mbs:e.mbs,block:t})}},e.prototype.collectGeometries=function(t,r,a,n){var i=[],o=!1,s=0,l=t.features.length-1;null==t.featureData[r].featureRange?o=!0:(s=t.featureData[r].featureRange[0],l=t.featureData[r].featureRange[1]);for(var d=s;l>=d;++d){var h=t.features[d];if(!h.engineMBS){var m=c.create();u.mbsToMbs(h.mbs,this.indexSR,m,this.renderCoordsHelper.spatialReference),m[3]=h.mbs[3],h.engineMBS=m}if(!o||h.block===r){for(var p=a.featureData,g=void 0,v=0;v<p.length;v++)if(p[v].id===h.id){g=p[v];break}f(null!=g,"I3S: unable to find feature data in specified block in node.id "+t.id+" feature.id "+h.id);var b=g.geometries,y=[],D=[];if(null!=b)for(var A=0;A<b.length;A++){var x=g.geometries[A];if("GeometryReference"===x.type){for(var I=e.getIdFromJsonPointer(x.params.$ref),R=void 0,T=0;T<a.geometryData.length;T++){var w=a.geometryData[T];if(w.id+""===I){R=w;break}}if(f(null!=R,"I3S: Unable to find referenced geometry"),null==R.params.material){this.logger.warn("material definition is missing in featureData, node: "+t.id);var C=Object.keys(n.materialDefinitions)[0];R.params.material="/materialDefinitions/"+C}null==R.params.components&&(null!=R.params.texture?R.params.components=[{material:R.params.material,materialID:e.getIdFromJsonPointer(R.params.material),texture:R.params.texture,textureID:e.getIdFromJsonPointer(R.params.texture),id:1}]:R.params.components=[{material:R.params.material,materialID:e.getIdFromJsonPointer(R.params.material),id:1}],null!=R.params.faces&&null!=R.params.faces.position&&(R.params.faces.position.componentIndices=[0]));var O=void 0;O=null;for(var T=0;T<i.length;T++)if(1===i[T].geometries.length&&i[T].geometries[0].id+""===I){O=i[T];break}null===O&&(O={features:[],featureDataPositions:[],featureDataAttributes:[],faceRanges:[],geometries:[R]},i.push(O)),O.features.push(h),O.featureDataAttributes.push(g.attributes),O.featureDataPositions.push(g.position),O.faceRanges.push(x.params.faceRange)}else y.push(x),null!=x.params.faceRange&&D.push(x.params.faceRange)}else null!=g.position&&y.push({id:h.id,type:"Embedded",params:{type:"points",vertexAttributes:{position:[0,0,0]}}});0===D.length&&(D=null),y.length>0&&i.push({features:[h],featureDataAttributes:[g.attributes],featureDataPositions:[g.position],geometries:y,faceRanges:D})}}return i},e.prototype.idHash=function(e){var t=0,r=e.length;if(0===r)return t;for(var a=0;r>a;a++){var n=e.charCodeAt(a);t=(t<<5)-t+n,t|=0}return t},e.prototype.loadFeatureData=function(t,r,a){if(this.bypassFeatureData&&this.defaultGeometrySchema){var n=this.idHash(t.id),i=void 0,o=void 0;null!=a.materialDefinitions&&(i=Object.keys(a.materialDefinitions)[0]),null!=a.textureDefinitions&&(o=Object.keys(a.textureDefinitions)[0]);var u=null,s=e.buildDefaultFeatureData(n,i,o,u);return l.resolve(s)}var f=d.makeAbsolute(t.featureData[r].href,t.baseUrl);return t.featureData[r].hrefConcat=f,this.loadJSON(f)},e.buildDefaultFeatureData=function(e,t,r,a){return{featureData:[{id:e,position:[0,0,0],pivotOffset:[0,0,0],mbb:a,layer:"Default",geometries:[{id:1,type:"GeometryReference",params:{$ref:"/geometryData/0",faceRange:[0,0]}}]}],geometryData:[{id:0,type:"ArrayBufferView",params:{type:"triangles",material:"/materialDefinitions/"+t,texture:null!=r?"/textureDefinitions/"+r:void 0}}]}},e.prototype.handleCancelled=function(){if(this.cancelled)throw h},e}();return m});