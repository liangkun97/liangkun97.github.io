importScripts('https://g.alicdn.com/kg/workbox/3.3.0/workbox-sw.js');
if (workbox) {

    workbox.setConfig({
      debug: false,
      modulePathPrefix: 'https://g.alicdn.com/kg/workbox/3.3.0/'
    });

    //直接激活跳过等待阶段
    workbox.skipWaiting();
    workbox.clientsClaim();

    workbox.routing.registerRoute(
        /.*(?:jsdelivr)\.net/,
        workbox.strategies.cacheFirst({
            fetchOptions: {
                mode: 'cors',
                credentials: 'omit',
            }
        })
    );

    workbox.routing.registerRoute(
        '/',
        workbox.strategies.staleWhileRevalidate()
    );

    workbox.routing.registerRoute(
      /.*(?:googleapis|gstatic)\.com/,
      new workbox.strategies.StaleWhileRevalidate(),
    );

    workbox.routing.registerRoute(
        new RegExp('.*\.(js|css|html)'),
        workbox.strategies.staleWhileRevalidate()
    );

    workbox.routing.registerRoute(
        new RegExp('.*\.(jpg|png|gif)'),
        workbox.strategies.cacheFirst()
    );
} else {
    console.log(`Boo! Workbox didn't load ?`);
}
