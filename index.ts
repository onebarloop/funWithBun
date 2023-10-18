import figlet from 'figlet';
import chalk, {
  BackgroundColorName,
  ForegroundColorName,
  backgroundColorNames,
  foregroundColorNames,
} from 'chalk';
import inquirer from 'inquirer';

const getFont = () => {
  return figlet.fontsSync()[
    Math.floor(Math.random() * figlet.fontsSync().length)
  ];
};

const asciify = (
  color: ForegroundColorName,
  bg: BackgroundColorName,
  text: string,
  font: figlet.Fonts
) => {
  const ascii = chalk[color][bg].bold(
    figlet.textSync(text, {
      font: font,
      horizontalLayout: 'default',
      verticalLayout: 'default',
    })
  );
  return ascii;
};

const askAgain = (
  color: ForegroundColorName,
  bgColor: BackgroundColorName,
  randFont: figlet.Fonts
) => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Please enter your text',
      },
    ])
    .then(({ text }) => {
      console.log(asciify(color, bgColor, text, randFont));
      console.log(`This font is called ${randFont}`);
    })
    .then(() => {
      askAgain(color, bgColor, randFont);
    });
};

// user prompts

console.log(
  `****\nWelcome to\n${asciify(
    'magentaBright',
    'bgBlack',
    'ASCIIFY',
    '3D-ASCII'
  )}\n`
);

inquirer
  .prompt([
    {
      type: 'list',
      name: 'color',
      message: 'Please select a color',
      choices: ['skip', ...foregroundColorNames],
    },
    {
      type: 'list',
      name: 'bgColor',
      message: 'Please select another color',
      choices: ['skip', ...backgroundColorNames],
    },
    {
      type: 'input',
      name: 'text',
      message: 'Please enter your text',
    },
  ])
  .then(({ color, bgColor, text }) => {
    const randFont = getFont();
    if (foregroundColorNames.includes(color as ForegroundColorName)) {
      color = color as ForegroundColorName;
    } else {
      color = 'white';
    }
    if (backgroundColorNames.includes(bgColor as BackgroundColorName)) {
      bgColor = bgColor as BackgroundColorName;
    } else {
      bgColor = 'bgBlack';
    }
    console.log(asciify(color, bgColor, text, randFont));
    console.log(`This font is called ${randFont}`);

    return { color, bgColor, randFont };
  })
  .then(({ color, bgColor, randFont }) => {
    return askAgain(color, bgColor, randFont);
  });

// let color: ForegroundColorName | null = null;
// let background: BackgroundColorName | null = null;

// process.stdout.write(
//   `Welcome to \n${asciify('magentaBright', 'bgBlack', 'ASCIIFY', '3D-ASCII')}\n`
// );

// foregroundColorNames.forEach((name) => {
//   process.stdout.write(`${chalk.red(name)} \n`);
// });
// process.stdout.write('Give me a color (Enter for default)\n>> ');

// for await (const line of console) {
//   if (!color) {
//     if (foregroundColorNames.includes(line as ForegroundColorName)) {
//       color = line as ForegroundColorName;
//     } else {
//       color = 'white';
//     }
//     backgroundColorNames.forEach((name) => {
//       process.stdout.write(`${chalk.green(name)} \n`);
//     });
//     process.stdout.write('Give me another color (Enter fo default)\n>> ');
//   } else if (!background) {
//     if (backgroundColorNames.includes(line as BackgroundColorName)) {
//       background = line as BackgroundColorName;
//     } else {
//       background = 'bgBlack';
//     }
//     process.stdout.write('And now enter some text\n>> ');
//   } else {
//     const font = getFont();
//     const res = asciify(color, background, line, font);
//     console.log(res);
//     process.stdout.write(`This was font ${font}\nEnter some new text\n>> `);
//   }
// }
