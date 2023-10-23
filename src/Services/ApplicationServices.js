import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { text } from '@fortawesome/fontawesome-svg-core';

const Teams = [
    {
        name: "Anaheim Ducks",
        label: "ANA",
        code: '24'
    },
    {
        name: "Arizona Coyotes",
        label: "ARI",
        code: '53'

    },
    {
        name: "Boston Bruins",
        label: "BOS",
        code: '6'

    },
    {
        name: "Buffalo Sabres",
        label: "BUF",
        code: '7'

    },
    {
        name: "Carolina Hurricanes",
        label: "CAR",
        code: '12'

    },
    {
        name: "Calgary Flames",
        label: "CGY",
        code: '20'

    },
    {
        name: "Chicago Blackhawks",
        label: "CHI",
        code: '16'

    },
    {
        name: "Columbus Blue Jackets",
        label: "CBJ",
        code: '29'

    },
    {
        name: "Colorado Avalanche",
        label: "COL",
        code: '21'

    },
    {
        name: "Dallas Stars",
        label: "DAL",
        code: '25'

    },
    {
        name: "Detroit Red Wings",
        label: "DET",
        code: '17'

    },
    {
        name: "Edmonton Oilers",
        label: "EDM",
        code: '22'

    },
    {
        name: "Florida Panthers",
        label: "FLA",
        code: '13'

    },
    {
        name: "Los Angeles Kings",
        label: "LAK",
        code: '26'

    },
    {
        name: "Minnesota Wild",
        label: "MIN",
        code: '30'

    },
    {
        name: "Montréal Canadiens",
        label: "MTL",
        code: '8'

    },
    {
        name: "Nashville Predators",
        label: "NSH",
        code: '18'

    },
    {
        name: "New Jersey Devils",
        label: "NJD",
        code: '1'

    },
    {
        name: "New York Islanders",
        label: "NYI",
        code: '2'

    },
    {
        name: "New York Rangers",
        label: "NYR",
        code: '3'

    },
    {
        name: "Ottawa Senators",
        label: "OTT",
        code: '9'

    },
    {
        name: "Philadelphia Flyers",
        label: "PHI",
        code: '4'

    },
    {
        name: "Pittsburgh Penguins",
        label: "PIT",
        code: '5'

    },
    {
        name: "San Jose Sharks",
        label: "SJS",
        code: '28'

    },
    {
        name: "St. Louis Blues",
        label: "STL",
        code: '19'

    },
    {
        name: "Tampa Bay Lightning",
        label: "TBL",
        code: '14'

    },
    {
        name: "Toronto Maple Leafs",
        label: "TOR",
        code: '10'

    },
    {
        name: "Vancouver Canucks",
        label: "VAN",
        code: '23'

    },
    {
        name: "Vegas Golden Knights",
        label: "VGK",
        code: '54'

    },
    {
        name: "Winnipeg Jets",
        label: "WPG",
        code: '52'

    },
    {
        name: "Washington Capitals",
        label: "WSH",
        code: '15'

    },
    {
        name: "Seattle Kraken",
        label: "SEA",
        code: '55'

    },
]

class ApplicationServices extends React.Component {


    storeLoginData = async (userName, password, uid,fullName,dob,country,newsletter) => {
        try {
            await AsyncStorage.setItem('@userName', userName)
            await AsyncStorage.setItem('@password', password)
            await AsyncStorage.setItem('@uid', uid)
            await AsyncStorage.setItem('@fullname', fullName)
            await AsyncStorage.setItem('@dob', dob)
            await AsyncStorage.setItem('@country', country)
            await AsyncStorage.setItem('@newsletter', newsletter)
            return true
        } catch (e) {

            return false
        }
    }

    async removeLoginData() {
        try {
            await AsyncStorage.removeItem('@userName')
            await AsyncStorage.removeItem('@password')
            await AsyncStorage.removeItem('@uid')
            await AsyncStorage.removeItem('@fullname')
            await AsyncStorage.removeItem('@dob')
            await AsyncStorage.removeItem('@country')
            await AsyncStorage.removeItem('@newsletter')
            return true
        } catch (e) {

            return false
        }
    };


    // async getUserData() {
    //     texts = {
    //           "name" : "",
    //           "fullname" : "",
    //     }

    //     try {
    //        texts.username = await AsyncStorage.getItem('@userName')
    //        texts.fullname = await AsyncStorage.getItem('@fullname')

    //        if ( texts.name !== null) {
    //           return texts
    //          }

    //         return values
    //          } catch(e) {
    //
    //         return false
    //         }
    // };




    isUserLogin = async () => {
        try {
            const value = await AsyncStorage.getItem('@userName')
            if (value !== null) {
                return true
            }
            return false
        } catch (e) {

            return false
        }
    }


    getUserName = async () => {
        try {
            const value = await AsyncStorage.getItem('@userName')
            if (value !== null) {
                return value
            }
            return false
        } catch (e) {

            return false
        }
    }

    getUserFullName = async () => {
        try {
            const value = await AsyncStorage.getItem('@fullname')
            if (value !== null) {
                return value
            }
            return false
        } catch (e) {

            return false
        }
    }

    getUserId = async () => {
        try {
            const value = await AsyncStorage.getItem('@uid')
            if (value !== null) {
                return value
            }
            return false
        } catch (e) {

            return false
        }
    }

    getTeamLabel(teamName) {
        for (var i = 0; i < Teams.length; i++) {
            if (Teams[i].name == teamName)
                return Teams[i].label
        }
        return teamName.substring(0, 3).toUpperCase();
    }



    getTeamCode(teamName) {
        for (var i = 0; i < Teams.length; i++) {
            if (Teams[i].name == teamName)
                return Teams[i].code
        }
    }

    setIndex = async (index) => {
        try {
            await AsyncStorage.setItem('index', index)
            return true
        } catch (e) {

            return false
        }
    }

    getIndex = async () => {
        try {
            const value = await AsyncStorage.getItem('index')
            if (value !== null) {
                return value
            }
            return false
        } catch (e) {

            return false
        }
    }


    setMFTDFlag = async (flag) => {
        try {
            await AsyncStorage.setItem('MFTDFlag', flag)
            return true
        } catch (e) {

            return false
        }
    }

    getMFTDFlag = async () => {
        try {
            const value = await AsyncStorage.getItem('MFTDFlag')
            if (value !== null) {
                return true
            }
            return false
        } catch (e) {

            return false
        }
    }

    setPlayerDataStats = async (playerData) => {

        try {
            await AsyncStorage.setItem('PlayerDataStats', JSON.stringify(playerData))
            return true
        } catch (e) {

            return false
        }
    }

    getPlayerDataStats = async () => {
        try {
            const value = await AsyncStorage.getItem('PlayerDataStats')
            if (value !== null ) {
                return value
            }
            return false
        } catch (e) {

            return false
        }
    }




}


export default ApplicationServices;
