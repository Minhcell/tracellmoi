var CACHE='tracell-v4';
var SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png',
  './mobifone_bts.js','./vinaphone_bts.js','./viettel_bts.js','./vietnamobile_bts.js'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return Promise.all(SHELL.map(function(u){return c.add(u).catch(function(){});}));}));self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){if(k!==CACHE)return caches.delete(k);}));}));self.clients.claim();});
self.addEventListener('fetch',function(e){
  var u=e.request.url;
  if(u.indexOf('unwiredlabs.com')>=0) return;
  if(/tile\./.test(u)){
    e.respondWith(fetch(e.request).then(function(r){var c=r.clone();caches.open(CACHE).then(function(ca){ca.put(e.request,c);});return r;}).catch(function(){return caches.match(e.request);}));
    return;
  }
  e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request).then(function(rr){var c=rr.clone();caches.open(CACHE).then(function(ca){ca.put(e.request,c).catch(function(){});});return rr;}).catch(function(){return caches.match('./index.html');});}));
});
