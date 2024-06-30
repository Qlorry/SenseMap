import * as d3 from "d3";
import { MapNode, PolyNode } from "./map-data";
import { BaseRenderer } from "./base-renderer";
import type { MapRenderer } from "./map-renderer";

export class PolyRenderer {
    public static render(selection: d3.Selection<any, MapNode, any, any>, root: MapRenderer) {
        selection
            .attr("points", (d: MapNode) => {
                return (d as PolyNode)
                    .points
                    .map(p => (p.x + d.x) + "," + (p.y + d.y))
                    .join(" ")
            })
        BaseRenderer.render(selection, root);

        return selection;
    }

    public static add(selection: d3.Selection<any, MapNode, any, any>) {
        return selection
            .append(this.getObjectType())
    }

    public static getObjectType() {
        return "polygon";
    }
}

