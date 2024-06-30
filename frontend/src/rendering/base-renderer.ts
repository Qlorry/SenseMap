import * as d3 from "d3";
import { ClickActions, MapNode, MapNodeType, RectNode } from "./map-data";
import type { MapRenderer } from "./map-renderer";

export class BaseRenderer {
    public static render(selection: d3.Selection<any, MapNode, any, any>, root: MapRenderer) {

        function selectAndCallAction(event: any, d: MapNode) {
            if (!d.clickable || d.clickAction === undefined) return null;
            switch (d.clickAction) {
                case ClickActions.ZoomToThis:
                    return zoomTo(event, d, this, root);
                case ClickActions.ZoomToParent:
                    return zoomToParent(event, d, this, root);
                default:
                    return null;
            }
        }

        selection
            .attr("fill", (d: MapNode) => d.color ? d.color : null)
            .attr("cursor", (d: MapNode) => d.clickable ? "pointer" : null)
            .on("click", selectAndCallAction);
        return selection;
    }
}

function zoomTo(event: any, d: MapNode, object: any, root: MapRenderer) {
    console.log(object)
    // add do/undo logic to all elements 
    d3.select(object).transition().style("fill", "green");

    let box = d.getBBox();
    let parent = d.parent;
    while (parent != undefined) {
        box[0][0] += parent.x;
        box[1][0] += parent.x;

        box[0][1] += parent.y;
        box[1][1] += parent.y;
        parent = parent.parent;
    }

    root.zoomTo(event, box);
}

function zoomToParent(event: any, d: MapNode, object: any, root: MapRenderer) {
    console.log(object)
    // add do/undo logic to all elements 
    d3.select(object).transition().style("fill", "green");

    let box = d.getBBox();

    let parent = d.parent;
    while (parent != undefined) {
        box[0][0] += parent.x;
        box[1][0] += parent.x;

        box[0][1] += parent.y;
        box[1][1] += parent.y;
        parent = parent.parent;
    }

    root.zoomTo(event, box);
}