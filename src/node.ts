export type Position = {
    x: number
    y: number
}
export default class Node {
    pos: Position
    next: null | Node
    constructor(pos: Position) {
        this.pos = pos
        this.next = null

    }
}