import React from 'react';
import { View, Text, Image, ImageBackground, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from '../assets/css/styles';
import BackgroundImage from '../assets/img/Group.png';
import InfoImage from '../assets/img/info.png';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon }  from '@fortawesome/react-native-fontawesome';
import { faCaretLeft,faTimes} from '@fortawesome/free-solid-svg-icons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class SliderGoalies extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todayPlayersSelected: true,
            popupVisibiliy:false,
        }

        this._getItem = this._getItem.bind(this);
    }

    _getItem(item) {
        
        var names = item.name.split(" ")
        if (names[1])
            var  splitname=names[0].charAt(0) +". "+names[1]
        else if(names[0])
            var splitname=names[0]
        else
            var splitname=""
        return (
            <View >
                <TouchableOpacity
                    style={[styles.containerRowCenter, { marginTop: 5 }]}
                    onPress={() => Actions.PlayerStats({ item })}>
                    <Text
                    adjustsFontSizeToFit
                        style={[styles.transparentButtonText, { fontSize: wp('3%'), color: "#404040", lineHeight: 15 }]}
                    >{splitname} </Text>
                    <Text style={[styles.transparentButtonText, {  fontSize: wp('3%'),color: "#8AABFF", lineHeight: 15 }]}>{item.name ? "(" + item.value + ")" : ""}</Text>
                </TouchableOpacity>
            </View>
        )

    }

    selectPlayersTab = (flag) => {
        this.setState({ todayPlayersSelected: flag });
    }



    render() {

        var  todaysGoalies  = this.props.todaysGoalies;
        var  todaysPlayers  = this.props.todaysPlayers;
       
        var Wins = todaysGoalies.Wins
        var GAA = todaysGoalies.GAA
        var SV = todaysGoalies.SV

        var Goals = todaysPlayers.Goals
        var Against = todaysPlayers.Against
        var Shots = todaysPlayers.Shots


      return (
            <View style={[styles.containerColumn, {backgroundColor: "#F8F8F8" }]}>
                <View style={[styles.DailyWatchTitleBar, { paddingTop: 0 }]}>
                    <View style={[styles.containerRow, { marginTop: 0, paddingLeft: 5 }]}>
                        <View style={[styles.containerRowStart, { width: "30%", paddingLeft: 5 }]}>
                            <Text style={styles.noGameTitle}>GOALIES</Text>
                            <TouchableOpacity
                                 onPress={()=>{
                                    this.props.popup_goli()
                                 }}>
                                        <Image source={InfoImage} style={{ marginLeft: 2 }} />
                                 </TouchableOpacity>
                        </View>
                        <View style={{ width: "70%", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <TouchableOpacity
                                onPress={() => this.selectPlayersTab(true)}
                                style={[styles.skyButton, { marginHorizontal: 7, paddingHorizontal: 10 }, this.state.todayPlayersSelected ? { backgroundColor: "#8aabff" } : { backgroundColor: "#EDF2FF" }]}>
                                <Text style={[styles.transparentButtonText, this.state.todayPlayersSelected ? { color: "#182955" } : { color: "#18295566" }]}>Today's Players</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.selectPlayersTab(false)}
                                style={[styles.skyButton, { marginHorizontal: 7, paddingHorizontal: 10 }, !this.state.todayPlayersSelected ? { backgroundColor: "#8aabff" } : { backgroundColor: "#EDF2FF" }]}>
                                <Text style={[styles.transparentButtonText, , !this.state.todayPlayersSelected ? { color: "#182955" } : { color: "#18295566" }]}>Today’s Goalies</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {!this.state.todayPlayersSelected &&
                <View style={[styles.containerRow, { marginVertical: 20, marginHorizontal: 20 }]}>
                    <View style={{ width: "33%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={[styles.sliderDayAndTime, { color: "#40404088", marginBottom: 0 }]}>Goals</Text>
                        <SafeAreaView style={{ flex: 1 }}>

                            <FlatList
                               keyExtractor={(item) => item.toString()}
                                data={Goals}
                                renderItem={({ item }) => this._getItem(item)}
                                numColumns={1}
                            />
                        </SafeAreaView>
                    </View>
                    <View style={{ width: "33%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={[styles.sliderDayAndTime, { color: "#40404088", marginBottom: 0 }]}>Against</Text>
                        <SafeAreaView style={{ flex: 1 }}>
                            <FlatList
                            keyExtractor={(item) => item.toString()}
                                data={Against}
                                renderItem={({ item }) => this._getItem(item)}
                                numColumns={1}
                            />
                        </SafeAreaView>

                    </View>
                    <View style={{ width: "33%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={[styles.sliderDayAndTime, { color: "#40404088", marginBottom: 0 }]}>Shots</Text>
                        <SafeAreaView style={{ flex: 1 }}>
                            <FlatList
                            keyExtractor={(item) => item.toString()}
                                data={Shots}
                                renderItem={({ item }) => this._getItem(item)}
                                numColumns={1}
                            />
                        </SafeAreaView>

                    </View>
                </View>
                }
                {this.state.todayPlayersSelected &&
                    <View style={[styles.containerRow, { marginVertical: 20, marginHorizontal: 20 }]}>
                    <View style={{ width: "33%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={[styles.sliderDayAndTime, { color: "#40404088", marginBottom: 0 }]}>Wins</Text>
                        <SafeAreaView style={{ flex: 1 }}>

                            <FlatList
                               keyExtractor={(item) => item.toString()}
                                data={Wins}
                                renderItem={({ item }) => this._getItem(item)}
                                numColumns={1}
                            />
                        </SafeAreaView>
                    </View>
                    <View style={{ width: "33%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={[styles.sliderDayAndTime, { color: "#40404088", marginBottom: 0 }]}>GAA</Text>
                        <SafeAreaView style={{ flex: 1 }}>
                            <FlatList
                            keyExtractor={(item) => item.toString()}
                                data={GAA}
                                renderItem={({ item }) => this._getItem(item)}
                                numColumns={1}
                            />
                        </SafeAreaView>

                    </View>
                    <View style={{ width: "33%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={[styles.sliderDayAndTime, { color: "#40404088", marginBottom: 0 }]}>SV%</Text>
                        <SafeAreaView style={{ flex: 1 }}>
                            <FlatList
                            keyExtractor={(item) => item.toString()}
                                data={SV}
                                renderItem={({ item }) => this._getItem(item)}
                                numColumns={1}
                            />
                        </SafeAreaView>

                    </View>
                </View>

                }
                {/* {
                    this.state.popupVisibiliy &&

                <View style={{position:"absolute",width:"100%",flex:1,justifyContent:"flex-end"}}>
                          <View style={{marginLeft:112,marginTop:-10,backgroundColor:"#182955",width:200,flex:1,borderRadius:5}}>
                           <View style={styles.flex_row}>     
                          <View style={styles.flexhalf}>
                                 <FontAwesomeIcon  style={[ styles.txt_primary,{marginTop:8,marginLeft:-12,position:"absolute"}]} icon={ faCaretLeft }  size={20}  />
                          </View>  
                          <Text style={[styles.flex8,styles.txt,styles.txt_white,styles.p8]}>See which goalies are hot right now in the last 3 games they have played.</Text>
                                <View style={[styles.flexhalf, {padding:4}]}>
                          <TouchableOpacity
                                 onPress={()=>{
                                     this.setState({popupVisibiliy:false})}}>
                                <FontAwesomeIcon  style={[styles.txt_red,styles.txt_secondary,{alignSelf:"flex-end"}]} icon={ faTimes }  size={15}  />
                         </TouchableOpacity>
                          </View>
                         
                          </View>
                          </View>
                        </View>
                        } */}

            </View>

        );
    }
};

export default SliderGoalies;
