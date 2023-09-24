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
      font: figlet.fontsSync()[
        Math.floor(Math.random() * figlet.fontsSync().length)
      ],
      horizontalLayout: 'default',
      verticalLayout: 'full',
    })
  );
  return ascii;
};

let color: ForegroundColorName | null = null;
let background: BackgroundColorName | null = null;

foregroundColorNames.forEach((name) => {
  process.stdout.write(`${chalk.red(name)} \n`);
});
process.stdout.write('Give me a color: ');

for await (const line of console) {
  if (!color) {
    if (foregroundColorNames.includes(line as ForegroundColorName)) {
      color = line as ForegroundColorName;
    } else {
      color = 'white';
    }
    backgroundColorNames.forEach((name) => {
      process.stdout.write(`${chalk.green(name)} \n`);
    });
    process.stdout.write('Give me another color: ');
  } else if (!background) {
    if (backgroundColorNames.includes(line as BackgroundColorName)) {
      background = line as BackgroundColorName;
    } else {
      background = 'bgBlack';
    }
    process.stdout.write('And now enter some text: ');
  } else {
    const res = asciify(color, background, line);
    console.log(res);
    process.stdout.write('And now enter some text: ');
  }
}
