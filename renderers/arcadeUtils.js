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
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.

define(["dojo/_base/lang","dojo/_base/array","dojo/has","../kernel","../arcade/arcade"],function(e,r,t,n,a){var c={vars:{$feature:"any",$view:"any"}},u=/^\$feature\./i,i={createSyntaxTree:function(r,t){t=t||e.clone(c);var n;try{n=r?a.parseScript(r,t):null}catch(u){n=null}return n},createFunction:function(r,t){t=t||e.clone(c);var n,u="string"==typeof r?i.createSyntaxTree(r,t):r;try{n=u?a.compileScript(u,t):null}catch(l){n=null}return n},createExecContext:function(e,r){return{vars:{$feature:a.constructFeature(e),$view:r&&r.view},spatialReference:r&&r.sr}},evalSyntaxTree:function(e,r){var t;try{t=a.executeScript(e,r,r.spatialReference)}catch(n){t=null}return t},executeFunction:function(e,r){var t;try{t=e?e(r,r.spatialReference):null}catch(n){t=null}return t},extractFieldNames:function(e,t){var n="string"==typeof e?i.createSyntaxTree(e,t):e,c=a.extractFieldLiterals(n),l=[];return r.forEach(c,function(e){u.test(e)&&(e=e.replace(u,""),l.push(e))}),l.sort(),r.filter(l,function(e,r){return 0===r||l[r-1]!==e})},dependsOnView:function(e){return a.referencesMember(e,"$view")}};return t("extend-esri")&&e.setObject("renderer.arcadeUtils",i,n),i});