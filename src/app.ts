import Snake from "./snake";
import SnakeGameV4 from "./snakeGamV4";

const snakeGame = new SnakeGameV4(new Snake(3, 2));

snakeGame.moveSnake({ xMove: 1, yMove: 0 });
snakeGame.moveSnake({ xMove: 0, yMove: 1 });
snakeGame.moveSnake({ xMove: 0, yMove: 1 });
snakeGame.moveSnake({ xMove: 0, yMove: 1 });
snakeGame.moveSnake({ xMove: 0, yMove: 1 });
snakeGame.moveSnake({ xMove: 0, yMove: 1 });
snakeGame.isGameOver();



// arbitary board
//initial size of the sname is 3
// can start from anywhere
//every five move size would increase by 1
// sneak hits its own body and the game is over
