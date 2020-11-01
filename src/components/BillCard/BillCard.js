import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem, Body, View, Text, Badge } from 'native-base';
import FastImage from 'react-native-fast-image';
import ToastControl from 'react-native-root-toast';
import BillErrorBoundary from '@components/BillErrorBoundary';
import Styles from './styles';

const ToastControlOptions = {
  duration: 3000,
  position: ToastControl.positions.BOTTOM,
  animation: true,
  hideOnPress: true,
  delay: 0,
  opacity: 1
};

const STATUS = {
  PROCESSING: 'processing',
  SCHEDULED: 'scheduled',
  PAID: 'paid',
  UNABLE_TO_PAY: 'unable to pay'
};

const STATUS_MESSAGE = {
  PROCESSING: 'This bill is currently in processing, it can take approx. 1-2 hours depending on the time of day.',
  SCHEDULED: "This bill is scheduled to be paid and will be paid on the due date, you're in good hands!",
  PAID: 'This bill has been paid.',
  UNABLE_TO_PAY: 'This bill is unable to pay. Please contact Deferit HelpDesk.'
}

const getStatusColor = status => {
  switch(status) {
    case STATUS.PROCESSING:
      return 'grey';
    case STATUS.SCHEDULED:
      return 'orange';
    case STATUS.PAID:
      return 'green';
    case STATUS.UNABLE_TO_PAY:
      return 'red';
    default:
  }
}

const showStatusMessage = status => {
  switch(status) {
    case STATUS.PROCESSING:
      ToastControl.show(STATUS_MESSAGE.PROCESSING, { ...ToastControlOptions, backgroundColor: getStatusColor(status) });
      break;
    case STATUS.SCHEDULED:
      ToastControl.show(STATUS_MESSAGE.SCHEDULED, { ...ToastControlOptions, backgroundColor: getStatusColor(status) });
      break;
    case STATUS.PAID:
      ToastControl.show(STATUS_MESSAGE.PAID, { ...ToastControlOptions, backgroundColor: getStatusColor(status) });
      break;
    case STATUS.UNABLE_TO_PAY:
      ToastControl.show(STATUS_MESSAGE.UNABLE_TO_PAY, { ...ToastControlOptions, backgroundColor: getStatusColor(status) });
      break;
    default:
  }
}

const BillCard = props => {
  const { id, bill_image_url, amount, dollar = '', due_date, status, navigation } = props;
  return (
    <BillErrorBoundary>
      <ListItem key={id}>
        <TouchableOpacity
          style={Styles.button}
          onPress={() => { navigation.navigate('ImageDetails', { url: bill_image_url }) }}
        >
          <FastImage style={Styles.image} source={{ uri: bill_image_url }} />
        </TouchableOpacity>
        <Body>
          <Text numberOfLines={1} ellipsizeMode="middle">
            {`${dollar.toUpperCase()}$ ${amount}`}
          </Text>
          <View style={Styles.dateStatusView}>
            <Text note light style={Styles.date} numberOfLines={1}>
              {`Due date: ${due_date}`}
            </Text>
            <TouchableOpacity onPress={() => { showStatusMessage(status); }}>
              <Badge style={{...Styles.statusBadge, backgroundColor: getStatusColor(status)}}>
                <Text strong style={Styles.statusText}>
                  {status}
                </Text>
              </Badge>
            </TouchableOpacity>
          </View>
        </Body>
      </ListItem>
    </BillErrorBoundary>
  )
}

export default BillCard;
