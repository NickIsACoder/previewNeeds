### 移动端开发：
* Native App
* Hybrid App  混合应用
* Web App
            
#### Hybrid App混合应用，根据渲染机制的不同分为3种
* WebView UI：通过JSBridge 实现H5与Native的双向通信，并基于Webview进行页面渲染。例如微信JS-SDK
* Native UI：通过JSBridge 赋予H5原生能力，并将js生成的虚拟节点树传递到Native层，使用原生系统进行渲染。weex、Native react
* 小程序：通过更加定制化的JSBridge，并使用双WebView 双线程的模式来隔离js逻辑和UI渲染，形成特殊的开发模式，增强了H5与Native混合程度
               
                
            Webview：是在native App中内置的基于webkit内核的浏览器，主要由两个部分组成
                WebCore：排版引擎，JSCore：解析引擎
                
                
            hybrid app交互原理：native和H5之间通过JSBridge来实现双向通信
                1、javascript通知native；三种常见方案
                    API注入：Native获取JavaScript环境上下文，并在上面挂载对象与方法，供JavaScript调用
                    webView中的prompt/console/alert拦截，（通常使用prompt）
                    webView URL scheme跳转拦截
                2、Native通知JavaScript：Native可以通过WebView API直接执行js代码
                    IOS：stringByEvaluatingJavaScriptFromString
                        webview.stringByEvaluatingJavaScriptFromString("alert('NativeCall')")
                    Android: loadUrl (4.4-)
                        webView.loadUrl("javascript:JSBridge.trigger('NativeCall')")
                    Android: evaluateJavascript (4.4+)
                        // 4.4+后使用该方法便可调用并获取函数返回值；
                        mWebView.evaluateJavascript（"javascript:JSBridge.trigger('NativeCall')",new ValueCallback<String>() {
                            @Override
                            public void onReceiveValue(String value) {
                                //此处为 js 返回的结果
                            }
                        });
            
            
            JSBridge 接入方案：需要两部分共同来完成
                Native：负责实现URL拦截与解析、环境信息注入、拓展功能映射、版本更新等功能
                JavaScript：主要负责功能协议的拼装、协议的发送、参数的传递、回调等基础功能
            
                接入方式：
                    在线H5：直接将项目部署在线上服务器，并由客户端在HTML头部注入对应的Bridge
                    内置离线包：将代码直接内置在App中，可由H5或客户端引用Bridge
         -->
         <!-- <script type="text/javascript">
             function get(hand=handler()){
                 console.log(hand)
             }
             
             function handler(){
                 return 22
             }
             get(33);
         </script> -->
