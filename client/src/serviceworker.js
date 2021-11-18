const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/index.css",
    "../public/logo192.png",
    "../public/logo512.png",
    "https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=Rubik:ital,wght@0,400;1,300&display=swap",
    "../public/imgs/backgroundlightmode.png",
    "../public/imgs/backgrounddarkmode.png",
    "../public/imgs/hcclogolg.png",
    "../public/imgs/hcclogomd.png",
    "../public/imgs/hcclogosm.png"
];

const CACHE_NAME = "static-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";

self.addEventListener("install", (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
    evt.waitUntil(
        caches.keys()
        .then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
    if (evt.request.url.includes("/api/") && evt.request.method === "GET") {
        evt.respondWith(
            caches.open(DATA_CACHE_NAME)
            .then((cache) => {
                return fetch(evt.request)
                .then((response) => {
                    if (response.status === 200) {
                        cache.put(evt.request, response.clone());
                    }
                    return response;
                })
                .catch(() => {
                    return cache.match(evt.request);
                });
            })
            .catch((err) => console.log(err))
        );
        return;
    }
    evt.respondWith(
        caches.match(evt.request)
        .then((response) => {
            return response || fetch(evt.request);
        })
    );
});