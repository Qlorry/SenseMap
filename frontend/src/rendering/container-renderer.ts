import * as d3 from "d3";
import { MapNode } from "./map-data";
import { BaseRenderer } from "./base-renderer";
import type { MapRenderer } from "./map-renderer";

export class ContainerRenderer {
    public static render(selection: d3.Selection<any, MapNode, any, any>, root: MapRenderer) {
        selection
            .attr("transform", (d: MapNode) => `translate(${d.x}, ${d.y})`);
        BaseRenderer.render(selection, root);

        return selection;
    }

    public static add(selection: d3.Selection<any, MapNode, any, any>) {
        return selection
            .append(this.getObjectType());
    }

    public static getObjectType() {
        return "g";
    }
}
