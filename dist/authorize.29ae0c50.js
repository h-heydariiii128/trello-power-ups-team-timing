!function(){function e(e,t,r,o){Object.defineProperty(e,t,{get:r,set:o,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},o={},n=t.parcelRequire0082;let l;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in o){var t=o[e];delete o[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){o[e]=t},t.parcelRequire0082=n),n.register("dcjvW",(function(t,r){var o;o=t.exports,Object.defineProperty(o,"__esModule",{value:!0,configurable:!0}),e(t.exports,"default",(function(){return i}));var l=n("hrKNH"),a=n("fHEao"),i=(0,l.defineComponent)({name:"Startup",components:{DefaultLayout:a.default},methods:{authorize(){var e=TrelloPowerUp.iframe(),t=e.arg("apiKey");console.log("apiKey",t),console.log("Promise",TrelloPowerUp);var r=`https://trello.com/1/authorize?expiration=1hour&name=Example%20Trello%20Power-Up&scope=read&key=${t}&callback_method=fragment&return_url=${window.location.origin}%2Fauth-success.html`;e.authorize(r,{height:680,width:580,validToken:function(e){return/^[0-9a-f]{64}$/.test(e)}}).then((function(t){return e.set("member","private","token",t)})).then((function(){return e.closePopup()}))}},mounted(){}})})),n.register("4NPne",(function(t,r){e(t.exports,"render",(function(){return i}));var o=n("hrKNH");const l={class:"flex flex-wrap justify-center gap-6"},a=(0,o.createElementVNode)("h1",null,"Startup",-1);function i(e,t,r,n,i,u){const f=(0,o.resolveComponent)("btn-primary"),c=(0,o.resolveComponent)("page-header"),d=(0,o.resolveComponent)("default-layout");return(0,o.openBlock)(),(0,o.createBlock)(d,null,{default:(0,o.withCtx)((()=>[(0,o.createVNode)(c,{title:"Authorization Power-up",subtitle:"Click on Authorize to start"},{default:(0,o.withCtx)((()=>[(0,o.createElementVNode)("div",l,[(0,o.createVNode)(f,{onClick:e.authorize,label:"Authorize"},null,8,["onClick"])])])),_:1}),a])),_:1})}})),n.register("lFfGw",(function(t,r){e(t.exports,"default",(function(){return o}));var o=e=>{}}));l=n("dcjvW"),l.__esModule&&(l=l.default),l.render=n("4NPne").render,n("lFfGw").default(l),l.__scopeId="data-v-1ca694",l.__file="Page.vue";var a=l;(0,n("emI8C").default)(a)}();
//# sourceMappingURL=authorize.29ae0c50.js.map
