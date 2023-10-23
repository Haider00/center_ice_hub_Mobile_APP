import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCaretLeft,
  faRedoAlt,
  faCaretRight,
  faThumbsUp,
  faThumbsDown,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../assets/css/styles';
import {
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
  View,
  ScrollView,
  Text,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class CenterIcePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ListPast5Games: [
        { key: 1, Date: 'Mar 11,2020', team2: 'Team2', Score: 4 },
        { key: 2, Date: 'Mar 11,2020', team2: 'Team2', Score: 4 },
        { key: 3, Date: 'Mar 11,2020', team2: 'Team2', Score: 3 },
        { key: 4, Date: 'Mar 11,2020', team2: 'Team2', Score: 3 },
        { key: 5, Date: 'Mar 11,2020', team2: 'Team2', Score: 4 },
      ],
      Time: '12:12:12',
      likePopup: false,
      tokenAmountPopUp: false,
      disLikePopup: false,
      tokenRewarded: false,
      expectedShot: false,
    };
    this._getPast5 = this._getPast5.bind(this);
  }

  toggleLikePopUp(visible) {
    this.setState({ likePopup: visible });
  }
  toggleDisLikePopup(visible) {
    this.setState({ disLikePopup: visible });
  }
  toggleTokenAmountPopUp(visible) {
    this.setState({ tokenAmountPopUp: visible });
  }
  toggleTokenRewarded(visible) {
    this.setState({ tokenRewarded: visible });
  }
  toggleExpectedShot(visible) {
    this.setState({ expectedShot: visible });
  }

  _getPast5(item) {
    return (
      <View style={[, styles.flex_row, styles.bwb2, styles.bgrey, styles.p8]}>
        <Text style={[styles.flex6, styles.p8]}>{item.Date}</Text>
        <Text style={[styles.flex2, styles.p8, styles.txt_lblue]}>VS</Text>
        <Text style={[styles.flex4, styles.p8]}>{item.team2}</Text>
        <Text
          style={[
            styles.flex1,
            styles.p8,
            styles.txt_white,
            styles.br8,
            styles.txt_center,
            item.Score < 4 ? styles.bg_red : styles.bg_green,
          ]}>
          {item.Score}
        </Text>
      </View>
    );
  }

  refresh() {
    Actions.refresh();
  }

  _LikePopUp = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.likePopup}>
        <View style={[styles.modelBackground2, { position: 'absolute' }]}>
          <View style={styles.containerMiddle}>
            <View style={[styles.modelBody2]}>
              <View style={{ flexDirection: 'row' }}>
                <View style={[{ width: '30%' }, styles.justify_center]}>
                  <FontAwesomeIcon
                    style={[styles.txt_green, styles.txt_right]}
                    icon={faThumbsUp}
                    size={60}
                  />
                </View>

                <View style={[{ width: '70%' }]}>
                  <Text style={[styles.heading, styles.txt_white]}>
                    AWESOME!
                  </Text>

                  <Text style={[styles.txt, styles.txt_white]}>
                    You went up by X points! Do you think you have what it takes
                    to come first this month to win a prize?
                  </Text>
                </View>
              </View>
              <View style={[styles.containerRowCenter, {}]}>
                <View style={{ width: '100%' }}>
                  <TouchableOpacity
                    style={[styles.yellowButtonSmall, { height: 40 }]}
                    onPress={() => this.toggleLikePopUp(!this.state.likePopup)}>
                    <Text
                      style={[
                        styles.yellowButtonSmallText,
                        { fontSize: 16, lineHeight: 19 },
                      ]}>
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  _DisLikePopUp = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.disLikePopup}>
        <View style={[styles.modelBackground2, { position: 'absolute' }]}>
          <View style={styles.containerMiddle}>
            <View style={styles.modelBody2}>
              <View style={{ flexDirection: 'row' }}>
                <View style={[{ width: '30%' }, styles.justify_center]}>
                  <FontAwesomeIcon
                    style={[
                      styles.flex2,
                      styles.dislike_img,
                      styles.txt_red,
                      styles.txt_right,
                    ]}
                    icon={faThumbsDown}
                    size={60}
                  />
                </View>

                <View style={{ width: '70%' }}>
                  <Text style={[styles.heading, styles.txt_white]}>
                    NICE TRY!
                  </Text>

                  <Text style={[styles.txt, styles.txt_white]}>
                    You didn’t win any points yesterday so make some picks today
                    and aim for one of the top 3 prizes!
                  </Text>
                </View>
              </View>
              <View style={[styles.containerRowCenter, {}]}>
                <View style={{ width: '100%' }}>
                  <TouchableOpacity
                    style={[styles.yellowButtonSmall, { height: 40 }]}
                    onPress={() =>
                      this.toggleDisLikePopup(!this.state.disLikePopup)
                    }>
                    <Text
                      style={[
                        styles.yellowButtonSmallText,
                        { fontSize: 16, lineHeight: 19 },
                      ]}>
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  _TokenAmountPopUp = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.TokenAmountPopUp}>
        <View style={[styles.modelBackground2, { position: 'absolute' }]}>
          <View style={styles.containerMiddle}>
            <View style={styles.modelBody2}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={[{ width: '45%' }, styles.justify_center, styles.p4]}>
                  <Image
                    source={require('../assets/img/logo.png')}
                    style={[styles.token_img, styles.flex5, styles.zindex10]}
                  />
                </View>

                <View style={[{ width: '55%' }, styles.p8]}>
                  <Text style={[styles.heading, styles.txt_white]}>TOKENS</Text>

                  <Text style={[styles.txt, styles.txt_white]}>
                    How many tokens do you want to use?
                  </Text>
                  <View
                    style={[
                      styles.flex_row,
                      styles.justify_center,
                      styles.mt8,
                    ]}>
                    <TouchableOpacity
                      style={[
                        styles.btn_inc,
                        styles.flex1,
                        styles.bg_lblue,
                        styles.brl8,
                        styles.justify_center,
                        { height: 35 },
                      ]}>
                      <View>
                        <Text
                          style={[
                            styles.btn_txt,
                            styles.p2,
                            styles.txt_center,
                            styles.heading,
                            styles.txt_white,
                          ]}>
                          -
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TextInput
                      placeholder="0"
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#ffffff"
                      type="number"
                      keyboardType={'numeric'}
                      value={this.state.Counter}
                      style={[
                        { height: 35 },
                        styles.bw2,
                        styles.p4,
                        styles.bblight,
                        styles.flex2,
                        styles.justify_center,
                        styles.txt_center,
                        styles.txt_white,
                      ]}
                      onChangeText={(text) => this.setState({ Counter: text })}
                    />

                    <TouchableOpacity
                      style={[
                        styles.btn_inc,
                        styles.flex1,
                        styles.bg_lblue,
                        styles.brr8,
                        styles.justify_center,
                        { height: 35 },
                      ]}>
                      <View>
                        <Text
                          style={[
                            styles.btn_txt,
                            styles.p2,
                            styles.txt_center,
                            styles.heading,
                            styles.txt_white,
                          ]}>
                          +
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.containerRow}>
                <View style={{ width: '45%' }}>
                  <TouchableOpacity
                    style={[
                      styles.yellowButtonSmall,
                      {
                        backgroundColor: '#DEDEDE',
                        borderWidth: 0,
                        height: 40,
                      },
                    ]}
                    onPress={() => {
                      this.toggleTokenAmountPopUp(!this.state.tokenAmountPopUp);
                      this.toggleTokenRewarded(true);
                    }}>
                    <Text
                      style={[
                        styles.yellowButtonSmallText,
                        { fontSize: 16, lineHeight: 19 },
                      ]}>
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '45%' }}>
                  <TouchableOpacity
                    style={[styles.yellowButtonSmall, { height: 40 }]}
                    onPress={() => {
                      this.toggleTokenAmountPopUp(!this.state.tokenAmountPopUp);
                      this.toggleTokenRewarded(true);
                    }}>
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
      </Modal>
    );
  };

  _TokenRewarded = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.TokenRewarded}>
        <View style={[styles.modelBackground2, { position: 'absolute' }]}>
          <View style={styles.containerMiddle}>
            <View style={styles.modelBody2}>
              <Text
                style={[styles.heading, styles.txt_white, styles.txt_center]}>
                AWESOME!
              </Text>

              <Text style={[styles.text, styles.txt_white, styles.txt_center]}>
                We have added X tokens into your account for viewing the video.
                View another video soon for more tokens.
              </Text>

              <View style={styles.containerRowCenter}>
                <View style={{ width: '80%' }}>
                  <TouchableOpacity
                    style={[styles.yellowButtonSmall, { height: 40 }]}
                    onPress={() => {
                      this.toggleTokenRewarded(!this.state.tokenRewarded);
                    }}>
                    <Text
                      style={[
                        styles.yellowButtonSmallText,
                        { fontSize: 16, lineHeight: 19 },
                      ]}>
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  _ExpectedShot = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={this.state.expectedShot}>
        <View
          style={[
            styles.modelBackground2,
            styles.justify_center,
            { position: 'absolute' },
          ]}>
          <View style={styles.containerMiddlemodelDescription}>
            <View
              style={[
                styles.modelBody2,
                { backgroundColor: '#fff', borderWidth: 1 },
              ]}>
              <Text style={[styles.txt_center, styles.p8]}>
                Expected Shots On Goal | Points to Win: X
              </Text>

              <View style={styles.containerRow}>
                <View style={{ width: '48%' }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.toggleExpectedShot(!this.state.expectedShot);
                      this.toggleLikePopUp(true);
                    }}
                    style={[
                      styles.btn_ok,
                      styles.bg_green,
                      styles.ph16,
                      styles.pb,
                      { paddingTop: 0, paddingBottom: 4 },
                    ]}>
                    <Text style={[styles.text]}>★ Over 4</Text>
                    <View
                      style={[
                        styles.flex_row,
                        styles.bg_white,
                        styles.brround,
                      ]}>
                      <View
                        style={[
                          styles.bg_secondary,
                          styles.brround,
                          { width: '25%', height: 15 },
                        ]}></View>
                      <Text
                        style={[
                          styles.txt,
                          styles.flex4,
                          styles.txt_center,
                          { width: '100%', position: 'absolute' },
                        ]}>
                        25%
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '48%' }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.toggleExpectedShot(!this.state.expectedShot);
                      this.toggleDisLikePopup(true);
                    }}
                    style={[
                      styles.btn_ok,
                      styles.bg_red,
                      styles.ph16,
                      styles.pb,
                      { paddingTop: 0, paddingBottom: 4 },
                    ]}>
                    <Text style={[styles.text]}>★ Under 3.5</Text>
                    <View
                      style={[
                        styles.flex_row,
                        styles.bg_white,
                        styles.brround,
                      ]}>
                      <View
                        style={[
                          styles.bg_secondary,
                          styles.brround,
                          { width: '75%', height: 15 },
                        ]}></View>
                      <Text
                        style={[
                          styles.txt,
                          styles.flex4,
                          styles.txt_center,
                          { width: '100%', position: 'absolute' },
                        ]}>
                        75%
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View>
        <ScrollView
          style={[{ backgroundColor: '#F8F8F8' }, styles.p8, styles.mb64]}>
          <View style={[styles.flex_row, styles.justify_space]}>
            <TouchableOpacity
              onPress={() => {
                this.toggleTokenAmountPopUp(true);
              }}
              style={[
                { width: '30%' },
                styles.brround,
                styles.bg_secondary,
                styles.p4,
              ]}>
              <Text style={[styles.txt, styles.txt_center]}>Daily Tokens</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.toggleTokenAmountPopUp(true);
              }}
              style={[
                { width: '30%' },
                styles.brround,
                styles.bg_secondary,
                styles.p4,
              ]}>
              <Text style={[styles.txt, styles.txt_center]}>Weekly Tokens</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.toggleTokenAmountPopUp(true);
              }}
              style={[
                { width: '30%' },
                styles.brround,
                styles.bg_secondary,
                styles.p4,
              ]}>
              <Text style={[styles.txt, styles.txt_center]}>Video Token</Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              { width: '100%' },
              styles.flex_row,
              styles.align_center,
              styles.justify_space,
              styles.mt16,
            ]}>
            <View
              style={[
                { width: '40%', justifyContent: 'flex-end' },
                styles.flex_row,
                styles.bg_lblue,
                styles.brround,
              ]}>
              <Text style={[{ width: '60%' }, styles.bold, styles.p6]}>
                Points:
              </Text>
              <Text
                style={[
                  { textAlign: 'right' },
                  styles.bg_primary,
                  styles.brround,
                  styles.bold,
                  styles.ph8,
                  styles.p6,
                  styles.txt_white,
                ]}>
                1000
              </Text>
            </View>

            <View
              style={[
                { width: '40%', justifyContent: 'flex-end' },
                styles.flex_row,
                styles.bg_lblue,
                styles.brround,
              ]}>
              <Text style={[{ width: '60%' }, styles.bold, styles.p6]}>
                Tokens:
              </Text>
              <Text
                style={[
                  styles.bg_primary,
                  styles.brround,
                  styles.bold,
                  styles.ph8,
                  styles.p6,
                  styles.txt_white,
                ]}>
                500
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.flex_row,
              styles.align_center,
              styles.justify_center,
              styles.mhv16,
            ]}>
            <FontAwesomeIcon
              styles={{ width: '10%' }}
              icon={faCaretLeft}
              size={30}
            />

            <View
              style={[
                { width: '80%' },
                styles.popup,
                styles.bg_primary,
                styles.p16,
              ]}>
              <View style={[styles.flex_row]}>
                <Text style={[styles.flex8, styles.txtsmall, styles.txt_white]}>
                  Last Updated: {this.state.Time}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.refresh();
                  }}>
                  <FontAwesomeIcon
                    style={[
                      styles.flex1,
                      styles.dislike_img,
                      styles.txt_white,
                      styles.txt_right,
                    ]}
                    icon={faRedoAlt}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.flex_row, styles.align_center]}>
                <View style={{ width: '20%' }}>
                  <Text
                    style={[styles.txt, styles.txt_center, styles.txt_white]}>
                    Mar 15{'\n'}2020
                  </Text>
                </View>
                <View
                  style={[{ width: '60%' }, styles.p8, styles.align_center]}>
                  <View
                    style={[
                      styles.r_popup,
                      styles.brround,
                      styles.bg_white,
                      styles.justify_center,
                    ]}>
                    <View style={[styles.sliderColumnContainer]}>
                      <Image
                        style={{ width: 80, height: 70, resizeMode: 'contain' }}
                        source={require('../assets/img/dressMIN.png')}
                      />
                      <View style={styles.sliderCirlceTextContainer}>
                        <Text
                          style={{
                            fontFamily: 'BebasNeue_Regular',
                            fontStyle: 'normal',
                            fontWeight: '900',
                            fontSize: 30,
                            lineHeight: 60,
                            color: '#FFF',
                            textAlign: 'center',
                          }}>
                          32
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ width: '20%' }}>
                  <Text
                    style={[styles.txt, styles.txt_center, styles.txt_white]}>
                    Live Count
                  </Text>
                  <Text
                    style={[
                      styles.heading,
                      styles.txt_center,
                      styles.txt_lblue,
                    ]}>
                    20
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.align_center,
                  styles.flex_row,
                  styles.flex1,
                  styles.bg_white,
                  styles.brround,
                  styles.m8,
                  styles.p4,
                ]}>
                <Text
                  style={[
                    styles.flex8,
                    styles.heading,
                    styles.txt_primary8,
                    styles.p4,
                    styles.txt_center,
                  ]}>
                  C. McDavid
                </Text>
                <View style={styles.sliderColumnContainer}>
                  <Image source={require('../assets/img/circleEDM.png')} />
                  <View
                    style={[
                      styles.sliderCirlceTextContainer,
                      { top: 7, margin: 10 },
                    ]}>
                    <Text style={[styles.sliderCirlceText]}>EDM</Text>
                  </View>
                </View>
              </View>
            </View>
            <FontAwesomeIcon
              styles={{ width: '10%' }}
              icon={faCaretRight}
              size={30}
            />
          </View>

          <Text style={[styles.heading, styles.txt_center]}>
            Go Ahead, Make Your Choice!
          </Text>

          <View style={[styles.flex_row, styles.align_center]}></View>
          <View
            style={[
              styles.bw2,
              styles.br16,
              styles.bprimary,
              styles.bg_white,
              styles.p16,
              styles.m16,
            ]}>
            <View style={[styles.flex_row]}>
              <Text style={[styles.flex8, styles.heading, styles.pl12]}>
                Expected Shots on Goal
              </Text>
            </View>
            <View style={[styles.flex_row, styles.p4, styles.align_center]}>
              <TouchableOpacity
                onPress={() => {
                  this.toggleExpectedShot(true);
                }}
                style={[
                  styles.btn_ok,
                  styles.bg_green,
                  styles.flex1,
                  styles.m4,
                ]}>
                <View
                  style={[styles.flex_row, styles.align_center, styles.ph8]}>
                  <Image
                    source={require('../assets/img/up.png')}
                    style={[{}, styles.price_img, styles.zindex10]}></Image>
                  <Text
                    style={[
                      styles.txt,
                      styles.txt_white,
                      styles.flex4,
                      styles.txt_center,
                    ]}>
                    OVER 4
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.toggleExpectedShot(true);
                }}
                style={[styles.btn_ok, styles.bg_red, styles.flex1, styles.m4]}>
                <View
                  style={[styles.flex_row, styles.align_center, styles.ph8]}>
                  <Image
                    source={require('../assets/img/down.png')}
                    style={[styles.price_img, styles.zindex10]}></Image>
                  <Text
                    style={[
                      styles.txt,
                      styles.txt_white,
                      styles.flex4,
                      styles.txt_center,
                    ]}>
                    UNDER 3.5
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.flex6]}>
            <View
              style={[styles.popup, styles.m16, styles.flex6, styles.bg_white]}>
              <Text
                style={[
                  styles.p8,
                  styles.bg_primary,
                  styles.txt_white,
                  styles.brb8,
                ]}>
                Past 5 Games | Shots on Goal
              </Text>
              <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                <FlatList
                  style={{ width: '100%' }}
                  data={this.state.ListPast5Games}
                  renderItem={({ item }) => this._getPast5(item)}
                />
              </SafeAreaView>
            </View>
          </View>
          <View style={[styles.flex_row, styles.justify_center, styles.Pb64]}>
            <TouchableOpacity
              onPress={() =>
                Actions.MontlyLeaders({ title: 'MONTHLY LEADERS' })
              }
              style={[
                styles.flex1,
                styles.brround,
                styles.bg_secondary,
                styles.m16,
                styles.ph16,
                styles.p8,
              ]}>
              <Text style={[styles.txt_center]}>MONTHLY LEADERS</Text>
            </TouchableOpacity>
            <Text
              style={[
                styles.flex1,
                styles.txt_center,
                styles.brround,
                styles.bg_secondary,
                styles.m16,
                styles.ph16,
                styles.p8,
              ]}>
              PAST WON PRIZES
            </Text>
          </View>
        </ScrollView>

        {this.state.likePopup && this._LikePopUp()}
        {this.state.disLikePopup && this._DisLikePopUp()}
        {this.state.tokenAmountPopUp && this._TokenAmountPopUp()}
        {this.state.tokenRewarded && this._TokenRewarded()}
        {this.state.expectedShot && this._ExpectedShot()}
      </View>
    );
  }
}

export default CenterIcePlay;
