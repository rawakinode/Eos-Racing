var LocalizeMng=function(){};LocalizeMng.SaveLanguageAndRefreshPage=function(e){var t=Number(e);t<0&&(t=0),t>=Def.Language_Count()&&(t=Def.Language_Count()-1),Def.SetLocalStorageData_LanguageIndex(t),location.reload()},LocalizeMng.Init=function(e){var t=this.languageIndex;this.languageIndex=e,Util.InitCarInfo(e),this.mapMsgText=new Map,cc.loader.loadRes("translate_msg",function(e,t){for(var n=0;n<t.json.datas.length;n++){var a=t.json.datas[n];LocalizeMng.mapMsgText.set(a.key,a)}}),(void 0==t&&e>0||void 0!=t&&t!=e)&&(this.languageIndex=e,cc.loader.loadRes("translate_ui",function(t,n){var a=cc.director.getScene().getComponentInChildren(cc.Canvas);LocalizeMng.ApplyToUI_Process(a.node,n.json,e)}))},LocalizeMng.GetText=function(e){var t=this.mapMsgText.get(e);return void 0==t?e:t.texts[this.languageIndex]},LocalizeMng.Export=function(){var e=cc.director.getScene();this.data=new Object,this.arr=[],this.seq=0,this.text="",this.checkStr=/^[0-9.:'\s\/\+\-\%xXKMHkmhEOS]*$/,this.data.children=[];for(var t=0;t<e.childrenCount;t++){var n=e.children[t];if(null!=n.getComponent(cc.Canvas)){LocalizeMng.ExportProcess(n,this.data);break}}for(t=this.arr.length-1;t>=0;t--){var a=this.arr[t];if(void 0==a.text_en&&void 0==a.valid||(a.parent.valid=!0),void 0==a.text_en&&void 0==a.valid){var i=a.parent.children.findIndex(e=>e.seq==a.seq);i>=0&&a.parent.children.splice(i,1)}delete a.parent,delete a.seq,delete a.valid}this.text=JSON.stringify(this.data)},LocalizeMng.ExportProcess=function(e,t){t.name=e.name;var n=e.getComponent(cc.Label);if(null!=n&&n.string.length>0&&0==this.checkStr.test(n.string)&&(t.text_en=n.string,t.text_kr="korean - \ud55c\uad6d\uc5b4",t.text_cn="chinese - \u4e2d\u570b\u8a9e",t.text_jp="japanes - \u65e5\u672c\u8a9e"),e.childrenCount>0){t.children=[];for(var a=0;a<e.childrenCount;a++){var i=e.children[a].getComponent(cc.EditBox),r=e.children[a].getComponent(cc.Layout);if(null==i&&null==r){var o=new Object;o.seq=this.seq++,o.parent=t,t.children.push(o),this.arr.push(o),LocalizeMng.ExportProcess(e.children[a],o)}}}},LocalizeMng.ApplyToUI_Process=function(e,t,n){var a=e.getComponent(cc.Label);if(a){var i="";0==n&&void 0!=t.text_en?i=t.text_en:1==n&&void 0!=t.text_kr?i=t.text_kr:2==n&&void 0!=t.text_cn?i=t.text_cn:3==n&&void 0!=t.text_jp&&(i=t.text_jp),i.length>0&&(a.string=i)}if(void 0!=t.children)for(var r=0;r<t.children.length;r++){var o=t.children[r],c=e.getChildByName(o.name);o&&c&&LocalizeMng.ApplyToUI_Process(c,o,n)}};