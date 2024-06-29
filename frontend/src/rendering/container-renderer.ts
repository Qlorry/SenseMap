import * as d3 from "d3";
import { MapNode } from "./map-data";

export class ContainerRenderer {
    public static render(selection: d3.Selection<any, MapNode, any, any>) {
        return selection
            .attr("transform", (d: MapNode) => `translate(${d.x}, ${d.y})`);
    }

    public static add(selection: d3.Selection<any, MapNode, any, any>) {
        return selection
            .append(this.getObjectType());
    }

    public static getObjectType() {
        return "g";
    }
}
