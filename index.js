/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const chalk = require('chalk');

const dir = path.join(process.cwd(), 'in');
const out = path.join(process.cwd(), 'out');

const {info, warn, error} = console;

const blacklist = [
  '.dtapart',
  '.part',
  '.crdownload'
];

function renameWithHash(e, filename) {
  if (e === 'change') {
    return false;
  }

  const fullPath = path.join(dir, filename);
  const ext = path.extname(filename);

  if (blacklist.includes(ext)) {
    return false;
  }

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      return false;
    }
    
    const hash = crypto.createHash('sha1');
    
    hash.on('readable', () => {
      const data = hash.read();
      
      if (data) {
        const sum = data.toString('hex');
        
        fs.rename(fullPath, path.join(out, `${sum}${ext}`), (e) => {
          e && console.warn(e);
        });
        
        info(chalk.green.bold('New file:   ') +
          chalk.blue(filename));
        info(chalk.green.bold('Renamed to: ') +
          chalk.magenta(sum + ext));
      }
    });

    hash.write(data);
    hash.end();
  });
}

fs.mkdir(dir, 0o775, (err) => {
  err && info(chalk.yellow('Input directory ') +
    chalk.yellow.bold(dir) +
    chalk.yellow(' already exists!'));
  
  fs.mkdir(out, 0o775, (err) => {
    err && info(chalk.yellow('Output directory ') +
    chalk.yellow.bold(out) +
    chalk.yellow(' already exists!'));
    
    console.info(`Watching ${chalk.blue.bold(dir)}...`);
    
    fs.watch(dir, null, renameWithHash);
  });
});
