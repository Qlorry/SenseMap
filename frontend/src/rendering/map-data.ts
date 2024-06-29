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


export class MapNode {
    public childs: Map<MapNodeType, Array<MapNode>> = new Map();
    public id: string = "";
    public color: string | undefined;
    public type: MapNodeType = MapNodeType.Container;

    public x: number = 0; // workspace coordinates
    public y: number = 0; // workspace coordinates
    public width: number = 0;
    public height: number = 0;
} 