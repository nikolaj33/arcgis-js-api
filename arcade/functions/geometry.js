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

define(["require","exports","../../geometry/Geometry","../../geometry/Polygon","../../geometry/Polyline","../../geometry/Point","../../geometry/Extent","../../geometry/Multipoint","../../geometry/support/jsonUtils","../languageUtils","../Dictionary","../Feature"],function(e,r,n,t,i,a,o,l,f,s,c,u){function m(e,r){e.polygon=function(e,n){return r(e,n,function(r,n,i){s.pcCheck(i,1,1);var a=null;if(i[0]instanceof c){if(a=s.fixSpatialReference(u.parseGeometryFromDictionary(i[0]),e.spatialReference),a instanceof t==!1)throw new Error("Illegal Parameter")}else a=i[0]instanceof t?f.fromJSON(i[0].toJSON()):s.fixSpatialReference(new t(JSON.parse(i[0])),e.spatialReference);if(null!==a&&a.spatialReference.equals(e.spatialReference)===!1)throw new Error("Cannot create Geometry in this SpatialReference. Engine is using a different spatial reference.");return s.fixNullGeometry(a)})},e.polyline=function(e,n){return r(e,n,function(r,n,t){s.pcCheck(t,1,1);var a=null;if(t[0]instanceof c){if(a=s.fixSpatialReference(u.parseGeometryFromDictionary(t[0]),e.spatialReference),a instanceof i==!1)throw new Error("Illegal Parameter")}else a=t[0]instanceof i?f.fromJSON(t[0].toJSON()):s.fixSpatialReference(new i(JSON.parse(t[0])),e.spatialReference);if(null!==a&&a.spatialReference.equals(e.spatialReference)===!1)throw new Error("Cannot create Geometry in this SpatialReference. Engine is using a different spatial reference.");return s.fixNullGeometry(a)})},e.point=function(e,n){return r(e,n,function(r,n,t){s.pcCheck(t,1,1);var i=null;if(t[0]instanceof c){if(i=s.fixSpatialReference(u.parseGeometryFromDictionary(t[0]),e.spatialReference),i instanceof a==!1)throw new Error("Illegal Parameter")}else i=t[0]instanceof a?f.fromJSON(t[0].toJSON()):s.fixSpatialReference(new a(JSON.parse(t[0])),e.spatialReference);if(null!==i&&i.spatialReference.equals(e.spatialReference)===!1)throw new Error("Cannot create Geometry in this SpatialReference. Engine is using a different spatial reference.");return s.fixNullGeometry(i)})},e.multipoint=function(e,n){return r(e,n,function(r,n,t){s.pcCheck(t,1,1);var i=null;if(t[0]instanceof c){if(i=s.fixSpatialReference(u.parseGeometryFromDictionary(t[0]),e.spatialReference),i instanceof l==!1)throw new Error("Illegal Parameter")}else i=t[0]instanceof l?f.fromJSON(t[0].toJSON()):s.fixSpatialReference(new l(JSON.parse(t[0])),e.spatialReference);if(null!==i&&i.spatialReference.equals(e.spatialReference)===!1)throw new Error("Cannot create Geometry in this SpatialReference. Engine is using a different spatial reference.");return s.fixNullGeometry(i)})},e.extent=function(e,n){return r(e,n,function(r,n,m){s.pcCheck(m,1,1);var p=null;if(m[0]instanceof c)p=s.fixSpatialReference(u.parseGeometryFromDictionary(m[0]),e.spatialReference);else if(m[0]instanceof a){var g={xmin:m[0].x,ymin:m[0].y,xmax:m[0].x,ymax:m[0].y,spatialReference:m[0].spatialReference.toJSON()};m[0].hasZ?(g.zmin=m[0].z,g.zmax=m[0].z):m[0].hasM&&(g.mmin=m[0].m,g.mmax=m[0].m),p=f.fromJSON(g)}else p=m[0]instanceof t?f.fromJSON(m[0].extent.toJSON()):m[0]instanceof i?f.fromJSON(m[0].extent.toJSON()):m[0]instanceof l?f.fromJSON(m[0].extent.toJSON()):m[0]instanceof o?f.fromJSON(m[0].toJSON()):s.fixSpatialReference(new o(JSON.parse(m[0])),e.spatialReference);if(null!==p&&p.spatialReference.equals(e.spatialReference)===!1)throw new Error("Cannot create Geometry in this SpatialReference. Engine is using a different spatial reference.");return s.fixNullGeometry(p)})},e.geometry=function(e,n){return r(e,n,function(r,n,t){s.pcCheck(t,1,1);var i=null;if(i=t[0]instanceof u?s.fixSpatialReference(t[0].geometry,e.spatialReference):t[0]instanceof c?s.fixSpatialReference(u.parseGeometryFromDictionary(t[0]),e.spatialReference):s.fixSpatialReference(f.fromJSON(JSON.parse(t[0])),e.spatialReference),null!==i&&i.spatialReference.equals(e.spatialReference)===!1)throw new Error("Cannot create Geometry in this SpatialReference. Engine is using a different spatial reference.");return s.fixNullGeometry(i)})},e.feature=function(e,t){return r(e,t,function(r,t,i){if(0===i.length)throw new Error("Missing Parameters");var a=null;if(1===i.length)if(s.isString(i[0]))a=u.fromJson(JSON.parse(i[0]));else if(i[0]instanceof u)a=new u(i[0]);else if(i[0]instanceof n)a=new u(null,i[0]);else{if(!(i[0]instanceof c))throw new Error("Illegal Argument");var o=i[0].hasField("geometry")?i[0].field("geometry"):null,l=i[0].hasField("attributes")?i[0].field("attributes"):null;null!==o&&o instanceof c&&(o=u.parseGeometryFromDictionary(o)),null!==l&&(l=u.parseAttributesFromDictionary(l)),a=new u(l,o)}else if(2===i.length){var o=null,l=null;if(null!==i[0])if(i[0]instanceof n)o=i[0];else{if(!(o instanceof c))throw new Error("Illegal Argument");o=u.parseGeometryFromDictionary(i[0])}if(null!==i[1]){if(!(i[1]instanceof c))throw new Error("Illegal Argument");l=u.parseAttributesFromDictionary(i[1])}a=new u(l,o)}else{var o=null,l={};if(null!==i[0])if(i[0]instanceof n)o=i[0];else{if(!(o instanceof c))throw new Error("Illegal Argument");o=u.parseGeometryFromDictionary(i[0])}for(var f=1;f<i.length;f+=2){var m=s.toString(i[f]),p=i[f+1];if(!(null===p||void 0===p||s.isString(p)||isNaN(p)||s.isDate(p)||s.isNumber(p)||s.isBoolean(p)))throw new Error("Illegal Argument");if(s.isFunctionParameter(p)||s.isSimpleType(p)===!1)throw new Error("Illegal Argument");p===s.voidOperation?l[m]=null:l[m]=p}a=new u(l,o)}return a.geometry=s.fixSpatialReference(a.geometry,e.spatialReference),a.immutable=!1,a})},e.dictionary=function(e,n){return r(e,n,function(e,r,n){if(0===n.length)throw new Error("Missing Parameters");if(n.length%2!==0)throw new Error("Missing Parameters");for(var t={},i=0;i<n.length;i+=2){var a=s.toString(n[i]),o=n[i+1];if(!(null===o||void 0===o||s.isString(o)||isNaN(o)||s.isDate(o)||s.isNumber(o)||s.isBoolean(o)||s.isArray(o)||s.isImmutableArray(o)))throw new Error("Illegal Argument");if(s.isFunctionParameter(o))throw new Error("Illegal Argument");o===s.voidOperation?t[a]=null:t[a]=o}var l=new c(t);return l.immutable=!1,l})},e.haskey=function(e,n){return r(e,n,function(e,r,n){s.pcCheck(n,2,2);var t=s.toString(n[1]);if(n[0]instanceof u)return n[0].hasField(t);if(n[0]instanceof c)return n[0].hasField(t);throw new Error("Illegal Argument")})},e.indexof=function(e,n){return r(e,n,function(e,r,n){s.pcCheck(n,2,2);var t=n[1];if(s.isArray(n[0])){for(var i=0;i<n[0].length;i++)if(s.equalityTest(t,n[0][i]))return i;return-1}if(s.isImmutableArray(n[0])){for(var a=n[0].length(),i=0;a>i;i++)if(s.equalityTest(t,n[0].get(i)))return i;return-1}throw new Error("Illegal Argument")})}}Object.defineProperty(r,"__esModule",{value:!0}),r.registerFunctions=m});