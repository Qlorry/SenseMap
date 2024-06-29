<template>
    <h1>This is home page</h1>
    <div id="map"> </div>
</template>

<script setup lang="ts">
import { MapNode, MapNodeType, type MapData } from '@/rendering/map-data';
import { MapRenderer } from '@/rendering/map-renderer';
// import * as d3 from 'd3';
import { onMounted } from 'vue';

onMounted(() => {
    console.log("onMounted");
    draw();
})

let mapR = new MapRenderer();
let data = {} as MapData;
{
    let mapNode = new MapNode();
    mapNode.id = "container";
    mapNode.x = 100;
    mapNode.y = 100;
    mapNode.type = MapNodeType.Container;

    let mapNodeChild = new MapNode();
    mapNodeChild.id = "red";
    mapNodeChild.x = 50;
    mapNodeChild.y = 50;
    mapNodeChild.width = 200;
    mapNodeChild.height = 150;
    mapNodeChild.color = "red";
    mapNodeChild.type = MapNodeType.Rect;

    let mapNodeChild2 = new MapNode();
    mapNodeChild2.id = "green";
    mapNodeChild2.x = 50;
    mapNodeChild2.y = 50 + 150 + 10;
    mapNodeChild2.width = 200;
    mapNodeChild2.height = 150;
    mapNodeChild2.color = "green";
    mapNodeChild2.type = MapNodeType.Rect;


    let mapNodeChild3 = new MapNode();
    mapNodeChild3.id = "bg";
    mapNodeChild3.x = 10;
    mapNodeChild3.y = 10;
    mapNodeChild3.width = 260;
    mapNodeChild3.height = 400;
    mapNodeChild3.color = "grey";
    mapNodeChild3.type = MapNodeType.Rect;

    mapNode.childs.set(MapNodeType.Rect, [mapNodeChild3, mapNodeChild2, mapNodeChild]);

    data.root = mapNode;
    data.height = 600;
    data.width = 600;
}

function draw() {
    const map = document
        .getElementById("map");

    mapR.render(data)
    mapR.addTo(map);
}

</script>