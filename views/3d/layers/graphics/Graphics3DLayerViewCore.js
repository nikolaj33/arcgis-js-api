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
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.

define(["require","exports","../../../../core/HandleRegistry","../../../../core/watchUtils","../../../../core/promiseUtils","./Graphics3DCore","./Graphics3DLabeling","./Graphics3DScaleVisibility","./Graphics3DFrustumVisibility","./Graphics3DElevationAlignment","./Graphics3DSpatialIndex","./Graphics3DVerticalScale"],function(i,e,t,s,n,a,l,r,h,o,d,u){var p=function(){function i(i){var e=this;if(this._handles=new t,this.layer=i.layer,this.owner=i.owner,this.updateClippingExtent=i.updateClippingExtent,this.updateSuspendResumeExtent=i.updateSuspendResumeExtent,this.elevationChanged=i.elevationChanged,this.graphicsCore=new a,i.spatialIndexRequired&&(this.spatialIndex=new d),i.frustumVisibilityEnabled){this.frustumVisibility=new h;var n=this.owner.view.basemapTerrain;this._handles.add([this.owner.view.on("resize",function(){return e.frustumVisibility.viewChange()}),this.owner.view.navigation.on("currentViewChanged",function(){return e.frustumVisibility.viewChange()}),n.on("elevation-bounds-change",function(){return e.frustumVisibility.elevationBoundsChange()})]),"local"===this.owner.view.viewingMode?this.frustumVisibility.isVisibleBelowSurface=!0:this._handles.add(s.init(n,["opacity","wireframe"],function(){return e.frustumVisibility.isVisibleBelowSurface=n._renderer.isTransparent()}))}i.scaleVisibilityEnabled&&(i.spatialIndexRequired?(this.scaleVisibility=new r,this._handles.add(this.layer.watch("minScale,maxScale,labelingInfo",function(){return e.scaleVisibility.layerMinMaxScaleChangeHandler()}))):console.warn("scaleVisibility requires a spatialIndex")),i.elevationAlignmentEnabled&&(this.elevationAlignment=new o,this._handles.add(this.layer.watch("elevationInfo",function(){return e.graphicsCore.elevationInfoChange()}))),i.labelingEnabled&&(this.labeling=new l,this._handles.add(this.layer.watch("labelsVisible",function(){return e.labeling.labelVisibilityChanged()})),this._handles.add(this.layer.watch("labelingInfo",function(){return e.labeling.updateLabelingInfo()}))),i.verticalScaleEnabled&&(this.verticalScale=new u({sourceSpatialReference:this.layer.spatialReference,destSpatialReference:this.owner.view.spatialReference}))}return i.prototype.initialize=function(){var i=this;return this.whenSpatialIndexLoaded().then(function(){return i.deferredInitialize()})},i.prototype.whenSpatialIndexLoaded=function(){return this.spatialIndex?this.spatialIndex.whenLoaded():n.resolve()},i.prototype.deferredInitialize=function(){var i=this;this.spatialIndex&&this.spatialIndex.initialize(this.owner,this.layer,this.owner.view.spatialReference,this.graphicsCore),this.frustumVisibility&&this.frustumVisibility.initialize(this.owner);var e=this.owner.view.basemapTerrain;if(this.scaleVisibility&&this.scaleVisibility.initialize(this.owner,this.layer,this.spatialIndex,this.graphicsCore,e),this.elevationAlignment&&this.elevationAlignment.initialize(this.owner,function(e,t,s){return i._elevationChanged(e,t,s)},this.graphicsCore,e),this.labeling){var t=this.layer;this.labeling.initialize(this.owner,t,function(e,t){return i._labelGraphicCreated(e,t)},this.graphicsCore)}return this.graphicsCore.initialize(this.owner,this.layer,this.elevationAlignment,this.scaleVisibility,this.spatialIndex,this.labeling,function(){i.updateSuspendResumeExtent&&i._updateSuspendResumeExtent(i.updateSuspendResumeExtent())},function(e){return i.verticalScale?i.verticalScale.adjust(e):e},e),this._handles.add([this.layer.watch("renderer",function(e){return i.graphicsCore.rendererChange(e)}),this.owner.watch("fullOpacity",function(){return i.graphicsCore.opacityChange()})]),this._handles.add(this.layer.on("graphic-update",function(e){return i.graphicsCore.graphicUpdateHandler(e)})),this.owner.view.resourceController.registerIdleFrameWorker(this,{needsUpdate:this._needsIdleUpdate,idleFrame:this._idleUpdate}),this.updateClippingExtent&&(this._handles.add(this.owner.view.watch("clippingArea",function(){return i._updateClippingExtent()})),this._updateClippingExtent()),this.labeling?this.labeling.updateLabelingInfo():void 0},i.prototype.destroy=function(){this.owner&&this.owner.view.resourceController.deregisterIdleFrameWorker(this),this._handles&&(this._handles.destroy(),this._handles=null),this.frustumVisibility&&(this.frustumVisibility.destroy(),this.frustumVisibility=null),this.scaleVisibility&&(this.scaleVisibility.destroy(),this.scaleVisibility=null),this.elevationAlignment&&(this.elevationAlignment.destroy(),this.elevationAlignment=null),this.labeling&&(this.labeling.destroy(),this.labeling=null),this.graphicsCore&&(this.graphicsCore.destroy(),this.graphicsCore=null),this.spatialIndex&&(this.spatialIndex.destroy(),this.spatialIndex=null),this.layer=null,this.owner=null},i.prototype.canResume=function(){return(!this.frustumVisibility||this.frustumVisibility.canResume())&&(!this.scaleVisibility||this.scaleVisibility.canResume())},i.prototype._needsIdleUpdate=function(){return this.frustumVisibility&&this.frustumVisibility.needsIdleUpdate()?!0:this.scaleVisibility&&this.scaleVisibility.needsIdleUpdate()?!0:this.elevationAlignment&&this.elevationAlignment.needsIdleUpdate()?!0:this.graphicsCore&&this.graphicsCore.needsIdleUpdate()?!0:!1},i.prototype._idleUpdate=function(i){this.frustumVisibility&&this.frustumVisibility.idleUpdate(i),this.scaleVisibility&&this.scaleVisibility.idleUpdate(i),this.elevationAlignment&&this.elevationAlignment.idleUpdate(i),this.graphicsCore&&this.graphicsCore.idleUpdate(i)},i.prototype._updateSuspendResumeExtent=function(i){this.frustumVisibility&&this.frustumVisibility.setExtent(i),this.scaleVisibility&&this.scaleVisibility.setExtent(i)},i.prototype._updateClippingExtent=function(){var i=this.owner.view.clippingArea;this.graphicsCore.setClippingExtent(i,this.owner.view.spatialReference)&&(this.updateClippingExtent(i)||this.graphicsCore.recreateAllGraphics())},i.prototype._elevationChanged=function(i,e,t){this.elevationChanged?this.elevationChanged(i,e,t):this.spatialIndex&&this.spatialIndex.intersects(i,e,t)},i.prototype._labelGraphicCreated=function(i,e){this.scaleVisibility&&this.scaleVisibility.updateGraphicLabelScaleVisibility(i,e)},i}();return p});