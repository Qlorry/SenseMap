import * as d3 from "d3";
import { MapNodeType, type MapData, type MapNode } from "./map-data";
import { RectRenderer } from "./rect-renderer";
import { ContainerRenderer } from "./container-renderer";

type RootSelection = d3.Selection<SVGSVGElement, undefined, null, undefined>;
type NodeSelection = d3.Selection<d3.BaseType, MapNode, null, undefined>;
export class MapRenderer {
    private root: RootSelection;

    constructor() {
        this.root = d3.create("svg")
            .attr("width", "auto")
            .attr("height", "auto")
            .attr("style", "max-width: 100%; height: auto;");
    }

    public addTo(element: HTMLElement | null) {
        element?.append(this.root.node()!);
    }

    public render(data: MapData) {
        renderOneChildType(data.root.type, [data.root], this.root);
        this.root.attr("viewBox", [0, 0, data.width, data.height]);

    }
}

function getRenderer(type: MapNodeType) {
    switch (type) {
        case MapNodeType.Container:
            return ContainerRenderer;
        case MapNodeType.Rect:
            return RectRenderer;
        case MapNodeType.Poly:
            return RectRenderer;
    }
}


function callNextNodeRender(node: MapNode) {
    console.log(node.id);
    renderOneNode(node, d3.select(this));
}

function renderOneNode(node: MapNode, selection: NodeSelection) {
    // Render this node
    for (let [type, childs] of node.childs) {
        renderOneChildType(type, childs, selection);
    }
}


function renderOneChildType(type: MapNodeType, childs: MapNode[], selection: NodeSelection) {
    let Renderer = getRenderer(type);

    // Function to render data
    const items = selection.selectAll<any, MapNode>(Renderer.getObjectType())
        .data(childs, (d: MapNode) => d ? d.id : "");


    Renderer.render(items);
    let newItems = Renderer.add(items.enter());
    Renderer.render(newItems);

    items.exit().remove();

    items.each(callNextNodeRender);
    newItems.each(callNextNodeRender);
}