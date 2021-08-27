import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';

import { Place, PlaceInfo, Content, PlacePhoto } from './styles';
import Text from '../Text';
import ImageSkeleton from '../ImageSkeleton';

const PlaceCard = ({ place, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Place onClick={onClick}>
      <PlaceInfo>
        <Text size="large">{place.name}</Text>
        <ReactStars count={5} value={place.rating} edit={false} isHalf activeColor="#e7711c" />
        <Content size="medium">{place.formatted_address || place.vicinity}</Content>
      </PlaceInfo>
      <PlacePhoto
        imageLoaded={imageLoaded}
        onLoad={() => setImageLoaded(true)}
        src={place.photos ? place.photos[0].getUrl() : place.icon}
        alt="foto do lugar"
      />
      {!imageLoaded && <ImageSkeleton width="100px" height="100px" />}
    </Place>
  );
};

export default PlaceCard;
