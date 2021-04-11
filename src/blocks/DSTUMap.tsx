import React, { useEffect } from 'react';
import PointList from './PointsList'
import Popup from './Popup'
import 'ol/ol.css';
import OverlayPositioning from 'ol/OverlayPositioning'
import { Map, View, Overlay } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM, Vector as VectorSource } from 'ol/source';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import { Point } from 'ol/geom';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

export default function DSTUMap() {

  const MapObjects = [
    {
      coordinates: [4420571, 5981353],
      title: "Парк ДГТУ",
      description: "Студенческий парк"
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
      title: "Остановка общежитие РИСИ",
      description: "1, 5, 22, 33"
    },
    {
      coordinates: [4420783, 5980652],
      title: "Шашлычная",
      description: ""
    },
  ]

  const [OverlayInformation, setOverlayIformation] = React.useState({
    title: "1",
    description: "2"
  })

  const myFeatures = MapObjects.map(elem => {
    return new Feature({
      geometry: new Point(elem.coordinates),
      title: elem.title,
      description: elem.description
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
    })
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

  const popup = new Overlay({
    position: [4420591, 5981353],
    positioning: OverlayPositioning.BOTTOM_CENTER,
  });

  useEffect(() => {
    map.setTarget("map");

    map.addOverlay(popup);
    popup.setElement(document.getElementById('popup')!);

    const popupTitle = document.getElementById("popup_title")!;
    const popupDescription = document.getElementById("popup_description")!;

    map.on('click', function (evt) {
      const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        console.log("True");
        popup.setPosition(feature.get("geometry").flatCoordinates);
        popup.getElement()!.style.display = "block";
        popupTitle.innerText = feature.get("title");
        popupDescription.innerText = feature.get("description");

      } else {
        console.log("false");
        popup.getElement()!.style.display = "none";
      }
    })
    
  })

  return (
    <>
      <div id="map" style={{ width: "100%", height: "100%" }}>
        <PointList arrayPoints={MapObjects} />
        <Popup information={OverlayInformation} />
      </div>
    </>
  );
}