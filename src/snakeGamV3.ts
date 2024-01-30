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

export default class SnakeGameV3 implements ISnakeGame {

    board: string[][];
    numTurn: number;
    snakeSize: number;
    snakeHead: Node;
    snakeTail: Node;
    private gameState: GameState = GameState.ON_GOING;
    growTurn: number;
    currentPositions: Set<string>;

    constructor(snakeSize: number = 3) {
        this.currentPositions = new Set();
        this.growTurn = 2;
        this.numTurn = 0;
        this.board = [];


        for (let j = 0; j < snakeSize; j++) {
            if (j === 0) {
                this.snakeTail = new Node({
                    x: 0,
                    y: 0
                });

                this.snakeHead = this.snakeTail;

            } else {
                const newHead = new Node({
                    x: j,
                    y: 0
                });
                this.snakeHead.next = newHead;
                this.snakeHead = newHead;
            }

            this.currentPositions.add(`0,${j}`);
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
        if (this.isGameOver())
            return;


        this.moveTurn();

        const newHeadPos = this.getNewHeadPosition(snakeDirection);

        this.updateGameState(newHeadPos);


        this.updateBoard(newHeadPos);


        this.moveSnakeNodes(newHeadPos);



        this.pritSnake();
        this.printGame();
        console.log(this.isGameOver());


    }

    updateBoard(newHeadPos: Position) {
        if (this.numTurn % this.growTurn !== 0) {
            this.board[this.snakeTail.pos.y][this.snakeTail.pos.x] = "o";
        }
        this.board[newHeadPos.y][newHeadPos.x] = "x";
    }

    updateGameState(newHeadPos: Position) {
        if (this.currentPositions.has(`${newHeadPos.y},${newHeadPos.x}`)) {
            this.gameState = GameState.OVER;
        }

    }

    moveTurn() {
        this.numTurn = this.numTurn + 1;
    }

    moveSnakeNodes(newHeadPos: Position) {

        const newHead = new Node({
            x: newHeadPos.x,
            y: newHeadPos.y
        });
        this.snakeHead.next = newHead;
        this.snakeHead = newHead;
        this.currentPositions.add(`${this.snakeHead.pos.y},${this.snakeHead.pos.x}`);

        if (this.numTurn % this.growTurn !== 0) {
            this.currentPositions.delete(`${this.snakeTail.pos.y},${this.snakeTail.pos.x}`);
            this.snakeTail = this.snakeTail.next;
        }

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
        let tmep = this.snakeTail;
        let posString = "";
        while (tmep) {
            posString += `${tmep.pos.x},${tmep.pos.y}  `;
            tmep = tmep.next;
        }
        console.log(posString);

    }

}