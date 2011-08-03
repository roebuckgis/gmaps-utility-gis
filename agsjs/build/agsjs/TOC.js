dojo.provide("agsjs.TOC");dojo.require("dijit._Widget");dojo.require("dijit._Templated");dojo.require("dijit.form.Slider");(function(){var a=dojo.create("link",{type:"text/css",rel:"stylesheet",href:dojo.moduleUrl("agsjs","css/TOC.css")});dojo.doc.getElementsByTagName("head")[0].appendChild(a)})();
dojo.declare("agsjs._TOCNode",[dijit._Widget,dijit._Templated],{templateString:'<div class="agsTOCNode"><div data-dojo-attach-point="rowNode" data-dojo-attach-event="onclick:_onClick"><span data-dojo-attach-point="contentNode" class="agsTOCContent"><img src="${_blankGif}" alt="" data-dojo-attach-point="iconNode" /><input type="checkbox" data-dojo-attach-point="checkNode"/><span data-dojo-attach-point="labelNode"></span></span></div><div data-dojo-attach-point="containerNode" style="display: none;"> </div></div>',constructor:function(a){this.service=
a.service;this.layer=a.layer;this.legend=a.legend;this.serviceTOC=a.serviceTOC},postCreate:function(){dojo.style(this.rowNode,"paddingLeft",""+this.serviceTOC.toc.indentSize*this.serviceTOC._currentIndent+"px");var a=null,b="",d=this.iconNode.src;if(this.legend){a=this.legend;this._createLegendNode(this.legend);b=a.label}else if(this.layer){a=this.layer;this._createLayerNode(this.layer);b=a.name;this._adjustToState()}else if(this.service){a=this.service;this._createServiceNode(this.service);dojo.forEach(this.serviceTOC.toc.layerInfos,
function(c){if(a==c.layer){b=c.title;if(!b){c=a.url.toLowerCase().indexOf("/rest/services/");var e=a.url.toLowerCase().indexOf("/mapserver",c);b=a.url.substring(c+15,e)}}})}this.labelNode.innerHTML=b;if(this.checkNode)this.checkNode.checked=a.visible;if(this.iconNode.src==d){dojo.addClass(this.iconNode,"dijitTreeExpando");dojo.addClass(this.iconNode,a.visible?"dijitTreeExpandoOpened":"dijitTreeExpandoClosed")}dojo.style(this.containerNode,"display",a.visible?"block":"none");this.serviceTOC.toc.style==
"inline"&&dojo.place(this.iconNode,this.checkNode,"after")},_createServiceNode:function(a){dojo.addClass(this.rowNode,"agsTOCService");dojo.addClass(this.labelNode,"agsTOCServiceLabel");if(this.serviceTOC.toc.slider){this.slider=new dijit.form.HorizontalSlider({showButtons:false,value:100,intermediateChanges:true,style:"width:100%;padding:0 20px 0 20px",tooltip:"adjust transparency",onChange:function(b){a.setOpacity(b/100)},layoutAlign:"right"});this.slider.placeAt(this.rowNode,"last")}this._createChildrenNodes(a.tocInfos,
"layer")},_createLayerNode:function(a){if(a.subLayerInfos){dojo.destroy(this.checkNode);dojo.addClass(this.rowNode,"agsTOCGroup");dojo.addClass(this.labelNode,"agsTOCGroupLabel");this._createChildrenNodes(a.subLayerInfos,"layer")}else{dojo.addClass(this.rowNode,"agsTOCLayer");dojo.addClass(this.labelNode,"agsTOCLayerLabel");this.service instanceof esri.layers.TiledMapServiceLayer&&dojo.destroy(this.checkNode);if(a.legends)if(this.serviceTOC.toc.style=="inline"&&a.legends.length==1){this.iconNode.src=
this._getLegendIconUrl(a.legends[0]);dojo.destroy(this.containerNode)}else this._createChildrenNodes(a.legends,"legend")}this.serviceTOC._layerWidgets.push(this)},_createLegendNode:function(a){dojo.destroy(this.checkNode);dojo.destroy(this.containerNode);dojo.addClass(this.labelNode,"agsTOCLegendLabel");this.iconNode.src=this._getLegendIconUrl(a)},_getLegendIconUrl:function(a){var b=a.url;if(!dojo.isIE&&a.imageData&&a.imageData.length>0)b="data:image/png;base64,"+a.imageData;else if(b.indexOf("http")!==
0)b=this.service.url+"/"+this.layer.id+"/images/"+b;return b},_createChildrenNodes:function(a,b){this.serviceTOC._currentIndent++;dojo.forEach(a,function(d){var c={serviceTOC:this.serviceTOC,service:this.service,layer:this.layer,legend:this.legend};c[b]=d;(new agsjs._TOCNode(c)).placeAt(this.containerNode)},this);this.serviceTOC._currentIndent--},_toggleContainer:function(a){if(dojo.hasClass(this.iconNode,"dijitTreeExpandoClosed")||dojo.hasClass(this.iconNode,"dijitTreeExpandoOpened")){if(a){dojo.removeClass(this.iconNode,
"dijitTreeExpandoClosed");dojo.addClass(this.iconNode,"dijitTreeExpandoOpened")}else if(a===false){dojo.removeClass(this.iconNode,"dijitTreeExpandoOpened");dojo.addClass(this.iconNode,"dijitTreeExpandoClosed")}else{dojo.toggleClass(this.iconNode,"dijitTreeExpandoClosed");dojo.toggleClass(this.iconNode,"dijitTreeExpandoOpened")}dojo.style(this.containerNode,"display",dojo.hasClass(this.iconNode,"dijitTreeExpandoOpened")?"block":"none")}},_adjustToState:function(){if(this.layer){this.checkNode.checked=
this.layer.visible;var a=esri.geometry.getScale(this.serviceTOC.toc.map);if(this.layer.maxScale!=0&&a<this.layer.maxScale||this.layer.minScale!=0&&a>this.layer.minScale){dojo.addClass(this.domNode,"agsTOCOutScale");if(this.checkNode)this.checkNode.disabled=true}else{dojo.removeClass(this.domNode,"agsTOCOutScale");this.checkNode.disabled=false}}},_onClick:function(a){a=a.target;if(a==this.checkNode){this.serviceTOC.toc.style=="inline"&&this._toggleContainer(this.checkNode.checked);if(this.layer){this.layer.visible=
this.checkNode.checked;var b=[];dojo.forEach(this.service.layerInfos,function(d){d.subLayerIds||d.visible&&b.push(d.id)});b.length===0&&b.push(-1);this.service.setVisibleLayers(b,false);this.serviceTOC._refreshLayer()}else this.service&&this.service.setVisibility(this.checkNode.checked)}else a==this.iconNode&&this._toggleContainer()}});
dojo.declare("agsjs._ServiceTOC",[dijit._Widget],{_currentIndent:0,service:null,_layerWidgets:[],constructor:function(a){this.service=a.service;this.toc=a.toc},postCreate:function(){this.service.legendResponse?this._createServiceTOC():this._getLegendInfo()},_getLegendInfo:function(){var a="";if(this.service.version>=10.01)a=this.service.url+"/legend";else{a="http://www.arcgis.com/sharing/tools/legend";var b=this.service.url.toLowerCase().indexOf("/rest/");b=this.service.url.substring(0,b)+this.service.url.substring(b+
5);a=a+"?soapUrl="+escape(b)}esri.request({url:a,content:{f:"json"},callbackParamName:"callback",handleAs:"json",load:dojo.hitch(this,this._processLegendInfo),error:dojo.hitch(this,this._createServiceTOC)})},_processLegendError:function(a){console.log(a);this._createServiceTOC()},_processLegendInfo:function(a){this.service.legendResponse=a;this._createServiceTOC()},_createServiceTOC:function(){var a=this.service,b={};dojo.forEach(a.layerInfos,function(c){b[""+c.id]=c;c.visible=c.defaultVisibility});
a.legendResponse&&dojo.forEach(a.legendResponse.layers,function(c){var e=b[""+c.layerId];if(e&&c.legend)e.legends=c.legend});dojo.forEach(a.layerInfos,function(c){if(c.subLayerIds){var e=[];dojo.forEach(c.subLayerIds,function(f,g){e[g]=b[f]});c.subLayerInfos=e}});var d=[];dojo.forEach(a.layerInfos,function(c){c.parentLayerId==-1&&d.push(c)});a.tocInfos=d;this._serviceNode=new agsjs._TOCNode({serviceTOC:this,service:a});this._serviceNode.placeAt(this.domNode);this._visHandler=dojo.connect(a,"onVisibilityChange",
this,"_adjustToState");this._visLayerHandler=dojo.connect(a,"setVisibleLayers",this,"_adjustToState")},_refreshLayer:function(){var a=this.service;if(this._refreshTimer){window.clearTimeout(this._refreshTimer);this._refreshTimer=null}this._refreshTimer=window.setTimeout(function(){a.setVisibleLayers(a.visibleLayers)},2E3)},_adjustToState:function(){this._serviceNode.checkNode.checked=this.service.visible;dojo.forEach(this._layerWidgets,function(a){a._adjustToState()})},destroy:function(){dojo.disconnect(this._visHandler);
dojo.disconnect(this._visLayerHandler)}});
dojo.declare("agsjs.TOC",[dijit._Widget],{constructor:function(a){a=a||{};if(!a.map)throw new Error("no map defined in params for TOC");this.map=a.map;this.layerInfos=a.layerInfos;this.indentSize=a.indentSize||18;this.style=a.style||"standard";this.slider=a.slider||false;this._serviceWidgets=[];if(!this.layerInfos){this.layerInfos=[];for(a=this.map.layerIds.length-1;a>0;a--)this.layerInfos.push({layer:this.map.getLayer(this.map.layerIds[a])})}},postCreate:function(){this._createTOC();this._zoomHandler=
dojo.connect(this.map,"onZoomEnd",this,"_adjustToState")},_createTOC:function(){for(var a=0,b=this.layerInfos.length;a<b;a++){var d=new agsjs._ServiceTOC({service:this.layerInfos[a].layer,toc:this});this._serviceWidgets.push(d);d.placeAt(this.domNode)}},_adjustToState:function(){dojo.forEach(this._serviceWidgets,function(a){a._adjustToState()})},destroy:function(){dojo.disconnect(this._zoomHandler);dojo.disconnect(this._visHandler)}});
