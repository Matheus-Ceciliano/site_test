// Monta o Rota Sênior em um único arquivo HTML (CSS e JS embutidos), no formato que o
// Claude publica como Artifact: sem <!doctype>, <html>, <head> e <body>.
//
// Uso:  node rota-senior/ferramentas/montar.mjs <saida.html> [perfil.json]
// O perfil.json opcional preenche nome, data do casamento e contexto, para abrir já configurado.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [saida, perfilArq] = process.argv.slice(2);
if (!saida) {
  console.error('Uso: node rota-senior/ferramentas/montar.mjs <saida.html> [perfil.json]');
  process.exit(1);
}

const index = readFileSync(join(raiz, 'index.html'), 'utf8');
const fontes = index.match(/<link rel="stylesheet" href="(https:\/\/fonts\.googleapis\.com[^"]+)">/)[1];
const scripts = [...index.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
const blindar = (txt) => txt.replace(/<\/script/gi, '<\\/script');

const css = readFileSync(join(raiz, 'css/estilo.css'), 'utf8');
const js = scripts.map((s) => `/* ${s} */\n` + readFileSync(join(raiz, s), 'utf8')).join('\n');

let perfil = '';
if (perfilArq) {
  const p = JSON.parse(readFileSync(perfilArq, 'utf8'));
  perfil = `<script>window.RS = { dados: { perfilPadrao: ${blindar(JSON.stringify(p))} } };</script>\n`;
}

const html = `<title>Rota Sênior</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="${fontes}">
<style>
${css}
</style>
<div id="app"><p style="padding:2rem 1rem;font-family:system-ui">Carregando a sua rota…</p></div>
${perfil}<script>
${blindar(js)}
</script>
`;

writeFileSync(saida, html);
console.log(`Gerado ${saida} (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB, ${scripts.length} scripts)`);
