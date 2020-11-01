import React from 'react';
import { Dimensions } from 'react-native';
import { Container } from 'native-base';
import FastImage from 'react-native-fast-image';
import Styles from './styles';

const ImageDetails = props => {
  const { route } = props;
  const { params } = route || {};
  const { url } = params || {};
  if (!url) return null;
  const { width, height } = Dimensions.get('window');

  return (
    <Container style={Styles.container}>
      <FastImage
        style={{ width, height }}
        source={{ uri: url }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </Container>
  );
}

export default ImageDetails;
