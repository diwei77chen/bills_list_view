import React from 'react';
import { ActivityIndicator } from 'react-native';
import Styles from './styles';

const ListFooterSpinner = ({ shouldShowSpinner }) => {
  if (!shouldShowSpinner) return null;
  return <ActivityIndicator size="small" style={Styles.spinner} />;
}

export default ListFooterSpinner;
