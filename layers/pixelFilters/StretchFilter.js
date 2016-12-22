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
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","../PixelBlock"],function(t,i,s){"use strict";var a;return t(null,{stretchType:0,min:0,max:255,numberOfStandardDeviations:2,statistics:null,histograms:null,dra:!1,minPercent:.25,maxPercent:.5,useGamma:!1,gamma:null,raster:null,outputPixelType:"U8",computeGamma:!1,constructor:function(t){this.stretchType=t.stretchType||t.StretchType||this.stretchType,this.min=t.min||t.Min||this.min,this.max=t.max||t.Max||this.max,this.numberOfStandardDeviations=t.numberOfStandardDeviations||t.NumberOfStandardDeviations||this.numberOfStandardDeviations,this.statistics=t.statistics||t.Statistics||this.statistics,this.dra=t.dra||t.DRA||t.dRA||this.dra,this.minPercent=t.minPercent||t.MinPercent||this.minPercent,this.maxPercent=t.maxPercent||t.MaxPercent||this.maxPercent,this.useGamma=t.useGamma||t.UseGamma||this.useGamma,this.gamma=t.gamma||t.Gamma||this.gamma,this.computeGamma=t.computeGamma||t.ComputeGamma||this.computeGamma,this.raster=t.raster||t.Raster||this.raster,this.outputPixelType=t.outputPixelType||t.OutputPixelType||this.outputPixelType,this.raster=t.raster||t.Raster||this.raster,a=this},filter:function(t){if(null!==t&&null!==t.pixelBlock&&null!==t.pixelBlock.pixels){var i,s,e=t.pixelBlock,r=e.pixels,n=e.width*e.height,m=r.length,o=6===a.stretchType||3===a.stretchType&&a.dra;if(o&&a._calculateStatisticsHistograms(t),a.dra)if(o)a._statistics=e.statistics,a._histograms=e.histograms;else{var u=e.statistics;for(a._statistics=[],i=0;m>i;i++)a._statistics[i]=[u[i].minValue,u[i].maxValue,0,0]}else a._statistics=a.statistics,a._histograms=a.histograms;if(a.computeGamma&&(a.gamma=a._computeGammaValues(e.pixelType),a.useGamma=!0),a._createLUT(t),void 0===a.LUT||null===a.LUT)return a._filterNoLUT(t);var h,l,f=a.LUT,c=a.LUTOffset;for(i=0;m>i;i++)for(l=f[i],s=0;n>s;s++)h=r[i][s],r[i][s]=l[h-c];return t.pixelBlock.pixelType="U8",t}},_calculateStatisticsHistograms:function(t){var s,a,e,r,n,m,o,u,h,l,f,c,p,x,g,_,d,T=t.pixelBlock,M=T.pixelType,v=T.pixels,y=T.mask,U=v.length,S=function(t){this.min=-.5,this.max=255.5,this.size=256,i.mixin(this,t),this.counts=this.counts||new Uint32Array(this.size)},P=[];for(r=0;U>r;r++){if(m=new S,o=m.counts,h=v[r],"U8"===M)if(y)for(n=0;n<T.width*T.height;n++)y[n]&&o[h[n]]++;else for(n=0;n<T.width*T.height;n++)o[h[n]]++;else{if(s=T.statistics[r].minValue,a=T.statistics[r].maxValue,m.min=s,m.max=a,e=(a-s)/256,u=new Uint32Array(257),y)for(n=0;n<T.width*T.height;n++)y[n]&&u[Math.floor((h[n]-s)/e)]++;else for(n=0;n<T.width*T.height;n++)u[Math.floor((h[n]-s)/e)]++;for(n=0;255>n;n++)o[n]=u[n];o[255]=u[255]+u[256]}for(P.push(m),l=[],s=T.statistics[r].minValue,a=T.statistics[r].maxValue,f=0,c=0,g=0,n=0;n<m.size;n++)f+=o[n],c+=n*o[n];for(_=c/f,n=0;n<m.size;n++)g+=o[n]*Math.pow(n-_,2);d=Math.sqrt(g/(f-1)),p=(_+.5)*(m.max-m.min)/m.size+m.min,x=d*(m.max-m.min)/m.size,l.push(s),l.push(a),l.push(p),l.push(x),T.statistics[r]=l}T.histograms=P},_getCutOffPoints:function(t){var i,s,e,r,n,m,o,u=t.pixelBlock.pixels,h=u.length,l=[],f=[];switch(a.stretchType){case 5:for(m=0;h>m;m++)l[m]=a._statistics[m][0],f[m]=a._statistics[m][1];break;case 3:for(m=0;h>m;m++)l[m]=a._statistics[m][2]-a.numberOfStandardDeviations*a._statistics[m][3],f[m]=a._statistics[m][2]+a.numberOfStandardDeviations*a._statistics[m][3],l[m]<a._statistics[m][0]&&(l[m]=a._statistics[m][0]),f[m]>a._statistics[m][1]&&(f[m]=a._statistics[m][1]);break;case 6:for(m=0;h>m;m++){for(i=a._histograms[m],r=new Uint32Array(i.size),e=i.counts,s=0,o=0;o<i.size;o++)s+=e[o],r[o]=s;for(n=a.minPercent*s/100,o=1;o<i.size;o++)if(r[o]>n){l[m]=i.min+(i.max-i.min)/i.size*(o-.5);break}for(n=(1-a.maxPercent/100)*s,o=i.size-2;o>=0;o--)if(r[o]<n){f[m]=i.min+(i.max-i.min)/i.size*(o+.5);break}}break;default:for(m=0;h>m;m++)l[m]=0,f[m]=255}return{minCutOff:l,maxCutOff:f}},_createLUT:function(t){var i=t.pixelBlock,s=i.pixelType,e="U8"===s||"U16"===s||"S8"===s||"S16"===s;if(e){if(a._LUTSignature){var r=a._computeLutSignature(),n=r.length===a._LUTSignature.length&&!r.some(function(t,i){return t!==a._LUTSignature[i]});if(n)return}var m,o,u,h,l,f=i.pixels,c=f.length,p=[],x=[],g=[],_=[],d=a.max,T=a.min,M=a.gamma,v=d-T,y=a._getCutOffPoints(t),U=y.minCutOff,S=y.maxCutOff,P=0,w=256;for("S8"===i.pixelType?P=-127:"S16"===i.pixelType&&(P=-32767),("U16"===i.pixelType||"S16"===i.pixelType)&&(w=65536),m=0;c>m;m++)x[m]=S[m]-U[m],p[m]=v/(S[m]-U[m]);if(a.useGamma&&null!==M&&M.length===c)for(m=0;c>m;m++)M[m]>1?M[m]>2?_[m]=6.5+Math.pow(M[m]-2,2.5):_[m]=6.5+100*Math.pow(2-M[m],4):_[m]=1;if(a.useGamma){var G;for(m=0;c>m;m++){for(l=[],o=0;w>o;o++)u=o+P,G=(u-U[m])/x[m],h=1,M[m]>1&&(h-=Math.pow(1/v,G*_[m])),u<S[m]&&u>U[m]?l[o]=Math.floor(h*v*Math.pow(G,1/M[m]))+T:u>S[m]?l[o]=d:u<U[m]&&(l[o]=T);g[m]=l}}else for(m=0;c>m;m++){for(l=[],o=0;w>o;o++)u=o+P,u<U[m]?l[o]=T:u>S[m]?l[o]=d:l[o]=Math.floor((u-U[m])/x[m]*v)+T;g[m]=l}a.LUT=g,a.LUTOffset=P,a._LUTSignature=a._computeLutSignature()}},_computeLutSignature:function(){var t,i,s=[];if(s.push(a.stretchType),s.push(a.min),s.push(a.max),s.push(a.numberOfStandardDeviations),a._statistics)for(t=0;t<a._statistics.length;t++)for(i=0;i<a._statistics[t].length;i++)s.push(a._statistics[t][i]);if(s.push(a.dra?1:0),s.push(a.minPercent),s.push(a.maxPercent),a.gamma)for(t=0;t<a._statistics.length;t++)s.push(a.gamma[t]);return s.push(a.useGamma?1:0),s},_filterNoLUT:function(t){if(null!==t&&null!==t.pixelBlock&&null!==t.pixelBlock.pixels){var i,s,e,r,n,m=t.pixelBlock,o=m.pixels,u=m.mask,h=m.width*m.height,l=o.length,f=[],c=[],p=[],x=a.max,g=a.min,_=a.gamma,d=x-g,T=a._getCutOffPoints(t),M=T.minCutOff,v=T.maxCutOff;for(i=0;l>i;i++)c[i]=v[i]-M[i],f[i]=d/(v[i]-M[i]);if(a.useGamma&&null!==_&&_.length===l)for(i=0;l>i;i++)_[i]>1?_[i]>2?p[i]=6.5+Math.pow(_[i]-2,2.5):p[i]=6.5+100*Math.pow(2-_[i],4):p[i]=1;if(a.useGamma)if(void 0!==u&&null!==u){for(s=0;h>s;s++)if(u[s])for(i=0;l>i;i++)e=o[i][s],n=(e-M[i])/c[i],r=1,_[i]>1&&(r-=Math.pow(1/d,n*p[i])),e<v[i]&&e>M[i]?o[i][s]=Math.floor(r*d*Math.pow(n,1/_[i]))+g:e>v[i]?o[i][s]=x:e<M[i]&&(o[i][s]=g)}else for(s=0;h>s;s++)for(i=0;l>i;i++)e=o[i][s],n=(e-M[i])/c[i],r=1,_[i]>1&&(r-=Math.pow(1/d,n*p[i])),e<v[i]&&e>M[i]?o[i][s]=Math.floor(r*d*Math.pow(n,1/_[i]))+g:e>v[i]?o[i][s]=x:e<M[i]&&(o[i][s]=g);else if(void 0!==u&&null!==u){for(s=0;h>s;s++)if(u[s])for(i=0;l>i;i++)e=o[i][s],e<v[i]&&e>M[i]?o[i][s]=Math.floor((e-M[i])/c[i]*d)+g:e>v[i]?o[i][s]=x:e<M[i]&&(o[i][s]=g)}else for(s=0;h>s;s++)for(i=0;l>i;i++)e=o[i][s],e<v[i]&&e>M[i]?o[i][s]=Math.floor((e-M[i])/c[i]*d)+g:e>v[i]?o[i][s]=x:e<M[i]&&(o[i][s]=g);return t.pixelBlock.pixelType="U8",t}},_computeGammaValues:function(t){var i,s,a=this._statistics.length,e=[];for(i=0;a>i;i++)s=this._statistics[i][2],"U8"!==t&&(s=255*(s-this._statistics[i][0])/(this._statistics[i][1]-this._statistics[i][0])),e.push(this._computeGammaValue(s));return e},_computeGammaValue:function(t){var i;if(0===t)return i;if(t>255||0>t)return i;var s=0;t>0&&150!=t&&255>t&&(s=150>=t?45*Math.cos(.01047*t):17*Math.sin(.021*t));var a=255,e=t+s,r=Math.log(t/a),n=Math.log(e/a);if(0===n)return i;var m=r/n;return isNaN(m)?i:Math.min(9.9,Math.max(.01,m))}})});