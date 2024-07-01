import { Book, UnitBook, Books } from "./book.interface";
import bcrypt from "bcryptjs"
import { v4 as random } from "uuid"
import fs from "fs"

import { MapData } from "../../../frontend/src/rendering/map-data";

let map: MapData = load()

function load(): MapData {
  try {
    const data = fs.readFileSync("./map.json", "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.log(`Error ${error}`)
    return {}
  }
}

function save() {
  try {
    fs.writeFileSync("./map.json", JSON.stringify(map), "utf-8")
    console.log(`Book saved successfully!`)
  } catch (error) {
    console.log(`Error : ${error}`)
  }
}

export const get = () => map;

export const update = async (): Promise<void> => {
  save()
}

export const reread = async (): Promise<MapData | null> => {
  map = load()
  return map;
}