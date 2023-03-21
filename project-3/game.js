const crypto = require('crypto');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const prompt = require('prompt-sync')({ sigint: true });

class CryptoHelper {
  static generateKey() {
    return crypto.randomBytes(32);
  }

  static generateHMAC(key, message) {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(message);
    return hmac.digest('hex');
  }
}


class GameRules {
  constructor(moves) {
    this.moves = moves;
  }

  compareMoves(move1, move2) {
    const index1 = this.moves.indexOf(move1);
    const index2 = this.moves.indexOf(move2);
    const diff = (index1 - index2 + this.moves.length) % this.moves.length;
    return diff === 0 ? 'draw' : diff <= Math.floor(this.moves.length / 2) ? 'lose' : 'win';
  }
}


class TableHelper {
  constructor(moves) {
    this.moves = moves;
  }

  generateTable() {
    const table = [];
    const header = [' '].concat(this.moves);
    table.push(header);

    const gameRules = new GameRules(this.moves);

    for (const move1 of this.moves) {
      const row = [move1];
      for (const move2 of this.moves) {
        let result;
        if (move1 === move2) {
          result = 'Draw';
        } else {
          const moveResult = gameRules.compareMoves(move1, move2);
          result = moveResult === 'win' ? 'Win' : 'Lose';
        }
        row.push(result);
      }
      table.push(row);
    }
    return table;
  }

  displayTable() {
    const table = this.generateTable();
    for (const row of table) {
      console.log(row.join(' | '));
    }
  }
}


class Game {
  constructor(moves) {
    this.moves = moves;
    this.cryptoHelper = new CryptoHelper();
    this.gameRules = new GameRules(moves);
    this.tableHelper = new TableHelper(moves);
  }

  async start() {
    const key = CryptoHelper.generateKey();
    const computerMove = this.moves[Math.floor(Math.random() * this.moves.length)];
    const hmac = CryptoHelper.generateHMAC(key, computerMove);
    console.log(`HMAC: ${hmac}`);

    console.log('Available moves:');
    this.moves.forEach((move, index) => {
      console.log(`${index + 1} - ${move}`);
    });
    console.log('0 - exit');
    console.log('? - help');

    let userMove;
    let userChoice;

    do {
      userChoice = prompt('Enter your move: ');
      if (userChoice === '0') {
        process.exit(0);
      } else if (userChoice === '?') {
        this.tableHelper.displayTable();
      } else if (Number(userChoice) >= 1 && Number(userChoice) <= this.moves.length) {
        userMove = this.moves[Number(userChoice) - 1];
      } else {
        console.log('Invalid input. Please try again.');
      }
    } while (!userMove);

    const result = this.gameRules.compareMoves(userMove, computerMove);
    console.log(`Your move: ${userMove}`);
    console.log(`Computer move: ${computerMove}`);
    if (result === 'win') {
      console.log('You win!');
    } else if (result === 'lose') {
      console.log('You lose!');
    } else {
      console.log("It's a draw!");
    }
    console.log(`HMAC key: ${key.toString('hex')}`);
    }
}


const argv = yargs(hideBin(process.argv)).scriptName('game')
  .usage('Usage: $0 <move1> <move2> <move3> ...')
  .help()
  .version(false)
  .check((argv) => {
    const moves = argv._;
    if (moves.length < 3 || moves.length % 2 === 0 || new Set(moves).size !== moves.length) {
      throw new Error('Error: You must provide an odd number (at least 3) of unique moves.');
    }
    return true;
  })
  .argv;

const game = new Game(argv._);
game.start();  