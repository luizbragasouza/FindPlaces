import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

import { setPlaces, setPlace } from '../../redux/modules/places';

export const MapContainer = (props) => {
  const dispatch = useDispatch();
  const { google, query, placeId } = props;

  const [map, setMap] = useState(null);
  const { places } = useSelector((state) => state.places);

  const searchByQuery = useCallback(
    (map, query) => {
      const service = new google.maps.places.PlacesService(map);
      dispatch(setPlaces([]));

      const request = {
        location: map.center,
        radius: '200',
        type: ['place'],
        query,
      };

      service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          dispatch(setPlaces(results));
        }
      });
    },
    [dispatch, google]
  );

  const getDetails = useCallback(
    (placeId) => {
      const service = new google.maps.places.PlacesService(map);
      dispatch(setPlace(null));

      const request = {
        placeId,
        fields: ['name', 'opening_hours', 'formatted_address', 'formatted_phone_number'],
      };

      service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          dispatch(setPlace(place));
        }
      });
    },
    [google, map, dispatch]
  );

  useEffect(() => {
    if (query) {
      searchByQuery(map, query);
    }
  }, [searchByQuery, query, map]);

  useEffect(() => {
    if (placeId) {
      getDetails(placeId);
    }
  }, [placeId, getDetails]);

  const searchNearby = (map, center) => {
    const service = new google.maps.places.PlacesService(map);

    const request = {
      location: center,
      radius: '20000',
      type: [query || 'bank'],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        dispatch(setPlaces(results));
      }
    });
  };

  function onMapReady(_, map) {
    setMap(map);
    searchNearby(map, map.center);
  }

  return (
    <Map
      google={google}
      centerAroundCurrentLocation
      onReady={onMapReady}
      onRecenter={onMapReady}
      zoom={15}
      {...props}>
      {places.map((place) => (
        <Marker
          key={place.place_id}
          name={place.name}
          position={{
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          }}
        />
      ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  language: 'pt-BR',
})(MapContainer);
