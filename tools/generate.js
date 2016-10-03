// https://github.com/kriasoft/react-starter-kit/pull/543/files
import fs from './lib/fs';

const type = process.argv[3];
const name = process.argv[4];
const stateless = process.argv.includes('--stateless');
const toSlug = (string = '') => {
  return string
    .replace(/([A-Z])/g, ' $1')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
    .toLowerCase();
};

const componentTemplate = [
  "import React from 'react';",
  '',
  `export default class ${name} extends React.Component {`,
  '',
  '  static propTypes = {',
  '  }',
  '',
  '  static contextTypes = {',
  '  }',
  '',
  '  componentWillMount() {',
  '  }',
  '',
  '  render() {',
  '    return (',
  '      <div></div>',
  '    );',
  '  }',
  '',
  '}',
  ''
];

const componentStatelessTemplate = [
  "import React from 'react';",
  '',
  `export default function ${name}() {`,
  '  return (',
  '    <div></div>',
  '  );',
  '}',
  ''
];

const componentPackageTemplate = [
  '{',
  `  "name": "${name}",`,
  '  "version": "0.0.1",',
  '  "private": true,',
  `  "main": "./${name.toLowerCase()}.js"`,
  '}'
];

const templates = {
  component: {
    path: './src/components',
    files: [
      {
        name: `${toSlug(name)}`,
        extension: 'js',
        template: {
          default: componentTemplate.join('\n'),
          stateless: componentStatelessTemplate.join('\n')
        }
      },
      {
        name: 'package',
        extension: 'json',
        template: componentPackageTemplate.join('\n')
      }
    ]
  }
};

async function generate() {
  const template = templates[type];
  const pathName = `${template.path}/${toSlug(name)}`;

  await fs.makeDir(pathName);
  template.files.forEach(async (file) => {
    const content = (typeof file.template === 'string')
      ? file.template
      : file.template[(!stateless) ? 'default' : 'stateless'];
    await fs.writeFile(`${pathName}/${file.name}.${file.extension}`, content);
  });
}

export default generate;
