// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/4.4/esri/copyright.txt for details.

define(["../webgl-engine/lib/Geometry","../webgl-engine/lib/GeometryData","../lib/glMatrix","../support/earthUtils","../support/mathUtils","./TerrainConst"],function(e,t,r,n,a,i){function u(e,t,r,n,a){e<n[0]&&(n[0]=e),e>a[0]&&(a[0]=e),t<n[1]&&(n[1]=t),t>a[1]&&(a[1]=t),r<n[2]&&(n[2]=r),r>a[2]&&(a[2]=r)}function s(e,t,r){for(var n=0;n<r.length;n++){var u=r[n];if(u){var s=u.safeWidth,o=u.width,c=u.pixelData,l=a.clamp(u.dy*(u.y1-t),0,s),v=a.clamp(u.dx*(e-u.x0),0,s),f=Math.floor(l),g=Math.floor(v),d=f*o+g,h=d+o,A=c[d],y=c[h],m=c[d+1],I=c[h+1];if(A+y+m+I<.5*i.ELEVATION_NODATA_VALUE){l-=f,v-=g;var M=A+(m-A)*v,p=y+(I-y)*v;return M+(p-M)*l}}}return null}var o=n.earthRadius,c=r.vec3d,l=a.lerp,v=function(){var e,t,r,n=c.create(),a=c.create(),i=c.create();this.init=function(u,s){t=u,r=s,c.subtract(i,a,n),e=.5*c.length(n),c.lerp(a,i,.5,n)},this.getCenter=function(){return n},this.getBSRadius=function(){return e},this.getBBMin=function(){return a},this.getBBMax=function(){return i},this.getPosition=function(){return t},this.getIndices=function(){return r},this.getPrimitiveIndices=function(){},this.getChildren=function(){}},f=function(e,t,r,n){for(var a=e*o,i=0;t>=i;i++)r[5*n]=0,r[5*n+1]=0,r[5*n+2]=a,n++},g=50,d=50,h=function(){var r=new Array(g),n=0,a={};this.get=function(u){var s=a[u];s||(s={ptr:0,data:new Array(d)},a[u]=s);var o;if(s.ptr>0?(i.vertexArrayHits++,o=s.data[--s.ptr],s.data[s.ptr]=null):(i.vertexArrayMisses++,o=new Float32Array(u)),n>0){i.geometryHits++;var c=r[--n];return r[n]=null,c.getData().getVertexAttr().terrain.data=o,c}i.geometryMisses++;var l={terrain:null},f={};f.terrain={size:5,data:o};var g=[{type:"triangle",indices:l,positionKey:"terrain"}],h=new v;return new e(new t(g,f),"tile",[h])},this.put=function(e){var t=e.getData(),i=t.getVertexAttr(),u=i.terrain.data,s=a[u.length];s.ptr<d&&(s.data[s.ptr++]=u),i.terrain.data=null,t.getFaces()[0].indices.terrain=null,g>n&&(r[n++]=e)};var i={geometryHits:0,geometryMisses:0,vertexArrayHits:0,vertexArrayMisses:0};this.stats=i,this._pools={geometry:r,vertexArray:a}},A=new h,y=[],m=new Array(i.MAX_TILE_TESSELATION+1),I=new Array(i.MAX_TILE_TESSELATION+1),M=new Array(i.MAX_TILE_TESSELATION+1),p=new Array(i.MAX_TILE_TESSELATION+1),S=65536,x=function(e,t,r,n,a,i,v,g,d){var h=o,y=r[0],S=r[1],x=r[2],w=r[3],T=Math.max(.9,1-.5*(x-y)),B=e-1,_=e-1,L=e*e,b=2*B+2*_,D=A.get(5*(L+b)),V=D.getData().getVertexAttr().terrain.data,O=t[2]-t[0],N=t[3]-t[1],P=x-y,k=i[0],G=i[1],U=i[2],H=D.getBoundingInfo(0),X=H.getBBMin(),C=H.getBBMax();c.set3(1e7,1e7,1e7,X),c.set3(-1e7,-1e7,-1e7,C);var F,R;for(F=0;B>=F;F++){var W=F/B,j=y+W*P;m[F]=Math.sin(j),I[F]=Math.cos(j),M[F]=W,p[F]=t[0]+W*O}var z=0;for(R=0;_>=R;R++){var K,q=R/_,J=l(S,w,q),Q=Math.cos(J),Y=Math.sin(J);for(n?(K=o/2*Math.log((1+Y)/(1-Y)),q=(K-t[1])/N):K=180*J/Math.PI,F=0;B>=F;F++){W=M[F];var Z=m[F],$=I[F],ee=h;a&&(ee+=s(p[F],K,a)||0);var te=$*Q*ee,re=Z*Q*ee,ne=Y*ee,ae=te-k,ie=re-G,ue=ne-U;u(ae,ie,ue,X,C);var se=5*z;V[se+0]=ae,V[se+1]=ie,V[se+2]=ue,V[se+3]=W,V[se+4]=q;var oe=-1;if(0===R&&(oe=L+F),F===B&&(oe=L+B+R),R===_&&(oe=L+B+_+(B-F)),0===F&&R>0&&(oe=L+2*B+_+(_-R)),oe>-1){var ce=te*T-k,le=re*T-G,ve=ne*T-U;u(ce,le,ve,X,C),se=5*oe,V[se+0]=ce,V[se+1]=le,V[se+2]=ve,V[se+3]=W,V[se+4]=q}++z}}if(n){var fe=!!(1&v),ge=!!(2&v);fe&&f(-1,B,V,L),ge&&f(1,B,V,L+B+_)}return E(D,e,n?v:0,g,d)},w=function(e,t,r,n,a,i,o){var l,v,f=t[0],g=t[1],d=t[2]-f,h=t[3]-g,y=.1*d,m=e-1,I=e-1,M=e*e,p=2*m+2*I,S=A.get(5*(M+p)),x=S.getData().getVertexAttr().terrain.data,w=0,T=S.getBoundingInfo(0),B=T.getBBMin(),_=T.getBBMax();for(c.set3(1e7,1e7,1e7,B),c.set3(-1e7,-1e7,-1e7,_),v=0;I>=v;v++){var L=v/I,b=g+L*h;for(i&&(b<i[1]?(b=i[1],L=(b-g)/h):b>i[3]&&(b=i[3],L=(b-g)/h)),l=0;m>=l;l++){var D=l/m,V=f+D*d;i&&(V<i[0]?(V=i[0],D=(V-f)/d):V>i[2]&&(V=i[2],D=(V-f)/d));var O=r?s(V,b,r)||0:0,N=V-n[0],P=b-n[1],k=O-n[2];u(N,P,k,B,_),x[5*w]=N,x[5*w+1]=P,x[5*w+2]=k,x[5*w+3]=D,x[5*w+4]=L;var G=-1;0===v&&(G=M+l),l===m&&(G=M+m+v),v===I&&(G=M+m+I+(m-l)),0===l&&v>0&&(G=M+2*m+I+(I-v)),G>-1&&(x[5*G]=N,x[5*G+1]=P,x[5*G+2]=k-y,x[5*G+3]=D,x[5*G+4]=L,u(N,P,k-y,B,_)),++w}}return E(S,e,0,a,o)},T={values:null,numSurfaceIndices:0,numSkirtIndices:0},B=function(e,t,r){return r||(e.values=t.values),e.numSurfaceIndices=t.numSurfaceIndices,e.numSkirtIndices=t.numSkirtIndices,e},E=function(e,t,r,n,a){var i=_(t,r,n,T),u=e.getData(),s=u.getVertexAttr();return u.getFaces()[0].indices.terrain=i.values,e.getBoundingInfo(0).init(s.terrain,i.values),a||(a={}),a.geometry=e,a.numWithoutSkirtIndices=i.numSurfaceIndices+(r?6*(t-1)*(n?2:1):0),a.numVertsPerRow=t,B(a,i,!0)},_=function(e,t,r,n){var a=2&t,i=e+(r?1024:0)+(a?2048:0),u=y[i];if(n||(n={}),u)return B(n,u),n;var s,o=e-1,c=e-1,l=e*e,v=2*o+2*c,f=o*c*2*3,g=6*v,d=6*(2*o+c-1);r&&(f*=2,g*=2,d*=2),s=l+v>S?new Uint32Array(f+g):new Uint16Array(f+g);for(var h,A,m,I,M=0,p=0,x=f,w=0,T=0;c>=T;T++){a&&(w=0===T?d:T===c?-d:0),x+=w;for(var E=0;o>=E;E++){var _=-1,L=-1;if(0===T&&(_=l+E,E!==o&&(L=M+1)),E===o&&(_=l+o+T,c>T&&(L=M+o+1)),T===c&&(_=l+o+c+(o-E),E>0&&(L=M-1)),0===E&&T>0&&(_=l+2*o+c+(c-T),L=M-(o+1)),_>-1){var b=0===E&&1===T?l:_+1;L>-1&&(h=M,A=_,m=b,I=L,r?(s[x+0]=h,s[x+1]=A,s[x+2]=A,s[x+3]=m,s[x+4]=m,s[x+5]=h,s[x+6]=m,s[x+7]=I,s[x+8]=I,s[x+9]=h,s[x+10]=h,s[x+11]=m,x+=12):(s[x+0]=h,s[x+1]=A,s[x+2]=m,s[x+3]=m,s[x+4]=I,s[x+5]=h,x+=6))}++M,o>E&&c>T&&(h=T*(o+1)+E,A=h+1,m=A+(o+1),I=m-1,r?(s[p+0]=h,s[p+1]=A,s[p+2]=A,s[p+3]=m,s[p+4]=m,s[p+5]=h,s[p+6]=m,s[p+7]=I,s[p+8]=I,s[p+9]=h,s[p+10]=h,s[p+11]=m,p+=12):(s[p+0]=h,s[p+1]=A,s[p+2]=m,s[p+3]=m,s[p+4]=I,s[p+5]=h,p+=6))}x-=w}return n.values=s,n.numSurfaceIndices=f,n.numSkirtIndices=g,y[i]=B({},n),n};return{createPlanarGlobeTile:w,createSphericalGlobeTile:x,releaseGeometry:A.put,elevationSampler:s,_geometryObjectPool:A}});