import { StyleSheet, Dimensions, Platform } from "react-native";

const { height } = Dimensions.get("screen");

var bebasfont = "BebasNeue_Regular";
if (Platform.OS === "ios") {
  bebasfont = "BebasNeue-Regular";
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#182955",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerLogoText: {
    fontFamily: "Roboto-Bold",
    fontStyle: "normal",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 25,
    color: "#FFFFFF",
  },
  footContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 64,
  },
  yellowButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: "#FDB734",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#FDB734",
    justifyContent: "center",
    alignItems: "center",
  },
  yellowButtonText: {
    color: "#182955",
    fontFamily: "Roboto-Bold",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 19,
  },
  yellowButtonSmall: {
    height: 30,
    marginTop: 10,
    paddingHorizontal: 2,
    backgroundColor: "#FDB734",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#FDB734",
    justifyContent: "center",
    alignItems: "center",
  },

  yellowButtonSmallText: {
    color: "#182955",
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 11,
    lineHeight: 13,
  },
  transparentButton: {
    height: 30,
    padding: 2,
    marginTop: 10,
    backgroundColor: "transparent",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#8aabff77",
    justifyContent: "center",
    alignItems: "center",
  },
  transparentButtonText: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 11,
    lineHeight: 13,
    color: "#8AABFF",
  },
  skyButton: {
    height: 20,
    padding: 2,
    marginTop: 2,

    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  logo2: {
    marginLeft: "60%",
    marginTop: "10%",
  },
  containerColumn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
  },
  containerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  containerRowCenter: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerRowStart: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  containerMiddle: {
    marginLeft: "5%",
    marginRight: "5%",
  },
  headingText: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 26,
    lineHeight: 30,
    color: "#fffffffb",
  },
  requestANewOtp: {
    marginTop: 5,
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 30,
    color: "#fffffffb",
    color: "#FDB734",
    textAlign: "right",
  },
  roundEditText: {
    textAlign: "left",
    height: 45,
    borderWidth: 1,
    borderColor: "#ffffff55",
    borderRadius: 25,
    backgroundColor: "#182955",
    color: "#FFF",
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 13,
    lineHeight: 15,
    marginTop: 20,
    paddingLeft: 20,
    paddingVertical: 0,
  },
  roundContainerDroupDown: {
    height: 50,
    borderWidth: 2,
    borderColor: "#ffffff33",
    borderRadius: 25,
    backgroundColor: "#182955",
    marginTop: 20,
    marginHorizontal: 5,
    paddingHorizontal: 20,
  },
  pickerStyle: {
    backgroundColor: "#182955",
    marginTop: 90,
    paddingLeft: 20,
    width: "90%",
  },
  roundEditTextWhite: {
    textAlign: "left",
    height: 50,
    borderWidth: 2,
    borderColor: "#dededeaa",
    borderRadius: 25,
    backgroundColor: "#FFF",
    color: "#404040",
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 13,
    lineHeight: 15,
    marginTop: 10,
    marginBottom: 25,
    paddingLeft: 20,
    paddingVertical: 0,
  },
  roundEditTextWhiteLabel: {
    color: "#626262",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
    lineHeight: 14,
    marginTop: 5,
  },
  roundDroupdownContainer: {
    zIndex: 9999999,
    textAlign: "left",
    borderRadius: 25,
    paddingHorizontal: 10,
    height: 30,
    backgroundColor: "#FFF",
    borderColor: "#dededeaa",
    borderWidth: 1,
    justifyContent: "center",
  },
  roundGrayButtonText: {
    color: "#0F1A38",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
  },
  teamItems: {
    color: "#8AABFF",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginVertical: 10,
    marginHorizontal: 5,
    textAlign: "center",
  },
  playerNumberText: {
    color: "#404040",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 22,
    lineHeight: 26,
    textAlign: "center",
  },
  grayTextSmall: {
    color: "#40404077",
    fontFamily: "Roboto-Regular",
    fontWeight: "normal",
    fontSize: 10,

    textAlign: "center",
  },

  underlineText: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 15,
    textDecorationLine: "underline",
    color: "#FFFFFF",
  },
  greyText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 15,
    color: "#ffffff77",
  },
  greyTextSmall: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 12,
    lineHeight: 14,
    color: "#ffffff77",
  },
  splashgreyText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 15,
    color: "#ffffff77",
  },
  containerMiddlemodelDescription: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 11,
    lineHeight: 20,
    color: "#8AABFF",
  },
  checkboxDes: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 13,
    lineHeight: 15,
    color: "#FFF",
  },
  modelBackground: {
    backgroundColor: "#ffffff99",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  modelBackground2: {
    backgroundColor: "#ffffff99",
    width: "100%",
    maxHeight: height - 150,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  modelBody: {
    backgroundColor: "#182955",
    paddingBottom: 50,
    paddingTop: 5,
    borderRadius: 20,
    marginTop: "10%",
  },
  modelBody2: {
    backgroundColor: "#182955",
    borderRadius: 20,
    marginTop: "10%",
    padding: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 12,
  },
  modelTitle: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 20,
    color: "#ffffffee",
  },
  modelDescription: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 11,
    lineHeight: 15,
    color: "#ffffff99",
    marginTop: "5%",
  },
  modelCrossBUtton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 5,
  },
  modelBackBUtton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 5,
    padding: 5,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#182955",
    height: (height / 100) * 8,
    borderBottomColor: "#ffffff44",
    borderBottomWidth: 1,
  },
  navBarDrawerIconContainer: {
    position: "absolute",
    left: 20,
  },
  navBarSearchIconContainer: {
    position: "absolute",
    right: 20,
  },
  navBarTitle: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 18,
    color: "#FFF",
    fontWeight: "500",
    lineHeight: 21,
  },
  playerStatusContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#182955",
    height: (height / 100) * 25,
  },

  goalsStatics: {
    width: "100%",
    height: "5%",
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 5,
  },
  yellowLabelContainer: {
    height: "100%",
    backgroundColor: "#FDB734",
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: "#FDB734",
    justifyContent: "center",
    alignItems: "center",
  },
  yellowLabelText: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 9,
    lineHeight: 11,
    color: "#182955",
  },
  goalsStaticsPlayerName: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 11,
    lineHeight: 13,
    marginVertical: 5,
    marginHorizontal: 10,
    color: "#626262",
  },
  tabScene: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  selectedTabText: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    color: "#404040",
    textAlign: "center",
    alignSelf: "center",
  },
  selectedTabText2: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16,
    color: "#404040",
    textAlign: "center",
  },
  unselectedTabText: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    color: "#18295544",
    textAlign: "center",
  },
  tabStyle: {
    backgroundColor: "#EDF2FF",
    width: "50%",
    padding: 10,
  },
  sliderTabView: {
    backgroundColor: "#182955",
    padding: 25,
    height: "auto",
    borderRadius: 10,
  },
  sliderColumnContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderCirlceTextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    top: 0,
  },
  sliderCirlceTextContainer2: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    margin: 14,
    top: 0,
  },
  sliderShirt: {
    width: 80,
    height: 80,
  },
  sliderCirlceText: {
    fontFamily: bebasfont,
    fontStyle: "normal",
    fontWeight: "900",
    fontSize: 20,
    lineHeight: 20,
    color: "#FFF",
    textAlign: "center",
  },
  sliderDressNumText: {
    fontFamily: bebasfont,
    fontStyle: "normal",
    fontWeight: "900",
    fontSize: 16,
    lineHeight: 16,
    color: "#FFF",
    textAlign: "center",
  },
  sliderShirtWhiteBg: {
    backgroundColor: "#fff",
    padding: 20,
  },
  sliderCirlceTeamName: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 13,
    color: "#FFF",
    textAlign: "center",
    marginTop: 5,
  },
  sliderDayAndTime: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 13,
    lineHeight: 15,
    color: "#8AABFF",
    textAlign: "center",
    marginTop: 5,
  },
  sliderTeamPlayer: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    color: "#FFF",
    textAlign: "center",
    marginTop: 7,
  },
  sliderTeamPlayerStatus: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 10,
    lineHeight: 12,
    color: "#FDB734",
    textAlign: "center",
    marginTop: 2,
  },
  loadGoaliesLabel: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 10,
    lineHeight: 12,
    color: "#FFFFFF",
    textAlign: "center",
    paddingHorizontal: 5,
  },
  loadGoaliesButton: {
    backgroundColor: "#FFB300",
    borderWidth: 0,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  expectedGoalieSlider: {
    marginTop: 15,
    flex: 1,
  },
  noGameTitle: {
    fontFamily: "Roboto-Bold",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: "#182955",
    textAlign: "center",
    marginTop: 10,
  },
  noGameDescription: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 11,
    lineHeight: 17,
    color: "#626262",
    textAlign: "center",
    margin: 10,
  },
  favoriteOptionCard: {
    flex: 1,
    backgroundColor: "#ffffff99",
    borderRadius: 5,
    padding: 15,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  tabfavoriteOptionCard: {
    flex: 1,
    backgroundColor: "#ffffff99",
    borderRadius: 5,
    padding: 15,
    margin: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  favoriteOptionCardShadow: {
    backgroundColor: "#FFF",
    shadowColor: "#E6ECFC",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 1,
  },
  favoriteOptionCardShadowOdd: {
    backgroundColor: "#fff0",
  },
  FavoriteOptionTitle: {
    color: "#626262",
    textAlign: "center",
    marginTop: 5,
    paddingHorizontal: 2,
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 11,
    lineHeight: 13,
  },
  DailyWatchTitleBar: {
    backgroundColor: "#F8F8F8",
    padding: 10,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  containerDrawer: {
    width: "100%",
    flex: 1,
    backgroundColor: "#182955",
  },
  drawerText: {
    color: "#fff",
  },
  topDrawer: {
    flex: 2,
    marginTop: 10,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: "10%",
    // alignItems: 'center',
    paddingVertical: 20,
  },
  headerDrawer: {
    flex: 2,
    marginTop: 20,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: 20,
  },
  bottomDrawer: {
    flex: 10,
    paddingHorizontal: 5,
  },
  footerDrawer: {
    flex: 2,
    width: "100%",
    paddingHorizontal: 15,
    borderColor: "#ffffff33",
    borderTopWidth: 1,
    justifyContent: "center",
  },
  addsContainer: {
    width: "90%",
    height: 50,
    backgroundColor: "#dddddddd",
    // position: "absolute",
    bottom: 0,
    left: "5%",
    alignItems: "center",
  },
  droupDownLabelContainer: {
    textAlign: "left",
    height: 50,
    borderWidth: 1,
    borderColor: "#dededeaa",
    borderRadius: 25,
    backgroundColor: "#FFF",
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  droupDownLabelText: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 13,
    lineHeight: 15,
    color: "#404040",
    textAlign: "center",
  },
  droupDownFlatListContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "88%",
    position: "absolute",
    zIndex: 10,
    marginHorizontal: "6%",
    backgroundColor: "#FFFFFF",
    borderColor: "#dededeaa",
    borderWidth: 1,
  },
  dotStyle: {
    backgroundColor: "#ddddddaa",
    width: 7,
    height: 7,
    //marginTop: 100
  },
  activeDotStyle: {
    backgroundColor: "#222222aa",
    width: 7,
    height: 7,
    //marginTop: 100
  },
  dotStyle2: {
    backgroundColor: "#ddddddaa",
    width: 7,
    height: 7,
    marginTop: 50,
  },
  activeDotStyle2: {
    backgroundColor: "#222222aa",
    width: 7,
    height: 7,
    marginTop: 50,
  },

  slider: {},

  headingStyleStats: {
    width: 68,
  },
  teamStyleStats: {
    width: 45,
  },
  scoreStyleStats: {
    width: 50,
  },

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
  flex8: {
    flex: 8,
  },
  flex_row: {
    flexDirection: "row",
  },
  bg: {
    flex: 1,
    backgroundColor: "#EDF2FF",
  },
  months: {
    backgroundColor: "#EDF2FF",
    flexDirection: "row",
    padding: 16,
  },
  btn_arrow: {
    flex: 1,
  },

  //Text Align

  txt_left: {
    textAlign: "left",
  },
  txt_right: {
    textAlign: "right",
  },
  txt_center: {
    textAlign: "center",
  },

  //Align
  align_center: {
    alignItems: "center",
  },
  align_right: {
    alignItems: "flex-end",
  },

  align_left: {
    alignItems: "flex-start",
  },

  //text weight

  bold: {
    fontWeight: "bold",
  },

  //text Color

  txt_white: {
    color: "#ffffff",
  },
  txt_primary: {
    color: "#182955",
  },
  txt_lblue: {
    color: "#8AABFF",
  },
  txt_red: {
    color: "#FF3A3A",
  },
  txt_green: {
    color: "#00985c",
  },
  txt_secondary: {
    color: "#FDB734",
  },
  //Background Color
  bg_white: {
    backgroundColor: "#ffffff",
  },
  bg_primary: {
    backgroundColor: "#182955",
  },
  bg_grey: {
    backgroundColor: "#f8f8f8",
  },
  bg_secondary: {
    backgroundColor: "#FDB734",
  },
  bg_lblue: {
    backgroundColor: "#8AABFF",
  },
  bg_red: {
    backgroundColor: "#DC4520",
  },
  bg_green: { backgroundColor: "#00985C" },

  //Padding

  display_none: {
    display: "none",
  },
  display_flex: {
    display: "flex",
  },
  p4: {
    padding: 4,
  },
  p6: {
    padding: 6,
  },
  p8: {
    padding: 8,
  },
  p16: {
    padding: 16,
  },
  ph8: {
    paddingHorizontal: 8,
  },
  ph16: {
    paddingHorizontal: 16,
  },
  pl12: {
    paddingLeft: 12,
  },
  ph32: {
    paddingHorizontal: 36,
  },

  mhv16: {
    marginVertical: 16,
  },
  //Margin

  m8: {
    margin: 8,
  },
  m4: {
    margin: 4,
  },
  m16: {
    margin: 16,
  },
  mt8: {
    marginTop: 8,
  },
  mt16: {
    marginTop: 16,
  },
  pb64: {
    paddingBottom: 64,
  },
  pb20: {
    paddingBottom: 20,
  },

  mb64: {
    marginBottom: 64,
  },
  //Border
  brround: { borderRadius: 100 },
  br8: {
    borderRadius: 8,
  },
  br16: {
    borderRadius: 16,
  },
  brb8: {
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    borderRadius: 8,
  },
  brl8: {
    borderTopStartRadius: 8,
    borderBottomStartRadius: 8,
  },
  brr8: {
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
  },

  bwb8: {
    borderBottomWidth: 8,
  },
  bwb2: {
    borderBottomWidth: 2,
  },
  bw2: {
    borderWidth: 2,
  },
  bw4: {
    borderWidth: 4,
  },
  bsecondary: {
    borderColor: "#FDB734",
  },
  bprimary: {
    borderColor: "#182955",
  },
  bgrey: {
    borderColor: "#f8f8f8",
  },
  bblight: {
    borderColor: "#8AABFf",
  },
  //Image
  monthly_reward_img: {
    marginTop: "-40%",
    height: 50,
    resizeMode: "contain",
  },
  price_img: {
    width: 20,
    height: 30,
    //mageResizeMode: "contain",
  },
  token_img: {
    width: "100%",
    height: "100%",

    resizeMode: "contain",
  },
  //Zindex

  zindex10: {
    zIndex: 10,
  },
  zindex20: {
    zIndex: 1000,
  },

  //Justify
  justify_center: {
    justifyContent: "center",
  },

  justify_space: {
    justifyContent: "space-around",
  },
  r_popup: {
    width: 120,
    height: 120,
  },
  popup: {
    borderRadius: 8,
  },
  popupmain: {
    width: "100%",
    borderRadius: 8,
    margin: 16,
    backgroundColor: "#182955",
    justifyContent: "flex-start",
  },
  top_row: {
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
    resizeMode: "stretch",
    flex: 1,
    color: "#00985C",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  txtsmall: {
    fontSize: 10,
  },
  txt: {
    fontWeight: "bold",
    fontSize: 11,
  },
  btn_txt: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#182955",
  },
  text: {
    color: "#ffffff",
    paddingTop: 8,
  },
  label_text: {
    fontSize: 10,
  },
  btn_ok: {
    borderRadius: 50,
    padding: 8,
    width: "100%",
  },

  btn_ok_main: {
    flex: 1,
    borderRadius: 50,
    padding: 16,
    width: "100%",

    backgroundColor: "#FDB734",
    alignItems: "center",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000000bb",
    padding: 100,
  },
  blueLabel: {
    color: "#8AABFF",
    width: "30%",
    textAlign: "center",
    alignSelf: "center",
  },
  infoLabel: { color: "#FFF", width: "35%" },
  leftRowSubContainer: {
    borderBottomWidth: 1,
    height: 50,
    borderBottomColor: "#ffffff33",
    paddingVertical: 10,
  },
});

export default styles;
