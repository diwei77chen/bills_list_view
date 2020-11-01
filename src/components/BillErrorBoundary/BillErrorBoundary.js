import React, { Component } from 'react';
import { View, Text } from 'native-base';
import Styles from './styles';

class BillErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <View style={Styles.errorBoundary} >
          <Text inverse>Unexpected Error</Text>
        </View>
      )
    }
    return children;
  }

  componentDidCatch(error, info) {
    console.error('BillErrorBoundary error', error, 'info', info);
    this.setState({ hasError: true });
  }
}

export default BillErrorBoundary;
