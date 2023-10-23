import React from 'react';
import { View, Text, Image, SafeAreaView, FlatList } from 'react-native';
import styles from '../assets/css/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import NavBarSecondary from '../components/NavBarSecondary';

class Test extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      MonthlyLeaders: [
        { key: 1, Name: 'Adeel Cheema', Points: 4 },
        { key: 2, Name: 'Adeel Cheema', Points: 4 },
        { key: 3, Name: 'Adeel Cheema', Points: 4 },
        { key: 4, Name: 'Adeel Cheema', Points: 4 },
        { key: 4, Name: 'Adeel Cheema', Points: 4 },
        { key: 4, Name: 'Adeel Cheema', Points: 4 },
        { key: 4, Name: 'Adeel Cheema', Points: 4 },
        { key: 4, Name: 'Adeel Cheema', Points: 4 },
        { key: 4, Name: 'Adeel Cheema', Points: 4 },
        { key: 4, Name: 'Adeel Cheema', Points: 4 },
        { key: 4, Name: 'Adeel Cheema', Points: 4 },
        { key: 4, Name: 'Adeel Cheema', Points: 4 },
        { key: 4, Name: 'Adeel Cheema', Points: 4 },
      ],
    };
    this._MonthlyLeaders = this._MonthlyLeaders.bind(this);
  }

  _MonthlyLeaders = (item) => {
    return (
      <View style={[, styles.flex_row, styles.bwb2, styles.bgrey, styles.p8]}>
        <Text style={[styles.flex1, styles.p8]}>{item.key}.</Text>
        <Text style={[styles.flex4, styles.p8]}>{item.Name}</Text>
        <Text style={[styles.flex1, styles.p8]}>{item.Points}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.flex1}>
        <NavBarSecondary title={this.props.title} search />

        <View
          style={[styles.months, styles.justify_center, styles.justify_space]}>
          <FontAwesomeIcon
            style={[styles.btn_arrow, styles.txt_right]}
            icon={faCaretLeft}
            size={20}
          />
          <Text style={[styles.txt_center]}>March</Text>
          <FontAwesomeIcon
            style={[styles.btn_arrow, styles.txt_left]}
            icon={faCaretRight}
            size={20}
          />
        </View>
        <View style={[styles.m16, styles.justify_center]}>
          <View style={[styles.popup, styles.p16, styles.bg_primary]}>
            <Text
              style={[
                styles.heading,
                styles.txt_center,
                styles.txt_white,
                styles.pb20,
              ]}>
              Prizes
            </Text>
            <View style={[styles.flex_row, styles.mt16, styles.justify_space]}>
              <View
                style={[
                  { width: '30%' },
                  styles.bg_white,
                  styles.p8,
                  styles.brb8,
                  styles.align_center,
                ]}>
                <Image
                  source={require('../assets/img/price1.png')}
                  style={[styles.monthly_reward_img, styles.zindex10]}></Image>

                <View style={styles.p8}>
                  <Text
                    style={[
                      styles.heading,
                      styles.txt_primary,
                      styles.txt_center,
                      styles.mt8,
                    ]}>
                    $100
                  </Text>
                  <Text style={[styles.txt_primary, styles.txt_center]}>
                    Amazon Giftcard
                  </Text>
                </View>
              </View>
              <View
                style={[
                  { width: '30%' },
                  styles.bg_white,
                  styles.p8,
                  styles.brb8,
                  styles.align_center,
                ]}>
                <Image
                  source={require('../assets/img/price2.png')}
                  style={[styles.monthly_reward_img, styles.zindex10]}></Image>
                <View style={styles.p8}>
                  <Text
                    style={[
                      styles.heading,
                      styles.txt_primary,
                      styles.txt_center,
                      styles.mt8,
                    ]}>
                    $100
                  </Text>
                  <Text style={[styles.txt_primary, styles.txt_center]}>
                    Amazon Giftcard
                  </Text>
                </View>
              </View>
              <View
                style={[
                  { width: '30%' },
                  styles.bg_white,
                  styles.p8,
                  styles.brb8,
                  styles.align_center,
                ]}>
                <Image
                  source={require('../assets/img/price3.png')}
                  style={[styles.monthly_reward_img, styles.zindex10]}></Image>

                <View style={styles.p8}>
                  <Text
                    style={[
                      styles.heading,
                      styles.txt_primary,
                      styles.txt_center,
                      styles.mt8,
                    ]}>
                    $100
                  </Text>
                  <Text style={[styles.txt_primary, styles.txt_center]}>
                    Amazon Giftcard
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[
                { width: '100%' },
                styles.bw4,
                styles.bg_secondary,
                styles.bsecondary,
                styles.align_center,
              ]}></View>
          </View>
        </View>

        <View
          style={[
            styles.popup,
            styles.bg_white,
            styles.m16,
            { maxHeight: 220 },
          ]}>
          <SafeAreaView style={{ alignItems: 'center' }}>
            <FlatList
              style={{ width: '100%' }}
              data={this.state.MonthlyLeaders}
              renderItem={({ item }) => this._MonthlyLeaders(item)}></FlatList>
          </SafeAreaView>
        </View>
      </View>
    );
  }
}

export default Test;
