import figlet from 'figlet';
import chalk, {
  BackgroundColorName,
  ForegroundColorName,
  backgroundColorNames,
  foregroundColorNames,
} from 'chalk';

const asciify = (
  color: ForegroundColorName,
  bg: BackgroundColorName,
  text: string
) => {
  const ascii = chalk[color][bg].bold(
    figlet.textSync(text, {
      horizontalLayout: 'default',
      verticalLayout: 'full',
    })
  );
  return ascii;
};

let color: ForegroundColorName | null = null;
let background: BackgroundColorName | null = null;

console.log(`please give me a color: ${chalk.red(foregroundColorNames)} `);

for await (const chunk of Bun.stdin.stream()) {
  const input = Buffer.from(chunk).toString().trim();
  console.log(
    `please give me a backgoundcolor: ${chalk.green(backgroundColorNames)} `
  );
  if (!color) {
    if (foregroundColorNames.includes(input as ForegroundColorName)) {
      color = input as ForegroundColorName;
    } else {
      color = 'white';
    }
  } else if (!background) {
    console.log('Now enter some text...');
    if (backgroundColorNames.includes(input as BackgroundColorName)) {
      background = input as BackgroundColorName;
    } else {
      background = 'bgBlack';
    }
  } else {
    const res = asciify(color, background, input);
    console.log(res);
  }
}
