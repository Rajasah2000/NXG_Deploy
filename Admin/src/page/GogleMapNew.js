import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  GoogleMap,
  Marker,
  MarkerF,
  Polyline,
  useLoadScript,
  DistanceMatrixService,
  DistanceMatrixServiceProps,
  LoadScript,
  PolylineF,
  PolygonF,
} from '@react-google-maps/api';
import { setDefaults, geocode, RequestType } from 'react-geocode';
import { useGeolocated } from 'react-geolocated';
import * as turf from '@turf/turf';
// import { AuthCtx } from "../../context/CreateContext";

const containerStyle = {
  width: '1600px',
  height: '1200px',
  marginTop: '10px',
};

const GogleMapNew = ({
  startPoint,
  setStartPoint,
  endPoint,
  setendPoint,
  settimeAndDistanceObj,
  iamFrom,
  markerlatlng,
  setMarkerlatLng,
  setAddress,
  setLongitude,
  setaLatitude,
}) => {
  console.log('start&EndPoint', endPoint, startPoint, markerlatlng);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  console.log('coords', markerlatlng, coords, coords?.latitude, coords?.longitude);

  //for current location
  const userLatLng = { lat: coords?.latitude, lng: coords?.longitude };

  const [searchPlace, setSearchPlace] = useState();
  const [coordinates, setCoordinates] = useState([]);
  const [jobsiteDetail, setJobsiteDetial] = useState(null);
  const [areaName, setareaName] = useState('');
  const [location, setLocation] = useState('');
  const [map, setMap] = useState(null);
  const [streetviews, setStreetView] = useState([
    { lat: 22.5734215, lng: 88.4320514 },
    { lat: 22.5731111, lng: 77.3320514 },
    // Add more points as needed
  ]);

  console.log(streetviews, 'kjfhsh');

  const DistanceCalculate = () => {
    if (startPoint && endPoint) {
      console.log(startPoint, endPoint, 'uuhe');
      const point1 = turf.point([startPoint.lat, startPoint.lng]);
      const point2 = turf.point([endPoint.lat, endPoint.lng]);

      // Calculate distance in kilometers
      const distance = turf.distance(point1, point2);

      alert(distance);
    }
  };

  const decode = t => {
    let points = [];
    for (let step of t) {
      let encoded = step.polyline.points;
      let index = 0,
        len = encoded.length;
      let lat = 0,
        lng = 0;
      while (index < len) {
        let b,
          shift = 0,
          result = 0;
        do {
          b = encoded.charAt(index++).charCodeAt(0) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);

        let dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
        lat += dlat;
        shift = 0;
        result = 0;
        do {
          b = encoded.charAt(index++).charCodeAt(0) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);
        let dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
        lng += dlng;

        points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
      }
    }
    return points;
  };

  //for geting distance and path
  const getAllLocationDatas = () => {
    console.log('startPoint', startPoint);
    const apikey = 'AIzaSyAMkH3YDYb_ZJJvtuuEl_Grwc6u9U_yuSM';
    const directionsServiceBaseUrl = 'https://maps.googleapis.com/maps/api/directions/json';

    const url = `${directionsServiceBaseUrl}?origin=${startPoint.lat},${startPoint.lng}&destination=${endPoint.lat},${endPoint.lng}&key=${apikey}&mode=driving&language=English`;

    console.log('url', url);
    fetch(url)
      .then(response => response.json())
      .then(json => {
        // if (json.status !== 'OK') {
        //     const errorMessage = json.error_message || json.status || 'Unknown error';
        //     return Promise.reject(errorMessage);
        // }

        console.log('ppwqo', json.routes[0].legs[0]);
        if (json.routes.length) {
          const route = json.routes[0];

          const decodepkey = route.overview_polyline;
          const decodepolyCode = decode([{ polyline: decodepkey }]);
          setStreetView(decodepolyCode);
          settimeAndDistanceObj(json.routes[0].legs[0]);
          console.log('rrrw', decodepolyCode);
        }
      })
      .catch(err => {
        console.log(err);
        // alert(err)
      });
  };

  useEffect(() => {
    let temparr = [];
    temparr.push(startPoint);
    temparr.push(endPoint);
    // setPath(temparr)
    console.log('startPoints', startPoint, endPoint);

    console.log(endPoint, startPoint);

    if (startPoint) {
      startPoint && getAllLocationDatas();
    }
    // endPoint && startPoint && DistanceCalculate()
  }, [endPoint]);

  const [center, setCenter] = useState({
    lat: 37.0902,
    lng: 95.7129,
  });
  // const { setAddress, address } = AuthCtx();

  console.log('AAAAASD', markerlatlng);
  const [zipcode, setZipcode] = useState('');
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyC-ki3ImgxYzo8K2OCH9yDthHWIWV1yfj4',
    // libraries: ["places"],
  });

  const onLoad = React.useCallback(
    function callback(map) {
      // alert('jfjdkfjd')
      setMap(map);

      map.setZoom(12);

      console.log('address', `${center.lat},${center.lng}`);

      let obj = { ...markerlatlng };
      obj.lat = coords?.latitude;
      obj.lng = coords?.longitude;
      setMarkerlatLng(obj);

      setCenter(obj);

      geocode(RequestType.LATLNG, `${center.lat},${center.lng}`).then(({ results }) => {
        const address = results[0].formatted_address;

        setareaName(address);
      });
    },
    [center, coords]
  );

  const onUnmount = React.useCallback(function callback(map) {
    alert('Hii');
    setMap(null);
    setCenter({
      lat: 37.0902,
      lng: 95.7129,
    });
  }, []);

  // console.log("markerlatlng", markerlatlng);

  setDefaults({
    key: 'AIzaSyC-ki3ImgxYzo8K2OCH9yDthHWIWV1yfj4',
    language: 'en',
    region: 'es',
  });

  // useEffect(() => {
  //     let obj = {
  //         latLng: markerlatlng,
  //         area: areaName,
  //         zipcode: zipcode,
  //     };
  //     // setAddress(obj);
  // }, [areaName, markerlatlng]);

  useEffect(() => {
    let obj = { ...markerlatlng };
    obj.lat = coords?.latitude;
    obj.lng = coords?.longitude;
    console.log('gfgfgfgfgf', obj);
    // setMarkerlatLng(obj);
    // console.log("coords", obj);
    // setCenter(obj);
  }, [coords]);
  // alert(JSON.stringify(streetviews))
  console.log('jkhjhh', typeof [streetviews], streetviews);

  if (!isLoaded) return <div>...loading</div>;
  return (
    <>
      <div className="map_area" style={{ width: '100%', height: '400px', overflow: 'hidden' }}>
        {' '}
        {/* MAp area */}
        {/* <LoadScript googleMapsApiKey="AIzaSyC-ki3ImgxYzo8K2OCH9yDthHWIWV1yfj4"> */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          // center={startPoint ?? (userLatLng ?? (iamFrom === "StartPoint" ? startPoint : endPoint))}
          // center={userLatLng}
          center={markerlatlng}
          zoom={12}
          // onLoad={onLoad}
          // // onUnmount={onUnmount}
          onClick={ev => {
            let data = {
              lat: ev.latLng.lat(),
              lng: ev.latLng.lng(),
            };

            setLongitude(data?.lng);
            setaLatitude(data?.lat);
            // setStreetView((prevPath) => [...prevPath, data]);

            geocode(RequestType.LATLNG, `${data.lat},${data.lng}`)
              .then(({ results }) => {
                const address = results[0].formatted_address;
                const formatedaddress = results[0].address_components;
                let zipCode = '';
                formatedaddress.forEach(component => {
                  if (component.types.includes('postal_code')) {
                    zipCode = component.long_name;
                  }
                });
                setZipcode(zipCode);
                console.log('address', results[0], address);
                setAddress(address);
                setareaName(address);
              })
              .catch(err => {
                console.log('llkjfrgfg', err);
              });
            setMarkerlatLng(data);
            setCenter(data);

            // { iamFrom == "StartPoint" ? setStartPoint(data) : setendPoint(data) }

            if (startPoint.lat) {
              setendPoint(data);
              // const lat1 = (startPoint.lat + data.lat) / 2
              // const lat2 = (startPoint.lng + data.lng) / 2
              // setCenter({ lat1, lat2 });
              // alert("st")
            } else {
              setStartPoint(data);
              // alert("end")
            }
            // let temparr = path;
            // temparr.pop()
            // setPath([...temparr, data])
          }}
          onDblClick={ev => {
            let data = {
              lat: ev.latLng.lat(),
              lng: ev.latLng.lng(),
            };
            setendPoint(data);
            // setStreetView((prevPath) => [...prevPath, data]);
            // setPath([...path, data])
          }}
        >
          <MarkerF position={markerlatlng} />

          {/* <MarkerF position={endPoint ?? markerlatlng} title="EndPoint" /> */}
        </GoogleMap>
        {/* </LoadScript > */}
        {/* <img src={mapImg} className="img-fluid" alt='map' style={{ width: "100%", height: "100%", }} /> */}
      </div>
    </>
  );
};

export default React.memo(GogleMapNew);
