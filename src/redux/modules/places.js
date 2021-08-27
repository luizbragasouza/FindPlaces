export const Types = {
  SET_places: 'places/SET_places',
  SET_place: 'places/SET_place',
};

const initialState = {
  places: [],
  placeselected: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_places:
      return { ...state, places: action.payload };
    case Types.SET_place:
      return { ...state, placeselected: action.payload };
    default:
      return state;
  }
}

export function setPlaces(places) {
  return {
    type: Types.SET_places,
    payload: places,
  };
}

export function setPlace(place) {
  return {
    type: Types.SET_place,
    payload: place,
  };
}
