import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { CheckBox } from "react-native-elements";
import styles from "../assets/css/styles";
import BackgroundImage from "../assets/img/Group2.png";
import tickImage from "../assets/img/checkBox.png";
import rectangleImage from "../assets/img/rectangle.png";
import crossImage from "../assets/img/cross.png";
import arrowDownImage from "../assets/img/arrowDown.png";
import arrowUpImage from "../assets/img/upArrow.png";
import logoImage from "../assets/img/logo2.png";
import { Actions } from "react-native-router-flux";

import Service from "../Services/Service";
import AppService from "../Services/AppServices";
import Validation from "../Services/Validation";
import DateTimePicker from "@react-native-community/datetimepicker";

import MultiSelect from "react-native-quick-select";
class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: "",
      process: false,
      scrollEnable: true,
      register: "Register",
      Fullname: "",
      Dateofbirth: "",
      dateshow: false,
      dateDone: false,
      Country: "",
      Newsletter: "",
      Email: "",
      Password: "",
      ConfirmPass: "",

      favoritePlayer: "",
      favoriteTeam: "",
      checkboxUpdate: false,
      checkboxTermsAndCond: false,
      modalVisible: false,
      showDroupDown1: false,
      backgroundColor: "#FDB734",
      CountrySelected: "Country",
      droupDown1Options: [],
      data: [],
      fullNameError: "",
      dateofbirthError: "",
      countryError: "",
      passwordError: "",
      confirmPassError: "",
      emailError: "",
      selectedItems: [],
      countryList: [
        { name: "Afghanistan", code: "AF" },
        { name: "land Islands", code: "AX" },
        { name: "Albania", code: "AL" },
        { name: "Algeria", code: "DZ" },
        { name: "American Samoa", code: "AS" },
        { name: "AndorrA", code: "AD" },
        { name: "Angola", code: "AO" },
        { name: "Anguilla", code: "AI" },
        { name: "Antarctica", code: "AQ" },
        { name: "Antigua and Barbuda", code: "AG" },
        { name: "Argentina", code: "AR" },
        { name: "Armenia", code: "AM" },
        { name: "Aruba", code: "AW" },
        { name: "Australia", code: "AU" },
        { name: "Austria", code: "AT" },
        { name: "Azerbaijan", code: "AZ" },
        { name: "Bahamas", code: "BS" },
        { name: "Bahrain", code: "BH" },
        { name: "Bangladesh", code: "BD" },
        { name: "Barbados", code: "BB" },
        { name: "Belarus", code: "BY" },
        { name: "Belgium", code: "BE" },
        { name: "Belize", code: "BZ" },
        { name: "Benin", code: "BJ" },
        { name: "Bermuda", code: "BM" },
        { name: "Bhutan", code: "BT" },
        { name: "Bolivia", code: "BO" },
        { name: "Bosnia and Herzegovina", code: "BA" },
        { name: "Botswana", code: "BW" },
        { name: "Bouvet Island", code: "BV" },
        { name: "Brazil", code: "BR" },
        { name: "British Indian Ocean Territory", code: "IO" },
        { name: "Brunei Darussalam", code: "BN" },
        { name: "Bulgaria", code: "BG" },
        { name: "Burkina Faso", code: "BF" },
        { name: "Burundi", code: "BI" },
        { name: "Cambodia", code: "KH" },
        { name: "Cameroon", code: "CM" },
        { name: "Canada", code: "CA" },
        { name: "Cape Verde", code: "CV" },
        { name: "Cayman Islands", code: "KY" },
        { name: "Central African Republic", code: "CF" },
        { name: "Chad", code: "TD" },
        { name: "Chile", code: "CL" },
        { name: "China", code: "CN" },
        { name: "Christmas Island", code: "CX" },
        { name: "Cocos (Keeling) Islands", code: "CC" },
        { name: "Colombia", code: "CO" },
        { name: "Comoros", code: "KM" },
        { name: "Congo", code: "CG" },
        { name: "Congo, The Democratic Republic of the", code: "CD" },
        { name: "Cook Islands", code: "CK" },
        { name: "Costa Rica", code: "CR" },
        { name: "Cote DIvoire", code: "CI" },
        { name: "Croatia", code: "HR" },
        { name: "Cuba", code: "CU" },
        { name: "Cyprus", code: "CY" },
        { name: "Czech Republic", code: "CZ" },
        { name: "Denmark", code: "DK" },
        { name: "Djibouti", code: "DJ" },
        { name: "Dominica", code: "DM" },
        { name: "Dominican Republic", code: "DO" },
        { name: "Ecuador", code: "EC" },
        { name: "Egypt", code: "EG" },
        { name: "El Salvador", code: "SV" },
        { name: "Equatorial Guinea", code: "GQ" },
        { name: "Eritrea", code: "ER" },
        { name: "Estonia", code: "EE" },
        { name: "Ethiopia", code: "ET" },
        { name: "Falkland Islands (Malvinas)", code: "FK" },
        { name: "Faroe Islands", code: "FO" },
        { name: "Fiji", code: "FJ" },
        { name: "Finland", code: "FI" },
        { name: "France", code: "FR" },
        { name: "French Guiana", code: "GF" },
        { name: "French Polynesia", code: "PF" },
        { name: "French Southern Territories", code: "TF" },
        { name: "Gabon", code: "GA" },
        { name: "Gambia", code: "GM" },
        { name: "Georgia", code: "GE" },
        { name: "Germany", code: "DE" },
        { name: "Ghana", code: "GH" },
        { name: "Gibraltar", code: "GI" },
        { name: "Greece", code: "GR" },
        { name: "Greenland", code: "GL" },
        { name: "Grenada", code: "GD" },
        { name: "Guadeloupe", code: "GP" },
        { name: "Guam", code: "GU" },
        { name: "Guatemala", code: "GT" },
        { name: "Guernsey", code: "GG" },
        { name: "Guinea", code: "GN" },
        { name: "Guinea-Bissau", code: "GW" },
        { name: "Guyana", code: "GY" },
        { name: "Haiti", code: "HT" },
        { name: "Heard Island and Mcdonald Islands", code: "HM" },
        { name: "Holy See (Vatican City State)", code: "VA" },
        { name: "Honduras", code: "HN" },
        { name: "Hong Kong", code: "HK" },
        { name: "Hungary", code: "HU" },
        { name: "Iceland", code: "IS" },
        { name: "India", code: "IN" },
        { name: "Indonesia", code: "ID" },
        { name: "Iran, Islamic Republic Of", code: "IR" },
        { name: "Iraq", code: "IQ" },
        { name: "Ireland", code: "IE" },
        { name: "Isle of Man", code: "IM" },
        { name: "Israel", code: "IL" },
        { name: "Italy", code: "IT" },
        { name: "Jamaica", code: "JM" },
        { name: "Japan", code: "JP" },
        { name: "Jersey", code: "JE" },
        { name: "Jordan", code: "JO" },
        { name: "Kazakhstan", code: "KZ" },
        { name: "Kenya", code: "KE" },
        { name: "Kiribati", code: "KI" },
        { name: "Korea", code: "KP" },
        { name: "Korea, Republic of", code: "KR" },
        { name: "Kuwait", code: "KW" },
        { name: "Kyrgyzstan", code: "KG" },
        { name: "Lao PeopleS Democratic Republic", code: "LA" },
        { name: "Latvia", code: "LV" },
        { name: "Lebanon", code: "LB" },
        { name: "Lesotho", code: "LS" },
        { name: "Liberia", code: "LR" },
        { name: "Libyan Arab Jamahiriya", code: "LY" },
        { name: "Liechtenstein", code: "LI" },
        { name: "Lithuania", code: "LT" },
        { name: "Luxembourg", code: "LU" },
        { name: "Macao", code: "MO" },
        { name: "Macedonia, The Former Yugoslav Republic of", code: "MK" },
        { name: "Madagascar", code: "MG" },
        { name: "Malawi", code: "MW" },
        { name: "Malaysia", code: "MY" },
        { name: "Maldives", code: "MV" },
        { name: "Mali", code: "ML" },
        { name: "Malta", code: "MT" },
        { name: "Marshall Islands", code: "MH" },
        { name: "Martinique", code: "MQ" },
        { name: "Mauritania", code: "MR" },
        { name: "Mauritius", code: "MU" },
        { name: "Mayotte", code: "YT" },
        { name: "Mexico", code: "MX" },
        { name: "Micronesia, Federated States of", code: "FM" },
        { name: "Moldova, Republic of", code: "MD" },
        { name: "Monaco", code: "MC" },
        { name: "Mongolia", code: "MN" },
        { name: "Montenegro", code: "ME" },
        { name: "Montserrat", code: "MS" },
        { name: "Morocco", code: "MA" },
        { name: "Mozambique", code: "MZ" },
        { name: "Myanmar", code: "MM" },
        { name: "Namibia", code: "NA" },
        { name: "Nauru", code: "NR" },
        { name: "Nepal", code: "NP" },
        { name: "Netherlands", code: "NL" },
        { name: "Netherlands Antilles", code: "AN" },
        { name: "New Caledonia", code: "NC" },
        { name: "New Zealand", code: "NZ" },
        { name: "Nicaragua", code: "NI" },
        { name: "Niger", code: "NE" },
        { name: "Nigeria", code: "NG" },
        { name: "Niue", code: "NU" },
        { name: "Norfolk Island", code: "NF" },
        { name: "Northern Mariana Islands", code: "MP" },
        { name: "Norway", code: "NO" },
        { name: "Oman", code: "OM" },
        { name: "Pakistan", code: "PK" },
        { name: "Palau", code: "PW" },
        { name: "Palestinian Territory, Occupied", code: "PS" },
        { name: "Panama", code: "PA" },
        { name: "Papua New Guinea", code: "PG" },
        { name: "Paraguay", code: "PY" },
        { name: "Peru", code: "PE" },
        { name: "Philippines", code: "PH" },
        { name: "Pitcairn", code: "PN" },
        { name: "Poland", code: "PL" },
        { name: "Portugal", code: "PT" },
        { name: "Puerto Rico", code: "PR" },
        { name: "Qatar", code: "QA" },
        { name: "Reunion", code: "RE" },
        { name: "Romania", code: "RO" },
        { name: "Russian Federation", code: "RU" },
        { name: "RWANDA", code: "RW" },
        { name: "Saint Helena", code: "SH" },
        { name: "Saint Kitts and Nevis", code: "KN" },
        { name: "Saint Lucia", code: "LC" },
        { name: "Saint Pierre and Miquelon", code: "PM" },
        { name: "Saint Vincent and the Grenadines", code: "VC" },
        { name: "Samoa", code: "WS" },
        { name: "San Marino", code: "SM" },
        { name: "Sao Tome and Principe", code: "ST" },
        { name: "Saudi Arabia", code: "SA" },
        { name: "Senegal", code: "SN" },
        { name: "Serbia", code: "RS" },
        { name: "Seychelles", code: "SC" },
        { name: "Sierra Leone", code: "SL" },
        { name: "Singapore", code: "SG" },
        { name: "Slovakia", code: "SK" },
        { name: "Slovenia", code: "SI" },
        { name: "Solomon Islands", code: "SB" },
        { name: "Somalia", code: "SO" },
        { name: "South Africa", code: "ZA" },
        { name: "South Georgia and the South Sandwich Islands", code: "GS" },
        { name: "Spain", code: "ES" },
        { name: "Sri Lanka", code: "LK" },
        { name: "Sudan", code: "SD" },
        { name: "Suriname", code: "SR" },
        { name: "Svalbard and Jan Mayen", code: "SJ" },
        { name: "Swaziland", code: "SZ" },
        { name: "Sweden", code: "SE" },
        { name: "Switzerland", code: "CH" },
        { name: "Syrian Arab Republic", code: "SY" },
        { name: "Taiwan, Province of China", code: "TW" },
        { name: "Tajikistan", code: "TJ" },
        { name: "Tanzania, United Republic of", code: "TZ" },
        { name: "Thailand", code: "TH" },
        { name: "Timor-Leste", code: "TL" },
        { name: "Togo", code: "TG" },
        { name: "Tokelau", code: "TK" },
        { name: "Tonga", code: "TO" },
        { name: "Trinidad and Tobago", code: "TT" },
        { name: "Tunisia", code: "TN" },
        { name: "Turkey", code: "TR" },
        { name: "Turkmenistan", code: "TM" },
        { name: "Turks and Caicos Islands", code: "TC" },
        { name: "Tuvalu", code: "TV" },
        { name: "Uganda", code: "UG" },
        { name: "Ukraine", code: "UA" },
        { name: "United Arab Emirates", code: "AE" },
        { name: "United Kingdom", code: "GB" },
        { name: "United States", code: "US" },
        { name: "United States Minor Outlying Islands", code: "UM" },
        { name: "Uruguay", code: "UY" },
        { name: "Uzbekistan", code: "UZ" },
        { name: "Vanuatu", code: "VU" },
        { name: "Venezuela", code: "VE" },
        { name: "Viet Nam", code: "VN" },
        { name: "Virgin Islands, British", code: "VG" },
        { name: "Virgin Islands, U.S.", code: "VI" },
        { name: "Wallis and Futuna", code: "WF" },
        { name: "Western Sahara", code: "EH" },
        { name: "Yemen", code: "YE" },
        { name: "Zambia", code: "ZM" },
        { name: "Zimbabwe", code: "ZW" },
      ],
    };

    this.service = new Service();
    this.storage = new AppService();
    this.validation = new Validation();
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  async componentWillMount() {
    let droupDown1Values = [];

    var res = await this.service.getTeams();

    if (res != null && res.data != null && res.data.data) {
      var data = res.data.data;

      data.forEach((element) => {
        droupDown1Values[element.id] = {
          key: element.team_id,
          droupDown: element.id,
          name: element.title,
        };
      });
      droupDown1Values = droupDown1Values.filter(() => true);
      this.setState({
        droupDown1Options: droupDown1Values,
      });
    } //end response gotten
  }

  setModalVisible(visible) {
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    this.setState({ modalVisible: visible });
  }

  _selecetOption = (item) => {
    this.setState({
      CountrySelected: item.name,
      showDroupDown1: false,
      scrollEnable: true,
    });
  };

  _getDroupDownOptions(item) {
    return (
      <View>
        <TouchableOpacity
          style={[
            { width: "100%", height: 40, justifyContent: "center" },
            item.name == this.state.CountrySelected
              ? { backgroundColor: "#FDB734" }
              : {},
          ]}
          onPress={() => this._selecetOption(item)}
          onPressIn={() => this.setState({ CountrySelected: item.name })}
          activeOpacity={1}
        >
          <Text
            style={[
              styles.droupDownLabelText,
              { textAlign: "left", marginLeft: 15 },
              item.name == this.state.CountrySelected
                ? { color: "#182955" }
                : { color: "#FFFFFF" },
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var fulldate = date + "-" + month + "-" + year;

    this.setState({ Dateofbirth: fulldate, dateshow: false, dateDone: true });
  };
  submit = async () => {
    this.setState({
      fullNameError: "",
      dateofbirthError: "",
      countryError: "",
      passwordError: "",
      confirmPassError: "",
      emailError: "",
    });

    var Full_Name = this.state.FullName;
    var Date_ofbirth = this.state.Dateofbirth;
    var C_ountry = this.state.CountrySelected;
    var E_mail = this.state.Email;
    var f_avoritePlayer = this.state.favoritePlayer;
    var f_avotiteTeam = this.state.CountrySelected;
    var p_assword = this.state.Password;
    var c_onfirmPass = this.state.ConfirmPass;
    var cb_termAndConds = this.state.checkboxTermsAndCond;
    var cb_update = this.state.checkboxUpdate;

    if (cb_termAndConds == true) {
      var nameValidation = this.validation.nameValidation(Full_Name);
      var emailValidation = this.validation.emailValidation(E_mail);
      // var dateofbirthValidation = this.validation.dateofbirthValidation(Date_ofbirth)
      // var countryValidation = this.validation.countryValidation(C_ountry)

      var passValidation = this.validation.passwordValidation(p_assword);
      var confirmPassValidation = this.validation.confirmPasswordValidation(
        p_assword,
        c_onfirmPass
      );

      if (cb_update == true) {
        cb_update = "yes";
      } else {
        cb_update = "no";
      }

      // var favPlayerValidation = true;//this.validation.nameValidation(favoritePlayer)
      // var favTeamValidation = true
      // if (favotiteTeam === 'Favorite Team')
      //     favTeamValidation = false

      if (
        nameValidation == true &&
        emailValidation == true &&
        passValidation == true &&
        confirmPassValidation == true
      ) {
        this.setState({ register: "Please wait" });
        if (p_assword == c_onfirmPass) {
          // alert("I am here 22")
          this.setState({ register: "Wait more.." });
          this.service
            .signUp(
              Full_Name,
              (Date_ofbirth = ""),
              C_ountry,
              E_mail,
              p_assword,
              cb_update
            )
            .then((res) => {
              if (res.data.message == "Email already exists") {
                alert("Email already exists");
                this.setState({ register: "Register" });
                console.log("RESPONSE>>>>>>", res.data);
              } else if (
                res.data.message ==
                "Signed up successfully, please verify your email"
              ) {
                alert("Verify Your Email");
                Actions.VerifyOTP({ email: this.state.Email, nav: "signup" });
              }
            })
            .catch((e) => {
              console.log("ERROR>>>>>>", JSON.stringify(e));
            });
          //   console.log("res....", res);
          //   if (res != null && res.data != null) {
          //     var status = res.data.status;

          //     if (status == "0" || status == 0) {
          //       var error = res.data.errors.email[0];
          //       alert(error);
          //       this.setState({ register: "Register" });
          //     } else if (status == "1" || status == 1) {
          //       alert("Your Account Created Successfully");
          //       Actions.replace("Login");
          //     }
          //   }
        } else alert("Passwords not matched");
      } else {
        if (nameValidation != true) {
          this.setState({ fullNameError: nameValidation });
        }
        if (emailValidation != true) {
          this.setState({ emailError: emailValidation });
        }
        // if (dateofbirthValidation != true) {
        //     this.setState({dateofbirthError: dateofbirthValidation })
        //                     }
        // if (countryValidation != true) {
        //     this.setState({ countryError: countryValidation })
        //                    }
        // if (favPlayerValidation != true) {
        //     // this.setState({ favPlayerError: favPlayerValidation })
        //     // alert("invalid Favorite Player");
        // }

        // if (favTeamValidation != true) {
        //     this.setState({ favTeamError: "Please select a Team" })
        //     // alert("invalid Favorite Team");
        // }

        if (passValidation != true) {
          this.setState({ passwordError: passValidation });
        }

        if (confirmPassValidation != true) {
          this.setState({ confirmPassError: confirmPassValidation });
        }
      }
    } else alert("Accept Terms & Condition");
    this.setState({ process: false });
  };

  render() {
    const { width, height } = Dimensions.get("screen");
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        ref={(c) => {
          this.scroll = c;
        }}
        scrollEnabled={this.state.scrollEnable}
      >
        <View style={[styles.body, { height: "200%" }]}>
          <ImageBackground
            source={BackgroundImage}
            style={[styles.backgroundImage, {}]}
          >
            <View style={styles.containerColumn}>
              <View style={{ flex: 7 }}>
                <View style={{ flex: 2, marginTop: 12 }}>
                  <Image
                    source={logoImage}
                    style={[styles.logo2, { marginTop: 36, marginRight: 32 }]}
                  />
                </View>
                <View style={{ flex: 7 }}>
                  <View style={[{ marginHorizontal: 20, marginVertical: 30 }]}>
                    <Text
                      style={[styles.headingText, { marginHorizontal: 12 }]}
                    >
                      Create Account
                    </Text>

                    <TextInput
                      placeholder="Full Name *"
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#ffffffaa"
                      style={[styles.roundEditText, { marginHorizontal: 5 }]}
                      onChangeText={(text) => this.setState({ FullName: text })}
                    />
                    <Text
                      style={{
                        marginHorizontal: 30,
                        color: "#771111",
                        fontSize: 12,
                      }}
                    >
                      {this.state.fullNameError}
                    </Text>

                    <TextInput
                      placeholder="Email *"
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#ffffffaa"
                      style={[styles.roundEditText, { marginHorizontal: 5 }]}
                      onChangeText={(text) => this.setState({ Email: text })}
                    />
                    <Text
                      style={{
                        marginHorizontal: 30,
                        color: "#771111",
                        fontSize: 12,
                      }}
                    >
                      {this.state.emailError}
                    </Text>

                    {/* <TouchableOpacity
                                          onPress={() => this.setState({dateshow:true})}
                                          style={[styles.roundEditText, { marginHorizontal: 5 ,justifyContent:"center"}]} >
                                                {this.state.dateDone && (
                                              <Text style={{color:"#ffffff"}}>{this.state.Dateofbirth}</Text>)}
                                                 {!this.state.dateDone && (
                                              <Text style={{color:"#ffffffaa"}}>{this.state.Dateofbirth}Date Of Birth</Text>)}

                                         {this.state.dateshow && (
                                          <DateTimePicker
                                                  testID="dateTimePicker"
                                                  value={new Date(1598051730000)}
                                                  mode="date"
                                                  is24Hour={true}
                                                  display="default"
                                                  onChange={this.onDateChange}
                                                  />
                                                  )}
                                        </TouchableOpacity>
                                        <View style={{paddingHorizontal:10}}></View>
                                        <Text style={{ marginHorizontal: 30, color: "#771111", fontSize: 12 }}>
                                          {this.state.dateofbirthError}
                                        </Text>



                                     <TextInput
                                            placeholder="Country"
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#ffffffaa"
                                            style={[styles.roundEditText, { marginHorizontal: 5 }]}
                                            onChangeText={(text) => this.setState({ Country: text })}

                                        />

                                        <Text
                                            style={{ marginHorizontal: 30, color: "#771111", fontSize: 12 }}
                                        >{this.state.countryError}</Text> */}

                    {/* <TextInput
                                            placeholder="Favorite Player"
                                            underlineColorAndroid="transparent"
                                            placeholderTextColor="#ffffffaa"
                                            style={[styles.roundEditText, { marginHorizontal: 5 }]}
                                            onChangeText={(text) => this.setState({ favoritePlayer: text })}
                                        />


                                        <View style={[Platform.OS==='ios'?styles.zindex20:{},{ marginTop: 20, width: "97%", marginHorizontal: 5,}]}>
                                            <TouchableOpacity style={[styles.droupDownLabelContainer, { backgroundColor: "#182955", borderColor: "#ffffff55", borderWidth: 1, height: 45 }]}
                                                onPress={() => this.setState({ showDroupDown1: !this.state.showDroupDown1, scrollEnable: !this.state.scrollEnable })}
                                                activeOpacity={1}
                                            >
                                                <Text style={[styles.droupDownLabelText, { color: "#ffffffaa" }]}>{this.state.CountrySelected}</Text>
                                                <View
                                                    style={{ marginRight: 20, marginBottom: 2 }}>
                                                    <Image source={this.state.showDroupDown1 ? arrowUpImage : arrowDownImage} />
                                                </View>
                                            </TouchableOpacity>
                                            {
                                                this.state.showDroupDown1 &&
                                                <View style={[styles.droupDownFlatListContainer, { backgroundColor: "#182955", marginTop: 45, borderColor: "#ffffff33", }]}>
                                                  <ScrollView style={{height:150}}>
                                                    <FlatList
                                                        style={{ height: 150 }}
                                                        data={this.state.countryList}
                                                        renderItem={({ item }) => this._getDroupDownOptions(item)}
                                                        numColumns={1}
                                                    />
                                                    </ScrollView>
                                                        </View>

                                            }
                                        </View>
                                         <Text
                                            style={{ marginHorizontal: 30, color: "#771111", fontSize: 12 }}
                                        >{this.state.countryError}</Text>*/}

                    <TextInput
                      placeholder="Password *"
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#ffffffaa"
                      secureTextEntry={true}
                      style={[styles.roundEditText, { marginHorizontal: 5 }]}
                      onChangeText={(text) => this.setState({ Password: text })}
                    />
                    <Text
                      style={{
                        marginHorizontal: 30,
                        color: "#771111",
                        fontSize: 12,
                      }}
                    >
                      {this.state.passwordError}
                    </Text>

                    <TextInput
                      placeholder="Confirm Password *"
                      underlineColorAndroid="transparent"
                      placeholderTextColor="#ffffffaa"
                      secureTextEntry={true}
                      style={[styles.roundEditText, { marginHorizontal: 5 }]}
                      onChangeText={(text) =>
                        this.setState({ ConfirmPass: text })
                      }
                    />
                    <Text
                      style={{
                        marginHorizontal: 30,
                        color: "#771111",
                        fontSize: 12,
                      }}
                    >
                      {this.state.confirmPassError}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 25,
                        justifyContent: "flex-start",
                      }}
                    >
                      <CheckBox
                        checked={this.state.checkboxTermsAndCond}
                        containerStyle={{
                          paddingHorizontal: 0,
                          paddingVertical: 5,
                        }}
                        checkedIcon={<Image source={tickImage} />}
                        uncheckedIcon={<Image source={rectangleImage} />}
                        onPress={() =>
                          this.setState({
                            checkboxTermsAndCond: !this.state
                              .checkboxTermsAndCond,
                          })
                        }
                      />
                      <View
                        style={{
                          justifyContent: "center",
                          alignContent: "flex-start",
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.checkboxDes}>Accept the </Text>
                          <Text
                            style={styles.underlineText}
                            // onPress={() => {
                            //     this.setModalVisible(true);
                            // }}
                            onPress={() => {
                              Actions.TermsOfUse();
                            }}
                          >
                            Term of Services *
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 0,
                        justifyContent: "flex-start",
                      }}
                    >
                      <CheckBox
                        checked={this.state.checkboxUpdate}
                        containerStyle={{
                          paddingHorizontal: 0,
                          paddingVertical: 5,
                        }}
                        checkedIcon={<Image source={tickImage} />}
                        uncheckedIcon={<Image source={rectangleImage} />}
                        onPress={() =>
                          this.setState({
                            checkboxUpdate: !this.state.checkboxUpdate,
                          })
                        }
                      />
                      <View
                        style={{
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.checkboxDes}>
                            Signup to our future Newsletter
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.containerMiddle}>
                <TouchableOpacity
                  style={[
                    styles.yellowButton,
                    { marginTop: 0, marginHorizontal: 5 },
                  ]}
                  onPress={() => this.submit()}
                >
                  <Text style={styles.yellowButtonText}>
                    {this.state.register}
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 35,
                    marginBottom: 50,
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.greyText}>Already a User? </Text>
                  <TouchableOpacity onPress={() => Actions.Login()}>
                    <Text style={styles.underlineText}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {this.state.modalVisible ? (
              <View style={[styles.modelBackground]}>
                <View style={[styles.containerMiddle, { marginTop: 5 }]}>
                  <View style={[styles.modelBody, { borderRadius: 12 }]}>
                    <TouchableOpacity
                      style={styles.modelCrossBUtton}
                      onPress={() => {
                        this.setModalVisible(false);
                      }}
                    >
                      <Image source={crossImage} />
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 25, paddingVertical: 20 }}>
                      <Text style={styles.modelTitle}>Term of Services</Text>
                      <Text style={styles.modelDescription}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Lorem ipsum dolor
                        sit amet, cons ectetuer adipiscing.
                        {"\n"} {"\n"}
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Lorem ipsum dolor
                        sit amet, cons ectetuer adipiscing.
                        {"\n"} {"\n"}
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Lorem ipsum dolor
                        sit amet, cons ectetuer adipiscing.
                        {"\n"} {"\n"}
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Lorem ipsum dolor
                        sit amet, cons ectetuer adipiscing.
                        {"\n"} {"\n"}
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Lorem ipsum dolor
                        sit amet, cons ectetuer adipiscing.
                        {"\n"} {"\n"}
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Lorem ipsum dolor
                        sit amet, cons ectetuer adipiscing.
                        {"\n"} {"\n"}
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Lorem ipsum dolor
                        sit amet, cons ectetuer adipiscing.
                        {"\n"} {"\n"}
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Lorem ipsum dolor
                        sit amet, cons ectetuer adipiscing. Lorem ipsum dolor
                        sit amet, consectetuer adipiscing elit, sed diam nonummy
                        nibh euismod tincidunt ut laoreet dolore magna aliquam
                        erat volutpat.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
            {this.state.process == true && (
              <View
                style={{
                  position: "absolute",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <ActivityIndicator size="large" color="#2233aa" />
              </View>
            )}
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}

export default SignUp;
