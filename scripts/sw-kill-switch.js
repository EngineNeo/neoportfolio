// Replaces the old Workbox service worker for anyone who still has it.
//
// The previous worker precached the whole site and only updated once every
// tab was closed, so returning visitors kept seeing stale builds. This worker
// installs immediately, clears every cache, unregisters itself and reloads
// open pages so they load the live site straight from the network.
//
// Copied over build/service-worker.js by the postbuild script.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const windows = await self.clients.matchAll({ type: "window" });
      windows.forEach((client) => client.navigate(client.url));
    })()
  );
});
