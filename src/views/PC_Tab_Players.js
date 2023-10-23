import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Platform,
} from 'react-native';
import styles from '../assets/css/styles';
import playerComparisonImage from '../assets/img/PlayerComparison.png';
import CircleCrossImage from '../assets/img/circleCross.png';
import arrowDownImage from '../assets/img/arrowDownDark.png';
import arrowUpImage from '../assets/img/arrowUpDark.png';
import LinearGradient from 'react-native-linear-gradient';
import dressImages from '../Services/DressImages';

class PC_Tab_Players extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisibleBack: false,
      enableScroll: true,
      showDroupDown1: false,
      droupDown1Selected: 'Season',
      droupDown1Options: [
        { key: 1, droupDown: 1, name: 'Regular', selected: true },
        { key: 2, droupDown: 1, name: 'Playoffs' },
      ],
      showDroupDown2: false,
      droupDown2Selected: 'Time',
      droupDown2Options: [
        { key: 1, droupDown: 2, name: 'Career', selected: true },
        { key: 2, droupDown: 2, name: 'Current Season' },
        { key: 3, droupDown: 2, name: 'Last Season' },
        { key: 4, droupDown: 2, name: 'This Month' },
        { key: 5, droupDown: 2, name: 'Last Month' },
      ],
      playerSelected: false,
    };

    this._getFavoriteOption = this._getFavoriteOption.bind(this);
    this._getHeadings = this._getHeadings.bind(this);
    this._getScore = this._getScore.bind(this);
  }

  componentWillMount() {
    if (this.props.GridViewItems !== undefined) {
      var players = this.props.GridViewItems;
      var playerSelected = false;
      players.forEach((element, index) => {
        if (element.selected === true) {
          playerSelected = true;
        }
      });

      if (playerSelected) {
        this.setState({ playerSelected });
      }
    }

    var droupDown1Selected = this.props.selectedSeasonFilter;
    var droupDown2Selected = this.props.selectedTimeFilter;

    this.setState({ droupDown1Selected, droupDown2Selected });
  }

  _showModelBack = (item) => {
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });

    return (
      <View style={[styles.modelBackground, { position: 'absolute' }]}>
        <View style={styles.containerMiddle}>
          <View
            style={[
              styles.modelBody,
              { paddingBottom: 20, marginTop: '80%', borderRadius: 12 },
            ]}>
            <View style={{ marginHorizontal: 28, marginTop: 31 }}>
              <Text
                style={[
                  styles.modelTitle,
                  { fontSize: 18, textAlign: 'center', color: '#ffffffdd' },
                ]}>
                Do you want to reset?
              </Text>
            </View>
            <View
              style={[
                styles.containerRowCenter,
                { marginTop: 10, paddingBottom: 5 },
              ]}>
              <View
                style={{
                  width: '40%',
                  marginVertical: 10,
                  marginHorizontal: 5,
                }}>
                <TouchableOpacity
                  style={[
                    styles.yellowButtonSmall,
                    { backgroundColor: '#DEDEDE', borderWidth: 0, height: 40 },
                  ]}
                  onPress={() => this.setState({ modalVisibleBack: false })}>
                  <Text
                    style={[
                      styles.yellowButtonSmallText,
                      { fontSize: 16, lineHeight: 19 },
                    ]}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '40%',
                  marginVertical: 10,
                  marginHorizontal: 5,
                }}>
                <TouchableOpacity
                  style={[styles.yellowButtonSmall, { height: 40 }]}
                  onPress={() => this.props.allReset('Players')}>
                  <Text
                    style={[
                      styles.yellowButtonSmallText,
                      { fontSize: 16, lineHeight: 19 },
                    ]}>
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  _selecetOption = (item) => {
    if (item.droupDown === 1) {
      this.setState({
        droupDown1Selected: item.name,
        showDroupDown1: false,
        enableScroll: true,
      });
      this.props.changeSeasonFilter(item.name, 'Players');
    } else if (item.droupDown === 2) {
      this.setState({ droupDown2Selected: item.name, showDroupDown2: false });
      this.props.changeTimeFilter(item.name, 'Players');
    } else if (item.droupDown === 3) {
      this.setState({
        droupDown3Selected: item.name,
        showDroupDown3: false,
        enableScroll: true,
        remainingGame: this.state.remainingGames[item.key - 1],
      });
    }
  };

  _handleClick = (item) => {
    if (item.droupDown === 1) {
      this.setState({ droupDown1Selected: item.name });
    } else if (item.droupDown === 2) {
      this.setState({ droupDown2Selected: item.name });
    } else if (item.droupDown === 3) {
      this.setState({ droupDown3Selected: item.name });
    }
  };

  _getDroupDownCSS(item) {
    if (item.droupDown === 1) {
      return item.name === this.state.droupDown1Selected
        ? { backgroundColor: '#FDB734' }
        : {};
    } else if (item.droupDown === 2) {
      return item.name === this.state.droupDown2Selected
        ? { backgroundColor: '#FDB734' }
        : {};
    } else if (item.droupDown === 3) {
      return item.name === this.state.droupDown3Selected
        ? { backgroundColor: '#FDB734' }
        : {};
    }
  }

  _getDroupDownOptions(item) {
    return (
      <View key={item.key}>
        <TouchableOpacity
          onPress={() => this._selecetOption(item)}
          // onPressIn={() => this._handleClick(item)}
          style={[
            { width: '100%', height: 40, justifyContent: 'center' },
            this._getDroupDownCSS(item),
          ]}>
          <Text
            style={[
              styles.droupDownLabelText,
              {
                textAlign: 'left',
                marginLeft: 15,
                fontSize: 11,
                lineHeight: 13,
              },
            ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _getFavoriteOption(item) {
    return (
      <View
        key={item.key}
        style={[
          styles.favoriteOptionCard,
          {
            backgroundColor: 'transparent',
            padding: 0,
            justifyContent: 'flex-start',
            marginHorizontal: 0,
          },
        ]}>
        <View
          style={
            item.selected
              ? [styles.sliderColumnContainer, { marginTop: 10 }]
              : [styles.sliderColumnContainer]
          }>
          <TouchableOpacity
            onPress={() => this.props.selectPlayer(item, 'Players')}>
            {typeof item.image === 'number' ? (
              <Image source={item.image} />
            ) : (
              <Image source={dressImages[item.image]} />
            )}
          </TouchableOpacity>
          {item.selected && (
            <View
              style={[
                styles.sliderCirlceTextContainer,
                { marginTop: 5, margin: 0, padding: 10 },
              ]}>
              <Text style={styles.sliderDressNumText}>{item.number}</Text>
            </View>
          )}
        </View>
        <Text
          style={
            item.selected
              ? [
                  styles.yellowButtonSmallText,
                  { color: '#404040', textAlign: 'center', marginTop: 10 },
                ]
              : [
                  styles.yellowButtonSmallText,
                  { color: '#40404044', textAlign: 'center', marginTop: 5 },
                ]
          }>
          {item.selected ? item.name : 'Select Player'}
        </Text>
        <Text
          style={
            item.selected
              ? [
                  styles.yellowLabelText,
                  { color: '#8AABFF', textAlign: 'center', marginTop: 2 },
                ]
              : [
                  styles.yellowLabelText,
                  { color: '#40404044', textAlign: 'center', marginTop: 2 },
                ]
          }>
          {item.selected ? item.team : 'Team'}
        </Text>

        <Text
          style={
            item.selected
              ? [
                  styles.yellowLabelText,
                  { color: '#8AABFF', textAlign: 'center', marginTop: 2 },
                ]
              : [
                  styles.yellowLabelText,
                  { color: '#40404044', textAlign: 'center', marginTop: 2 },
                ]
          }>
          {item.selected ? item.role : 'Role'}
        </Text>

        {item.selected && (
          <TouchableOpacity
            onPress={() => this.props.resetPlayer(item, 'Players')}>
            <Image source={CircleCrossImage} />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  _getHeadings(item) {
    return (
      <View key={item.key} style={{ height: 30 }}>
        <Text style={[styles.teamItems, { fontSize: 9, marginVertical: 0 }]}>
          {item.title}
        </Text>
      </View>
    );
  }

  _getScore(item) {
    if (item.date) {
      return (
        <View style={{ marginTop: 10, height: 20 }} key={item.key}>
          <View
            style={{
              backgroundColor: '#8aabff',
              borderRadius: 20,
              height: 20,
              justifyContent: 'center',
              marginHorizontal: 5,
            }}>
            <Text
              style={[
                styles.teamItems,
                { color: '#404040', marginVertical: 0 },
              ]}>
              {item.date}
            </Text>
          </View>
        </View>
      );
    } else if (item.team) {
      return (
        <View style={{ marginTop: 10, height: 20 }} key={item.key}>
          <Text
            style={[styles.teamItems, { color: '#404040', marginVertical: 1 }]}>
            {item.team}
          </Text>
        </View>
      );
    } else if (item.score) {
      return (
        <View style={{ marginTop: 10, height: 20 }} key={item.key}>
          <Text
            style={[
              styles.teamItems,
              { color: item.color, marginVertical: 1 },
            ]}>
            {item.score}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{ marginTop: 10, height: 20 }} key={item.key}>
          <View style={{ height: 20 }}>
            <Text
              style={[
                styles.teamItems,
                { color: '#40404066', marginBottom: 1, marginVertical: 0 },
              ]}>
              -
            </Text>
          </View>
        </View>
      );
    }
  }

  updateScroll = (id) => {
    var flag = false;
    if (id === 1) {
      flag = !this.state.showDroupDown1;
      this.setState({ showDroupDown1: flag, enableScroll: !flag });
    } else if (id === 2) {
      flag = !this.state.showDroupDown2;
      this.setState({ showDroupDown2: flag, enableScroll: !flag });
    }
  };

  render() {
    return (
      <ScrollView
        scrollEnabled={this.state.enableScroll}
        ref={(c) => {
          this.scroll = c;
        }}>
        {!this.state.playerSelected && (
          <View
            style={{
              position: 'absolute',
              marginTop: 50,
              marginHorizontal: 10,
              width: '100%',
            }}>
            <LinearGradient
              style={[
                styles.sliderTabView,
                {
                  flex: 1,
                  padding: 20,
                  paddingBottom: 10,
                  marginTop: 15,
                  borderRadius: 12,
                  marginBottom: 15,
                  marginRight: 22,
                },
              ]}
              colors={['#182955', '#0F1633']}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: -1.0, y: 0.0 }}
              locations={[0.42, 1]}>
              <View style={styles.containerRowStart}>
                <Image
                  source={playerComparisonImage}
                  style={{ marginTop: 5 }}
                />
                <View style={{ marginLeft: 10, marginRight: 25 }}>
                  <Text
                    style={[
                      styles.greyText,
                      {
                        fontWeight: '500',
                        color: '#FFF',
                        borderBottomColor: '#ffffff33',
                        borderBottomWidth: 1,
                        paddingVertical: 5,
                        marginRight: 10,
                      },
                    ]}>
                    Let’s compare your players!
                  </Text>
                  <Text
                    style={[
                      styles.containerMiddlemodelDescription,
                      { color: '#8AABFF', marginRight: 15 },
                    ]}>
                    Start adding your favorite players to compare them. Tap the
                    '+' icon above and make sure to select the time you'd like
                    to see for your comparisons.
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}

        <View
          style={[
            this.state.playerSelected
              ? { paddingBottom: 20 }
              : { paddingBottom: 170 },
            Platform.OS === 'ios' ? styles.zindex20 : {},
          ]}>
          <View style={[styles.containerRowCenter, { marginVertical: 20 }]}>
            <View
              style={[
                Platform.OS === 'ios' ? styles.zindex20 : {},
                { width: '40%', marginHorizontal: 5 },
              ]}>
              <TouchableOpacity
                style={[styles.droupDownLabelContainer, { height: 30 }]}
                onPress={() => this.updateScroll(2)}>
                <Text
                  style={[
                    styles.droupDownLabelText,
                    { fontSize: 11, lineHeight: 13 },
                  ]}>
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
                <View>
                  <View style={[styles.droupDownFlatListContainer, {}]}>
                    <FlatList
                      style={{ height: 100 }}
                      data={this.state.droupDown2Options}
                      renderItem={({ item }) => this._getDroupDownOptions(item)}
                      numColumns={1}
                    />
                  </View>
                </View>
              )}
            </View>
            <View style={[{ width: '40%', marginLeft: 5 }]}>
              <TouchableOpacity
                style={[styles.droupDownLabelContainer, { height: 30 }]}
                onPress={() => this.updateScroll(1)}>
                <Text
                  style={[
                    styles.droupDownLabelText,
                    { fontSize: 11, lineHeight: 13 },
                  ]}>
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
                <View>
                  <View style={[styles.droupDownFlatListContainer, {}]}>
                    <FlatList
                      style={{ height: 100 }}
                      data={this.state.droupDown1Options}
                      renderItem={({ item }) => this._getDroupDownOptions(item)}
                      numColumns={1}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={{ marginLeft: 46, marginRight: 5 }}>
          <FlatList
            data={this.props.GridViewItems}
            renderItem={({ item }) => this._getFavoriteOption(item)}
            numColumns={4}
          />
        </View>

        {this.state.playerSelected ? (
          <View>
            <View
              style={[
                {
                  backgroundColor: '#FFF',
                  marginHorizontal: 6,
                  borderRadius: 15,
                },
              ]}>
              <View style={[styles.containerRowStart]}>
                <View
                  style={{
                    width: 40,
                    height: '100%',
                    borderRightWidth: 1,
                    borderRightColor: '#dedede88',
                  }}>
                  <View style={{ marginTop: 12 }}>
                    <FlatList
                      style={{}}
                      data={this.props.headings}
                      renderItem={({ item }) => this._getHeadings(item)}
                      numColumns={1}
                    />
                  </View>
                </View>

                <View style={{ width: '22%', height: '100%' }}>
                  <FlatList
                    style={{
                      borderRightWidth: 1,
                      borderRightColor: '#dedede88',
                    }}
                    data={this.props.player1}
                    renderItem={({ item }) => this._getScore(item)}
                    numColumns={1}
                  />
                </View>

                <View style={{ width: '22%', height: '100%' }}>
                  <FlatList
                    style={{
                      borderRightWidth: 1,
                      borderRightColor: '#dedede88',
                    }}
                    data={this.props.player2}
                    renderItem={({ item }) => this._getScore(item)}
                    numColumns={1}
                  />
                </View>

                <View style={{ width: '22%', height: '100%' }}>
                  <FlatList
                    style={{
                      borderRightWidth: 1,
                      borderRightColor: '#dedede88',
                    }}
                    data={this.props.player3}
                    renderItem={({ item }) => this._getScore(item)}
                    numColumns={1}
                  />
                </View>

                <View style={{ width: '22%', height: '100%' }}>
                  <FlatList
                    data={this.props.player4}
                    renderItem={({ item }) => this._getScore(item)}
                    numColumns={1}
                  />
                </View>
              </View>
            </View>
            <View style={styles.containerRowCenter}>
              <TouchableOpacity
                style={[
                  styles.yellowButton,
                  {
                    width: '50%',
                    backgroundColor: '#DEDEDE',
                    borderWidth: 0,
                    marginTop: 20,
                    marginBottom: 15,
                    height: 40,
                  },
                ]}
                onPress={() => this.setState({ modalVisibleBack: true })}>
                <Text
                  style={[
                    styles.yellowButtonText,
                    { color: '#0F1A38', fontSize: 12 },
                  ]}>
                  Reset Comparison
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ height: 300 }} />
        )}

        {this.state.modalVisibleBack && this._showModelBack()}
      </ScrollView>
    );
  }
}

export default PC_Tab_Players;
