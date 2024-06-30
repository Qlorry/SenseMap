import * as d3 from "d3";
import { MapNode, PolyNode } from "./map-data";

export class PolyRenderer {
    public static render(selection: d3.Selection<any, MapNode, any, any>) {
        return selection
            .attr("x", (d: MapNode) => d.x)
            .attr("y", (d: MapNode) => d.y)
            .attr("points", (d: MapNode) => (d as PolyNode).points.map(p => p.x + "," + p.y)).join(" ")
            .attr("fill", (d: MapNode) => d.color ? d.color : "#00000000");
    }

    public static add(selection: d3.Selection<any, MapNode, any, any>) {
        return selection
            .append(this.getObjectType())
    }

    public static getObjectType() {
        return "polygon";
    }
}

