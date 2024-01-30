import Node from "./node";

interface ISnakeGame {
    moveSnake(snakeDirection): void;
    isGameOver(): boolean;
}

type direction = {
    xMove: number
    yMove: number
}




export default class SnakeGame implements ISnakeGame {
    board: string[][]
    snakeSize: number
    snakeHead: Node
    snakeTail: Node
    private gameState: boolean
    constructor(snakeSize: number = 3) { // take in size
        this.snakeHead = new Node({
            x: snakeSize - 1,
            y: 0
        })
        this.snakeTail = new Node({
            x: 0,
            y: 0
        })
        let prevTail = this.snakeTail
        for (let i = 0; i < 4; i++)
            for (let j = 0; j < 4; j++) {
                if (this.board[i]) {
                    if (j < 3) {

                        const newTail = new Node({
                            x: j,
                            y: i
                        })
                        prevTail.next = newTail
                        prevTail = newTail
                        this.board[i].push("x")
                    }
                    else
                        this.board[i].push("o")
                } else {
                    this.board[i] = ["o"]
                }
            }



        this.snakeSize = snakeSize
    }
    moveSnake(snakeDirection: direction): void {
        let newX = this.snakeHead.pos.x + snakeDirection.xMove
        let newY = this.snakeHead.pos.y + snakeDirection.yMove

        if (newX >= this.board[0].length) {
            newX = 0
        }
        if (newX < 0) {
            newX = this.board[0].length - 1
        }
        if (newY >= this.board.length) {
            newY = 0
        }
        if (newY < 0) {
            newY = this.board.length - 1
        }


        if (this.board[newY][newX] == "x")
            this.gameState = true
        this.board[newY][newX] = "x"
        this.board[this.snakeTail.pos.y][this.snakeTail.pos.x] = "o"
        this.snakeHead.pos = {
            x: newX,
            y: newY
        }

        this.snakeTail = this.snakeTail.next




    }
    isGameOver(): boolean {
        return this.gameState
    }

    // getNewXPosition

}