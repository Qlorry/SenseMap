import * as d3 from "d3";
import { MapNode, RectNode } from "./map-data";
import { BaseRenderer } from "./base-renderer";
import type { MapRenderer } from "./map-renderer";

export class RectRenderer {
    public static render(selection: d3.Selection<any, MapNode, any, any>, root: MapRenderer) {
        selection
            .attr("x", (d: MapNode) => d.x)
            .attr("y", (d: MapNode) => d.y)
            .attr("width", (d: MapNode) => (d as RectNode).width)
            .attr("height", (d: MapNode) => (d as RectNode).height)

        BaseRenderer.render(selection, root);

        return selection;
    }

    public static add(selection: d3.Selection<any, MapNode, any, any>) {
        return selection
            .append(this.getObjectType())
    }

    public static getObjectType() {
        return "rect";
    }
}
