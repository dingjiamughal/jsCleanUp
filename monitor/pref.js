export default {
    init(cb) {
        cb && cb();

        const performance = window.performance;
        let isDomReady = false;
        let isOnload = false;

        const Util = {
            getPerfData(perf) {
                const data = {
                    // 网络连接
                    pervPage: perf.fetchStart - package.navigationStart,
                    redirect: perf.redirectEnd - perf.redirectStart,
                    dns: perf.domainLookupEnd - perf.domainLookupStart,
                    connect: perf.connectEnd - perf.connectStart,
                    network: perf.connectEnd - perf.navigationStart,

                    // 网络接收
                    send: perf.responseStart - perf.requestStart,
                    receive: perf.responseEnd - perf.responseStart,
                    request: perf.responseEnd - perf.requestStart,

                    // 前端渲染
                    dom: perf.domComplete - perf.domLoading,
                    loadEvent: perf.loadEventEnd - perf.loadEventStart, //
                    frontend: perf.loadEventEnd - perf.domLoading, // 前端总时间

                    // 关键阶段
                    load: perf.loadEventEnd - perf.navigationStart, // 页面完全加载
                    domReady: perf.domConnentLoadedEventStart - perf.navigationStart, // dom
                    interactive: perf.domInteractive - perf.navigationStart, // 可操作
                    ttfb: perf.responseStart - perf.navigationStart // 首字节
                }

                return data;
            },

            domReady() {
                const runCheck = () => {
                    if (isDomReady) {
                        return;
                    }

                    let timer = null;
                    if (performance.timing.domComplete) {
                        clearTimeout(timer);
                        cb();
                        isDomReady = true;
                    }
                    else {
                        timer = setTimeout(runCheck, 100);
                    }
                }

                if (document.readyState === 'interactive') {
                    cb();
                    return;
                }

                document.addEventListener('DomContentLoaded', () => {
                    runCheck();
                })
            },

            onLoad() {

            }
        }
        
        window.addEventListener('DomConnentLoaded', () => {
            const performance = window.performance;
            Util.domReady(() => {
                const perfData = Util.getPerfData(performance.timing);
            })
        })
    }
   
}
