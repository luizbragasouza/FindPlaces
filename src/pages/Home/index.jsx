/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  PlaceCard,
  Modal,
  Map,
  ImageCard,
  Loader,
  Text,
  Select,
  ImageSkeleton as Skeleton,
} from '../../components';
import logo from '../../assets/logo.png';
import { Container, Search, Logo, Title, Carousel, Wrapper } from './styles';

const Home = () => {
  const [query, setQuery] = useState('');
  const [placeId, setPlaceId] = useState(null);
  const [open, setOpen] = useState(false);
  const { places, placeselected } = useSelector((state) => state.places);
  const hasplaces = places.length > 0;

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true,
  };

  const renderCarousel = () => {
    if (hasplaces) {
      return (
        <>
          <Title size="large">Perto de você</Title>
          <Carousel {...settings}>
            {places.map((place) => (
              <ImageCard key={place.place_id} place={place} />
            ))}
          </Carousel>
        </>
      );
    }
    return <Loader />;
  };

  const renderplaces = () => {
    if (hasplaces) {
      return places.map((place) => (
        <PlaceCard
          key={place.place_id}
          place={place}
          onClick={() => {
            setPlaceId(place.place_id);
            setOpen(true);
          }}
        />
      ));
    }
    return null;
  };

  const handleChange = (place) => {
    setQuery(place);
  };

  return (
    <Wrapper>
      <Container>
        <Search>
          <Logo src={logo} alt="logo da empresa" />
          <Select OnSelectChange={handleChange} />
          {renderCarousel()}
        </Search>
        {renderplaces()}
        <Modal open={open} onClose={() => setOpen(false)}>
          {placeselected ? (
            <>
              <Text size="large">{placeselected?.name}</Text>
              <Text size="medium">{placeselected?.formatted_phone_number}</Text>
              <Text size="medium">{placeselected?.formatted_address}</Text>
              <Text size="medium">
                {placeselected?.opening_hours?.open_now
                  ? 'Aberto agora :)'
                  : 'Fechado neste momento :('}
              </Text>
            </>
          ) : (
            <>
              <Skeleton width="10px" height="10px" />
              <Skeleton width="10px" height="10px" />
              <Skeleton width="10px" height="10px" />
              <Skeleton width="10px" height="10px" />
            </>
          )}
        </Modal>
      </Container>
      <Map query={query} placeId={placeId} />
    </Wrapper>
  );
};

export default Home;
