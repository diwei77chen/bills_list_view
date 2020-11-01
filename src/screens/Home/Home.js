import React, { Component } from 'react';
import { FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { Container, Header, Body, Title } from 'native-base';
import ToastControl from 'react-native-root-toast';
import BillCard from '@components/BillCard';
import ListFooterSpinner from '@components/ListFooterSpinner';

const DATA_URL = 'https://my-json-server.typicode.com/diwei77chen/bills_list_view/bills';
const DATA_LOADING_ERROR_MESSAGE = "Sorry, we can't load your bills now.";
const WARNING_REACH_END_OF_BILLS = "You have no more bills.";
const INIT_NUMBER_OF_BILL = 10;
const NUMBER_OF_NEXT_BATCH = 10;
const ToastControlOptions = {
  duration: 3000,
  position: ToastControl.positions.BOTTOM,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
  opacity: 1
}
const checkIfHasMoreBills = (numberOfBills, totalNumberOfBills) => (numberOfBills < totalNumberOfBills);

class Home extends Component {
  getInitState = () => ({
    bills: [],
    isLoading: true,
    hasError: false,
    numberOfBills: INIT_NUMBER_OF_BILL
  });

  constructor(props) {
    super(props);
    this.state = this.getInitState();
  }

  renderBill = ({ item = {} }) => {
    const { navigation } = this.props;
    return <BillCard {...item} navigation={navigation} />;
  }

  getItemKey = ({ id }) => (id.toString());

  onListEndReached = ({ distanceFromEnd }) => {
    if (distanceFromEnd < 0) return;
    const { bills, numberOfBills } = this.state;
    const { length: totalNumberOfBills } = bills || [];
    const hasMoreBills = checkIfHasMoreBills(numberOfBills, totalNumberOfBills);
    if (hasMoreBills) {
      this.increaseNumberOfBills(numberOfBills, totalNumberOfBills, NUMBER_OF_NEXT_BATCH);
    } else {
      ToastControl.show(WARNING_REACH_END_OF_BILLS, {...ToastControlOptions })
    }
  }

  increaseNumberOfBills = (numberOfBills, totalNumberOfBills, numberOfNextBatch) => {
    let newNumberOfBills = numberOfBills;
    if (totalNumberOfBills - numberOfBills < numberOfNextBatch)
      newNumberOfBills = totalNumberOfBills;
    else
      newNumberOfBills += numberOfNextBatch;

    if (newNumberOfBills !== numberOfBills)
      this.setState({ numberOfBills: newNumberOfBills });
  }

  render() {
    const { bills, isLoading, hasError, numberOfBills } = this.state;
    const { length: totalNumberOfBills } = bills || [];
    const hasMoreBills = checkIfHasMoreBills(numberOfBills, totalNumberOfBills);
    const myBills = bills.slice(0, numberOfBills);
    return (
      <Container>
        <FlatList
          data={myBills}
          renderItem={this.renderBill}
          keyExtractor={this.getItemKey}
          extraData={numberOfBills}
          onEndReached={this.onListEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<ListFooterSpinner shouldShowSpinner={hasMoreBills} />}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                const initState = this.getInitState();
                this.setState(initState, () => {
                  this.loadData();
                  });
                }}
            />
          }
        />
      </Container>
    );
  }

  loadData = () => {
    fetch(DATA_URL)
    .then(res => res.json())
    .then(
      result => {
        this.setState({
          bills: result,
          isLoading: false,
          hasError: false
        });
      },
      error => {
        this.setState({
          bills: [],
          isLoading: false,
          hasError: true
        });
        ToastControl.show(DATA_LOADING_ERROR_MESSAGE, {
          ...ToastControlOptions, backgroundColor: 'red'
        });
      }
      );
  }

  componentDidMount() {
    this.loadData();
  }
}


export default Home;
