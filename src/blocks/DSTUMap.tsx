import React, { useEffect } from 'react';
import PointList from './PointsList';
import Popup from './Popup';
import 'ol/ol.css';
import OverlayPositioning from 'ol/OverlayPositioning';
import { Map, View, Overlay } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM, Vector as VectorSource } from 'ol/source';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import { Point, SimpleGeometry } from 'ol/geom';
import { Style, Icon } from 'ol/style';

export default function DSTUMap() {

  const MapObjects = [
    {
      coordinates: [4420571, 5981353],
      title: "Парк ДГТУ",
      description: "Студенческий парк",
      type: "parck"
    },
    {
      coordinates: [4420802, 5981235],
      title: "Общежитие ДГТУ",
      description: "",
      type: "accommodation"
    },
    {
      coordinates: [4420737, 5980711],
      title: "Остановка пл.Гагарина",
      description: "93, 25",
      type:"bus-stop"
    },
    {
      coordinates: [4420739, 5980690],
      title: "Остановка пл.Гагарина",
      description: "93",
      type:"bus-stop"      
    },
    {
      coordinates: [4420857.6639, 5981127.4538],
      title: "Остановка общежитие РИСИ",
      description: "1, 5, 22, 33",
      type:"bus-stop"
    },
    {
      coordinates: [4420783, 5980652],
      title: "Шашлычная",
      description: "",
      type:"eat"
    }
  ]

  const myFeatures = MapObjects.map(elem => {
    const feature = new Feature({
      geometry: new Point(elem.coordinates),
      title: elem.title,
      description: elem.description
    });
    feature.setStyle(
      new Style({
      image: new Icon({
        src: `/image/${elem.type}.png`,
      }),
    })
  );
    return feature;
  })

  const source = new VectorSource({
    features: myFeatures
  })

  const clusters = new VectorLayer({
    source,
  })

  const view = new View({
    center: [4420594, 5981270],
    zoom: 17,
  })

  const map = new Map({
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      clusters
    ],
    view,
  });

  const popup = new Overlay({
    positioning: OverlayPositioning.BOTTOM_CENTER,
  });

  useEffect(() => {
    map.setTarget("map");

    map.addOverlay(popup);
    popup.setElement(document.getElementById('popup')!);

    const popupTitle = document.getElementById("popup_title")!;
    const popupDescription = document.getElementById("popup_description")!;

    function showOverlay(feature: Feature){
      popup.setPosition(feature.get("geometry").flatCoordinates);
      popup.getElement()!.style.display = "block";
      popupTitle.innerText = feature.get("title");
      popupDescription.innerText = feature.get("description");
    }

    const zoomsToPoint = [...document.getElementsByClassName("ant-col")]
    zoomsToPoint.map((elem, id) =>{
      elem.addEventListener(
        'click',
        () =>{
          const feature = source.getFeatures()[id];
          const polygon  = feature.getGeometry()! as SimpleGeometry;
          view.fit(polygon, {padding: [0, 0, 0, 0], minResolution: 1});
          showOverlay(feature);
        }
      )
    })

    map.on('click', function (evt) {
      console.log(evt.pixel);
      const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        showOverlay(feature! as Feature);

      } else {
        popup.getElement()!.style.display = "none";
      }
    })
    
  })

  return (
    <>
      <div id="map" style={{ width: "100%", height: "100%" }}>
        <PointList arrayPoints={MapObjects} />
        <Popup />
      </div>
    </>
  );
}