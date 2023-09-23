import figlet from 'figlet';
import chalk, { ForegroundColorName } from 'chalk';

const asciify = (color: ForegroundColorName, text: string) => {
  const ascii = chalk[color](
    figlet.textSync(text, {
      horizontalLayout: 'default',
      verticalLayout: 'full',
    })
  );
  return ascii;
};

let color: ForegroundColorName | null = null;

console.log('please give me a color(red, blue, green): ');

for await (const chunk of Bun.stdin.stream()) {
  const input = Buffer.from(chunk).toString().trim();
  console.log('Now text please ');
  if (!color) {
    if (input === 'green' || input === 'red' || input === 'blue') {
      color = input as ForegroundColorName;
    } else {
      color = 'white';
    }
  } else {
    const text = Buffer.from(chunk).toString();
    const res = asciify(color, text);

    console.log(res);
  }
}
