import { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import mapIcon from '../utils/mapIconBlack';
import mapIconGreen from '../utils/mapIconGreen';
import mapIconYellow from '../utils/mapIconYellow';
import mapIconOrange from '../utils/mapIconOrange';
import mapIconRed from '../utils/mapIconRed';
import mapIconPurple from '../utils/mapIconPurple';
import mapIconBlue from '../utils/mapIconBlue';
import mapIconBlack from '../utils/mapIconBlack';;
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterShareButton,
  TwitterIcon,
} from 'next-share';

import 'leaflet-defaulticon-compatibility';

const MapIndex = ({ occurrences, categories }: any) => {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    -21.6732613, -49.74705934,
  ]);

  const colorIcon = {
    'green' : mapIconGreen,
    'yellow' : mapIconYellow,
    'orange' : mapIconOrange,
    'red' : mapIconRed,
    'purple' : mapIconPurple,
    'blue' : mapIconBlue,
    'black' : mapIconBlack,
  } as any;

 
  function getIconByCategory(category_id : number) {
    var category = categories.find((category : any) => category.id === category_id);
    
    if(category){
      if(category.color && typeof colorIcon[category.color]) {
        return colorIcon[category.color];
      }
    }
    return mapIcon;
  }
    

  return (
    <MapContainer
      center={initialPosition}
      zoom={14}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=sk.eyJ1IjoiZ2VvdmFuYWNvZWxobyIsImEiOiJjbDQycmJzdTg0bG05M2RsOHAycHl1Nm5jIn0.eegan_Kz-MQ4bsFngXBU4A`}
      />
      {occurrences.map((occurrence: any) => {
        return (
          <Marker
            title="Clique para mais detalhes"
            key={occurrence.id}
            icon={getIconByCategory(occurrence.category)}
            position={[occurrence.latitude, occurrence.longitude]}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              <div className="map-popup-info">
                {occurrence.title}
                <Link
                  href={`/occurrences/view/${occurrence.id}`}
                >
                  <a title={
                    "CLique para ver mais\ninformações sobre:\n" + occurrence.title
                  }><FiArrowRight size={20} color="#fff" /></a>
                </Link>
              </div>

              <div className="map-popup-share">
                <span>Compartilhe:</span>
                <FacebookShareButton
                  url={`https://projeto-integrador-2-frontend.herokuapp.com/occurrences/view/${occurrence.id}`}
                  quote={occurrence.title}
                  hashtag={'#projeto-integrador2,#univesp'}
                >
                  <FacebookIcon size={32} style={{ borderRadius: '8px' }} />
                </FacebookShareButton>

                <WhatsappShareButton
                  url={`https://projeto-integrador-2-frontend.herokuapp.com/occurrences/view/${occurrence.id}`}
                  title={occurrence.title}
                  separator=":: "
                >
                  <WhatsappIcon size={32} style={{ borderRadius: '8px' }} />
                </WhatsappShareButton>

                <TwitterShareButton
                  url={`https://projeto-integrador-2-frontend.herokuapp.com/occurrences/view/${occurrence.id}`}
                  title={occurrence.title}
                >
                  <TwitterIcon size={32} style={{ borderRadius: '8px' }} />
                </TwitterShareButton>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  )
}

export default MapIndex