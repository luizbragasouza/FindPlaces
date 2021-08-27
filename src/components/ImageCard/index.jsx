import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Text from '../Text';
import ImageSkeleton from '../ImageSkeleton';

export const Card = styled.div`
  min-width: 90px;
  height: 90px;
  border-radius: 8px;
  background-image: url(${(props) => props.photo});
  background-size: cover;
  p {
    margin-left: 6px;
    margin-top: 10px;
  }
`;

export default ({ place }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const image = place.photos ? place.photos[0].getUrl() : place.icon;

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = image;
    imageLoader.onload = () => setImageLoaded(true);
  }, [image]);

  return (
    <>
      {imageLoaded ? (
        <Card photo={image}>
          <Text size="medium" color="#ffffff">
            {place.name}
          </Text>
        </Card>
      ) : (
        <ImageSkeleton width="90px" height="90px" />
      )}
    </>
  );
};
