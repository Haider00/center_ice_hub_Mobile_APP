import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import styles from '../assets/css/styles';
import BackgroundImage from '../assets/img/Group.png';
import { Actions } from 'react-native-router-flux';
import DressARIImage from '../assets/img/dressARI.png';
import InfoImage from '../assets/img/info.png';
import PlusImage from '../assets/img/plus.png';
import crossImage from '../assets/img/crossGray.png';
import moment from 'moment';

class T_TabInjuries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionFlag1: false,
      descriptionFlag2: false,
      current: 0,
    };
    this.showDescription = this.showDescription.bind(this);
  }

  _takeAction = (item) => {
    if (item.playerLink != '') Actions.PlayerStats({ item });
    else
      alert(
        "Sorry but it looks like we can't pull this player's stats at this time. Please try again later.",
      );
  };

  checkDescription = (item) => {
    var current_player = this.props.GridViewItems.findIndex(
      (x) => x.key == item.key,
    );
    this.setState({ current: current_player });
    this.setState({ descriptionFlag1: true });
    if (item.key < 4) {
      this.setState({ descriptionFlag1: true });
      this.setState({ descriptionFlag2: true });
    } else if (item.key < 7) {
      this.setState({ descriptionFlag2: true });
      this.setState({ descriptionFlag1: true });
    }
  };
  _getFavoriteOption(item) {
    return (
      <View
        key={item.key}
        style={[
          styles.tabfavoriteOptionCard,
          {
            backgroundColor: 'transparent',
            marginTop: 10,
            paddingHorizontal: 0,
          },
        ]}>
        <TouchableOpacity
          style={styles.sliderColumnContainer}
          onPress={() => this._takeAction(item)}>
          <Image source={item.image} />
          <View style={styles.sliderCirlceTextContainer}>
            <Text style={styles.sliderDressNumText}>{item.number}</Text>
          </View>
        </TouchableOpacity>
        <Text
          style={[
            styles.FavoriteOptionTitle,
            { color: '#404040', fontSize: 13 },
          ]}>
          {item.name}
        </Text>
        <View
          style={{ marginTop: 10 }}
          // onPress={() => this.checkDescription(item)}
        >
          <View
            style={{
              flexDirection: 'row',
              padding: 2,
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 11,
              },
              shadowOpacity: 0.57,
              shadowRadius: 15.19,
              elevation: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={PlusImage} />
          </View>
        </View>
      </View>
    );
  }

  showDescription(item) {
    var aa = this.props.GridViewItems;
    var injurydate = moment(
      this.props.GridViewItems[this.state.current].injury_date,
    ).format('MMM DD, YYYY');
    //    var injurydate=  moment(this.props.GridViewItems[this.state.current].injury_date, "MM/DD/YY").format("Mon DD, YYYY")
    return (
      <View
        style={[
          {
            backgroundColor: '#FFF',
            marginHorizontal: '5%',
            borderRadius: 10,
            paddingVertical: 5,
          },
        ]}>
        <View style={styles.containerColumn}>
          <TouchableOpacity
            style={[
              styles.modelCrossBUtton,
              { marginTop: 2, marginRight: 8, marginBottom: 0 },
            ]}
            onPress={() => {
              this.setState({
                descriptionFlag1: false,
                descriptionFlag2: false,
              });
            }}>
            <Image source={crossImage} />
          </TouchableOpacity>
          <View
            style={[
              styles.containerColumn,
              { width: '90%', marginHorizontal: 8 },
            ]}>
            <View style={[styles.containerRowStart, { marginBottom: 7 }]}>
              <Text
                style={[
                  styles.yellowButtonSmallText,
                  { color: '#404040', marginLeft: 10 },
                ]}>
                Injury Update:
                <Text
                  style={[
                    styles.yellowButtonSmallText,
                    {
                      marginLeft: 10,
                      color: '#404040',
                      fontWeight: 'normal',
                      textAlign: 'left',
                    },
                  ]}>
                  {' '}
                  {this.props.GridViewItems[this.state.current].injury_detail}
                </Text>
              </Text>
            </View>
            <View style={[styles.containerRowStart, { marginBottom: 15 }]}>
              <Text
                style={[
                  styles.yellowButtonSmallText,
                  { color: '#404040', marginLeft: 10 },
                ]}>
                Date of Injury Update:
              </Text>
              <Text
                style={[
                  styles.yellowButtonSmallText,
                  { color: '#404040', fontWeight: 'normal' },
                ]}>
                {' '}
                {injurydate}{' '}
              </Text>
            </View>
            {/*    <View style={[styles.containerRowStart, { marginBottom: 7 }]}>
                            <Text style={[styles.yellowButtonSmallText, { color: "#404040", marginLeft: 10 }]}>Injury Type:</Text>
                            <Text style={[styles.yellowButtonSmallText, { color: "#404040", fontWeight: "normal" }]}> Hip </Text>
                        </View> */}
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View
        style={[
          styles.tabScene,
          { height: '100%', flex: 1, marginVertical: 30, marginHorizontal: 10 },
        ]}>
        <View>
          <View style={styles.containerColumn}>
            <View style={{ width: '90%', marginHorizontal: '5%' }}>
              <FlatList
                style={{}}
                data={this.props.GridViewItems}
                renderItem={({ item }) => this._getFavoriteOption(item)}
                numColumns={3}
              />
            </View>
            {this.state.descriptionFlag1 &&
              this.showDescription(this.props.GridViewItems)}
          </View>
          <View style={[styles.containerRowCenter, { marginTop: 25 }]}>
            <Text
              style={[
                styles.grayTextSmall,
                { backgroundColor: '#EDF2FF', padding: 6 },
              ]}>
              Click on a player to view their stats.
            </Text>
          </View>
          {/* <View style={[styles.containerRowCenter, { marginTop: 25, marginTop: 10 }]}>
                           <View style={{backgroundColor:"#EDF2FF",flexDirection:"row", alignItems:"center"}}>
                              <Text style={[styles.grayTextSmall,{padding:4,marginTop:3}]}>Click on the</Text>
                           <Image source={PlusImage} />
                           <Text style={[styles.grayTextSmall,{padding:4,marginTop:3}]}>to view the player injury details.</Text></View> 
                       </View> */}
        </View>
      </View>
    );
  }
}

export default T_TabInjuries;
