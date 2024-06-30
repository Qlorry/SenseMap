import * as d3 from "d3";
import { MapNodeType, type MapData, type MapNode } from "./map-data";
import { RectRenderer } from "./rect-renderer";
import { ContainerRenderer } from "./container-renderer";
import { PolyRenderer } from "./poly-renderer";

type RootSelection = d3.Selection<any, any, null, undefined>;
type NodeSelection = d3.Selection<d3.BaseType, MapNode, null, undefined>;
export class MapRenderer {

    private svg: RootSelection;
    private root: RootSelection;
    private zoom: d3.ZoomBehavior<Element, unknown>;

    private width: number = 0;
    private height: number = 0;

    constructor() {
        this.svg = d3.create("svg")
            .attr("width", "auto")
            .attr("height", "auto")
            .attr("style", "max-width: 100%; height: auto;")
            .datum(this);

        // setup zoom
        this.zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", this.zoomed);

        // Reset zoom when clicked on root
        this.svg.on("click", this.resetZoom);

        this.root = this.svg.append("g");

        this.svg.call(this.zoom)
    }

    public addTo(element: HTMLElement | null) {
        element?.append(this.svg.node()!);
    }

    public render(data: MapData) {
        this.width = data.width;
        this.height = data.height;
        this.svg.attr("viewBox", [0, 0, data.width, data.height]);

        renderOneChildType(data.root.type, [data.root], this.root, this);
    }

    public zoomTo(event: any, box: [[number, number], [number, number]]) {
        const [[x0, y0], [x1, y1]] = box;
        event.stopPropagation();
 
        this.svg.transition().duration(750).call(
            this.zoom.transform,
            d3.zoomIdentity
                .translate(this.width / 2, this.height / 2)
                .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / this.width, (y1 - y0) / this.height)))
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
            d3.pointer(event, this.svg.node())
        );
    }

    // It is callback, so this now is d
    // this is root element
    private resetZoom(event: any, d: MapRenderer) {
        // states.transition().style("fill", null);
        d.svg.transition().duration(750).call(
            d.zoom.transform,
            d3.zoomIdentity,
            d3.zoomTransform(d.svg.node()).invert([d.width / 2, d.height / 2])
        );
    }

    private zoomed(event: any, d: MapRenderer) {
        const { transform } = event;
        d.root.attr("transform", transform);
        d.root.attr("stroke-width", 1 / transform.k);
    }
}

function getRenderer(type: MapNodeType) {
    switch (type) {
        case MapNodeType.Container:
            return ContainerRenderer;
        case MapNodeType.Rect:
            return RectRenderer;
        case MapNodeType.Poly:
            return PolyRenderer;
    }
}

function renderOneNode(node: MapNode, selection: NodeSelection, root: MapRenderer) {
    // Render this node
    for (let [type, childs] of node.getChilds()) {
        renderOneChildType(type, childs, selection, root);
    }
}


function renderOneChildType(type: MapNodeType, childs: MapNode[], selection: NodeSelection, root: MapRenderer) {
    let Renderer = getRenderer(type);

    // Function to render data
    const items = selection.selectAll<any, MapNode>(Renderer.getObjectType())
        .data(childs, (d: MapNode) => d ? d.id : "");


    Renderer.render(items, root);
    let newItems = Renderer.add(items.enter());
    Renderer.render(newItems, root);

    items.exit().remove();

    function callNextNodeRender(node: MapNode) {
        console.log(node.id);
        renderOneNode(node, d3.select(this), root);
    }

    items.each(callNextNodeRender);
    newItems.each(callNextNodeRender);
}