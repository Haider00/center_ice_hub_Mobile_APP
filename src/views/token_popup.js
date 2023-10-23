import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { TouchableOpacity, Button, Image, StyleSheet, View, Text, } from 'react-native';
import like from '../assets/img/thumb_up.png';

export default class token_popup extends Component {
    render() {
      return (
        <View style={styles.container}>
            <View style={styles.bg}>
                <View style={styles.popup}>
                    <View style={styles.top_row}>
                        <View style={{ flex: 8, flexDirection: "column", paddingHorizontal: 8 }}>
                            <Text style={[styles.heading,styles.txt_center]}>AWESOME!</Text>
                            <Text style={[styles.text,styles.txt_center]}>You went up by X points! Do you think you have what it takes to come first this month to win a prize?</Text>
                        </View>
                    </View>
                    <View style={styles.btm_row}>
                        <TouchableOpacity style={styles.btn_ok} >
                            <View>
                                <Text style={styles.btn_txt}>OK</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

    )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    bg: {
        flex: 1,
        backgroundColor: "#00000099",
        justifyContent: "center",
        alignItems: "center"

    },
    txt_center: {
        textAlign: "center"
    },
    popup: {
        borderRadius: 8,
        margin: 16,

        backgroundColor: "#182955",

    }, top_row: {
        padding: 32,
        flex: 8,
        flexDirection: "row",
    },
    btm_row: {
        paddingTop: 2,

        flex: 4,
        padding: 32,
    },
    like_img: {
        resizeMode: 'stretch',
        flex: 1,
        color: "#00985C"
    },
    heading: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff"
    },
    btn_txt: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#182955"
           },
    text: {
        color: "#ffffff",
        paddingTop:8
    },
    btn_ok: {

        
        borderRadius: 50,
        padding: 16,
        width: "100%",

        backgroundColor: "#FDB734",
        alignItems:"center",

    }


});

