const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'dist');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.png':'image/png','.mp4':'video/mp4'};
http.createServer((req,res)=>{
 let filename;
 try { filename=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname)); }
 catch {res.writeHead(400);return res.end('Bad request');}
 if(filename!==root&&!filename.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden');}
 if(filename===root) filename=path.join(root,'index.html');
 fs.stat(filename,(error,stat)=>{
  if(error||!stat.isFile()){res.writeHead(404);return res.end('Not found');}
  res.writeHead(200,{'Content-Type':types[path.extname(filename)]||'application/octet-stream','Cache-Control':'no-store'});
  fs.createReadStream(filename).pipe(res);
 });
}).on('error',error=>{console.error(error.message);process.exitCode=1}).listen(4180,'127.0.0.1',()=>console.log('HZ portfolio: http://127.0.0.1:4180/'));
