<template>
    <h1>This is home page</h1>
    <div class="container">

        <div id="map"> </div>
    </div>
</template>

<script setup lang="ts">
import { ClickActions, MapNode, MapNodeType, PolyNode, RectNode, type MapData } from '@/rendering/map-data';
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
    mapNode.x = 10;
    mapNode.y = 10;

    let mapNodeChild4 = new PolyNode();
    mapNodeChild4.id = "poly";
    mapNodeChild4.x = 0;
    mapNodeChild4.y = 0;
    mapNodeChild4.color = "yellow";
    mapNodeChild4.points = [
        { x: 0, y: 0 },
        { x: 500, y: 0 },
        { x: 500, y: 220 },
        { x: 150, y: 220 },
        { x: 150, y: 320 },
        { x: 0, y: 320 },
    ]


    mapNode.addChild(mapNodeChild4);
    {
        let shelf = new MapNode();
        shelf.id = "shelf1";
        shelf.x = 275;
        shelf.y = 10;


        let mapNodeChild = new RectNode();
        mapNodeChild.id = "shelf_main_rect";
        mapNodeChild.x = 0;
        mapNodeChild.y = 0;
        mapNodeChild.width = 200;
        mapNodeChild.height = 50;
        mapNodeChild.color = "red";
        shelf.addChild(mapNodeChild);
        mapNode.addChild(shelf);

    }

    {
        let shelf = new MapNode();
        shelf.id = "shelf2";
        shelf.x = 275;
        shelf.y = 10 + 50 + 25;


        let mapNodeChild = new RectNode();
        mapNodeChild.id = "shelf_main_rect";
        mapNodeChild.x = 0;
        mapNodeChild.y = 0;
        mapNodeChild.width = 200;
        mapNodeChild.height = 50;
        mapNodeChild.color = "red";

        shelf.addChild(mapNodeChild);
        const sections = 3;
        const padding = 5;
        const gap = 6;
        for (let i = 0; i < sections; i++) {

            let section = new RectNode();
            section.id = "section" + i;
            section.clickable = true;
            section.clickAction = ClickActions.ZoomToParent;

            section.width = ((mapNodeChild.width - (gap * (sections-1)) - padding * 2) / sections);
            section.height = (mapNodeChild.height - padding * 2);
            section.x = padding + section.width * i + gap * i;
            section.y = padding;
            section.color = "purple";
            shelf.addChild(section);
        }

        mapNode.addChild(shelf);
    }

    {
        let shelf = new MapNode();
        shelf.id = "shelf3";
        shelf.x = 275;
        shelf.y = 10 + (50 + 25) * 2;


        let mapNodeChild = new RectNode();
        mapNodeChild.id = "shelf_main_rect";
        mapNodeChild.x = 0;
        mapNodeChild.y = 0;
        mapNodeChild.width = 200;
        mapNodeChild.height = 50;
        mapNodeChild.color = "red";
        shelf.addChild(mapNodeChild);
        mapNode.addChild(shelf);
    }

    data.root = mapNode;
    data.height = 500;
    data.width = 1100;
}

function draw() {
    const map = document
        .getElementById("map");

    mapR.render(data)
    mapR.addTo(map);
}

</script>