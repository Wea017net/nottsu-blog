#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

async function fetchUrl(url){
  const m = url.match(/items\/([0-9a-zA-Z]+)/);
  if(!m){
    console.error('URLにitems/IDが見つかりません:', url);
    process.exit(1);
  }
  const id = m[1];
  const api = `https://qiita.com/api/v2/items/${id}`;
  console.log('Fetching', api);
  const res = await fetch(api, { headers: { 'Accept': 'application/json' } });
  if(!res.ok){
    console.error('取得失敗', res.status, await res.text());
    process.exit(2);
  }
  const data = await res.json();
  const outDir = path.join(process.cwd(), 'data', 'qiita');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${id}.json`);
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Saved to', outPath);
}

async function main(){
  const args = process.argv.slice(2);
  if(args.length === 0){
    console.error('使い方: node scripts/fetch_qiita.js <qiita-article-url>');
    process.exit(1);
  }
  for(const url of args){
    await fetchUrl(url);
  }
}

main().catch(err => { console.error(err); process.exit(10); });
