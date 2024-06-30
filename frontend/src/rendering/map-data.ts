export interface MapData {
    root: MapNode;
    width: number; // workspace coordinates
    height: number; // workspace coordinates
}

export enum MapNodeType {
    Container,
    Rect,
    Poly,
}

export enum ClickActions {
    ZoomToThis,
    ZoomToParent
}

export class MapNode {
    public parent: MapNode | undefined;
    private childs: Map<MapNodeType, Array<MapNode>> = new Map();
    public getChilds() { return this.childs; }
    public addChild(newNode: MapNode) {
        newNode.parent = this;
        const childOfSameType = this.childs.get(newNode.type);
        if (childOfSameType == undefined) {
            this.childs.set(newNode.type, [newNode]);
        }
        else {
            childOfSameType.push(newNode);
        }
    }

    public id: string = "";
    public color: string | undefined;
    public type: MapNodeType = MapNodeType.Container;

    public x: number = 0; // workspace coordinates
    public y: number = 0; // workspace coordinates

    public clickable = false;
    public clickAction: ClickActions | undefined;

    public getBBox(): [[number, number], [number, number]] {
        const res: [[number, number], [number, number]] =
            [[this.x, this.y], [this.x, this.y]];
        for (const [_, childs] of this.childs) {
            for (const child of childs) {
                const childBox = child.getBBox();
                res[0][0] = Math.min(childBox[0][0], res[0][0]);
                res[0][1] = Math.min(childBox[0][1], res[0][1]);

                res[1][0] = Math.max(childBox[1][0], res[1][0]);
                res[1][1] = Math.max(childBox[1][1], res[1][1]);
            }
        }
        return res;
    }
}

export class RectNode extends MapNode {

    public width: number = 0;
    public height: number = 0;

    constructor() {
        super();
        this.type = MapNodeType.Rect;
    }

    public override getBBox(): [[number, number], [number, number]] {
        return [[this.x, this.y], [this.x + this.width, this.y + this.height]];
    }
}

export class PolyNode extends MapNode {
    public points: Array<{ x: number, y: number }> = [];

    constructor() {
        super();
        this.type = MapNodeType.Poly;
    }

    public override getBBox(): [[number, number], [number, number]] {
        // Calculate furthest point from 
        const minX = Math.min(... this.points.map(p => p.x));
        const minY = Math.min(... this.points.map(p => p.y));
        const maxX = Math.max(... this.points.map(p => p.x));
        const maxY = Math.max(... this.points.map(p => p.y));
        return [[minX + this.x, minY + this.y], [maxX + this.x, maxY + this.y]];
    }
}