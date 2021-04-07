import React, { useEffect } from 'react';
import PointList from './PointsList'
import 'ol/ol.css';
import { Map, View, Overlay } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { Cluster, OSM, TileJSON, Vector as VectorSource } from 'ol/source';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import { Point } from 'ol/geom';
import { Circle as CircleStyle, Fill, Stroke, Style, Text, } from 'ol/style';

const MapObject = [
  {
    coordinates: [4420571, 5981353],
    title: "Парк ДГТУ",
    description: "Студеньческий парк"
  },
  {
    coordinates: [4420802, 5981235],
    title: "Общежитие ДГТУ",
    description: ""
  },
  {
    coordinates: [4420737, 5980711],
    title: "Остановка пл.Гагарина",
    description: "93, 25"
  },
  {
    coordinates: [4420739, 5980690],
    title: "Остановка пл.Гагарина",
    description: "93"
  },
  {
    coordinates: [4420857.6639, 5981127.4538],
    title: "Остановка ощежитие РИСИ",
    description: "1, 5, 22, 33"
  },
  {
    coordinates: [4420783, 5980652],
    title: "Шашлычная",
    description: ""
  },
]

const myFeatures = MapObject.map(elem =>{
  return new Feature({
    geometry: new Point(elem.coordinates),
    title: elem.title,
    description:elem.description
  })
})

const source = new VectorSource({
  features: myFeatures
})

const bluePointCircle = new Style({
  image: new CircleStyle({
    radius: 10,
    stroke: new Stroke({
      color: '#fff',
    }),
    fill: new Fill({
      color: '#3399CC',
    }),
  }),
  // text: new Text({
  //   text: "",
  //   fill: new Fill({
  //     color: 'black',
  //   }),
  // })
})

const clusters = new VectorLayer({
  source,
  style: bluePointCircle
})

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    clusters
  ],
  view: new View({
    center: [4420594, 5981270],
    zoom: 17,
  }),
});

const popup = document.getElementById('popup')! as HTMLElement;


map.on('click', function (evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature;
  });
  if (feature) {
    console.log("True")
  } else {
    console.log("false")
  }
});

export default function Kart() {

  useEffect(() => {
    map.setTarget("map");
  })


  return (<div id="map" style={{ width: "100%", height: "100%" }}>
    {/* <div id="popup"></div> */}
    <PointList arrayPoints={MapObject}/>
  </div>);
}