# Demo repo for a docs PR on tar-stream module

When extracting a folder of tar.gz files the module hung itself when I did not call

```js
// …
return estream.resume();
// …
```

```bash
npm install
node index.js
```

----


Currently it throughs a different error

```bash
events.js:173
      throw er; // Unhandled 'error' event
      ^

Error: Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?
    at Object.exports.decode (path/to/project/tar-stream-pr-104-issue-demo/node_modules/tar-stream/headers.js:266:43)
    at Extract.onheader (path/to/project/tar-stream-pr-104-issue-demo/node_modules/tar-stream/extract.js:123:39)
    at Extract._write (path/to/project/tar-stream-pr-104-issue-demo/node_modules/tar-stream/extract.js:249:8)
    at Extract._continue (path/to/project/tar-stream-pr-104-issue-demo/node_modules/tar-stream/extract.js:212:28)
    at oncontinue (path/to/project/tar-stream-pr-104-issue-demo/node_modules/tar-stream/extract.js:67:10)
    at Extract.ondrain (path/to/project/tar-stream-pr-104-issue-demo/node_modules/tar-stream/extract.js:87:5)
    at Extract._write (path/to/project/tar-stream-pr-104-issue-demo/node_modules/tar-stream/extract.js:249:8)
    at Extract._continue (path/to/project/tar-stream-pr-104-issue-demo/node_modules/tar-stream/extract.js:212:28)
    at oncontinue (path/to/project/tar-stream-pr-104-issue-demo/node_modules/tar-stream/extract.js:67:10)
    at onunlock (path/to/project/tar-stream-pr-104-issue-demo/node_modules/tar-stream/extract.js:73:24)
Emitted 'error' event at:
    at Extract.onerror (path/to/project/tar-stream-pr-104-issue-demo/node_modules/duplexify/node_modules/readable-stream/lib/_stream_readable.js:640:52)
    at Extract.emit (events.js:202:15)
    at Extract.onheader (path/to/project/tar-stream-pr-104-issue-demo/node_modules/tar-stream/extract.js:125:12)
    at Extract._write (path/to/project/tar-stream-pr-104-issue-demo/node_modules/tar-stream/extract.js:249:8)
    [... lines matching original stack trace ...]
    at oncontinue (path/to/project/tar-stream-pr-104-issue-demo/node_modules/tar-stream/extract.js:67:10)
```