import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from '../assets/css/styles';

import { Actions } from 'react-native-router-flux';
import { CheckBox } from 'react-native-elements';
import NavBarSecondary from '../components/NavBarSecondary';
import tickImage from '../assets/img/checkboxLight.png';
import rectangleImage from '../assets/img/uncheckBox.png';
import arrowDownImage from '../assets/img/arrowDownDark.png';
import arrowUpImage from '../assets/img/arrowUpDark.png';

import { FlatList } from 'react-native-gesture-handler';

class AddTickers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxForward: false,
      checkboxDefenseman: false,
      checkboxGoalies: false,
      language: 'Favorite Team',
      showDroupDown1: false,
      droupDown1Selected: 'Short Handed Goals',
      droupDown1Options: [
        { key: 1, droupDown: 1, name: 'Anaheim Ducks 1', selected: true },
        { key: 2, droupDown: 1, name: 'Anaheim Ducks 2' },
        { key: 3, droupDown: 1, name: 'Anaheim Ducks 3' },
      ],
      showDroupDown2: false,
      droupDown2Selected: 'Short Handed Goals',
      droupDown2Options: [
        { key: 1, droupDown: 2, name: 'Anaheim Ducks 1', selected: true },
        { key: 2, droupDown: 2, name: 'Anaheim Ducks 2' },
        { key: 3, droupDown: 2, name: 'Anaheim Ducks 3' },
      ],
    };
  }

  _selecetOption = (item) => {
    if (item.droupDown === 1) {
      this.setState({ droupDown1Selected: item.name, showDroupDown1: false });
    } else if (item.droupDown === 2) {
      this.setState({ droupDown2Selected: item.name, showDroupDown2: false });
    }
  };

  _handleClick = (item) => {
    if (item.droupDown === 1) {
      this.setState({ droupDown1Selected: item.name });
    } else if (item.droupDown === 2) {
      this.setState({ droupDown2Selected: item.name });
    }
  };

  _getDroupDownOptions(item) {
    return (
      <View key={item.key}>
        <TouchableOpacity
          style={[
            { width: '100%', height: 40, justifyContent: 'center' },
            item.droupDown === 1
              ? item.name === this.state.droupDown1Selected
                ? { backgroundColor: '#FDB734' }
                : {}
              : item.name === this.state.droupDown2Selected
              ? { backgroundColor: '#FDB734' }
              : {},
          ]}
          onPress={() => this._selecetOption(item)}
          onPressIn={() => this._handleClick(item)}
          activeOpacity={1}>
          <Text
            style={[
              styles.droupDownLabelText,
              { textAlign: 'left', marginLeft: 15 },
            ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  bannerError = (e) => {
    //
  };

  render() {
    return (
      <View style={{ backgroundColor: '#F8F8F8' }}>
        <ScrollView style={{ height: '100%' }}>
          <NavBarSecondary title="Add New Ticker" />
          <View style={{ margin: '7%' }}>
            <Text style={styles.roundEditTextWhiteLabel}>Ticker Title</Text>
            <TextInput
              placeholder="Lorem Ipsum"
              underlineColorAndroid="transparent"
              placeholderTextColor="#404040"
              style={styles.roundEditTextWhite}
            />

            <Text style={styles.roundEditTextWhiteLabel}>Ticker Stat</Text>
            <View
              style={[
                Platform.OS === 'ios' ? styles.zindex20 : {},
                { marginTop: 10, marginBottom: 20 },
              ]}>
              <TouchableOpacity
                style={[styles.droupDownLabelContainer, {}]}
                onPress={() =>
                  this.setState({ showDroupDown1: !this.state.showDroupDown1 })
                }
                activeOpacity={1}>
                <Text style={styles.droupDownLabelText}>
                  {this.state.droupDown1Selected}
                </Text>
                <View style={{ marginRight: 20, marginBottom: 2 }}>
                  <Image
                    source={
                      this.state.showDroupDown1 ? arrowUpImage : arrowDownImage
                    }
                  />
                </View>
              </TouchableOpacity>
              {this.state.showDroupDown1 && (
                <View
                  style={[
                    styles.droupDownFlatListContainer,
                    { marginTop: 45 },
                  ]}>
                  <FlatList
                    style={{}}
                    data={this.state.droupDown1Options}
                    renderItem={({ item }) => this._getDroupDownOptions(item)}
                    numColumns={1}
                  />
                </View>
              )}
            </View>

            <Text style={styles.roundEditTextWhiteLabel}>Ticker Period</Text>
            <View
              style={[
                Platform.OS === 'ios' ? styles.zindex20 : {},
                { marginTop: 10, marginBottom: 20 },
              ]}>
              <TouchableOpacity
                style={[styles.droupDownLabelContainer, {}]}
                onPress={() =>
                  this.setState({ showDroupDown2: !this.state.showDroupDown2 })
                }
                activeOpacity={1}>
                <Text style={styles.droupDownLabelText}>
                  {this.state.droupDown2Selected}
                </Text>
                <View style={{ marginRight: 20, marginBottom: 2 }}>
                  <Image
                    source={
                      this.state.showDroupDown2 ? arrowUpImage : arrowDownImage
                    }
                  />
                </View>
              </TouchableOpacity>
              {this.state.showDroupDown2 && (
                <View
                  style={[
                    styles.droupDownFlatListContainer,
                    { marginTop: 45 },
                  ]}>
                  <FlatList
                    style={{}}
                    data={this.state.droupDown2Options}
                    renderItem={({ item }) => this._getDroupDownOptions(item)}
                    numColumns={1}
                  />
                </View>
              )}
            </View>

            <Text style={styles.roundEditTextWhiteLabel}>
              Ticker Player Position
            </Text>
            <View style={[styles.containerRowStart, { marginTop: 5 }]}>
              <CheckBox
                title="Forwards"
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                  paddingHorizontal: 0,
                  marginHorizontal: 0,
                }}
                textStyle={[styles.checkboxDes, { color: '#404040' }]}
                checked={this.state.checkboxUpdate}
                checkedIcon={<Image source={tickImage} />}
                uncheckedIcon={<Image source={rectangleImage} />}
                onPress={() =>
                  this.setState({ checkboxUpdate: !this.state.checkboxUpdate })
                }
              />

              <CheckBox
                title="Defenseman"
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                  paddingHorizontal: 0,
                  marginHorizontal: 0,
                }}
                textStyle={[styles.checkboxDes, { color: '#404040' }]}
                checked={this.state.checkboxDefenseman}
                checkedIcon={<Image source={tickImage} />}
                uncheckedIcon={<Image source={rectangleImage} />}
                onPress={() =>
                  this.setState({
                    checkboxDefenseman: !this.state.checkboxDefenseman,
                  })
                }
              />

              <CheckBox
                title="Goalies"
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                  paddingHorizontal: 0,
                  marginHorizontal: 0,
                }}
                textStyle={[styles.checkboxDes, { color: '#404040' }]}
                checked={this.state.checkboxGoalies}
                checkedIcon={<Image source={tickImage} />}
                uncheckedIcon={<Image source={rectangleImage} />}
                onPress={() =>
                  this.setState({
                    checkboxGoalies: !this.state.checkboxGoalies,
                  })
                }
              />
            </View>

            <TouchableOpacity
              style={[styles.yellowButton, { marginTop: 25 }]}
              onPress={() => Actions.pop()}>
              <Text style={styles.yellowButtonText}>Add Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AddTickers;
