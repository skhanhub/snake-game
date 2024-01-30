import Node, { Position } from "./node";

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

export default class SnakeGameV1 implements ISnakeGame {
    board: string[][];
    numTurn: number;
    snakeSize: number;
    snakeHead: Node;
    snakeTail: Node;
    private gameState: GameState = GameState.ON_GOING;
    growTurn: number;
    constructor(snakeSize: number = 3) {
        this.growTurn = 2;
        this.numTurn = 0;
        this.board = [];

        this.snakeTail = new Node({
            x: 0,
            y: 0
        });

        this.snakeHead = this.snakeTail;
        for (let j = 1; j < snakeSize; j++) {
            const newHead = new Node({
                x: j,
                y: 0
            });
            this.snakeHead.next = newHead;
            this.snakeHead = newHead;
        }

        for (let i = 0; i < 4; i++) {
            this.board[i] = [];
            for (let j = 0; j < 4; j++) {

                if (j < snakeSize && i === 0) {


                    this.board[i][j] = "x";
                }
                else
                    this.board[i][j] = "o";


            }
        }

        this.snakeSize = snakeSize;
    }

    moveSnake(snakeDirection: direction): void {
        if (this.gameState == GameState.OVER)
            return;

        this.numTurn++;

        const newHeadPos = this.getNewHeadPosition(snakeDirection);

        if (this.numTurn % this.growTurn !== 0) {
            this.board[this.snakeTail.pos.y][this.snakeTail.pos.x] = "o";
            this.snakeTail = this.snakeTail.next;
        }

        if (this.board[newHeadPos.y][newHeadPos.x] == "x")
            this.gameState = GameState.OVER;

        const newHead = new Node({
            x: newHeadPos.x,
            y: newHeadPos.y
        });
        this.snakeHead.next = newHead;
        this.snakeHead = newHead;
        this.board[newHeadPos.y][newHeadPos.x] = "x";

        console.log(this.snakeTail.pos);


        this.pritSnake();
        this.printGame();
        console.log(this.isGameOver());




    }



    getNewHeadPosition(snakeDirection: direction): Position {
        let newX = this.snakeHead.pos.x + snakeDirection.xMove;
        let newY = this.snakeHead.pos.y + snakeDirection.yMove;

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
        return this.gameState === GameState.OVER;
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
        let tmep = this.snakeTail;
        let posString = "";
        while (tmep) {
            posString += `${tmep.pos.x},${tmep.pos.y}  `;
            tmep = tmep.next;
        }
        console.log(posString);

    }

}