import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from '../assets/css/styles';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import cheerio from 'cheerio';
import dressImages from '../Services/DressImages';
import countryCode from '../Services/ContryCode';
import { handleCurrencyFormat } from '../utils/numberFormate';
class PlayerStatsHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      capHit: '',
      // dailyCapHit: '',
      // totalEarning: '',
      // contractLength: '',
    };
  }

  async componentDidMount() {
    const nameLink = this.props.playerData.name
      .toLowerCase()
      .replace(/ /g, '-');
    const res = await axios.get(
      `https://www.capfriendly.com/players/${nameLink}`,
    );
    let $ = await cheerio.load(res.data);
    $('#playerSummary').each((i, e) => {
      if (e) {
        let stringDescription = $(e)
          .text()
          .trim()
          .replace(/[^a-zA-Z0-9\s]/g, '');

        let startString = 'his cap hit is ';
        let endString = 'for the 202324 season';

        let startIndex =
          stringDescription.indexOf(startString) + startString.length;
        let endIndex = stringDescription.indexOf(endString);

        let extractedString = stringDescription
          .slice(startIndex, endIndex)
          .trim();
        console.log('stringDescription>>>>', extractedString);

        if (
          extractedString &&
          Number(extractedString.replace(' for the 202324', ''))
        ) {
          this.setState({
            capHit: Number(extractedString.replace(' for the 202324', '')),
          });
        }
      }
    });

    // $('body > div.wrap > div > div > div.c.mt10 > span').each((i, e) => {
    //   if (e) {
    //     this.setState({
    //       dailyCapHit: $(e)
    //         .text()
    //         .trim()
    //         .replace(/[^0-9]/g, ''),
    //     });
    //   }
    // });
    // $('body > div.wrap > div > div > h6:nth-child(8) > a').each((i, e) => {
    //   if (e) {
    //     this.setState({
    //       totalEarning: $(e)
    //         .text()
    //         .trim()
    //         .replace(/[^0-9]/g, ''),
    //     });
    //   }
    // });

    // $(
    //   'body > div.wrap > div > div > div:nth-child(22) > div.rel.cntrct > div > div:nth-child(1) > div:nth-child(6)',
    // ).each((i, e) => {
    //   if (e) {
    //     this.setState({
    //       contractLength: $(e)
    //         .text()
    //         .trim()
    //         .replace(/[^0-9]/g, ''),
    //     });
    //   }
    // });
  }

  // handleContractLength = () => {
  //   if (this.state.contractLength) {
  //     return (
  //       <View
  //         style={[
  //           styles.sliderColumnContainer,
  //           {
  //             paddingHorizontal: 5,
  //             borderColor: '#ffffff33',
  //           },
  //         ]}>
  //         <Text style={[styles.greyText, { color: '#FFF', fontWeight: '500' }]}>
  //           {this.state.contractLength}
  //         </Text>
  //         <Text style={[styles.grayTextSmall, { color: '#fdb734' }]}>
  //           CONTRACT
  //         </Text>
  //       </View>
  //     );
  //   }
  // };
  handleCapHit = () => {
    if (this.state.capHit) {
      return (
        <>
          <View
            style={{ width: 1, backgroundColor: '#ffffff33', height: 30 }}
          />
          <View
            style={[
              styles.sliderColumnContainer,
              {
                paddingLeft: 5,
              },
            ]}>
            <Text
              style={[styles.greyText, { color: '#FFF', fontWeight: '500' }]}>
              {`$${handleCurrencyFormat(this.state.capHit)}`}
            </Text>
            <Text style={[styles.grayTextSmall, { color: '#fdb734' }]}>
              CAP HIT
            </Text>
          </View>
        </>
      );
    }
  };

  // handleDailtCapHit = () => {
  //   if (this.state.dailyCapHit) {
  //     return (
  //       <View
  //         style={[
  //           styles.sliderColumnContainer,
  //           {
  //             paddingHorizontal: 5,
  //             borderColor: '#ffffff33',
  //             borderLeftWidth: 1,
  //           },
  //         ]}>
  //         <Text style={[styles.greyText, { color: '#FFF', fontWeight: '500' }]}>
  //           {'$' + this.state.dailyCapHit}
  //         </Text>
  //         <Text style={[styles.grayTextSmall, { color: '#fdb734' }]}>
  //           DAILY CAP HIT
  //         </Text>
  //       </View>
  //     );
  //   }
  // };

  // handleTotalEarning = () => {
  //   if (this.state.totalEarning) {
  //     return (
  //       <View
  //         style={[
  //           styles.sliderColumnContainer,
  //           {
  //             paddingHorizontal: 15,
  //             borderColor: '#ffffff33',
  //             borderLeftWidth: 1,
  //           },
  //         ]}>
  //         <Text style={[styles.greyText, { color: '#FFF', fontWeight: '500' }]}>
  //           {`$${handleCurrencyFormat(this.state.totalEarning)}`}
  //         </Text>
  //         <Text style={[styles.grayTextSmall, { color: '#fdb734' }]}>
  //           TOTAL EARNING
  //         </Text>
  //       </View>
  //     );
  //   }
  // };

  handleTotalCap = () => {
    const { drafted } = this.props.playerData;
    if (drafted && drafted !== 'Not Set') {
      return (
        <View
          style={[
            styles.sliderColumnContainer,
            {
              paddingHorizontal: 15,
              borderColor: '#ffffff33',
              borderLeftWidth: 1,
            },
          ]}>
          <Text style={[styles.greyText, { color: '#FFF', fontWeight: '500' }]}>
            {drafted}
          </Text>
          <Text style={[styles.grayTextSmall, { color: '#fdb734' }]}>
            DRAFTED
          </Text>
        </View>
      );
    }
  };
  handleDraft = () => {
    const { drafted } = this.props.playerData;
    if (drafted && drafted !== 'Not Set') {
      return (
        <>
          <View
            style={{ width: 1, backgroundColor: '#ffffff33', height: 30 }}
          />

          <View
            style={[
              styles.sliderColumnContainer,
              {
                paddingHorizontal: 5,
              },
            ]}>
            <Text
              style={[styles.greyText, { color: '#FFF', fontWeight: '500' }]}>
              {drafted}
            </Text>
            <Text style={[styles.grayTextSmall, { color: '#fdb734' }]}>
              DRAFTED
            </Text>
          </View>
        </>
      );
    }
  };
  render() {
    var {
      name,
      teamName,
      nationality,
      teamlabel,
      postion,
      height,
      weight,
      age,
      shoots,
      birthData,
      birthCity,
      jursyNumber,
      captain,
      alternativeCaptain,
    } = this.props.playerData;
    let captainLabel = '';
    if (captain) {
      captainLabel = '(C)';
    }
    if (alternativeCaptain) {
      captainLabel = '(A)';
    }
    var flag = '';
    if (nationality) {
      flag = countryCode[nationality].toLowerCase();
    }
    return (
      <LinearGradient
        style={[styles.playerStatusContainer]}
        colors={['#182955', '#0F1633']}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: -1.0, y: 0.0 }}
        locations={[0.42, 1]}>
        <View
          style={[
            styles.containerRowStart,
            { width: '97%', height: '20%', marginTop: 20 },
          ]}>
          <View style={[styles.sliderColumnContainer, { width: '15%' }]}>
            <Image source={dressImages[teamlabel]} />
            <View style={styles.sliderCirlceTextContainer2}>
              <Text style={styles.sliderDressNumText}>{jursyNumber}</Text>
            </View>
          </View>
          <View
            style={[
              styles.sliderColumnContainer,
              { alignItems: 'flex-start' },
            ]}>
            <View style={styles.containerRowStart}>
              <Text style={[styles.playerNumberText, { color: '#FFFFFF' }]}>
                {name}
              </Text>
              {captainLabel !== '' ? (
                <Text
                  style={[
                    styles.checkboxDes,
                    { color: '#ffffff55', marginTop: 5, marginLeft: 7 },
                  ]}>
                  {captainLabel}
                </Text>
              ) : null}

              {/* <Image source={heartImage} style={{ marginLeft: 12, marginTop: 5 }} /> */}
            </View>
            <TouchableOpacity
              onPress={() => Actions.Team({ teamName: teamName })}>
              <Text
                style={[
                  styles.underlineText,
                  { color: '#8AABFF', fontWeight: 'normal' },
                ]}>
                {teamName}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.sliderColudmnContainer,
              { position: 'absolute', right: 10 },
            ]}>
            {}
            <Image
              source={{
                //  {{  uri: "https://www.countryflags.io/"+countryCode[nationality]+"/flat/64.png" }} style = {{height: 40,width:40, resizeMode : "contain", margin: 5}}
                uri:
                  'https://raw.githubusercontent.com/yusufshakeel/mysql-country-with-flag/master/flags-medium/' +
                  flag +
                  '.png',
              }}
              style={{
                height: 40,
                width: 40,
                resizeMode: 'contain',
                margin: 5,
              }}
            />
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            width: '98%',
          }}>
          <View style={[styles.containerRowCenter, { width: '100%' }]}>
            <View
              style={[
                styles.sliderColumnContainer,
                {
                  borderRightColor: '#ffffff33',
                  borderRightWidth: 1,
                  width: '20%',
                },
              ]}>
              <Text
                style={[styles.greyText, { color: '#FFF', fontWeight: '500' }]}>
                {postion}
              </Text>
              <Text style={[styles.grayTextSmall, { color: '#fdb734' }]}>
                POSITION
              </Text>
            </View>
            <View
              style={[
                styles.sliderColumnContainer,
                {
                  borderRightColor: '#ffffff33',
                  borderRightWidth: 1,
                  width: '20%',
                },
              ]}>
              <Text
                style={[styles.greyText, { color: '#FFF', fontWeight: '500' }]}>
                {height}
              </Text>
              <Text style={[styles.grayTextSmall, { color: '#fdb734' }]}>
                HEIGHT
              </Text>
            </View>

            <View
              style={[
                styles.sliderColumnContainer,
                {
                  borderRightColor: '#ffffff33',
                  borderRightWidth: 1,
                  width: '20%',
                },
              ]}>
              <Text
                style={[styles.greyText, { color: '#FFF', fontWeight: '500' }]}>
                {weight}
              </Text>
              <Text style={[styles.grayTextSmall, { color: '#fdb734' }]}>
                WEIGHT
              </Text>
            </View>

            <View
              style={[
                styles.sliderColumnContainer,
                {
                  borderRightColor: '#ffffff33',
                  borderRightWidth: 1,
                  width: '20%',
                },
              ]}>
              <Text
                style={[styles.greyText, { color: '#FFF', fontWeight: '500' }]}>
                {age}
              </Text>
              <Text style={[styles.grayTextSmall, { color: '#fdb734' }]}>
                AGE
              </Text>
            </View>

            <View style={[styles.sliderColumnContainer, { width: '20%' }]}>
              <Text
                style={[styles.greyText, { color: '#FFF', fontWeight: '500' }]}>
                {shoots}
              </Text>
              <Text style={[styles.grayTextSmall, { color: '#fdb734' }]}>
                SHOOTS
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View style={[styles.sliderColumnContainer, { margin: 5 }]}>
              <Text
                style={[styles.greyText, { color: '#FFF', fontWeight: '500' }]}>
                {birthData}
              </Text>
              <Text style={[styles.grayTextSmall, { color: '#fdb734' }]}>
                BIRTH DATE
              </Text>
            </View>
            <View
              style={{ width: 1, backgroundColor: '#ffffff33', height: 30 }}
            />
            <View style={[styles.sliderColumnContainer]}>
              <Text
                style={[styles.greyText, { color: '#FFF', fontWeight: '500' }]}>
                {birthCity}
              </Text>
              <Text style={[styles.grayTextSmall, { color: '#fdb734' }]}>
                BIRTH CITY
              </Text>
            </View>

            {this.handleDraft()}
            {this.handleCapHit()}
          </View>
        </View>
      </LinearGradient>
    );
  }
}
export default PlayerStatsHeader;
