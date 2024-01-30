import Node, { Position } from "./node";

export default class Snake {
    snakeTail: Node;
    snakeHead: Node;
    currentPositions: Set<string>;
    size: number;
    growTurn: any;


    constructor(snakeSize: number, growturn: number) {
        this.size = snakeSize;
        this.growTurn = growturn;
        this.currentPositions = new Set();
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
    }

    move(newHeadPos: Position, numTurn: number) {

        this.moveHead(newHeadPos);

        if (!this.shouldGrow(numTurn)) {
            this.moveTail();
        }
    }

    moveHead(newHeadPos: Position) {
        const newHead = new Node({
            x: newHeadPos.x,
            y: newHeadPos.y
        });
        this.snakeHead.next = newHead;
        this.snakeHead = newHead;
        this.currentPositions.add(`${this.snakeHead.pos.y},${this.snakeHead.pos.x}`);
    }
    shouldGrow(numTurn: number) {
        return numTurn % this.growTurn === 0;
    }

    moveTail() {
        this.currentPositions.delete(`${this.snakeTail.pos.y},${this.snakeTail.pos.x}`);
        this.snakeTail = this.snakeTail.next;
    }

}



