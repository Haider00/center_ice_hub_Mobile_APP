import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { TouchableOpacity, Button, Image, StyleSheet, View, Text, } from 'react-native';
import like from '../assets/img/logo.png';

export default class tokens_amount extends Component {
    render() {
      return (
        <View style={styles.container}>
            <View style={styles.bg}>
                <View style={styles.popup}>
                    <View style={[styles.top_row,styles.justify_center]}>

                        <Image source={require('../assets/img/logo.png')} style={[styles.price_img, styles.flex5, styles.zindex10,]} />
                        <View style={[styles.justify_center,{ flex: 5, flexDirection: "column", paddingHorizontal: 8 }]}>
                            <Text style={styles.heading}>AWESOME!</Text>
                            <Text style={styles.text}>How many tokens do you want to use?</Text>
                            <View style={[styles.flex_row,styles.justify_center,styles.mt8]}>
                                <TouchableOpacity style={[styles.btn_inc,styles.flex1,styles.bg_lblue,styles.brl8]} >
                                    <View>
                                        <Text style={[styles.btn_txt,styles.p8,styles.txt_center,styles.heading,styles.txt_white]}>-</Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={[styles.btn_inc,styles.flex2,styles.bw2,styles.p8,styles.bblight,styles.txt_center,styles.heading,styles.txt_white]}>wqs</Text>
                                <TouchableOpacity style={[styles.btn_inc,styles.flex1,styles.bg_lblue,styles.brr8]} >
                                    <View>
                                        <Text style={[styles.btn_txt,,styles.p8,styles.txt_center,styles.heading,styles.txt_white]}>+</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.flex_row,styles.p8]}>
                        <TouchableOpacity style={[styles.btn_ok,styles.p8,styles.flex1,styles.m8,styles.bg_secondary]} >
                            <View>
                                <Text style={styles.btn_txt}>YES</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn_ok,styles.p8,styles.flex1,styles.m8,styles.bg_grey]} >
                            <View>
                                <Text style={styles.btn_txt}>NO</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

    )}
}

const styles = StyleSheet.create({
    flexhalf: {
        flex: 0.5,
    },
    flex1: {
        flex: 1,
    },
    flex2: {
        flex: 2,
    },
    flex3: {
        flex: 3,
    },
    flex4: {
        flex: 4,
    },
    flex5: {
        flex: 5,
    },
    flex6: {
        flex: 6,
    },
    flex7: {
        flex: 7,
    },
    flex_row: {
        flexDirection: "row"
    },
    bg: {
        flex: 1,
        backgroundColor: "#EDF2FF",
    },
    months: {
        backgroundColor: "#EDF2FF",
        flexDirection: "row",
        padding: 16,
    }, btn_arrow: {
        flex: 1
    },

    //Text Align

    txt_left: {
        textAlign: "left"
    }, txt_right: {
        textAlign: "right"
    }, txt_center: {
        textAlign: "center"
    }, heading: {
        fontSize: 20,
        fontWeight: "bold",
        
    },

    //Align
    align_center: {
        alignItems: "center"
    },


    //text Color

    txt_white: {
        color: "#ffffff"
    },
    txt_primary: {
        color: "#182955"
    },

    //Background Color
    bg_white: {
        backgroundColor: "#ffffff",
    },
    bg_primary: {
        backgroundColor: "#182955",
    },
    bg_secondary: {
        backgroundColor: "#FDB734",
    },
    bg_grey: {
        backgroundColor: "#f8f8f8",
    },
    bg_lblue:{
        backgroundColor:"#8AABFF"
    },

    //Padding

    p8: {
        padding: 8
    },
    p16: {
        padding: 16
    },

    //Margin

    m8: {
        margin: 8
    },
    m16: {
        margin: 16
    },
    mt8: {
        marginTop: 8
    },
    mt16: {
        marginTop: 16
    },

    //Border
    br8: {
        borderRadius: 8
    },
    br16: {
        borderRadius: 16
    },
    brb8: {
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
        borderRadius: 8,
    },
    brl8: {
        borderTopStartRadius:8,
        borderBottomStartRadius: 8,
       
    },
    brr8: {
        borderTopEndRadius:8,
        borderBottomEndRadius: 8,
       
    },
    

    bw2:{
        borderWidth: 2  
    },
    bwb8: {
        borderBottomWidth: 8
    },
    bwb2: {
        borderBottomWidth: 2
    },

    bsecondary: {
        borderColor: "#FDB734"
    },
    bprimary: {
        borderColor: "#182955"
    },
    bgrey: {
        borderColor: "#f8f8f8"
    },
    bblight: {
        borderColor: "#8AABFF"
    },
    //Image
    price_img: {
        width: 120,
        height:120,
             resizeMode:"contain"
    },

    //Zindex

    zindex10: {
        zIndex: 10,
    },
    Platform.OS==='ios'?styles.zindex20:{}: {
        zIndex: 20,
    },



    //Justify
    justify_center: {
        justifyContent: "center"
    },
    container: {
        flex: 1,

    },
    bg: {
        flex: 1,
        backgroundColor: "#00000099",
        justifyContent: "center",
        alignItems: "center"

    },
    popup: {
        borderRadius: 8,
        margin: 16,

        backgroundColor: "#182955",

    }, top_row: {
        padding: 16,
        flex: 8,
        flexDirection: "row",
    },
    btm_row: {
        paddingTop: 2,

        flex: 4,
        padding: 16,
    },
    like_img: {
        mageResizeMode: "contain",
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
        paddingTop: 8
    },
    btn_ok: {

        borderRadius: 50,
       
         alignItems: "center",

    }


});

