import { WebUI } from "https://deno.land/x/webui/mod.ts";

const window = new WebUI();
window.show('./index.html');

window.bind("exit", () => {
  WebUI.exit();
});
window.bind("jyanken_judgment", ({arg}) => {
  const computer:number = arg.number(0);
  const human:number = arg.number(1);
  const judgment = (computer - human + 3) % 3
  console.log(`- jyanken_judgment : `, computer, human, judgment);
  return judgment;
});

await WebUI.wait();
