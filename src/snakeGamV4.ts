import { Position } from "./node";
import Snake from "./snake";

interface ISnakeGame {
    moveSnake(snakeDirection): void;
    isGameOver(): boolean;
}

type direction = {
    xMove: number;
    yMove: number;
};



enum GameState {
    ON_GOING,
    OVER
}

export default class SnakeGameV4 implements ISnakeGame {

    private board: string[][];
    private numTurn: number;
    private snake: Snake;
    private gameState: GameState = GameState.ON_GOING;
    private growTurn: number;

    constructor(snake: Snake) {
        this.growTurn = 2;
        this.numTurn = 0;
        this.snake = snake;


        this.createBoard();
    }

    createBoard() {
        this.board = [];
        for (let i = 0; i < 4; i++) {
            this.board[i] = [];
            for (let j = 0; j < 4; j++) {
                if (j < this.snake.size && i === 0) {
                    this.board[i][j] = "x";
                }
                else
                    this.board[i][j] = "o";
            }
        }
    }

    moveSnake(snakeDirection: direction): void {
        if (this.isGameOver())
            return;


        this.moveTurn();

        const newHeadPos = this.getNewHeadPosition(snakeDirection);

        this.updateGameState(newHeadPos);


        this.updateBoard(newHeadPos);


        this.snake.move(newHeadPos, this.numTurn);



        this.pritSnake();
        this.printGame();
        console.log(this.isGameOver());


    }

    updateBoard(newHeadPos: Position) {
        if (this.numTurn % this.growTurn !== 0) {
            this.board[this.snake.snakeTail.pos.y][this.snake.snakeTail.pos.x] = "o";
        }
        this.board[newHeadPos.y][newHeadPos.x] = "x";
    }

    updateGameState(newHeadPos: Position) {
        if (this.snake.currentPositions.has(`${newHeadPos.y},${newHeadPos.x}`)) {
            this.gameState = GameState.OVER;
        }

    }

    moveTurn() {
        this.numTurn = this.numTurn + 1;
    }


    getNewHeadPosition(snakeDirection: direction): Position {
        let newX = this.snake.snakeHead.pos.x + snakeDirection.xMove;
        let newY = this.snake.snakeHead.pos.y + snakeDirection.yMove;

        if (newX >= this.board[0].length) {
            newX = 0;
        }
        if (newX < 0) {
            newX = this.board[0].length - 1;
        }
        if (newY >= this.board.length) {
            newY = 0;
        }
        if (newY < 0) {
            newY = this.board.length - 1;
        }

        return {
            x: newX,
            y: newY
        };
    }

    isGameOver(): boolean {
        return this.gameState == GameState.OVER;

    }

    printGame(): void {
        let boardString = "";
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                boardString += `${this.board[i][j]} `;
            }
            boardString += "\n";
        }
        console.log(boardString);
        // this.pritSnake();
    }
    pritSnake() {
        let tmep = this.snake.snakeTail;
        let posString = "";
        while (tmep) {
            posString += `${tmep.pos.x},${tmep.pos.y}  `;
            tmep = tmep.next;
        }
        console.log(posString);

    }

}