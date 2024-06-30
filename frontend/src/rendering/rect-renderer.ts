import * as d3 from "d3";
import { MapNode, RectNode } from "./map-data";

export class RectRenderer {
    public static render(selection: d3.Selection<any, MapNode, any, any>) {
        return selection
            .attr("x", (d: MapNode) => d.x)
            .attr("y", (d: MapNode) => d.y)
            .attr("width", (d: MapNode) => (d as RectNode).width)
            .attr("height", (d: MapNode) => (d as RectNode).height)
            .attr("fill", (d: MapNode) => d.color ? d.color : "#00000000");
    }

    public static add(selection: d3.Selection<any, MapNode, any, any>) {
        return selection
            .append(this.getObjectType())
    }

    public static getObjectType() {
        return "rect";
    }
}
