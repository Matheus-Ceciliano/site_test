// Adicione isso para o TypeScript parar de reclamar dos módulos CSS
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
