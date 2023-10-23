import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from '../assets/css/styles';

export default class Like_Popup extends Component {
  render() {
    return (
      <View style={[styles.popupmain, styles.justify_center]}>
        <View style={styles.top_row}>
          <FontAwesomeIcon
            style={styles.like_img}
            icon={faThumbsUp}
            name="thumbs-up"
            size={100}
          />
          <View
            style={{ flex: 8, flexDirection: 'column', paddingHorizontal: 8 }}>
            <Text style={styles.heading}>AWESOME!</Text>
            <Text style={styles.text}>
              You went up by X points! Do you think you have what it takes to
              come first this month to win a prize?
            </Text>
          </View>
        </View>
        <View style={styles.btm_row}>
          <TouchableOpacity style={styles.btn_ok_main}>
            <View>
              <Text style={styles.btn_txt}>OK</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
