import React, { Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableHighlight, ScrollView, ImageBackground, Dimensions,Platform } from 'react-native';
import styles from '../assets/css/styles';
import { Actions } from 'react-native-router-flux';
import crossImage from '../assets/img/cross.png';
import BackgroundImage from '../assets/img/Group2.png';
import Pdf from 'react-native-pdf'

class PrivacyPolicy extends React.Component {

   
    constructor(props) {
        super();
        this.state = {
           
        }
    }

    render() {
        var source = {uri:"bundle-assets://pdf/TermsofUse.pdf"}
        if(Platform.OS =='ios')
            source = require('../assets/pdf/TermsofUse.pdf');
        return (

            <View style={[styles.body,]}>
                <ImageBackground source={BackgroundImage} style={[styles.backgroundImage, {paddingBottom:20 }]} > 
                    <View style={[styles.containerMiddle, {marginTop: 5,marginBottom:20 }]} >
                        <View style={[styles.modelBody, { borderRadius: 12 }]} >
                            <TouchableOpacity
                                style={styles.modelCrossBUtton}
                                onPress={() => {
                                    Actions.pop()
                                }}
                            >
                                <Image source={crossImage} />
                            </TouchableOpacity>
                            <View style={{ marginHorizontal: 25, paddingVertical: 10 }}>
                                <Text style={styles.modelTitle}>Terms of Use</Text>


                            </View>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                                ref={(c) => { this.scroll = c }}
                                scrollEnabled={this.state.scrollEnable}
                            >
                                <Pdf
                                    source={source}
                                   

                                    style={{
                                        backgroundColor:"##182955",
                                        width: Dimensions.get('window').width - 40,
                                        height: Dimensions.get('window').height - 100,
                                    }} />
                            </ScrollView>
                        </View>
                    </View>



                </ImageBackground>
            </View>
     



            
        )

    }
}
export default PrivacyPolicy;