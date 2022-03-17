var prompt = require('prompt');
const { exec } = require('child_process');

function getApp(app) {
    return new Promise((resolve, reject) => {
      exec(`${app}`, (err, stdout, stderr) => {
        return resolve(stdout);
      });
    });
}

function install_nvm() {
    return new Promise((resolve, reject) => {
      exec(`curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh;bash install_nvm.sh
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"`, (err, stdout, stderr) => {
        if (err || stderr) {
          reject(err);
        }
        return resolve(stdout);
      });
    });
}

function install_node() {
    return new Promise((resolve, reject) => {
      exec(`nvm install --lts`, (err, stdout, stderr) => {
        if (err || stderr) {
          reject(err);
        }
        return resolve(stdout);
      });
    });
}

function update_term() {
    return new Promise((resolve, reject) => {
      exec(`source ~/.bash_profile`, (err, stdout, stderr) => {
        if (err || stderr) {
          reject(err);
        }
        return resolve(stdout);
      });
    });
}

async function install() {
    console.log(`Programme d'installation de l'API de MyCryptoFolio`)
    console.log('Vérification des programmes requis...')
    console.log('Node V12 Minimum')
    const node = await getApp('node -v')
    if (node.startsWith('v')) {
        if (Number(node.substring('1','3')) >= 12 && Number(node.substring('1','3')) <= 17) {
            console.log(`=> ${node.trim()} OK`)
        } else {
            console.log(`Doesn't garanty runing with node ${node}`)
        }
    } else {
        console.log('Node not installed')
        console.log('installing nvm...')
        await install_nvm();
        console.log('Update terminal')
        await update_term();
        console.log('installing latest version of node...')
        await install_node();
        await getApp('node -v');
    }
    console.log('Redis v6 minimum')
    const redis = await getApp('redis-cli ping')
    if (redis.trim() !== 'PONG') {
        console.log('Redis not installed')
        console.log('installing Redis...')
        await getApp('sudo apt-get install redis-server -y;sudo service redis-server restart')
        console.log(`=> ${redis.trim()} OK`)
    } else {
        console.log(`=> ${redis.trim()} OK`)
    }
    console.log('Postgresql v12 minimum')
    const postgresql = await getApp('psql --version')
    if (postgresql.startsWith('psql')) {
        console.log(`=> ${postgresql.trim()} OK`)
    } else {
        console.log('Postgresql not installed')
        console.log('installing Postgresql...')
        await getApp('sudo apt install postgresql postgresql-client -y;sudo service postgresql restart')
        console.log(`=> ${postgresql.trim()} OK`)
    }
    console.log('Sqitch v1 minimum')
    const sqitch = await getApp('sqitch --version')
    if (sqitch.startsWith('sqitch')) {
        console.log(`=> ${sqitch.trim()} OK`)
    } else {
        console.log('Sqitch not installed')
        console.log('installing Sqitch...')
        await getApp('sudo apt-get install sqitch libdbd-pg-perl postgresql-client -y')
        console.log(`=> ${sqitch.trim()} OK`)
    }
}

install()
//
// Start the prompt
////
//prompt.start();
//
////
//// Get two properties from the user: username and email
////
//prompt.get(['username', 'email'], function (err, result) {
//  //
//  // Log the results.
//  //
//  console.log('Command-line input received:');
//  console.log('  username: ' + result.username);
//  console.log('  email: ' + result.email);
//});