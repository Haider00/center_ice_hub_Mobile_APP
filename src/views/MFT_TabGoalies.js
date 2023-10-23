import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from '../assets/css/styles';
import FantasyTeamImage from '../assets/img/FantasyTeam.png';
import CrossImage from '../assets/img/cross.png';
import LinearGradient from 'react-native-linear-gradient';
import AppService from '../Services/AppServices';
import dressImages from '../Services/DressImages';

class TabGoalies extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibleBack: false,
      showdialogue: false,
    };
    this.appService = new AppService();
  }

  async componentWillMount() {
    var dialogueFlag = await this.appService.getMFTDFlag();
    if (dialogueFlag) {
      this.setState({ showdialogue: false });
    }
  }
  _showModelBack = (item) => {
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
                  onPress={() => this.props.resetTeam('Goalie')}>
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
  _getFavoriteOption(item) {
    return (
      <View
        key={item.key}
        style={[
          styles.favoriteOptionCard,
          {
            backgroundColor: 'transparent',
            justifyContent: 'flex-start',
          },
          item.selected ? { paddingVertical: 0 } : { paddingVertical: 5 },
        ]}>
        <TouchableOpacity
          onPress={() => this.props.showTeamDailogue(item, 'Goalie')}>
          <View style={styles.sliderColumnContainer}>
            <View>
              <View style={{ height: 40 }}>
                {typeof item.image == 'number' ? (
                  <Image
                    source={item.image}
                    style={item.selected ? { marginTop: 0 } : {}}
                  />
                ) : (
                  <Image
                    source={dressImages[item.image]}
                    style={item.selected ? { marginTop: 4 } : {}}
                  />
                )}
              </View>
            </View>
            <View style={[styles.sliderCirlceTextContainer, { top: 4 }]}>
              <Text style={styles.sliderDressNumText}>{item.number}</Text>
            </View>

            <Text
              style={
                item.selected
                  ? [
                      styles.FavoriteOptionTitle,
                      { color: '#404040', marginTop: 4 },
                    ]
                  : [styles.FavoriteOptionTitle, { color: '#40404044' }]
              }>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
        {item.selected && (
          <TouchableOpacity
            onPress={() => this.props.showRemoveDialogue(item, 'Goalie')}>
            <Image source={item.circleCross} style={{ marginTop: 2 }} />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  hideDialogue = () => {
    this.setState({ showdialogue: false });
    this.appService.setMFTDFlag('1');
  };

  render() {
    return (
      <View style={[styles.tabScene, {}]}>
        {this.state.showdialogue && (
          <LinearGradient
            style={[
              styles.sliderTabView,
              {
                height: 210,
                marginHorizontal: 15,
                marginVertical: 20,
                borderRadius: 4,
              },
            ]}
            colors={['#182955', '#0F1633']}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: -1.0, y: 0.0 }}
            locations={[0.42, 1]}>
            <TouchableOpacity
              onPress={this.hideDialogue}
              style={{ position: 'absolute', top: 2, right: 2 }}>
              <Image source={CrossImage} />
            </TouchableOpacity>
            <View style={styles.containerRowStart}>
              <Image source={FantasyTeamImage} />
              <View style={{ marginLeft: 10, marginRight: 35 }}>
                <View
                  style={{
                    borderBottomColor: '#ffffff33',
                    borderBottomWidth: 1,
                    paddingVertical: 5,
                  }}>
                  <Text
                    style={[
                      styles.greyText,
                      { fontWeight: '500', color: '#FFF' },
                    ]}>
                    Build your fantasy team!
                  </Text>
                </View>
                <Text
                  style={[
                    styles.containerMiddlemodelDescription,
                    { color: '#8AABFF' },
                  ]}>
                  Start by adding your favorite players to build your own custom
                  fantasy team. Tap the + icon to begin adding your players and
                  if you'd like to remove them click on the x icon below them.
                  If you'd like to reset an entire set of players please click
                  the reset button below and lastly don't forget to save your
                  fantasy team.
                </Text>
              </View>
            </View>
          </LinearGradient>
        )}
        <View style={[styles.containerRowCenter, { marginTop: 10 }]}>
          <View style={{ alignItems: 'center', width: '33%' }}>
            <Text
              style={[
                styles.checkboxDes,
                { textAlign: 'center', color: '#40404088' },
              ]}>
              Starter
            </Text>
          </View>
          <View style={{ alignItems: 'center', width: '33%' }}>
            <Text
              style={[
                styles.checkboxDes,
                { textAlign: 'center', color: '#40404088' },
              ]}>
              Backup
            </Text>
          </View>
          <View style={{ alignItems: 'center', width: '33%' }}>
            <Text
              style={[
                styles.checkboxDes,
                { textAlign: 'center', color: '#40404088' },
              ]}>
              Extra
            </Text>
          </View>
        </View>
        <View style={{}}>
          <FlatList
            data={this.props.GridViewItems}
            renderItem={({ item }) => this._getFavoriteOption(item)}
            numColumns={3}
          />
        </View>

        <View style={[styles.containerRowCenter, { marginTop: 20 }]}>
          <View style={{ marginLeft: '5%', marginRight: '1%', width: '45%' }}>
            <TouchableOpacity
              style={[
                styles.transparentButton,
                {
                  marginTop: 10,
                  backgroundColor: '#DEDEDE',
                  borderWidth: 0,
                  height: 40,
                },
              ]}
              onPress={() => this.setState({ modalVisibleBack: true })}>
              <Text style={styles.roundGrayButtonText}>Reset Goalies</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginRight: '5%', marginLeft: '1%', width: '45%' }}>
            <TouchableOpacity
              style={[
                styles.transparentButton,
                {
                  marginTop: 10,
                  backgroundColor: '#FDB734',
                  borderWidth: 0,
                  height: 40,
                },
              ]}
              onPress={this.props.saveTeam}>
              <Text style={[styles.roundGrayButtonText, { color: '#0F1A38' }]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.containerRowCenter, { marginTop: 25 }]}>
          <Text
            style={[
              styles.grayTextSmall,
              { marginLeft: 5, backgroundColor: '#EDF2FF', padding: 6 },
            ]}>
            Click the players to view details
          </Text>
        </View>
        {/* <View style={[styles.containerRowCenter, { marginTop: 30 }]}>
                    <Image source={InfoImage} />
                    <Text style={[styles.grayTextSmall, { marginLeft: 5 }]}>Click the players to view details</Text>
                </View> */}
        {this.state.modalVisibleBack && this._showModelBack()}
      </View>
    );
  }
}

export default TabGoalies;
