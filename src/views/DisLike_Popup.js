import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

export default class DisLike_Popup extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bg}>
          <View style={styles.popup}>
            <View style={styles.top_row}>
              <FontAwesomeIcon
                style={styles.dislike_img}
                name="thumbs-down"
                size={100}
              />
              <View
                style={{
                  flex: 8,
                  flexDirection: 'column',
                  paddingHorizontal: 8,
                }}>
                <Text style={styles.heading}>NICE TRY!</Text>
                <Text style={styles.text}>
                  You didn’t win any points yesterday so make some picks today
                  and aim for one of the top 3 prizes!
                </Text>
              </View>
            </View>
            <View style={styles.btm_row}>
              <TouchableOpacity style={styles.btn_ok}>
                <View>
                  <Text style={styles.btn_txt}>OK</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    borderRadius: 8,
    margin: 16,

    backgroundColor: '#182955',
  },
  top_row: {
    padding: 32,
    flex: 8,
    flexDirection: 'row',
  },
  btm_row: {
    paddingTop: 2,

    flex: 4,
    padding: 32,
  },
  dislike_img: {
    resizeMode: 'stretch',
    flex: 1,
    color: '#FF3A3A',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  btn_txt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#182955',
  },
  text: {
    color: '#ffffff',
    paddingTop: 8,
  },
  btn_ok: {
    flex: 1,
    borderRadius: 50,
    padding: 16,
    width: '100%',

    backgroundColor: '#FDB734',
    alignItems: 'center',
  },
});
