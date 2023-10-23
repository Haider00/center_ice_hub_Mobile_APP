import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, Picker, FlatList, ActivityIndicator } from 'react-native';
import styles from '../assets/css/styles';
import { Actions } from 'react-native-router-flux';
import arrowDownImage from '../assets/img/arrowDownDark.png';
import arrowUpImage from '../assets/img/arrowUpDark.png';
import moment from 'moment'
import Service from '../Services/Service';
import AppService from '../Services/AppServices';
import { SeasonContext } from '../utils/seasonUtils';



class PD_Tab_ADV extends React.Component {
  static contextType = SeasonContext;
    constructor(props) {
        super(props);

        this.state = {
            process: true,
            enableScroll: true,
            showDroupDown1: false,
            droupDown1Selected: "Year",
            droupDown1Options: [
                { key: 1, droupDown: 1, name: "2019-2020", selected: true },
                { key: 2, droupDown: 1, name: "2018-2019", },
                { key: 3, droupDown: 1, name: "2017-2018", },
            ],
            showDroupDown2: false,
            droupDown2Selected: "Season",
            droupDown2Options: [
                { key: 1, droupDown: 2, name: "Regular", selected: true },
                { key: 2, droupDown: 2, name: "Playoffs", },
            ],
            showDroupDown3: false,
            droupDown3Selected: "Time",
            droupDown3Options: [
                { key: 1, droupDown: 3, name: "This Week", selected: true },
                { key: 2, droupDown: 3, name: "Next Week", },
                { key: 3, droupDown: 3, name: "This Month", },
                { key: 4, droupDown: 3, name: "Next Month", },
            ],
            remainingGames: [],
            remainingGame: '',
            headings: [
                { key: 1, title: "SPLITS", },
                { key: 2, title: "GP", },
                { key: 3, title: "G", },
                { key: 4, title: "A", },
                { key: 5, title: "P", },
                { key: 6, title: "+/-", },
                { key: 7, title: "S", },
                { key: 8, title: "S%", },
                { key: 9, title: "P/G", },
                { key: 10, title: "PPG", },
                { key: 11, title: "PPP", },
                { key: 12, title: "SHG", },
                { key: 13, title: "SHP", },
                { key: 14, title: "GWG", },
                { key: 15, title: "OTG", },
                { key: 16, title: "MIN", },
                { key: 17, title: "SPG", },
                { key: 18, title: "FOW%", },
                { key: 19, title: "PPT", },
                { key: 20, title: "SHT", },
                { key: 21, title: "PIM", },
                { key: 22, title: "HITS", },
                { key: 23, title: "BS", },

            ],
            headingsGoalies: [
                { key: 1, title: "SPLITS", },
                { key: 2, title: "GP", },
                { key: 3, title: "GS", },
                { key: 4, title: "WINS", },
                { key: 5, title: "LOSS", },
                { key: 6, title: "OTL", },
                { key: 7, title: "SA", },
                { key: 8, title: "SV", },
                { key: 9, title: "GA", },
                { key: 10, title: "SV%", },
                { key: 11, title: "GAA", },
                { key: 12, title: "MIN", },
                { key: 13, title: "SO", },
            ],
            ADVData: {},
            alldata: {},
            ADVDataPlayOffs: {},
            season: 1

        }

        this._getSeasons = this._getSeasons.bind(this);
        this._getScore = this._getScore.bind(this);
        this._getHeadings = this._getHeadings.bind(this);
        this.service = new Service();
        this.appService = new AppService();


    }

    async componentWillMount()
    {
        var selectedYear = this.props.selectedYear;
        var remainingGames = this.props.remainingGames;
        await this.setState({ remainingGames, remainingGame: remainingGames[0] })

        if (selectedYear != '') {
            this.setState({ droupDown1Selected: selectedYear })
        }

        var years = this.props.allYears.seasons;
        if (years != undefined) {
            var droupDown1Options = [];
            var inDroupDown = [];
            years.forEach((element, index) => {
                if (inDroupDown.indexOf(element.value) == -1) {
                    droupDown1Options.push({ key: index, droupDown: 1, name: element.value, })
                    inDroupDown.push(element.value);
                }
            })

            // droupDown1Options.push({ key: droupDown1Options.length, droupDown: 1, name: "Career", })

            this.setState({ droupDown1Options })
        }

        // var thisYear = moment().format('YYYY')
        // var nextYear = moment().add(1, 'Y').format('YYYY')
        var selectedYear = this.context;
        //this.setState({ droupDown1Selected:lastYear+"-"+thisYear , showDroupDown1: false, })
        await this._getADVData("Regular", selectedYear)
        await this._getADVData("Playoffs", selectedYear)
        this.setState({ process: false })

    }

    _selecetOption = (item) => {
        if (item.droupDown == 1) {
            this.setState({ droupDown1Selected: item.name, showDroupDown1: false, })
            this.setState({ADVData:{}})

            this._getADVByYear(item.name)

        }
        else if (item.droupDown == 2)
            this.setState({ droupDown2Selected: item.name, showDroupDown2: false, })
        else if (item.droupDown == 3) {
            this.setState({ droupDown3Selected: item.name, showDroupDown3: false, enableScroll: true, remainingGame: this.state.remainingGames[item.key - 1] })
            }
    }

    _handleClick = (item) => {

        if (item.droupDown == 1)
            this.setState({ droupDown1Selected: item.name })
        else if (item.droupDown == 2)
            this.setState({ droupDown2Selected: item.name })
        else if (item.droupDown == 3)
            this.setState({ droupDown3Selected: item.name })

    }

    _getDroupDownCSS(item) {
        if (item.droupDown == 1) {
            return (item.name == this.state.droupDown1Selected ? { backgroundColor: "#FDB734" } : {})
        }
        else if (item.droupDown == 2) {
            return (item.name == this.state.droupDown2Selected ? { backgroundColor: "#FDB734" } : {})
        }
        else if (item.droupDown == 3) {
            return (item.name == this.state.droupDown3Selected ? { backgroundColor: "#FDB734" } : {})
        }

    }

    _getDroupDownOptions(item) {
        return (
            <View
                key={item.key}>
                <TouchableOpacity
                    onPress={() => this._selecetOption(item)}
                    onPressIn={() => this._handleClick(item)}
                    style={[{ width: "100%", height: 40, justifyContent: "center", }, this._getDroupDownCSS(item)
                    ]}
                >
                    <Text style={[styles.droupDownLabelText, { textAlign: "left", marginLeft: 15, fontSize: 11, lineHeight: 13 }]}>{item.name}</Text>
                </TouchableOpacity>

            </View>
        )

    }

    _getSeasons(item) {
        return (
            <View
                style={{}}
                key={item.key}>
                <Text style={[styles.yellowLabelText, { color: "#404040", marginTop: 10, fontWeight: "normal", lineHeight: 14 }]}>{item.value}</Text>
            </View>
        )
    }
    _getSeasonsEmpty = (item) => {
        return (
            <View
                style={{}}
                key={item.key}>
                <Text style={[styles.yellowLabelText, { color: "#404040", marginTop: 10, fontWeight: "normal", lineHeight: 14 }]}> </Text>
            </View>
        )
    }
    _getScore(item) {

        var new_value = ""
        var typee = typeof (item.value)
        if (typee == "number" && item.value % 1 !== 0) {
           let setDecimal = 1;
           if (item.type === 'SPtage') {
            setDecimal = 0;
           }
           if (item.type === 'GoalsAgainstAverage') {
               setDecimal = 2
           }
           if (item.type === 'SV') {
               setDecimal = 3
           }
           new_value = item.value.toFixed(setDecimal);
        }
        else {
            new_value = item.value;
        }


        return (
            <View
                key={item.key}>
                <Text style={[styles.roundEditTextWhiteLabel, { color: "#404040", marginTop: 10, textAlign: "center", lineHeight: 14 }]}>{new_value}</Text>
            </View>
        )
    }

    _getHeadings(item) {
        return (
            <View style={{ alignItems: "center" }}>
                <Text style={[styles.yellowLabelText, { color: "#8AABFF", marginTop: 10, fontWeight: "normal", }]}>{item.title}</Text>
            </View>
        );
    }

    onHandleTimeFormat = (value) => {
      let subStringData = ''
      if (value) {
        subStringData = value.substring(0, value.length - 3);
      }
      return subStringData;
    }

    _onHandleFormat(value) {
      let sptValue;
      const substringData = value.toString().substring(2);
      if (substringData.length === 0) {
        sptValue = `${substringData}0.0`;
      }
      if (substringData.length === 1) {
        sptValue = `${substringData}0.0`;
      }
      if (substringData.length === 2 ) {
        sptValue = `${substringData}.0`;
      }
      if (substringData.length > 2 &&  substringData.charAt(0) !== '0') {
        sptValue = `${substringData.charAt(0)}${substringData.charAt(1)}.${substringData.charAt(2)}`;
      }
      if (substringData.charAt(0) === '0') {
        sptValue = `${substringData.charAt(1)}.${substringData.charAt(2)}`;
      }
      return sptValue;
    }

    _getADVData = async (season, year) => {
        var player = this.props.item
        var playerLink = player.playerLink;
        if (playerLink != '' && playerLink != undefined) {
            var res = null

            if (season == "Regular" && year != "Career")
                res = await this.service.getADVSplitsRegular(playerLink, year)
            else if (season == "Playoffs" && year != "Career")
                res = await this.service.getADVSplitsPlayOffs(playerLink, year)
            // else if (season == "Regular" && year == "Career")
            //     res = await this.service.getCareerRegularSeason(playerLink, "careerRegularSeason")
            // else if (season == "Playoffs" && year == "Career")
            //     res = await this.service.getCareerRegularSeason(playerLink, "careerPlayoffs")
            if (res != null && res.data != null) {
                var parentSplits = res.data.stats;

                var seasons = []
                var GP = []
                var GS = []
                var SV = []
                var G = []
                var A = []
                var P = []
                var PlusMinus = []
                var S = []
                var SPtage = []
                var PIM = []
                var Hits = []
                var BS = []
                var PointsPerGame = []
                var PowerplayGoals = []
                var PowerplayPoints = []
                var ShortHandedGoals = []
                var ShortHandedPoints = []
                var GameWinningGoals = []
                var OvertimeGoals = []
                var TimeOnIcePerGame = []
                var ShiftsPerGame = []
                var FaceoffWinPercentage = []
                var PowerplayTimeOnIce = []
                var ShortHandedTimeOnIce = []
                var PowerplayTimeOnIcePerGame = []
                var ShortHandedTimeOnIcePerGame = []
                var evenTimeOnIce = []
                var Wins = []
                var Losses = []
                var Ties = []
                var OvertimeLosses = []
                var ShotsAgainst = []
                var Saves = []
                var GoalsAgainst = []
                var GoalsAgainstAverage = []
                var TimeOnIce = []
                var Shutouts = []
                var PenaltyMinutes = []
                var PowerplayShots = []
                var PowerplaySaves = []
                var PowerPlaySavePtage = []
                var ShortHandedShots = []
                var ShortHandedSaves = []
                var ShortHandedSavePercentage = []
                var EventStrengthShots = []
                var EventStrengthSaves = []
                var EventStrengthSavePtage = []

                if (parentSplits != undefined) {

                    var final_arr2 = []
                    var vsTeam = ''
                    var vsDivision = ''
                    var vsConference = ''
                    var byMonth = ''
                    var byDayOfWeek = ''
                    var homeAndAway = ''
                    var onPaceRegularSeason = ''
                    var yearByYearRank = ''
                    // var careerRegularSeason = ''
                    // var careerRegularSeasons = ''
                    parentSplits.forEach((pSplit, index) => {
                        var splits = pSplit.splits;
                        var splitType = pSplit.type.displayName;
                        year;
                        if (splits != undefined) {

                            seasons = []
                            GP = []
                            GS = []
                            SV = []
                            G = []
                            A = []
                            P = []
                            PlusMinus = []
                            S = []
                            SPtage = []
                            PIM = []
                            Hits = []
                            BS = []
                            PointsPerGame = []
                            PowerplayGoals = []
                            PowerplayPoints = []
                            ShortHandedGoals = []
                            ShortHandedPoints = []
                            GameWinningGoals = []
                            OvertimeGoals = []
                            TimeOnIcePerGame = []
                            ShiftsPerGame = []
                            FaceoffWinPercentage = []
                            PowerplayTimeOnIce = []
                            ShortHandedTimeOnIce = []
                            PowerplayTimeOnIcePerGame = []
                            ShortHandedTimeOnIcePerGame = []
                            evenTimeOnIce = []
                            Wins = []
                            Losses = []
                            Ties = []
                            OvertimeLosses = []
                            ShotsAgainst = []
                            Saves = []
                            GoalsAgainst = []
                            GoalsAgainstAverage = []
                            TimeOnIce = []
                            Shutouts = []
                            PenaltyMinutes = []
                            PowerplayShots = []
                            PowerplaySaves = []
                            PowerPlaySavePtage = []
                            ShortHandedShots = []
                            ShortHandedSaves = []
                            ShortHandedSavePercentage = []
                            EventStrengthShots = []
                            EventStrengthSaves = []
                            EventStrengthSavePtage = []
                            splits.forEach((element, index) => {

                                if (splitType == "vsTeam") {

                                    var teamCode = this.appService.getTeamLabel(element.opponent.name)
                                    seasons[index] = { key: index, value: "vs " + teamCode.toUpperCase() }
                                    GP[index] = { key: index, value: element.stat.games ? element.stat.games : 0 }
                                    GS[index] = { key: index, value: element.stat.gamesStarted ? element.stat.gamesStarted : 0 }
                                    SV[index] = { key: index, value: element.stat.savePercentage ? element.stat.savePercentage : 0 }
                                    G[index] = { key: index, value: element.stat.goals ? element.stat.goals : 0 }
                                    A[index] = { key: index, value: element.stat.assists ? element.stat.assists : 0 }
                                    P[index] = { key: index, value: element.stat.points ? element.stat.points : 0 }
                                    PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : 0 }
                                    S[index] = { key: index, value: element.stat.shots ? element.stat.shots : 0 }
                                    SPtage[index] = { key: index, value: element.stat.shotPct ? this._onHandleFormat(element.stat.shotPct) : 0 }
                                    PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : 0 }
                                    Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : 0 }
                                    BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : 0 }

                                    PointsPerGame[index] = { key: index, value: element.stat.points ? (element.stat.points / element.stat.games) : 0, length: splits.length, type: "PointsPerGame", }
                                    PowerplayGoals[index] = { key: index, value: element.stat.powerPlayGoals ? element.stat.powerPlayGoals : 0, length: splits.length, type: "PowerplayGoals", }
                                    PowerplayPoints[index] = { key: index, value: element.stat.powerPlayPoints ? element.stat.powerPlayPoints : 0, length: splits.length, type: "powerPlayPoints", }
                                    ShortHandedGoals[index] = { key: index, value: element.stat.shortHandedGoals ? element.stat.shortHandedGoals : 0, length: splits.length, type: "shortHandedGoals", }
                                    ShortHandedPoints[index] = { key: index, value: element.stat.shortHandedPoints ? element.stat.shortHandedPoints : 0, length: splits.length, type: "shortHandedPoints", }
                                    GameWinningGoals[index] = { key: index, value: element.stat.gameWinningGoals ? element.stat.gameWinningGoals : 0, length: splits.length, type: "gameWinningGoals", }
                                    OvertimeGoals[index] = { key: index, value: element.stat.overTimeGoals ? element.stat.overTimeGoals : 0, length: splits.length, type: "overTimeGoals", }
                                    //  TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIcePerGame ? element.stat.timeOnIcePerGame : 0, length: splits.length, type: "timeOnIcePerGame",  }
                                    TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIce ? this.onHandleTimeFormat(element.stat.timeOnIce) : 0, length: splits.length, type: "timeOnIcePerGame", }

                                    ShiftsPerGame[index] = { key: index, value: element.stat.shifts ? element.stat.shifts : 0, length: splits.length, type: "shifts", }
                                    FaceoffWinPercentage[index] = { key: index, value: element.stat.faceOffPct ? this._onHandleFormat(element.stat.faceOffPct) : 0, length: splits.length, type: "faceOffPct", }
                                    PowerplayTimeOnIce[index] = { key: index, value: element.stat.powerPlayTimeOnIce ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIce) : 0, length: splits.length, type: "powerPlayTimeOnIce", }
                                    ShortHandedTimeOnIce[index] = { key: index, value: element.stat.shortHandedTimeOnIce ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIce) : 0, length: splits.length, type: "shortHandedTimeOnIce", }
                                    PowerplayTimeOnIcePerGame[index] = { key: index, value: element.stat.powerPlayTimeOnIcePerGame ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIcePerGame) : 0, length: splits.length, type: "powerPlayTimeOnIcePerGame", }
                                    ShortHandedTimeOnIcePerGame[index] = { key: index, value: element.stat.shortHandedTimeOnIcePerGame ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIcePerGame) : 0, length: splits.length, type: "shortHandedTimeOnIcePerGame", }
                                    evenTimeOnIce[index] = { key: index, value: element.stat.evenTimeOnIce ? element.stat.evenTimeOnIce : 0, length: splits.length, type: "evenTimeOnIce", }
                                    Wins[index] = { key: index, value: element.stat.wins ? element.stat.wins : 0, length: splits.length, type: "wins", }
                                    Losses[index] = { key: index, value: element.stat.losses ? element.stat.losses : 0, length: splits.length, type: "losses", }
                                    Ties[index] = { key: index, value: element.stat.ties ? element.stat.ties : 0, length: splits.length, type: "ties", }
                                    OvertimeLosses[index] = { key: index, value: element.stat.ot ? element.stat.ot : 0, length: splits.length, type: "overTimeLosses", }
                                    ShotsAgainst[index] = { key: index, value: element.stat.shotsAgainst ? element.stat.shotsAgainst : 0, length: splits.length, type: "shotsAgainst", }
                                    Saves[index] = { key: index, value: element.stat.saves ? element.stat.saves : 0, length: splits.length, type: "saves", }
                                    GoalsAgainst[index] = { key: index, value: element.stat.goalsAgainst ? element.stat.goalsAgainst : 0, length: splits.length, type: "goalsAgainst", }
                                    GoalsAgainstAverage[index] = { key: index, value: element.stat.goalAgainstAverage ? element.stat.goalAgainstAverage : 0, length: splits.length, type: "goalsAgainstAverage", }
                                    TimeOnIce[index] = { key: index, value: element.stat.timeOnIce ? this.onHandleTimeFormat(element.stat.timeOnIce) : 0, length: splits.length, type: "timeOnIce", }
                                    Shutouts[index] = { key: index, value: element.stat.shutouts ? element.stat.shutouts : 0, length: splits.length, type: "shutouts", }
                                    PenaltyMinutes[index] = { key: index, value: element.stat.penaltyMinutes ? element.stat.penaltyMinutes : 0, length: splits.length, type: "BpenaltyMinutesS", }
                                    PowerplayShots[index] = { key: index, value: element.stat.powerPlayShots ? element.stat.powerPlayShots : 0, length: splits.length, type: "powerPlayShots", }
                                    PowerplaySaves[index] = { key: index, value: element.stat.powerPlaySaves ? element.stat.powerPlaySaves : 0, length: splits.length, type: "powerPlaySaves", }
                                    PowerPlaySavePtage[index] = { key: index, value: element.stat.powerPlaySavePtage ? element.stat.powerPlaySavePtage : 0, length: splits.length, type: "powerPlaySavePtage", }
                                    ShortHandedShots[index] = { key: index, value: element.stat.shortHandedShots ? element.stat.shortHandedShots : 0, length: splits.length, type: "shortHandedShots", }
                                    ShortHandedSaves[index] = { key: index, value: element.stat.shortHandedSaves ? element.stat.shortHandedSaves : 0, length: splits.length, type: "shortHandedSaves", }
                                    ShortHandedSavePercentage[index] = { key: index, value: element.stat.shortHandedSavePercentage ? element.stat.shortHandedSavePercentage.toFixed(2) : 0, length: splits.length, type: "shortHandedSavePercentage", }
                                    EventStrengthShots[index] = { key: index, value: element.stat.eventStrengthShots ? element.stat.eventStrengthShots : 0, length: splits.length, type: "eventStrengthShots", }
                                    EventStrengthSaves[index] = { key: index, value: element.stat.evenSaves ? element.stat.evenSaves : 0, length: splits.length, type: "evenSaves", }
                                    EventStrengthSavePtage[index] = { key: index, value: element.stat.eventStrengthSavePtage ? element.stat.eventStrengthSavePtage : 0, length: splits.length, type: "eventStrengthSavePtage", }


                                }
                                else if (splitType == "vsDivision") {

                                    seasons[index] = { key: index, value: "vs " + element.opponentDivision.name.substring(0, 3).toUpperCase() }
                                    GP[index] = { key: index, value: element.stat.games ? element.stat.games : 0 }
                                    GS[index] = { key: index, value: element.stat.gamesStarted ? element.stat.gamesStarted : 0 }
                                    SV[index] = { key: index, value: element.stat.savePercentage ? element.stat.savePercentage : 0 }
                                    G[index] = { key: index, value: element.stat.goals ? element.stat.goals : 0 }
                                    A[index] = { key: index, value: element.stat.assists ? element.stat.assists : 0 }
                                    P[index] = { key: index, value: element.stat.points ? element.stat.points : 0 }
                                    PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : 0 }
                                    S[index] = { key: index, value: element.stat.shots ? element.stat.shots : 0 }
                                    SPtage[index] = { key: index, value: element.stat.shotPct ? this._onHandleFormat(element.stat.shotPct) : 0 }
                                    PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : 0 }
                                    Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : 0 }
                                    BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : 0 }

                                    PointsPerGame[index] = { key: index, value: element.stat.points ? (element.stat.points / element.stat.games) : 0, length: splits.length, type: "PointsPerGame", }
                                    PowerplayGoals[index] = { key: index, value: element.stat.powerPlayGoals ? element.stat.powerPlayGoals : 0, length: splits.length, type: "PowerplayGoals", }
                                    PowerplayPoints[index] = { key: index, value: element.stat.powerPlayPoints ? element.stat.powerPlayPoints : 0, length: splits.length, type: "powerPlayPoints", }
                                    ShortHandedGoals[index] = { key: index, value: element.stat.shortHandedGoals ? element.stat.shortHandedGoals : 0, length: splits.length, type: "shortHandedGoals", }
                                    ShortHandedPoints[index] = { key: index, value: element.stat.shortHandedPoints ? element.stat.shortHandedPoints : 0, length: splits.length, type: "shortHandedPoints", }
                                    GameWinningGoals[index] = { key: index, value: element.stat.gameWinningGoals ? element.stat.gameWinningGoals : 0, length: splits.length, type: "gameWinningGoals", }
                                    OvertimeGoals[index] = { key: index, value: element.stat.overTimeGoals ? element.stat.overTimeGoals : 0, length: splits.length, type: "overTimeGoals", }
                                    TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIce ? this.onHandleTimeFormat(element.stat.timeOnIce) : 0, length: splits.length, type: "timeOnIcePerGame", }
                                    ShiftsPerGame[index] = { key: index, value: element.stat.shifts ? element.stat.shifts : 0, length: splits.length, type: "shifts", }
                                    FaceoffWinPercentage[index] = { key: index, value: element.stat.faceOffPct ? this._onHandleFormat(element.stat.faceOffPct) : 0, length: splits.length, type: "faceOffPct", }
                                    PowerplayTimeOnIce[index] = { key: index, value: element.stat.powerPlayTimeOnIce ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIce) : 0, length: splits.length, type: "powerPlayTimeOnIce", }
                                    ShortHandedTimeOnIce[index] = { key: index, value: element.stat.shortHandedTimeOnIce ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIce) : 0, length: splits.length, type: "shortHandedTimeOnIce", }
                                    PowerplayTimeOnIcePerGame[index] = { key: index, value: element.stat.powerPlayTimeOnIcePerGame ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIcePerGame) : 0, length: splits.length, type: "powerPlayTimeOnIcePerGame", }
                                    ShortHandedTimeOnIcePerGame[index] = { key: index, value: element.stat.shortHandedTimeOnIcePerGame ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIcePerGame) : 0, length: splits.length, type: "shortHandedTimeOnIcePerGame", }
                                    evenTimeOnIce[index] = { key: index, value: element.stat.evenTimeOnIce ? element.stat.evenTimeOnIce : 0, length: splits.length, type: "evenTimeOnIce", }
                                    Wins[index] = { key: index, value: element.stat.wins ? element.stat.wins : 0, length: splits.length, type: "wins", }
                                    Losses[index] = { key: index, value: element.stat.losses ? element.stat.losses : 0, length: splits.length, type: "losses", }
                                    Ties[index] = { key: index, value: element.stat.ties ? element.stat.ties : 0, length: splits.length, type: "ties", }
                                    OvertimeLosses[index] = { key: index, value: element.stat.ot ? element.stat.ot : 0, length: splits.length, type: "overTimeLosses", }
                                    ShotsAgainst[index] = { key: index, value: element.stat.shotsAgainst ? element.stat.shotsAgainst : 0, length: splits.length, type: "shotsAgainst", }
                                    Saves[index] = { key: index, value: element.stat.saves ? element.stat.saves : 0, length: splits.length, type: "saves", }
                                    GoalsAgainst[index] = { key: index, value: element.stat.goalsAgainst ? element.stat.goalsAgainst : 0, length: splits.length, type: "goalsAgainst", }
                                    GoalsAgainstAverage[index] = { key: index, value: element.stat.goalAgainstAverage ? element.stat.goalAgainstAverage : 0, length: splits.length, type: "goalsAgainstAverage", }
                                    TimeOnIce[index] = { key: index, value: element.stat.timeOnIce ? this.onHandleTimeFormat(element.stat.timeOnIce) : 0, length: splits.length, type: "timeOnIce", }
                                    Shutouts[index] = { key: index, value: element.stat.shutouts ? element.stat.shutouts : 0, length: splits.length, type: "shutouts", }
                                    PenaltyMinutes[index] = { key: index, value: element.stat.penaltyMinutes ? element.stat.penaltyMinutes : 0, length: splits.length, type: "BpenaltyMinutesS", }
                                    PowerplayShots[index] = { key: index, value: element.stat.powerPlayShots ? element.stat.powerPlayShots : 0, length: splits.length, type: "powerPlayShots", }
                                    PowerplaySaves[index] = { key: index, value: element.stat.powerPlaySaves ? element.stat.powerPlaySaves : 0, length: splits.length, type: "powerPlaySaves", }
                                    PowerPlaySavePtage[index] = { key: index, value: element.stat.powerPlaySavePtage ? element.stat.powerPlaySavePtage : 0, length: splits.length, type: "powerPlaySavePtage", }
                                    ShortHandedShots[index] = { key: index, value: element.stat.shortHandedShots ? element.stat.shortHandedShots : 0, length: splits.length, type: "shortHandedShots", }
                                    ShortHandedSaves[index] = { key: index, value: element.stat.shortHandedSaves ? element.stat.shortHandedSaves : 0, length: splits.length, type: "shortHandedSaves", }
                                    ShortHandedSavePercentage[index] = { key: index, value: element.stat.shortHandedSavePercentage ? element.stat.shortHandedSavePercentage.toFixed(2) : 0, length: splits.length, type: "shortHandedSavePercentage", }
                                    EventStrengthShots[index] = { key: index, value: element.stat.eventStrengthShots ? element.stat.eventStrengthShots : 0, length: splits.length, type: "eventStrengthShots", }
                                    EventStrengthSaves[index] = { key: index, value: element.stat.evenSaves ? element.stat.evenSaves : 0, length: splits.length, type: "evenSaves", }
                                    EventStrengthSavePtage[index] = { key: index, value: element.stat.eventStrengthSavePtage ? element.stat.eventStrengthSavePtage : 0, length: splits.length, type: "eventStrengthSavePtage", }

                                }
                                else if (splitType == "vsConference") {

                                    seasons[index] = { key: index, value: "vs " +  element.opponentConference.name.substring(0, 3).toUpperCase() }
                                    GP[index] = { key: index, value: element.stat.games ? element.stat.games : 0 }
                                    SV[index] = { key: index, value: element.stat.savePercentage ? element.stat.savePercentage : 0 }
                                    GS[index] = { key: index, value: element.stat.gamesStarted ? element.stat.gamesStarted : 0 }
                                    G[index] = { key: index, value: element.stat.goals ? element.stat.goals : 0 }
                                    A[index] = { key: index, value: element.stat.assists ? element.stat.assists : 0 }
                                    P[index] = { key: index, value: element.stat.points ? element.stat.points : 0 }
                                    PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : 0 }
                                    S[index] = { key: index, value: element.stat.shots ? element.stat.shots : 0 }
                                    SPtage[index] = { key: index, value: element.stat.shotPct ? this._onHandleFormat(element.stat.shotPct) : 0 }
                                    PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : 0 }
                                    Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : 0 }
                                    BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : 0 }

                                    PointsPerGame[index] = { key: index, value: element.stat.points ? (element.stat.points / element.stat.games) : 0, length: splits.length, type: "PointsPerGame", }
                                    PowerplayGoals[index] = { key: index, value: element.stat.powerPlayGoals ? element.stat.powerPlayGoals : 0, length: splits.length, type: "PowerplayGoals", }
                                    PowerplayPoints[index] = { key: index, value: element.stat.powerPlayPoints ? element.stat.powerPlayPoints : 0, length: splits.length, type: "powerPlayPoints", }
                                    ShortHandedGoals[index] = { key: index, value: element.stat.shortHandedGoals ? element.stat.shortHandedGoals : 0, length: splits.length, type: "shortHandedGoals", }
                                    ShortHandedPoints[index] = { key: index, value: element.stat.shortHandedPoints ? element.stat.shortHandedPoints : 0, length: splits.length, type: "shortHandedPoints", }
                                    GameWinningGoals[index] = { key: index, value: element.stat.gameWinningGoals ? element.stat.gameWinningGoals : 0, length: splits.length, type: "gameWinningGoals", }
                                    OvertimeGoals[index] = { key: index, value: element.stat.overTimeGoals ? element.stat.overTimeGoals : 0, length: splits.length, type: "overTimeGoals", }
                                    TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIce ? this.onHandleTimeFormat(element.stat.timeOnIce) : 0, length: splits.length, type: "timeOnIcePerGame", }
                                    ShiftsPerGame[index] = { key: index, value: element.stat.shifts ? element.stat.shifts : 0, length: splits.length, type: "shifts", }
                                    FaceoffWinPercentage[index] = { key: index, value: element.stat.faceOffPct ? this._onHandleFormat(element.stat.faceOffPct) : 0, length: splits.length, type: "faceOffPct", }
                                    PowerplayTimeOnIce[index] = { key: index, value: element.stat.powerPlayTimeOnIce ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIce) : 0, length: splits.length, type: "powerPlayTimeOnIce", }
                                    ShortHandedTimeOnIce[index] = { key: index, value: element.stat.shortHandedTimeOnIce ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIce) : 0, length: splits.length, type: "shortHandedTimeOnIce", }
                                    PowerplayTimeOnIcePerGame[index] = { key: index, value: element.stat.powerPlayTimeOnIcePerGame ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIcePerGame) : 0, length: splits.length, type: "powerPlayTimeOnIcePerGame", }
                                    ShortHandedTimeOnIcePerGame[index] = { key: index, value: element.stat.shortHandedTimeOnIcePerGame ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIcePerGame) : 0, length: splits.length, type: "shortHandedTimeOnIcePerGame", }
                                    evenTimeOnIce[index] = { key: index, value: element.stat.evenTimeOnIce ? element.stat.evenTimeOnIce : 0, length: splits.length, type: "evenTimeOnIce", }
                                    Wins[index] = { key: index, value: element.stat.wins ? element.stat.wins : 0, length: splits.length, type: "wins", }
                                    Losses[index] = { key: index, value: element.stat.losses ? element.stat.losses : 0, length: splits.length, type: "losses", }
                                    Ties[index] = { key: index, value: element.stat.ties ? element.stat.ties : 0, length: splits.length, type: "ties", }
                                    OvertimeLosses[index] = { key: index, value: element.stat.ot ? element.stat.ot : 0, length: splits.length, type: "overTimeLosses", }
                                    ShotsAgainst[index] = { key: index, value: element.stat.shotsAgainst ? element.stat.shotsAgainst : 0, length: splits.length, type: "shotsAgainst", }
                                    Saves[index] = { key: index, value: element.stat.saves ? element.stat.saves : 0, length: splits.length, type: "saves", }
                                    GoalsAgainst[index] = { key: index, value: element.stat.goalsAgainst ? element.stat.goalsAgainst : 0, length: splits.length, type: "goalsAgainst", }
                                    GoalsAgainstAverage[index] = { key: index, value: element.stat.goalAgainstAverage ? element.stat.goalAgainstAverage : 0, length: splits.length, type: "goalsAgainstAverage", }
                                    TimeOnIce[index] = { key: index, value: element.stat.timeOnIce ? this.onHandleTimeFormat(element.stat.timeOnIce) : 0, length: splits.length, type: "timeOnIce", }
                                    Shutouts[index] = { key: index, value: element.stat.shutouts ? element.stat.shutouts : 0, length: splits.length, type: "shutouts", }
                                    PenaltyMinutes[index] = { key: index, value: element.stat.penaltyMinutes ? element.stat.penaltyMinutes : 0, length: splits.length, type: "BpenaltyMinutesS", }
                                    PowerplayShots[index] = { key: index, value: element.stat.powerPlayShots ? element.stat.powerPlayShots : 0, length: splits.length, type: "powerPlayShots", }
                                    PowerplaySaves[index] = { key: index, value: element.stat.powerPlaySaves ? element.stat.powerPlaySaves : 0, length: splits.length, type: "powerPlaySaves", }
                                    PowerPlaySavePtage[index] = { key: index, value: element.stat.powerPlaySavePtage ? element.stat.powerPlaySavePtage : 0, length: splits.length, type: "powerPlaySavePtage", }
                                    ShortHandedShots[index] = { key: index, value: element.stat.shortHandedShots ? element.stat.shortHandedShots : 0, length: splits.length, type: "shortHandedShots", }
                                    ShortHandedSaves[index] = { key: index, value: element.stat.shortHandedSaves ? element.stat.shortHandedSaves : 0, length: splits.length, type: "shortHandedSaves", }
                                    ShortHandedSavePercentage[index] = { key: index, value: element.stat.shortHandedSavePercentage ? element.stat.shortHandedSavePercentage.toFixed(2) : 0, length: splits.length, type: "shortHandedSavePercentage", }
                                    EventStrengthShots[index] = { key: index, value: element.stat.eventStrengthShots ? element.stat.eventStrengthShots : 0, length: splits.length, type: "eventStrengthShots", }
                                    EventStrengthSaves[index] = { key: index, value: element.stat.evenSaves ? element.stat.evenSaves : 0, length: splits.length, type: "evenSaves", }
                                    EventStrengthSavePtage[index] = { key: index, value: element.stat.eventStrengthSavePtage ? element.stat.eventStrengthSavePtage : 0, length: splits.length, type: "eventStrengthSavePtage", }

                                }
                                else if (splitType == "byMonth") {

                                    var Month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
                                    seasons[index] = { key: index, value: Month[element.month - 1] }
                                    GP[index] = { key: index, value: element.stat.games ? element.stat.games : 0 }
                                    GS[index] = { key: index, value: element.stat.gamesStarted ? element.stat.gamesStarted : 0 }
                                    SV[index] = { key: index, value: element.stat.savePercentage ? element.stat.savePercentage : 0 }
                                    G[index] = { key: index, value: element.stat.goals ? element.stat.goals : 0 }
                                    A[index] = { key: index, value: element.stat.assists ? element.stat.assists : 0 }
                                    P[index] = { key: index, value: element.stat.points ? element.stat.points : 0 }
                                    PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : 0 }
                                    S[index] = { key: index, value: element.stat.shots ? element.stat.shots : 0 }
                                    SPtage[index] = { key: index, value: element.stat.shotPct ? this._onHandleFormat(element.stat.shotPct) : 0 }
                                    PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : 0 }
                                    Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : 0 }
                                    BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : 0 }

                                    PointsPerGame[index] = { key: index, value: element.stat.points ? (element.stat.points / element.stat.games) : 0, length: splits.length, type: "PointsPerGame", }
                                    PowerplayGoals[index] = { key: index, value: element.stat.powerPlayGoals ? element.stat.powerPlayGoals : 0, length: splits.length, type: "PowerplayGoals", }
                                    PowerplayPoints[index] = { key: index, value: element.stat.powerPlayPoints ? element.stat.powerPlayPoints : 0, length: splits.length, type: "powerPlayPoints", }
                                    ShortHandedGoals[index] = { key: index, value: element.stat.shortHandedGoals ? element.stat.shortHandedGoals : 0, length: splits.length, type: "shortHandedGoals", }
                                    ShortHandedPoints[index] = { key: index, value: element.stat.shortHandedPoints ? element.stat.shortHandedPoints : 0, length: splits.length, type: "shortHandedPoints", }
                                    GameWinningGoals[index] = { key: index, value: element.stat.gameWinningGoals ? element.stat.gameWinningGoals : 0, length: splits.length, type: "gameWinningGoals", }
                                    OvertimeGoals[index] = { key: index, value: element.stat.overTimeGoals ? element.stat.overTimeGoals : 0, length: splits.length, type: "overTimeGoals", }
                                    TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIce ? this.onHandleTimeFormat(element.stat.timeOnIce) : 0, length: splits.length, type: "timeOnIcePerGame", }
                                    ShiftsPerGame[index] = { key: index, value: element.stat.shifts ? element.stat.shifts : 0, length: splits.length, type: "shifts", }
                                    FaceoffWinPercentage[index] = { key: index, value: element.stat.faceOffPct ? this._onHandleFormat(element.stat.faceOffPct) : 0, length: splits.length, type: "faceOffPct", }
                                    PowerplayTimeOnIce[index] = { key: index, value: element.stat.powerPlayTimeOnIce ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIce) : 0, length: splits.length, type: "powerPlayTimeOnIce", }
                                    ShortHandedTimeOnIce[index] = { key: index, value: element.stat.shortHandedTimeOnIce ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIce ) : 0, length: splits.length, type: "shortHandedTimeOnIce", }
                                    PowerplayTimeOnIcePerGame[index] = { key: index, value: element.stat.powerPlayTimeOnIcePerGame ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIcePerGame) : 0, length: splits.length, type: "powerPlayTimeOnIcePerGame", }
                                    ShortHandedTimeOnIcePerGame[index] = { key: index, value: element.stat.shortHandedTimeOnIcePerGame ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIcePerGame) : 0, length: splits.length, type: "shortHandedTimeOnIcePerGame", }
                                    evenTimeOnIce[index] = { key: index, value: element.stat.evenTimeOnIce ? element.stat.evenTimeOnIce : 0, length: splits.length, type: "evenTimeOnIce", }
                                    Wins[index] = { key: index, value: element.stat.wins ? element.stat.wins : 0, length: splits.length, type: "wins", }
                                    Losses[index] = { key: index, value: element.stat.losses ? element.stat.losses : 0, length: splits.length, type: "losses", }
                                    Ties[index] = { key: index, value: element.stat.ties ? element.stat.ties : 0, length: splits.length, type: "ties", }
                                    OvertimeLosses[index] = { key: index, value: element.stat.ot ? element.stat.ot : 0, length: splits.length, type: "overTimeLosses", }
                                    ShotsAgainst[index] = { key: index, value: element.stat.shotsAgainst ? element.stat.shotsAgainst : 0, length: splits.length, type: "shotsAgainst", }
                                    Saves[index] = { key: index, value: element.stat.saves ? element.stat.saves : 0, length: splits.length, type: "saves", }
                                    GoalsAgainst[index] = { key: index, value: element.stat.goalsAgainst ? element.stat.goalsAgainst : 0, length: splits.length, type: "goalsAgainst", }
                                    GoalsAgainstAverage[index] = { key: index, value: element.stat.goalAgainstAverage ? element.stat.goalAgainstAverage : 0, length: splits.length, type: "goalsAgainstAverage", }
                                    TimeOnIce[index] = { key: index, value: element.stat.timeOnIce ? this.onHandleTimeFormat(element.stat.timeOnIce) : 0, length: splits.length, type: "timeOnIce", }
                                    Shutouts[index] = { key: index, value: element.stat.shutouts ? element.stat.shutouts : 0, length: splits.length, type: "shutouts", }
                                    PenaltyMinutes[index] = { key: index, value: element.stat.penaltyMinutes ? element.stat.penaltyMinutes : 0, length: splits.length, type: "BpenaltyMinutesS", }
                                    PowerplayShots[index] = { key: index, value: element.stat.powerPlayShots ? element.stat.powerPlayShots : 0, length: splits.length, type: "powerPlayShots", }
                                    PowerplaySaves[index] = { key: index, value: element.stat.powerPlaySaves ? element.stat.powerPlaySaves : 0, length: splits.length, type: "powerPlaySaves", }
                                    PowerPlaySavePtage[index] = { key: index, value: element.stat.powerPlaySavePtage ? element.stat.powerPlaySavePtage : 0, length: splits.length, type: "powerPlaySavePtage", }
                                    ShortHandedShots[index] = { key: index, value: element.stat.shortHandedShots ? element.stat.shortHandedShots : 0, length: splits.length, type: "shortHandedShots", }
                                    ShortHandedSaves[index] = { key: index, value: element.stat.shortHandedSaves ? element.stat.shortHandedSaves : 0, length: splits.length, type: "shortHandedSaves", }
                                    ShortHandedSavePercentage[index] = { key: index, value: element.stat.shortHandedSavePercentage ? element.stat.shortHandedSavePercentage.toFixed(2) : 0, length: splits.length, type: "shortHandedSavePercentage", }
                                    EventStrengthShots[index] = { key: index, value: element.stat.eventStrengthShots ? element.stat.eventStrengthShots : 0, length: splits.length, type: "eventStrengthShots", }
                                    EventStrengthSaves[index] = { key: index, value: element.stat.evenSaves ? element.stat.evenSaves : 0, length: splits.length, type: "evenSaves", }
                                    EventStrengthSavePtage[index] = { key: index, value: element.stat.eventStrengthSavePtage ? element.stat.eventStrengthSavePtage : 0, length: splits.length, type: "eventStrengthSavePtage", }

                                }
                                else if (splitType == "byDayOfWeek") {

                                    var Days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
                                    seasons[index] = { key: index, value: Days[element.dayOfWeek - 1] }
                                    GP[index] = { key: index, value: element.stat.games ? element.stat.games : 0 }
                                    GS[index] = { key: index, value: element.stat.gamesStarted ? element.stat.gamesStarted : 0 }
                                    SV[index] = { key: index, value: element.stat.savePercentage ? element.stat.savePercentage : 0 }
                                    G[index] = { key: index, value: element.stat.goals ? element.stat.goals : 0 }
                                    A[index] = { key: index, value: element.stat.assists ? element.stat.assists : 0 }
                                    P[index] = { key: index, value: element.stat.points ? element.stat.points : 0 }
                                    PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : 0 }
                                    S[index] = { key: index, value: element.stat.shots ? element.stat.shots : 0 }
                                    SPtage[index] = { key: index, value: element.stat.shotPct ? this._onHandleFormat(element.stat.shotPct) : 0 }
                                    PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : 0 }
                                    Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : 0 }
                                    BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : 0 }

                                    PointsPerGame[index] = { key: index, value: element.stat.points ? (element.stat.points / element.stat.games) : 0, length: splits.length, type: "PointsPerGame", }
                                    PowerplayGoals[index] = { key: index, value: element.stat.powerPlayGoals ? element.stat.powerPlayGoals : 0, length: splits.length, type: "PowerplayGoals", }
                                    PowerplayPoints[index] = { key: index, value: element.stat.powerPlayPoints ? element.stat.powerPlayPoints : 0, length: splits.length, type: "powerPlayPoints", }
                                    ShortHandedGoals[index] = { key: index, value: element.stat.shortHandedGoals ? element.stat.shortHandedGoals : 0, length: splits.length, type: "shortHandedGoals", }
                                    ShortHandedPoints[index] = { key: index, value: element.stat.shortHandedPoints ? element.stat.shortHandedPoints : 0, length: splits.length, type: "shortHandedPoints", }
                                    GameWinningGoals[index] = { key: index, value: element.stat.gameWinningGoals ? element.stat.gameWinningGoals : 0, length: splits.length, type: "gameWinningGoals", }
                                    OvertimeGoals[index] = { key: index, value: element.stat.overTimeGoals ? element.stat.overTimeGoals : 0, length: splits.length, type: "overTimeGoals", }
                                    TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIce ? this.onHandleTimeFormat(element.stat.timeOnIce) : 0, length: splits.length, type: "timeOnIcePerGame", }
                                    ShiftsPerGame[index] = { key: index, value: element.stat.shifts ? element.stat.shifts : 0, length: splits.length, type: "shifts", }
                                    FaceoffWinPercentage[index] = { key: index, value: element.stat.faceOffPct ? this._onHandleFormat(element.stat.faceOffPct) : 0, length: splits.length, type: "faceOffPct", }
                                    PowerplayTimeOnIce[index] = { key: index, value: element.stat.powerPlayTimeOnIce ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIce) : 0, length: splits.length, type: "powerPlayTimeOnIce", }
                                    ShortHandedTimeOnIce[index] = { key: index, value: element.stat.shortHandedTimeOnIce ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIce) : 0, length: splits.length, type: "shortHandedTimeOnIce", }
                                    PowerplayTimeOnIcePerGame[index] = { key: index, value: element.stat.powerPlayTimeOnIcePerGame ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIcePerGame) : 0, length: splits.length, type: "powerPlayTimeOnIcePerGame", }
                                    ShortHandedTimeOnIcePerGame[index] = { key: index, value: element.stat.shortHandedTimeOnIcePerGame ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIcePerGame) : 0, length: splits.length, type: "shortHandedTimeOnIcePerGame", }
                                    evenTimeOnIce[index] = { key: index, value: element.stat.evenTimeOnIce ? element.stat.evenTimeOnIce : 0, length: splits.length, type: "evenTimeOnIce", }
                                    Wins[index] = { key: index, value: element.stat.wins ? element.stat.wins : 0, length: splits.length, type: "wins", }
                                    Losses[index] = { key: index, value: element.stat.losses ? element.stat.losses : 0, length: splits.length, type: "losses", }
                                    Ties[index] = { key: index, value: element.stat.ties ? element.stat.ties : 0, length: splits.length, type: "ties", }
                                    OvertimeLosses[index] = { key: index, value: element.stat.ot ? element.stat.ot : 0, length: splits.length, type: "overTimeLosses", }
                                    ShotsAgainst[index] = { key: index, value: element.stat.shotsAgainst ? element.stat.shotsAgainst : 0, length: splits.length, type: "shotsAgainst", }
                                    Saves[index] = { key: index, value: element.stat.saves ? element.stat.saves : 0, length: splits.length, type: "saves", }
                                    GoalsAgainst[index] = { key: index, value: element.stat.goalsAgainst ? element.stat.goalsAgainst : 0, length: splits.length, type: "goalsAgainst", }
                                    GoalsAgainstAverage[index] = { key: index, value: element.stat.goalAgainstAverage ? element.stat.goalAgainstAverage : 0, length: splits.length, type: "goalsAgainstAverage", }
                                    TimeOnIce[index] = { key: index, value: element.stat.timeOnIce ? this.onHandleTimeFormat(element.stat.timeOnIce) : 0, length: splits.length, type: "timeOnIce", }
                                    Shutouts[index] = { key: index, value: element.stat.shutouts ? element.stat.shutouts : 0, length: splits.length, type: "shutouts", }
                                    PenaltyMinutes[index] = { key: index, value: element.stat.penaltyMinutes ? element.stat.penaltyMinutes : 0, length: splits.length, type: "BpenaltyMinutesS", }
                                    PowerplayShots[index] = { key: index, value: element.stat.powerPlayShots ? element.stat.powerPlayShots : 0, length: splits.length, type: "powerPlayShots", }
                                    PowerplaySaves[index] = { key: index, value: element.stat.powerPlaySaves ? element.stat.powerPlaySaves : 0, length: splits.length, type: "powerPlaySaves", }
                                    PowerPlaySavePtage[index] = { key: index, value: element.stat.powerPlaySavePtage ? element.stat.powerPlaySavePtage : 0, length: splits.length, type: "powerPlaySavePtage", }
                                    ShortHandedShots[index] = { key: index, value: element.stat.shortHandedShots ? element.stat.shortHandedShots : 0, length: splits.length, type: "shortHandedShots", }
                                    ShortHandedSaves[index] = { key: index, value: element.stat.shortHandedSaves ? element.stat.shortHandedSaves : 0, length: splits.length, type: "shortHandedSaves", }
                                    ShortHandedSavePercentage[index] = { key: index, value: element.stat.shortHandedSavePercentage ? element.stat.shortHandedSavePercentage.toFixed(2) : 0, length: splits.length, type: "shortHandedSavePercentage", }
                                    EventStrengthShots[index] = { key: index, value: element.stat.eventStrengthShots ? element.stat.eventStrengthShots : 0, length: splits.length, type: "eventStrengthShots", }
                                    EventStrengthSaves[index] = { key: index, value: element.stat.evenSaves ? element.stat.evenSaves : 0, length: splits.length, type: "evenSaves", }
                                    EventStrengthSavePtage[index] = { key: index, value: element.stat.eventStrengthSavePtage ? element.stat.eventStrengthSavePtage : 0, length: splits.length, type: "eventStrengthSavePtage", }

                                }
                                else if (splitType == "homeAndAway") {

                                    seasons[index] = { key: index, value: element.isHome == true ? "HOME" : "AWAY" }
                                    GP[index] = { key: index, value: element.stat.games ? element.stat.games : 0 }
                                    GS[index] = { key: index, value: element.stat.gamesStarted ? element.stat.gamesStarted : 0 }
                                    SV[index] = { key: index, value: element.stat.savePercentage ? element.stat.savePercentage : 0 }
                                    G[index] = { key: index, value: element.stat.goals ? element.stat.goals : 0 }
                                    A[index] = { key: index, value: element.stat.assists ? element.stat.assists : 0 }
                                    P[index] = { key: index, value: element.stat.points ? element.stat.points : 0 }
                                    PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : 0 }
                                    S[index] = { key: index, value: element.stat.shots ? element.stat.shots : 0 }
                                    SPtage[index] = { key: index, value: element.stat.shotPct ? this._onHandleFormat(element.stat.shotPct) : 0 }
                                    PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : 0 }
                                    Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : 0 }
                                    BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : 0 }

                                    PointsPerGame[index] = { key: index, value: element.stat.points ? (element.stat.points / element.stat.games) : 0, length: splits.length, type: "PointsPerGame", }
                                    PowerplayGoals[index] = { key: index, value: element.stat.powerPlayGoals ? element.stat.powerPlayGoals : 0, length: splits.length, type: "PowerplayGoals", }
                                    PowerplayPoints[index] = { key: index, value: element.stat.powerPlayPoints ? element.stat.powerPlayPoints : 0, length: splits.length, type: "powerPlayPoints", }
                                    ShortHandedGoals[index] = { key: index, value: element.stat.shortHandedGoals ? element.stat.shortHandedGoals : 0, length: splits.length, type: "shortHandedGoals", }
                                    ShortHandedPoints[index] = { key: index, value: element.stat.shortHandedPoints ? element.stat.shortHandedPoints : 0, length: splits.length, type: "shortHandedPoints", }
                                    GameWinningGoals[index] = { key: index, value: element.stat.gameWinningGoals ? element.stat.gameWinningGoals : 0, length: splits.length, type: "gameWinningGoals", }
                                    OvertimeGoals[index] = { key: index, value: element.stat.overTimeGoals ? element.stat.overTimeGoals : 0, length: splits.length, type: "overTimeGoals", }
                                    TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIce ? this.onHandleTimeFormat(element.stat.timeOnIce) : 0, length: splits.length, type: "timeOnIcePerGame", }
                                    ShiftsPerGame[index] = { key: index, value: element.stat.shifts ? element.stat.shifts : 0, length: splits.length, type: "shifts", }
                                    FaceoffWinPercentage[index] = { key: index, value: element.stat.faceOffPct ? this._onHandleFormat(element.stat.faceOffPct) : 0, length: splits.length, type: "faceOffPct", }
                                    PowerplayTimeOnIce[index] = { key: index, value: element.stat.powerPlayTimeOnIce ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIce) : 0, length: splits.length, type: "powerPlayTimeOnIce", }
                                    ShortHandedTimeOnIce[index] = { key: index, value: element.stat.shortHandedTimeOnIce ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIce) : 0, length: splits.length, type: "shortHandedTimeOnIce", }
                                    PowerplayTimeOnIcePerGame[index] = { key: index, value: element.stat.powerPlayTimeOnIcePerGame ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIcePerGame) : 0, length: splits.length, type: "powerPlayTimeOnIcePerGame", }
                                    ShortHandedTimeOnIcePerGame[index] = { key: index, value: element.stat.shortHandedTimeOnIcePerGame ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIcePerGame) : 0, length: splits.length, type: "shortHandedTimeOnIcePerGame", }
                                    evenTimeOnIce[index] = { key: index, value: element.stat.evenTimeOnIce ? element.stat.evenTimeOnIce : 0, length: splits.length, type: "evenTimeOnIce", }
                                    Wins[index] = { key: index, value: element.stat.wins ? element.stat.wins : 0, length: splits.length, type: "wins", }
                                    Losses[index] = { key: index, value: element.stat.losses ? element.stat.losses : 0, length: splits.length, type: "losses", }
                                    Ties[index] = { key: index, value: element.stat.ties ? element.stat.ties : 0, length: splits.length, type: "ties", }
                                    OvertimeLosses[index] = { key: index, value: element.stat.ot ? element.stat.ot : 0, length: splits.length, type: "overTimeLosses", }
                                    ShotsAgainst[index] = { key: index, value: element.stat.shotsAgainst ? element.stat.shotsAgainst : 0, length: splits.length, type: "shotsAgainst", }
                                    Saves[index] = { key: index, value: element.stat.saves ? element.stat.saves : 0, length: splits.length, type: "saves", }
                                    GoalsAgainst[index] = { key: index, value: element.stat.goalsAgainst ? element.stat.goalsAgainst : 0, length: splits.length, type: "goalsAgainst", }
                                    GoalsAgainstAverage[index] = { key: index, value: element.stat.goalAgainstAverage ? element.stat.goalAgainstAverage : 0, length: splits.length, type: "goalsAgainstAverage", }
                                    TimeOnIce[index] = { key: index, value: element.stat.timeOnIce ? this.onHandleTimeFormat(element.stat.timeOnIce) : 0, length: splits.length, type: "timeOnIce", }
                                    Shutouts[index] = { key: index, value: element.stat.shutouts ? element.stat.shutouts : 0, length: splits.length, type: "shutouts", }
                                    PenaltyMinutes[index] = { key: index, value: element.stat.penaltyMinutes ? element.stat.penaltyMinutes : 0, length: splits.length, type: "BpenaltyMinutesS", }
                                    PowerplayShots[index] = { key: index, value: element.stat.powerPlayShots ? element.stat.powerPlayShots : 0, length: splits.length, type: "powerPlayShots", }
                                    PowerplaySaves[index] = { key: index, value: element.stat.powerPlaySaves ? element.stat.powerPlaySaves : 0, length: splits.length, type: "powerPlaySaves", }
                                    PowerPlaySavePtage[index] = { key: index, value: element.stat.powerPlaySavePtage ? element.stat.powerPlaySavePtage : 0, length: splits.length, type: "powerPlaySavePtage", }
                                    ShortHandedShots[index] = { key: index, value: element.stat.shortHandedShots ? element.stat.shortHandedShots : 0, length: splits.length, type: "shortHandedShots", }
                                    ShortHandedSaves[index] = { key: index, value: element.stat.shortHandedSaves ? element.stat.shortHandedSaves : 0, length: splits.length, type: "shortHandedSaves", }
                                    ShortHandedSavePercentage[index] = { key: index, value: element.stat.shortHandedSavePercentage ? element.stat.shortHandedSavePercentage.toFixed(2) : 0, length: splits.length, type: "shortHandedSavePercentage", }
                                    EventStrengthShots[index] = { key: index, value: element.stat.eventStrengthShots ? element.stat.eventStrengthShots : 0, length: splits.length, type: "eventStrengthShots", }
                                    EventStrengthSaves[index] = { key: index, value: element.stat.evenSaves ? element.stat.evenSaves : 0, length: splits.length, type: "evenSaves", }
                                    EventStrengthSavePtage[index] = { key: index, value: element.stat.eventStrengthSavePtage ? element.stat.eventStrengthSavePtage : 0, length: splits.length, type: "eventStrengthSavePtage", }

                                }
                                else if (splitType == "onPaceRegularSeason") {
                                    ;
                                    seasons[index] = { key: index, value: "PRS" }
                                    GP[index] = { key: index, value: element.stat.games ? element.stat.games : 0 }
                                    GS[index] = { key: index, value: element.stat.gamesStarted ? element.stat.gamesStarted : 0 }
                                    SV[index] = { key: index, value: element.stat.savePercentage ? element.stat.savePercentage : 0 }
                                    G[index] = { key: index, value: element.stat.goals ? element.stat.goals : 0 }
                                    A[index] = { key: index, value: element.stat.assists ? element.stat.assists : 0 }
                                    P[index] = { key: index, value: element.stat.points ? element.stat.points : 0 }
                                    PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : 0 }
                                    S[index] = { key: index, value: element.stat.shots ? element.stat.shots : 0 }
                                    SPtage[index] = { key: index, value: element.stat.shotPct ? element.stat.shotPct : 0 }
                                    PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : 0 }
                                    Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : 0 }
                                    BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : 0 }

                                    PointsPerGame[index] = { key: index, value: element.stat.points ? (element.stat.points / element.stat.games) : 0, length: splits.length, type: "PointsPerGame", }
                                    PowerplayGoals[index] = { key: index, value: element.stat.powerPlayGoals ? element.stat.powerPlayGoals : 0, length: splits.length, type: "PowerplayGoals", }
                                    PowerplayPoints[index] = { key: index, value: element.stat.powerPlayPoints ? element.stat.powerPlayPoints : 0, length: splits.length, type: "powerPlayPoints", }
                                    ShortHandedGoals[index] = { key: index, value: element.stat.shortHandedGoals ? element.stat.shortHandedGoals : 0, length: splits.length, type: "shortHandedGoals", }
                                    ShortHandedPoints[index] = { key: index, value: element.stat.shortHandedPoints ? element.stat.shortHandedPoints : 0, length: splits.length, type: "shortHandedPoints", }
                                    GameWinningGoals[index] = { key: index, value: element.stat.gameWinningGoals ? element.stat.gameWinningGoals : 0, length: splits.length, type: "gameWinningGoals", }
                                    OvertimeGoals[index] = { key: index, value: element.stat.overTimeGoals ? element.stat.overTimeGoals : 0, length: splits.length, type: "overTimeGoals", }
                                    TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIce ? this.onHandleTimeFormat(element.stat.timeOnIcePerGame) : 0, length: splits.length, type: "timeOnIcePerGame", }
                                    ShiftsPerGame[index] = { key: index, value: element.stat.shifts ? element.stat.shifts : 0, length: splits.length, type: "shifts", }
                                    FaceoffWinPercentage[index] = { key: index, value: element.stat.faceOffPct ? element.stat.faceOffPct : 0, length: splits.length, type: "faceOffPct", }
                                    PowerplayTimeOnIce[index] = { key: index, value: element.stat.powerPlayTimeOnIce ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIce) : 0, length: splits.length, type: "powerPlayTimeOnIce", }
                                    ShortHandedTimeOnIce[index] = { key: index, value: element.stat.shortHandedTimeOnIce ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIce) : 0, length: splits.length, type: "shortHandedTimeOnIce", }
                                    PowerplayTimeOnIcePerGame[index] = { key: index, value: element.stat.powerPlayTimeOnIcePerGame ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIcePerGame) : 0, length: splits.length, type: "powerPlayTimeOnIcePerGame", }
                                    ShortHandedTimeOnIcePerGame[index] = { key: index, value: element.stat.shortHandedTimeOnIcePerGame ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIcePerGame) : 0, length: splits.length, type: "shortHandedTimeOnIcePerGame", }
                                    evenTimeOnIce[index] = { key: index, value: element.stat.evenTimeOnIce ? element.stat.evenTimeOnIce : 0, length: splits.length, type: "evenTimeOnIce", }
                                    Wins[index] = { key: index, value: element.stat.wins ? element.stat.wins : 0, length: splits.length, type: "wins", }
                                    Losses[index] = { key: index, value: element.stat.losses ? element.stat.losses : 0, length: splits.length, type: "losses", }
                                    Ties[index] = { key: index, value: element.stat.ties ? element.stat.ties : 0, length: splits.length, type: "ties", }
                                    OvertimeLosses[index] = { key: index, value: element.stat.ot ? element.stat.ot : 0, length: splits.length, type: "overTimeLosses", }
                                    ShotsAgainst[index] = { key: index, value: element.stat.shotsAgainst ? element.stat.shotsAgainst : 0, length: splits.length, type: "shotsAgainst", }
                                    Saves[index] = { key: index, value: element.stat.saves ? element.stat.saves : 0, length: splits.length, type: "saves", }
                                    GoalsAgainst[index] = { key: index, value: element.stat.goalsAgainst ? element.stat.goalsAgainst : 0, length: splits.length, type: "goalsAgainst", }
                                    GoalsAgainstAverage[index] = { key: index, value: element.stat.goalAgainstAverage ? element.stat.goalAgainstAverage : 0, length: splits.length, type: "goalsAgainstAverage", }
                                    TimeOnIce[index] = { key: index, value: element.stat.timeOnIce ? this.onHandleTimeFormat(element.stat.timeOnIce) : 0, length: splits.length, type: "timeOnIce", }
                                    Shutouts[index] = { key: index, value: element.stat.shutouts ? element.stat.shutouts : 0, length: splits.length, type: "shutouts", }
                                    PenaltyMinutes[index] = { key: index, value: element.stat.penaltyMinutes ? element.stat.penaltyMinutes : 0, length: splits.length, type: "BpenaltyMinutesS", }
                                    PowerplayShots[index] = { key: index, value: element.stat.powerPlayShots ? element.stat.powerPlayShots : 0, length: splits.length, type: "powerPlayShots", }
                                    PowerplaySaves[index] = { key: index, value: element.stat.powerPlaySaves ? element.stat.powerPlaySaves : 0, length: splits.length, type: "powerPlaySaves", }
                                    PowerPlaySavePtage[index] = { key: index, value: element.stat.powerPlaySavePtage ? element.stat.powerPlaySavePtage : 0, length: splits.length, type: "powerPlaySavePtage", }
                                    ShortHandedShots[index] = { key: index, value: element.stat.shortHandedShots ? element.stat.shortHandedShots : 0, length: splits.length, type: "shortHandedShots", }
                                    ShortHandedSaves[index] = { key: index, value: element.stat.shortHandedSaves ? element.stat.shortHandedSaves : 0, length: splits.length, type: "shortHandedSaves", }
                                    ShortHandedSavePercentage[index] = { key: index, value: element.stat.shortHandedSavePercentage ? element.stat.shortHandedSavePercentage.toFixed(2) : 0, length: splits.length, type: "shortHandedSavePercentage", }
                                    EventStrengthShots[index] = { key: index, value: element.stat.eventStrengthShots ? element.stat.eventStrengthShots : 0, length: splits.length, type: "eventStrengthShots", }
                                    EventStrengthSaves[index] = { key: index, value: element.stat.evenSaves ? element.stat.evenSaves : 0, length: splits.length, type: "evenSaves", }
                                    EventStrengthSavePtage[index] = { key: index, value: element.stat.eventStrengthSavePtage ? element.stat.eventStrengthSavePtage : 0, length: splits.length, type: "eventStrengthSavePtage", }

                                }
                                else if (splitType == "yearByYearRank") {

                                    seasons[index] = { key: index, value: element.season.substring(0, 4) + "-" + element.season.substring(4, 8) }
                                    GP[index] = { key: index, value: element.stat.rankGamesPlayed ? element.stat.rankGamesPlayed.substring(0, 3) : 0 }
                                    GS[index] = { key: index, value: element.stat.gamesStarted ? element.stat.gamesStarted : 0 }
                                    SV[index] = { key: index, value: element.stat.savePercentage ? element.stat.savePercentage : 0 }
                                    G[index] = { key: index, value: element.stat.rankGoals ? element.stat.rankGoals.substring(0, 3) : 0 }
                                    A[index] = { key: index, value: element.stat.rankAssists ? element.stat.rankAssists.substring(0, 3) : 0 }
                                    P[index] = { key: index, value: element.stat.rankPoints ? element.stat.rankPoints.substring(0, 3) : 0 }
                                    PlusMinus[index] = { key: index, value: element.stat.rankPlusMinus ? element.stat.rankPlusMinus.substring(0, 3) : 0 }
                                    S[index] = { key: index, value: element.stat.rankShots ? element.stat.rankShots.substring(0, 3) : 0 }
                                    SPtage[index] = { key: index, value: element.stat.rankShotPct ? element.stat.rankShotPct.substring(0, 3) : 0 }
                                    PIM[index] = { key: index, value: element.stat.rankPim ? element.stat.rankPim.substring(0, 3) : 0 }
                                    Hits[index] = { key: index, value: element.stat.rankHits ? element.stat.rankHits.substring(0, 3) : 0 }
                                    BS[index] = { key: index, value: element.stat.rankBlockedShots ? element.stat.rankBlockedShots.substring(0, 3) : 0 }

                                    PointsPerGame[index] = { key: index, value: element.stat.points ? (element.stat.points / element.stat.games) : 0, length: splits.length, type: "PointsPerGame", }
                                    PowerplayGoals[index] = { key: index, value: element.stat.powerPlayGoals ? element.stat.powerPlayGoals : 0, length: splits.length, type: "PowerplayGoals", }
                                    PowerplayPoints[index] = { key: index, value: element.stat.powerPlayPoints ? element.stat.powerPlayPoints : 0, length: splits.length, type: "powerPlayPoints", }
                                    ShortHandedGoals[index] = { key: index, value: element.stat.shortHandedGoals ? element.stat.shortHandedGoals : 0, length: splits.length, type: "shortHandedGoals", }
                                    ShortHandedPoints[index] = { key: index, value: element.stat.shortHandedPoints ? element.stat.shortHandedPoints : 0, length: splits.length, type: "shortHandedPoints", }
                                    GameWinningGoals[index] = { key: index, value: element.stat.gameWinningGoals ? element.stat.gameWinningGoals : 0, length: splits.length, type: "gameWinningGoals", }
                                    OvertimeGoals[index] = { key: index, value: element.stat.overTimeGoals ? element.stat.overTimeGoals : 0, length: splits.length, type: "overTimeGoals", }
                                    TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIce ? this.onHandleTimeFormat(element.stat.timeOnIcePerGame) : 0, length: splits.length, type: "timeOnIcePerGame", }
                                    ShiftsPerGame[index] = { key: index, value: element.stat.shifts ? element.stat.shifts : 0, length: splits.length, type: "shifts", }
                                    FaceoffWinPercentage[index] = { key: index, value: element.stat.faceOffPct ? this._onHandleFormat(element.stat.faceOffPct) : 0, length: splits.length, type: "faceOffPct", }
                                    PowerplayTimeOnIce[index] = { key: index, value: element.stat.powerPlayTimeOnIce ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIce) : 0, length: splits.length, type: "powerPlayTimeOnIce", }
                                    ShortHandedTimeOnIce[index] = { key: index, value: element.stat.shortHandedTimeOnIce ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIce) : 0, length: splits.length, type: "shortHandedTimeOnIce", }
                                    PowerplayTimeOnIcePerGame[index] = { key: index, value: element.stat.powerPlayTimeOnIcePerGame ? this.onHandleTimeFormat(element.stat.powerPlayTimeOnIcePerGame) : 0, length: splits.length, type: "powerPlayTimeOnIcePerGame", }
                                    ShortHandedTimeOnIcePerGame[index] = { key: index, value: element.stat.shortHandedTimeOnIcePerGame ? this.onHandleTimeFormat(element.stat.shortHandedTimeOnIcePerGame) : 0, length: splits.length, type: "shortHandedTimeOnIcePerGame", }
                                    evenTimeOnIce[index] = { key: index, value: element.stat.evenTimeOnIce ? element.stat.evenTimeOnIce : 0, length: splits.length, type: "evenTimeOnIce", }
                                    Wins[index] = { key: index, value: element.stat.wins ? element.stat.wins : 0, length: splits.length, type: "wins", }
                                    Losses[index] = { key: index, value: element.stat.losses ? element.stat.losses : 0, length: splits.length, type: "losses", }
                                    Ties[index] = { key: index, value: element.stat.ties ? element.stat.ties : 0, length: splits.length, type: "ties", }
                                    OvertimeLosses[index] = { key: index, value: element.stat.ot ? element.stat.ot : 0, length: splits.length, type: "overTimeLosses", }
                                    ShotsAgainst[index] = { key: index, value: element.stat.shotsAgainst ? element.stat.shotsAgainst : 0, length: splits.length, type: "shotsAgainst", }
                                    Saves[index] = { key: index, value: element.stat.saves ? element.stat.saves : 0, length: splits.length, type: "saves", }
                                    GoalsAgainst[index] = { key: index, value: element.stat.goalsAgainst ? element.stat.goalsAgainst : 0, length: splits.length, type: "goalsAgainst", }
                                    GoalsAgainstAverage[index] = { key: index, value: element.stat.goalAgainstAverage ? element.stat.goalAgainstAverage : 0, length: splits.length, type: "goalsAgainstAverage", }
                                    TimeOnIce[index] = { key: index, value: element.stat.timeOnIce ? this.onHandleTimeFormat(element.stat.timeOnIce) : 0, length: splits.length, type: "timeOnIce", }
                                    Shutouts[index] = { key: index, value: element.stat.shutouts ? element.stat.shutouts : 0, length: splits.length, type: "shutouts", }
                                    PenaltyMinutes[index] = { key: index, value: element.stat.penaltyMinutes ? element.stat.penaltyMinutes : 0, length: splits.length, type: "BpenaltyMinutesS", }
                                    PowerplayShots[index] = { key: index, value: element.stat.powerPlayShots ? element.stat.powerPlayShots : 0, length: splits.length, type: "powerPlayShots", }
                                    PowerplaySaves[index] = { key: index, value: element.stat.powerPlaySaves ? element.stat.powerPlaySaves : 0, length: splits.length, type: "powerPlaySaves", }
                                    PowerPlaySavePtage[index] = { key: index, value: element.stat.powerPlaySavePtage ? element.stat.powerPlaySavePtage : 0, length: splits.length, type: "powerPlaySavePtage", }
                                    ShortHandedShots[index] = { key: index, value: element.stat.shortHandedShots ? element.stat.shortHandedShots : 0, length: splits.length, type: "shortHandedShots", }
                                    ShortHandedSaves[index] = { key: index, value: element.stat.shortHandedSaves ? element.stat.shortHandedSaves : 0, length: splits.length, type: "shortHandedSaves", }
                                    ShortHandedSavePercentage[index] = { key: index, value: element.stat.shortHandedSavePercentage ? element.stat.shortHandedSavePercentage.toFixed(2) : 0, length: splits.length, type: "shortHandedSavePercentage", }
                                    EventStrengthShots[index] = { key: index, value: element.stat.eventStrengthShots ? element.stat.eventStrengthShots : 0, length: splits.length, type: "eventStrengthShots", }
                                    EventStrengthSaves[index] = { key: index, value: element.stat.evenSaves ? element.stat.evenSaves : 0, length: splits.length, type: "evenSaves", }
                                    EventStrengthSavePtage[index] = { key: index, value: element.stat.eventStrengthSavePtage ? element.stat.eventStrengthSavePtage.toFixed(2) : 0, length: splits.length, type: "eventStrengthSavePtage", }

                                }
                                // else if(splitType="careerRegularSeason" && year !="Career"){
                                //
                                //     seasons[index] = { key: index, value: element.season.substring(0, 4) + "-" + element.season.substring(4, 8) }
                                //     GP[index] = { key: index, value: element.stat.games ? element.stat.games : 0 }
                                //     G[index] = { key: index, value: element.stat.goals ? element.stat.goals : 0 }
                                //     A[index] = { key: index, value: element.stat.assists ? element.stat.assists : 0 }
                                //     P[index] = { key: index, value: element.stat.points ? element.stat.points : 0 }
                                //     PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : 0 }
                                //     S[index] = { key: index, value: element.stat.shots ? element.stat.shots : 0 }
                                //     SPtage[index] = { key: index, value: element.stat.shotPct ? element.stat.shotPct.toFixed(2) : 0 }
                                //     PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : 0 }
                                //     Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : 0 }
                                //     BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : 0 }

                                //     PointsPerGame[index] = { key: index, value: element.stat.points ? (element.stat.points / element.stat.games) : 0, length: splits.length, type: "PointsPerGame", }
                                //     PowerplayGoals[index] = { key: index, value: element.stat.powerPlayGoals ? element.stat.powerPlayGoals : 0, length: splits.length, type: "PowerplayGoals", }
                                //     PowerplayPoints[index] = { key: index, value: element.stat.powerPlayPoints ? element.stat.powerPlayPoints : 0, length: splits.length, type: "powerPlayPoints", }
                                //     ShortHandedGoals[index] = { key: index, value: element.stat.shortHandedGoals ? element.stat.shortHandedGoals : 0, length: splits.length, type: "shortHandedGoals", }
                                //     ShortHandedPoints[index] = { key: index, value: element.stat.shortHandedPoints ? element.stat.shortHandedPoints : 0, length: splits.length, type: "shortHandedPoints", }
                                //     GameWinningGoals[index] = { key: index, value: element.stat.gameWinningGoals ? element.stat.gameWinningGoals : 0, length: splits.length, type: "gameWinningGoals", }
                                //     OvertimeGoals[index] = { key: index, value: element.stat.overTimeGoals ? element.stat.overTimeGoals : 0, length: splits.length, type: "overTimeGoals", }
                                //     //  TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIcePerGame ? element.stat.timeOnIcePerGame : 0, length: splits.length, type: "timeOnIcePerGame",  }
                                //     TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIce ? element.stat.timeOnIce : 0, length: splits.length, type: "timeOnIcePerGame", }

                                //     ShiftsPerGame[index] = { key: index, value: element.stat.shifts ? element.stat.shifts : 0, length: splits.length, type: "shifts", }
                                //     FaceoffWinPercentage[index] = { key: index, value: element.stat.faceOffPct ? element.stat.faceOffPct : 0, length: splits.length, type: "faceOffPct", }
                                //     PowerplayTimeOnIce[index] = { key: index, value: element.stat.powerPlayTimeOnIce ? element.stat.powerPlayTimeOnIce : 0, length: splits.length, type: "powerPlayTimeOnIce", }
                                //     ShortHandedTimeOnIce[index] = { key: index, value: element.stat.shortHandedTimeOnIce ? element.stat.shortHandedTimeOnIce : 0, length: splits.length, type: "shortHandedTimeOnIce", }
                                //     PowerplayTimeOnIcePerGame[index] = { key: index, value: element.stat.powerPlayTimeOnIcePerGame ? element.stat.powerPlayTimeOnIcePerGame : 0, length: splits.length, type: "powerPlayTimeOnIcePerGame", }
                                //     ShortHandedTimeOnIcePerGame[index] = { key: index, value: element.stat.shortHandedTimeOnIcePerGame ? element.stat.shortHandedTimeOnIcePerGame : 0, length: splits.length, type: "shortHandedTimeOnIcePerGame", }
                                //     evenTimeOnIce[index] = { key: index, value: element.stat.evenTimeOnIce ? element.stat.evenTimeOnIce : 0, length: splits.length, type: "evenTimeOnIce", }
                                //     Wins[index] = { key: index, value: element.stat.wins ? element.stat.wins : 0, length: splits.length, type: "wins", }
                                //     Losses[index] = { key: index, value: element.stat.losses ? element.stat.losses : 0, length: splits.length, type: "losses", }
                                //     Ties[index] = { key: index, value: element.stat.ties ? element.stat.ties : 0, length: splits.length, type: "ties", }
                                //     OvertimeLosses[index] = { key: index, value: element.stat.ot ? element.stat.ot : 0, length: splits.length, type: "overTimeLosses", }
                                //     ShotsAgainst[index] = { key: index, value: element.stat.shotsAgainst ? element.stat.shotsAgainst : 0, length: splits.length, type: "shotsAgainst", }
                                //     Saves[index] = { key: index, value: element.stat.saves ? element.stat.saves : 0, length: splits.length, type: "saves", }
                                //     GoalsAgainst[index] = { key: index, value: element.stat.goalsAgainst ? element.stat.goalsAgainst : 0, length: splits.length, type: "goalsAgainst", }
                                //     GoalsAgainstAverage[index] = { key: index, value: element.stat.goalsAgainstAverage ? element.stat.goalsAgainstAverage : 0, length: splits.length, type: "goalsAgainstAverage", }
                                //     TimeOnIce[index] = { key: index, value: element.stat.timeOnIce ? element.stat.timeOnIce : 0, length: splits.length, type: "timeOnIce", }
                                //     Shutouts[index] = { key: index, value: element.stat.shutouts ? element.stat.shutouts : 0, length: splits.length, type: "shutouts", }
                                //     PenaltyMinutes[index] = { key: index, value: element.stat.penaltyMinutes ? element.stat.penaltyMinutes : 0, length: splits.length, type: "BpenaltyMinutesS", }
                                //     PowerplayShots[index] = { key: index, value: element.stat.powerPlayShots ? element.stat.powerPlayShots : 0, length: splits.length, type: "powerPlayShots", }
                                //     PowerplaySaves[index] = { key: index, value: element.stat.powerPlaySaves ? element.stat.powerPlaySaves : 0, length: splits.length, type: "powerPlaySaves", }
                                //     PowerPlaySavePtage[index] = { key: index, value: element.stat.powerPlaySavePtage ? element.stat.powerPlaySavePtage : 0, length: splits.length, type: "powerPlaySavePtage", }
                                //     ShortHandedShots[index] = { key: index, value: element.stat.shortHandedShots ? element.stat.shortHandedShots : 0, length: splits.length, type: "shortHandedShots", }
                                //     ShortHandedSaves[index] = { key: index, value: element.stat.shortHandedSaves ? element.stat.shortHandedSaves : 0, length: splits.length, type: "shortHandedSaves", }
                                //     ShortHandedSavePercentage[index] = { key: index, value: element.stat.shortHandedSavePercentage ? element.stat.shortHandedSavePercentage.toFixed(2) : 0, length: splits.length, type: "shortHandedSavePercentage", }
                                //     EventStrengthShots[index] = { key: index, value: element.stat.eventStrengthShots ? element.stat.eventStrengthShots : 0, length: splits.length, type: "eventStrengthShots", }
                                //     EventStrengthSaves[index] = { key: index, value: element.stat.evenSaves ? element.stat.evenSaves : 0, length: splits.length, type: "evenSaves", }
                                //     EventStrengthSavePtage[index] = { key: index, value: element.stat.eventStrengthSavePtage ? element.stat.eventStrengthSavePtage : 0, length: splits.length, type: "eventStrengthSavePtage", }

                                // }else if(year="Career"){
                                //

                                //     seasons[index] = { key: index, value: year.toUpperCase() }
                                //     GP[index] = { key: index, value: element.stat.games ? element.stat.games : 0 }
                                //     G[index] = { key: index, value: element.stat.goals ? element.stat.goals : 0 }
                                //     A[index] = { key: index, value: element.stat.assists ? element.stat.assists : 0 }
                                //     P[index] = { key: index, value: element.stat.points ? element.stat.points : 0 }
                                //     PlusMinus[index] = { key: index, value: element.stat.plusMinus ? element.stat.plusMinus : 0 }
                                //     S[index] = { key: index, value: element.stat.shots ? element.stat.shots : 0 }
                                //     SPtage[index] = { key: index, value: element.stat.shotPct ? element.stat.shotPct.toFixed(2) : 0 }
                                //     PIM[index] = { key: index, value: element.stat.pim ? element.stat.pim : 0 }
                                //     Hits[index] = { key: index, value: element.stat.hits ? element.stat.hits : 0 }
                                //     BS[index] = { key: index, value: element.stat.blocked ? element.stat.blocked : 0 }

                                //     PointsPerGame[index] = { key: index, value: element.stat.points ? (element.stat.points / element.stat.games) : 0, length: splits.length, type: "PointsPerGame", }
                                //     PowerplayGoals[index] = { key: index, value: element.stat.powerPlayGoals ? element.stat.powerPlayGoals : 0, length: splits.length, type: "PowerplayGoals", }
                                //     PowerplayPoints[index] = { key: index, value: element.stat.powerPlayPoints ? element.stat.powerPlayPoints : 0, length: splits.length, type: "powerPlayPoints", }
                                //     ShortHandedGoals[index] = { key: index, value: element.stat.shortHandedGoals ? element.stat.shortHandedGoals : 0, length: splits.length, type: "shortHandedGoals", }
                                //     ShortHandedPoints[index] = { key: index, value: element.stat.shortHandedPoints ? element.stat.shortHandedPoints : 0, length: splits.length, type: "shortHandedPoints", }
                                //     GameWinningGoals[index] = { key: index, value: element.stat.gameWinningGoals ? element.stat.gameWinningGoals : 0, length: splits.length, type: "gameWinningGoals", }
                                //     OvertimeGoals[index] = { key: index, value: element.stat.overTimeGoals ? element.stat.overTimeGoals : 0, length: splits.length, type: "overTimeGoals", }
                                //     //  TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIcePerGame ? element.stat.timeOnIcePerGame : 0, length: splits.length, type: "timeOnIcePerGame",  }
                                //     TimeOnIcePerGame[index] = { key: index, value: element.stat.timeOnIce ? element.stat.timeOnIce : 0, length: splits.length, type: "timeOnIcePerGame", }

                                //     ShiftsPerGame[index] = { key: index, value: element.stat.shifts ? element.stat.shifts : 0, length: splits.length, type: "shifts", }
                                //     FaceoffWinPercentage[index] = { key: index, value: element.stat.faceOffPct ? element.stat.faceOffPct : 0, length: splits.length, type: "faceOffPct", }
                                //     PowerplayTimeOnIce[index] = { key: index, value: element.stat.powerPlayTimeOnIce ? element.stat.powerPlayTimeOnIce : 0, length: splits.length, type: "powerPlayTimeOnIce", }
                                //     ShortHandedTimeOnIce[index] = { key: index, value: element.stat.shortHandedTimeOnIce ? element.stat.shortHandedTimeOnIce : 0, length: splits.length, type: "shortHandedTimeOnIce", }
                                //     PowerplayTimeOnIcePerGame[index] = { key: index, value: element.stat.powerPlayTimeOnIcePerGame ? element.stat.powerPlayTimeOnIcePerGame : 0, length: splits.length, type: "powerPlayTimeOnIcePerGame", }
                                //     ShortHandedTimeOnIcePerGame[index] = { key: index, value: element.stat.shortHandedTimeOnIcePerGame ? element.stat.shortHandedTimeOnIcePerGame : 0, length: splits.length, type: "shortHandedTimeOnIcePerGame", }
                                //     evenTimeOnIce[index] = { key: index, value: element.stat.evenTimeOnIce ? element.stat.evenTimeOnIce : 0, length: splits.length, type: "evenTimeOnIce", }
                                //     Wins[index] = { key: index, value: element.stat.wins ? element.stat.wins : 0, length: splits.length, type: "wins", }
                                //     Losses[index] = { key: index, value: element.stat.losses ? element.stat.losses : 0, length: splits.length, type: "losses", }
                                //     Ties[index] = { key: index, value: element.stat.ties ? element.stat.ties : 0, length: splits.length, type: "ties", }
                                //     OvertimeLosses[index] = { key: index, value: element.stat.ot ? element.stat.ot : 0, length: splits.length, type: "overTimeLosses", }
                                //     ShotsAgainst[index] = { key: index, value: element.stat.shotsAgainst ? element.stat.shotsAgainst : 0, length: splits.length, type: "shotsAgainst", }
                                //     Saves[index] = { key: index, value: element.stat.saves ? element.stat.saves : 0, length: splits.length, type: "saves", }
                                //     GoalsAgainst[index] = { key: index, value: element.stat.goalsAgainst ? element.stat.goalsAgainst : 0, length: splits.length, type: "goalsAgainst", }
                                //     GoalsAgainstAverage[index] = { key: index, value: element.stat.goalsAgainstAverage ? element.stat.goalsAgainstAverage : 0, length: splits.length, type: "goalsAgainstAverage", }
                                //     TimeOnIce[index] = { key: index, value: element.stat.timeOnIce ? element.stat.timeOnIce : 0, length: splits.length, type: "timeOnIce", }
                                //     Shutouts[index] = { key: index, value: element.stat.shutouts ? element.stat.shutouts : 0, length: splits.length, type: "shutouts", }
                                //     PenaltyMinutes[index] = { key: index, value: element.stat.penaltyMinutes ? element.stat.penaltyMinutes : 0, length: splits.length, type: "BpenaltyMinutesS", }
                                //     PowerplayShots[index] = { key: index, value: element.stat.powerPlayShots ? element.stat.powerPlayShots : 0, length: splits.length, type: "powerPlayShots", }
                                //     PowerplaySaves[index] = { key: index, value: element.stat.powerPlaySaves ? element.stat.powerPlaySaves : 0, length: splits.length, type: "powerPlaySaves", }
                                //     PowerPlaySavePtage[index] = { key: index, value: element.stat.powerPlaySavePtage ? element.stat.powerPlaySavePtage : 0, length: splits.length, type: "powerPlaySavePtage", }
                                //     ShortHandedShots[index] = { key: index, value: element.stat.shortHandedShots ? element.stat.shortHandedShots : 0, length: splits.length, type: "shortHandedShots", }
                                //     ShortHandedSaves[index] = { key: index, value: element.stat.shortHandedSaves ? element.stat.shortHandedSaves : 0, length: splits.length, type: "shortHandedSaves", }
                                //     ShortHandedSavePercentage[index] = { key: index, value: element.stat.shortHandedSavePercentage ? element.stat.shortHandedSavePercentage.toFixed(2) : 0, length: splits.length, type: "shortHandedSavePercentage", }
                                //     EventStrengthShots[index] = { key: index, value: element.stat.eventStrengthShots ? element.stat.eventStrengthShots : 0, length: splits.length, type: "eventStrengthShots", }
                                //     EventStrengthSaves[index] = { key: index, value: element.stat.evenSaves ? element.stat.evenSaves : 0, length: splits.length, type: "evenSaves", }
                                //     EventStrengthSavePtage[index] = { key: index, value: element.stat.eventStrengthSavePtage ? element.stat.eventStrengthSavePtage : 0, length: splits.length, type: "eventStrengthSavePtage", }

                                // }




                                var ADVData = {
                                    seasons, GP, GS, SV, G, A, P, PlusMinus, S, SPtage, PIM, Hits, BS,
                                    PointsPerGame,
                                    PowerplayGoals,
                                    PowerplayPoints,
                                    ShortHandedGoals,
                                    ShortHandedPoints,
                                    GameWinningGoals,
                                    OvertimeGoals,
                                    TimeOnIcePerGame,
                                    ShiftsPerGame,
                                    FaceoffWinPercentage,
                                    PowerplayTimeOnIce,
                                    ShortHandedTimeOnIce,
                                    PowerplayTimeOnIcePerGame,
                                    ShortHandedTimeOnIcePerGame,
                                    evenTimeOnIce,
                                    Wins,
                                    Losses,
                                    Ties,
                                    OvertimeLosses,
                                    ShotsAgainst,
                                    Saves,
                                    GoalsAgainst,
                                    GoalsAgainstAverage,
                                    TimeOnIce,
                                    Shutouts,
                                    PenaltyMinutes,
                                    PowerplayShots,
                                    PowerplaySaves,
                                    PowerPlaySavePtage,
                                    ShortHandedShots,
                                    ShortHandedSaves,
                                    ShortHandedSavePercentage,
                                    EventStrengthShots,
                                    EventStrengthSaves,
                                    EventStrengthSavePtage,
                                };


                                if (splitType == "vsTeam") {
                                    vsTeam = ADVData

                                }
                                else if (splitType == "vsDivision") {
                                    vsDivision = ADVData

                                }
                                else if (splitType == "vsConference") {
                                    vsConference = ADVData

                                }
                                else if (splitType == "byMonth") {
                                    byMonth = ADVData

                                }
                                else if (splitType == "byDayOfWeek") {
                                    byDayOfWeek = ADVData

                                }
                                else if (splitType == "homeAndAway") {
                                    homeAndAway = ADVData

                                }
                                else if (splitType == "onPaceRegularSeason") {
                                    onPaceRegularSeason = ADVData

                                }
                                else if (splitType == "yearByYearRank") {
                                    yearByYearRank = ADVData

                                }
                                // else if (splitType="careerRegularSeason"){
                                //     careerRegularSeasons=ADVData
                                // }
                                // else if(year=="Career"){
                                //     careerRegularSeason = ADVData
                                // }


                            });
                        }
                    });


                }


                var final_arr2 = [];
                if (vsTeam)
                    final_arr2.push({ stat: vsTeam });
                if (vsDivision)
                    final_arr2.push({ stat: vsDivision });
                if (vsConference)
                    final_arr2.push({ stat: vsConference });
                if (byMonth)
                    final_arr2.push({ stat: byMonth });
                if (byDayOfWeek)
                    final_arr2.push({ stat: byDayOfWeek });
                if (homeAndAway)
                    final_arr2.push({ stat: homeAndAway });
                if (onPaceRegularSeason)
                    final_arr2.push({ stat: onPaceRegularSeason });
                if (yearByYearRank)
                    final_arr2.push({ stat: yearByYearRank });
                // if (careerRegularSeasons)
                //      final_arr2.push({ stat: careerRegularSeasons });
                // if (careerRegularSeason && year == "Career")
                //     final_arr2.push({ stat: careerRegularSeason });



                var temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.seasons)
                }
                var seasons = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.GP)
                }
                var GP = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.G)
                }

                var G = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.A)
                }
                var A = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.P)
                }
                var P = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.PlusMinus)
                }
                var PlusMinus = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.S)
                }
                var S = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.SPtage)
                }
                var SPtage = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.PIM)
                }
                var PIM = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.Hits)
                }
                var Hits = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.BS)
                }
                var BS = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.leagues)
                }
                var leagues = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.PointsPerGame)
                }
                var PointsPerGame = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.PowerplayGoals)
                }
                var PowerplayGoals = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.PowerplayPoints)
                }
                var PowerplayPoints = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.ShortHandedGoals)
                }
                var ShortHandedGoals = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.ShortHandedPoints)
                }
                var ShortHandedPoints = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.GameWinningGoals)
                }
                var GameWinningGoals = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.OvertimeGoals)
                }
                var OvertimeGoals = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.TimeOnIcePerGame)
                }
                var TimeOnIcePerGame = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.ShiftsPerGame)
                }
                var ShiftsPerGame = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.FaceoffWinPercentage)
                }
                var FaceoffWinPercentage = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.PowerplayTimeOnIce)
                }
                var PowerplayTimeOnIce = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.ShortHandedTimeOnIce)
                }
                var ShortHandedTimeOnIce = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.PowerplayTimeOnIcePerGame)
                }
                var PowerplayTimeOnIcePerGame = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.ShortHandedTimeOnIcePerGame)
                }
                var ShortHandedTimeOnIcePerGame = [].concat.apply([], temp_arr);
                // evenTimeOnIce=  [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.Wins)
                }
                var Wins = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.Losses)
                }
                var Losses = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.Ties)
                }
                var Ties = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.OvertimeLosses)
                }
                var OvertimeLosses = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.ShotsAgainst)
                }
                var ShotsAgainst = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.Saves)
                }
                var Saves = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.GoalsAgainst)
                }
                var GoalsAgainst = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.GoalsAgainstAverage)
                }
                var GoalsAgainstAverage = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.TimeOnIce)
                }
                var TimeOnIce = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.Shutouts)
                }
                var Shutouts = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.PenaltyMinutes)
                }
                var PenaltyMinutes = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.PowerplayShots)
                }
                var PowerplayShots = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.PowerplaySaves)
                }
                var PowerplaySaves = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.PowerPlaySavePtage)
                }
                var PowerPlaySavePtage = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.ShortHandedShots)
                }
                var ShortHandedShots = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.ShortHandedSaves)
                }
                var ShortHandedSaves = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.ShortHandedSavePercentage)
                }
                var ShortHandedSavePercentage = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.EventStrengthShots)
                }
                var EventStrengthShots = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.EventStrengthSaves)
                }
                var EventStrengthSaves = [].concat.apply([], temp_arr);
                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.EventStrengthSavePtage)
                }
                var EventStrengthSavePtage = [].concat.apply([], temp_arr);

                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.GS)
                }
                var GS = [].concat.apply([], temp_arr);

                temp_arr = [];
                for (var i = 0; i < final_arr2.length; i++) {
                    temp_arr.push(final_arr2[i].stat.SV)
                }
                var SV = [].concat.apply([], temp_arr);


                var data_final = {
                    seasons, GP, GS, SV, G, A, P, PlusMinus, S, SPtage, PIM, Hits, BS,
                    PointsPerGame,
                    PowerplayGoals,
                    PowerplayPoints,
                    ShortHandedGoals,
                    ShortHandedPoints,
                    GameWinningGoals,
                    OvertimeGoals,
                    TimeOnIcePerGame,
                    ShiftsPerGame,
                    FaceoffWinPercentage,
                    PowerplayTimeOnIce,
                    ShortHandedTimeOnIce,
                    PowerplayTimeOnIcePerGame,
                    ShortHandedTimeOnIcePerGame,
                    evenTimeOnIce,
                    Wins,
                    Losses,
                    Ties,
                    OvertimeLosses,
                    ShotsAgainst,
                    Saves,
                    GoalsAgainst,
                    GoalsAgainstAverage,
                    TimeOnIce,
                    Shutouts,
                    PenaltyMinutes,
                    PowerplayShots,
                    PowerplaySaves,
                    PowerPlaySavePtage,
                    ShortHandedShots,
                    ShortHandedSaves,
                    ShortHandedSavePercentage,
                    EventStrengthShots,
                    EventStrengthSaves,
                    EventStrengthSavePtage,
                };




                if (season == "Regular")
                    this.setState({ ADVData: data_final });
                else if (season == "Playoffs")
                    this.setState({ ADVDataPlayOffs: data_final });

            }
        }

    }



    _getADVByYear = async (year) => {
        this.setState({ process: true, showDroupDown1: year, showDroupDown1: false, enableScroll: true })

        // if(year=="Career")
        //     var selectedYear = year
        // else
        var selectedYear = year.substring(0, 4) + year.substring(5, 9)
        await this._getADVData("Regular", selectedYear)
        await this._getADVData("Playoffs", selectedYear)
        this.setState({ process: false, showDroupDown1: year,showDroupDown1: false, })
    }


    updateScroll = (id) => {
        var flag = false
        if (id == 1) {
            flag = !this.state.showDroupDown1;
            this.setState({ showDroupDown1: flag, enableScroll: !flag })

        }
        else if (id == 3) {
            flag = !this.state.showDroupDown3;
            this.setState({ showDroupDown3: flag, enableScroll: !flag })
        }
    }

    render() {
        var { seasons, GP, GS, SV, G, A, P, PlusMinus, S, SPtage, PIM, Hits, BS,
            PointsPerGame,
            PowerplayGoals,
            PowerplayPoints,
            ShortHandedGoals,
            ShortHandedPoints,
            GameWinningGoals,
            OvertimeGoals,
            TimeOnIcePerGame,
            ShiftsPerGame,
            FaceoffWinPercentage,
            PowerplayTimeOnIce,
            ShortHandedTimeOnIce,
            PowerplayTimeOnIcePerGame,
            ShortHandedTimeOnIcePerGame,
            evenTimeOnIce,
            Wins,
            Losses,
            Ties,
            OvertimeLosses,
            ShotsAgainst,
            Saves,
            GoalsAgainst,
            GoalsAgainstAverage,
            TimeOnIce,
            Shutouts,
            PenaltyMinutes,
            PowerplayShots,
            PowerplaySaves,
            PowerPlaySavePtage,
            ShortHandedShots,
            ShortHandedSaves,
            ShortHandedSavePercentage,
            EventStrengthShots,
            EventStrengthSaves,
            EventStrengthSavePtage,
        } = {}

        if (this.state.droupDown2Selected == "Playoffs") {

            seasons = this.state.ADVDataPlayOffs.seasons;
            GP = this.state.ADVDataPlayOffs.GP;
            GS = this.state.ADVDataPlayOffs.GS;
            SV = this.state.ADVDataPlayOffs.SV;
            G = this.state.ADVDataPlayOffs.G;
            A = this.state.ADVDataPlayOffs.A;
            P = this.state.ADVDataPlayOffs.P;
            S = this.state.ADVDataPlayOffs.S;
            PlusMinus = this.state.ADVDataPlayOffs.PlusMinus;
            SPtage = this.state.ADVDataPlayOffs.SPtage;
            PIM = this.state.ADVDataPlayOffs.PIM;
            Hits = this.state.ADVDataPlayOffs.Hits;
            BS = this.state.ADVDataPlayOffs.BS;

            PointsPerGame = this.state.ADVDataPlayOffs.PointsPerGame;
            PowerplayGoals = this.state.ADVDataPlayOffs.PowerplayGoals;
            PowerplayPoints = this.state.ADVDataPlayOffs.PowerplayPoints;
            ShortHandedGoals = this.state.ADVDataPlayOffs.ShortHandedGoals;
            ShortHandedPoints = this.state.ADVDataPlayOffs.ShortHandedPoints;
            GameWinningGoals = this.state.ADVDataPlayOffs.GameWinningGoals;
            OvertimeGoals = this.state.ADVDataPlayOffs.OvertimeGoals;
            TimeOnIcePerGame = this.state.ADVDataPlayOffs.TimeOnIcePerGame;
            ShiftsPerGame = this.state.ADVDataPlayOffs.ShiftsPerGame;
            FaceoffWinPercentage = this.state.ADVDataPlayOffs.FaceoffWinPercentage;
            PowerplayTimeOnIce = this.state.ADVDataPlayOffs.PowerplayTimeOnIce;
            ShortHandedTimeOnIce = this.state.ADVDataPlayOffs.ShortHandedTimeOnIce;
            PowerplayTimeOnIcePerGame = this.state.ADVDataPlayOffs.PowerplayTimeOnIcePerGame;
            ShortHandedTimeOnIcePerGame = this.state.ADVDataPlayOffs.ShortHandedTimeOnIcePerGame;
            evenTimeOnIce = this.state.ADVDataPlayOffs.evenTimeOnIce;
            Wins = this.state.ADVDataPlayOffs.Wins;
            Losses = this.state.ADVDataPlayOffs.Losses;
            Ties = this.state.ADVDataPlayOffs.Ties;
            OvertimeLosses = this.state.ADVDataPlayOffs.OvertimeLosses;
            ShotsAgainst = this.state.ADVDataPlayOffs.ShotsAgainst;
            Saves = this.state.ADVDataPlayOffs.Saves;
            GoalsAgainst = this.state.ADVDataPlayOffs.GoalsAgainst;
            GoalsAgainstAverage = this.state.ADVDataPlayOffs.GoalsAgainstAverage;
            TimeOnIce = this.state.ADVDataPlayOffs.TimeOnIce;
            Shutouts = this.state.ADVDataPlayOffs.Shutouts;
            PenaltyMinutes = this.state.ADVDataPlayOffs.PenaltyMinutes;
            PowerplayShots = this.state.ADVDataPlayOffs.PowerplayShots;
            PowerplaySaves = this.state.ADVDataPlayOffs.PowerplaySaves;
            PowerPlaySavePtage = this.state.ADVDataPlayOffs.PowerPlaySavePtage;
            ShortHandedShots = this.state.ADVDataPlayOffs.ShortHandedShots;
            ShortHandedSaves = this.state.ADVDataPlayOffs.ShortHandedSaves;
            ShortHandedSavePercentage = this.state.ADVDataPlayOffs.ShortHandedSavePercentage;
            EventStrengthShots = this.state.ADVDataPlayOffs.EventStrengthShots;
            EventStrengthSaves = this.state.ADVDataPlayOffs.EventStrengthSaves;
            EventStrengthSavePtage = this.state.ADVDataPlayOffs.EventStrengthSavePtage;

        }

        else {

            seasons = this.state.ADVData.seasons;
            GP = this.state.ADVData.GP;
            GS = this.state.ADVData.GS;
            SV = this.state.ADVData.SV;
            G = this.state.ADVData.G;
            A = this.state.ADVData.A;
            P = this.state.ADVData.P;
            S = this.state.ADVData.S;
            PlusMinus = this.state.ADVData.PlusMinus;
            SPtage = this.state.ADVData.SPtage;
            PIM = this.state.ADVData.PIM;
            Hits = this.state.ADVData.Hits;
            BS = this.state.ADVData.BS;

            PointsPerGame = this.state.ADVData.PointsPerGame;
            PowerplayGoals = this.state.ADVData.PowerplayGoals;
            PowerplayPoints = this.state.ADVData.PowerplayPoints;
            ShortHandedGoals = this.state.ADVData.ShortHandedGoals;
            ShortHandedPoints = this.state.ADVData.ShortHandedPoints;
            GameWinningGoals = this.state.ADVData.GameWinningGoals;
            OvertimeGoals = this.state.ADVData.OvertimeGoals;
            TimeOnIcePerGame = this.state.ADVData.TimeOnIcePerGame;
            ShiftsPerGame = this.state.ADVData.ShiftsPerGame;
            FaceoffWinPercentage = this.state.ADVData.FaceoffWinPercentage;
            PowerplayTimeOnIce = this.state.ADVData.PowerplayTimeOnIce;
            ShortHandedTimeOnIce = this.state.ADVData.ShortHandedTimeOnIce;
            PowerplayTimeOnIcePerGame = this.state.ADVData.PowerplayTimeOnIcePerGame;
            ShortHandedTimeOnIcePerGame = this.state.ADVData.ShortHandedTimeOnIcePerGame;
            evenTimeOnIce = this.state.ADVData.evenTimeOnIce;
            Wins = this.state.ADVData.Wins;
            Losses = this.state.ADVData.Losses;
            Ties = this.state.ADVData.Ties;
            OvertimeLosses = this.state.ADVData.OvertimeLosses;
            ShotsAgainst = this.state.ADVData.ShotsAgainst;
            Saves = this.state.ADVData.Saves;
            GoalsAgainst = this.state.ADVData.GoalsAgainst;
            GoalsAgainstAverage = this.state.ADVData.GoalsAgainstAverage;
            TimeOnIce = this.state.ADVData.TimeOnIce;
            Shutouts = this.state.ADVData.Shutouts;
            PenaltyMinutes = this.state.ADVData.PenaltyMinutes;
            PowerplayShots = this.state.ADVData.PowerplayShots;
            PowerplaySaves = this.state.ADVData.PowerplaySaves;
            PowerPlaySavePtage = this.state.ADVData.PowerPlaySavePtage;
            ShortHandedShots = this.state.ADVData.ShortHandedShots;
            ShortHandedSaves = this.state.ADVData.ShortHandedSaves;
            ShortHandedSavePercentage = this.state.ADVData.ShortHandedSavePercentage;
            EventStrengthShots = this.state.ADVData.EventStrengthShots;
            EventStrengthSaves = this.state.ADVData.EventStrengthSaves;
            EventStrengthSavePtage = this.state.ADVData.EventStrengthSavePtage;

        }

        var headings = this.state.headings;
        if (this.props.position == "G")
            headings = this.state.headingsGoalies

        return (
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEnabled={this.state.enableScroll}
            >
                <View>
                    <View style={[styles.containerRowCenter, Platform.OS==='ios'?styles.zindex20:{}, { marginVertical: "5%" }]}>

                        <View style={{ width: "40%", marginLeft: 5, }}>
                            <TouchableOpacity style={[styles.droupDownLabelContainer, { height: 30 }]}
                                onPress={() => this.updateScroll(1)}
                            >
                                <Text style={[styles.droupDownLabelText, { fontSize: 11, lineHeight: 13 }]}>{this.state.droupDown1Selected}</Text>
                                <View
                                    style={{ marginRight: 20, marginBottom: 2 }}>
                                    <Image source={this.state.showDroupDown1 ? arrowUpImage : arrowDownImage} />
                                </View>
                            </TouchableOpacity>
                            {
                                this.state.showDroupDown1 &&
                                <View >
                                    <View style={[styles.droupDownFlatListContainer, {}]}>
                                        <FlatList
                                            style={{ height: 100 }}
                                            data={this.state.droupDown1Options}
                                            renderItem={({ item }) => this._getDroupDownOptions(item)}
                                            numColumns={1}
                                        />
                                    </View>
                                </View>
                            }
                        </View>


                        <View style={{ width: "40%", marginHorizontal: 5, }}>
                            <TouchableOpacity style={[styles.droupDownLabelContainer, { height: 30 }]}
                                onPress={() => this.setState({ showDroupDown2: !this.state.showDroupDown2 })}

                            >
                                <Text style={[styles.droupDownLabelText, { fontSize: 11, lineHeight: 13 }]}>{this.state.droupDown2Selected}</Text>
                                <View
                                    style={{ marginRight: 20, marginBottom: 2 }}>
                                    <Image source={this.state.showDroupDown2 ? arrowUpImage : arrowDownImage} />
                                </View>
                            </TouchableOpacity>
                            {
                                this.state.showDroupDown2 &&
                                <View >
                                    <View style={[styles.droupDownFlatListContainer, {}]}>
                                        <FlatList
                                            style={{}}
                                            data={this.state.droupDown2Options}
                                            renderItem={({ item }) => this._getDroupDownOptions(item)}
                                            numColumns={1}
                                        />
                                    </View>
                                </View>
                            }
                        </View>

                    </View>
                    <View style={{flex:1}}>
                    <ScrollView scrollEnabled={false} style={{zIndex:1,position:"absolute"}} horizontal>
                        <View style={[{ backgroundColor: "#FFF", marginHorizontal: 10, borderRadius: 15, paddingBottom: 0, }]}>
                            <View style={[styles.containerRowStart, { borderBottomColor: "#dedede", borderBottomWidth: 1, padding: 0 }]}>
                                <View style={styles.headingStyleStats}>
                                    {
                                        this._getHeadings(headings[0])
                                    }
                                </View>

                            </View>

                            <View style={[styles.containerRowStart]}>
                                <View style={styles.headingStyleStats}>
                                    <FlatList
                                        keyExtractor={(item, index) => String(index)}

                                        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", paddingHorizontal: 9, paddingBottom: 15 }}

                                        data={seasons}
                                        // data={this.pagination_season(seasons)}
                                        renderItem={({ item }) => this._getSeasons(item)}
                                        numColumns={1}
                                        scrollEnabled={false}
                                    />


                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{}} horizontal>
                        <View style={[{ backgroundColor: "#FFF", marginHorizontal: 10, borderRadius: 15, paddingBottom: 0, }]}>
                            <View style={[styles.containerRowStart, { borderBottomColor: "#dedede", borderBottomWidth: 1, padding: 0 }]}>
                                <View style={styles.scoreStyleStats}>
                                    {
                                        // this._getHeadings(headings[0])
                                    }
                                </View>
                                <View style={[styles.teamStyleStats, { marginLeft: 17 }]}>
                                    {

                                        this._getHeadings(headings[1])
                                    }
                                </View>
                                <View style={styles.scoreStyleStats}>
                                    {
                                        this._getHeadings(headings[2])
                                    }
                                </View>
                                <View style={styles.scoreStyleStats}>
                                    {
                                        this._getHeadings(headings[3])
                                    }
                                </View>
                                <View style={styles.scoreStyleStats}>
                                    {
                                        this._getHeadings(headings[4])
                                    }
                                </View>
                                <View style={styles.scoreStyleStats}>
                                    {
                                        this._getHeadings(headings[5])
                                    }
                                </View>
                                <View style={styles.scoreStyleStats}>
                                    {
                                        this._getHeadings(headings[6])
                                    }
                                </View>
                                <View style={styles.scoreStyleStats}>
                                    {
                                        this._getHeadings(headings[7])
                                    }
                                </View>
                                <View style={styles.scoreStyleStats}>
                                    {
                                        this._getHeadings(headings[8])
                                    }
                                </View>
                                <View style={styles.scoreStyleStats}>
                                    {
                                        this._getHeadings(headings[9])
                                    }
                                </View>
                                <View style={styles.scoreStyleStats}>
                                    {
                                        this._getHeadings(headings[10])
                                    }
                                </View>
                                <View style={styles.scoreStyleStats}>
                                    {
                                        this._getHeadings(headings[11])
                                    }
                                </View>
                                <View style={styles.scoreStyleStats}>
                                    {
                                        this._getHeadings(headings[12])
                                    }
                                </View>
                                {
                                  this.props.position != 'G' && (
                                    <React.Fragment>

                                      <View style={styles.scoreStyleStats}>
                                          {
                                              this._getHeadings(headings[13])
                                          }
                                      </View>
                                      <View style={styles.scoreStyleStats}>
                                          {
                                              this._getHeadings(headings[14])
                                          }
                                      </View>
                                      <View style={styles.scoreStyleStats}>
                                          {
                                              this._getHeadings(headings[15])
                                          }
                                      </View>
                                      <View style={styles.scoreStyleStats}>
                                          {
                                              this._getHeadings(headings[16])
                                          }
                                      </View>
                                      <View style={styles.scoreStyleStats}>
                                          {
                                              this._getHeadings(headings[17])
                                          }
                                      </View>
                                      <View style={styles.scoreStyleStats}>
                                          {
                                              this._getHeadings(headings[18])
                                          }
                                      </View>
                                      <View style={styles.scoreStyleStats}>
                                          {
                                              this._getHeadings(headings[19])
                                          }
                                      </View>
                                      <View style={styles.scoreStyleStats}>
                                          {
                                              this._getHeadings(headings[20])
                                          }
                                      </View>
                                      <View style={styles.scoreStyleStats}>
                                          {
                                              this._getHeadings(headings[21])
                                          }
                                      </View>
                                      <View style={styles.scoreStyleStats}>
                                          {
                                              this._getHeadings(headings[22])
                                          }
                                      </View>
                                    </React.Fragment>
                                  )
                                }

                            </View>

                            <View style={[styles.containerRowStart]}>
                                <View style={styles.headingStyleStats}>
                                    <FlatList
                                        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", paddingHorizontal: 9, paddingBottom: 15 }}
                                        data={seasons}
                                        renderItem={({ item }) => this._getSeasonsEmpty(item)}
                                        numColumns={1}
                                        scrollEnabled={false}
                                    />

                                </View>

                                {/* <View style={{ width: 40, }}>
    <FlatList
        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
        data={team}
        renderItem={({ item }) => this._getScore(item)}
        numColumns={1}
   scrollEnabled={false}
/>
</View> */}

                                <View style={styles.scoreStyleStats}>
                                    <FlatList
                                        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                        data={GP}
                                        renderItem={({ item }) => this._getScore(item)}
                                        numColumns={1}
                                        scrollEnabled={false}
                                    />
                                </View>

                                <View style={styles.scoreStyleStats}>
                                    <FlatList
                                        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                        data={this.props.position != 'G' ? G : GS }
                                        renderItem={({ item }) => this._getScore(item)}
                                        numColumns={1}
                                        scrollEnabled={false}
                                    />
                                </View>

                                <View style={styles.scoreStyleStats}>
                                    <FlatList
                                        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                        data={this.props.position != 'G' ? A : Wins }
                                        renderItem={({ item }) => this._getScore(item)}
                                        numColumns={1}
                                        scrollEnabled={false}
                                    />
                                </View>

                                <View style={styles.scoreStyleStats}>
                                    <FlatList
                                        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                        data={this.props.position != 'G' ? P : Losses }
                                        renderItem={({ item }) => this._getScore(item)}
                                        numColumns={1}
                                        scrollEnabled={false}
                                    />
                                </View>

                                <View style={styles.scoreStyleStats}>
                                    <FlatList
                                        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                        data={this.props.position != 'G' ? PlusMinus : OvertimeLosses }
                                        renderItem={({ item }) => this._getScore(item)}
                                        numColumns={1}
                                        scrollEnabled={false}
                                    />
                                </View>

                                <View style={styles.scoreStyleStats}>
                                    <FlatList
                                        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                        data={this.props.position != 'G' ? S : ShotsAgainst }
                                        renderItem={({ item }) => this._getScore(item)}
                                        numColumns={1}
                                        scrollEnabled={false}
                                    />
                                </View>

                                <View style={styles.scoreStyleStats}>
                                    <FlatList
                                        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                        data={this.props.position != 'G' ? SPtage : Saves }
                                        renderItem={({ item }) => this._getScore(item)}
                                        numColumns={1}
                                        scrollEnabled={false}
                                    />
                                </View>

                                <View style={styles.scoreStyleStats}>
                                    <FlatList
                                        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                        data={this.props.position != 'G' ? PointsPerGame : GoalsAgainst }
                                        renderItem={({ item }) => this._getScore(item)}
                                        numColumns={1}
                                        scrollEnabled={false}
                                    />
                                </View>


                                <View style={styles.scoreStyleStats}>
                                    <FlatList
                                        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                        data={this.props.position != 'G' ? PowerplayGoals : SV }
                                        renderItem={({ item }) => this._getScore(item)}
                                        numColumns={1}
                                        scrollEnabled={false}
                                    />
                                </View>


                                <View style={styles.scoreStyleStats}>
                                    <FlatList
                                        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                        data={this.props.position != 'G' ? PowerplayPoints : GoalsAgainstAverage }
                                        renderItem={({ item }) => this._getScore(item)}
                                        numColumns={1}
                                        scrollEnabled={false}
                                    />
                                </View>


                                <View style={styles.scoreStyleStats}>
                                    <FlatList
                                        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                        data={this.props.position != 'G' ? ShortHandedGoals : TimeOnIce }
                                        renderItem={({ item }) => this._getScore(item)}
                                        numColumns={1}
                                        scrollEnabled={false}
                                    />
                                </View>
                                <View style={styles.scoreStyleStats}>
                                    <FlatList
                                        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                        data={this.props.position != 'G' ? ShortHandedPoints : Shutouts }
                                        renderItem={({ item }) => this._getScore(item)}
                                        numColumns={1}
                                        scrollEnabled={false}
                                    />
                                </View>
                                {
                                  this.props.position != 'G' && (
                                    <React.Fragment>

                                      <View style={styles.scoreStyleStats}>
                                          <FlatList
                                              style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                              data={GameWinningGoals}
                                              renderItem={({ item }) => this._getScore(item)}
                                              numColumns={1}
                                              scrollEnabled={false}
                                          />
                                      </View>


                                      <View style={styles.scoreStyleStats}>
                                          <FlatList
                                              style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                              data={OvertimeGoals}
                                              renderItem={({ item }) => this._getScore(item)}
                                              numColumns={1}
                                              scrollEnabled={false}
                                          />
                                      </View>


                                      <View style={styles.scoreStyleStats}>
                                          <FlatList
                                              style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                              data={TimeOnIcePerGame}
                                              renderItem={({ item }) => this._getScore(item)}
                                              numColumns={1}
                                              scrollEnabled={false}
                                          />
                                      </View>


                                      <View style={styles.scoreStyleStats}>
                                          <FlatList
                                              style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                              data={ShiftsPerGame}
                                              renderItem={({ item }) => this._getScore(item)}
                                              numColumns={1}
                                              scrollEnabled={false}
                                          />
                                      </View>


                                      <View style={styles.scoreStyleStats}>
                                          <FlatList
                                              style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                              data={FaceoffWinPercentage}
                                              renderItem={({ item }) => this._getScore(item)}
                                              numColumns={1}
                                              scrollEnabled={false}
                                          />
                                      </View>


                                      <View style={styles.scoreStyleStats}>
                                          <FlatList
                                              style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                              data={PowerplayTimeOnIce}
                                              renderItem={({ item }) => this._getScore(item)}
                                              numColumns={1}
                                              scrollEnabled={false}
                                          />
                                      </View>


                                      <View style={styles.scoreStyleStats}>
                                          <FlatList
                                              style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                              data={ShortHandedTimeOnIce}
                                              renderItem={({ item }) => this._getScore(item)}
                                              numColumns={1}
                                              scrollEnabled={false}
                                          />
                                      </View>

                                      <View style={styles.scoreStyleStats}>
                                          <FlatList
                                              style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                              data={PIM}
                                              renderItem={({ item }) => this._getScore(item)}
                                              numColumns={1}
                                              scrollEnabled={false}
                                          />
                                      </View>

                                      <View style={styles.scoreStyleStats}>
                                          <FlatList
                                              style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                              data={Hits}
                                              renderItem={({ item }) => this._getScore(item)}
                                              numColumns={1}
                                              scrollEnabled={false}
                                          />
                                      </View>

                                      <View style={styles.scoreStyleStats}>
                                          <FlatList
                                              style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                              data={BS}
                                              renderItem={({ item }) => this._getScore(item)}
                                              numColumns={1}
                                              scrollEnabled={false}
                                          />
                                      </View>
                                    </React.Fragment>
                                  )
                                }

                                {/*
                                <View style={styles.scoreStyleStats}>
                                    <FlatList
                                        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                        data={this.props.position!='G'?PowerplayTimeOnIcePerGame:EventStrengthShots}
                                        renderItem={({ item }) => this._getScore(item)}
                                        numColumns={1}
                                    />
                                </View>


                                <View style={styles.scoreStyleStats}>
                                    <FlatList
                                        style={{ borderRightWidth: 1, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                        data={this.props.position!='G'?ShortHandedTimeOnIcePerGame:EventStrengthSaves}
                                        renderItem={({ item }) => this._getScore(item)}
                                        numColumns={1}
                                    />
                                </View>


                                <View style={styles.scoreStyleStats}>
                                    <FlatList
                                        style={{ borderRightWidth: 0, borderRightColor: "#dedede88", marginHorizontal: 0 }}
                                        data={this.props.position!='G'?evenTimeOnIce:EventStrengthSavePtage}
                                        renderItem={({ item }) => this._getScore(item)}
                                        numColumns={1}
                                    />
                                </View> */}


                            </View>
                        </View>
                    </ScrollView>
</View>
                    <View style={[styles.containerRowCenter, Platform.OS==='ios'?styles.zindex20:{}, { marginTop: 25 }]}>
                        <Text style={[styles.yellowButtonSmallText, { fontWeight: "normal", marginRight: 10 }]}>Games Remaining:
                        <Text style={[styles.yellowButtonSmallText,]}> {this.state.remainingGame}</Text> </Text>
                        <View style={{ width: "40%", marginLeft: 5, }}>
                            <TouchableOpacity style={[styles.droupDownLabelContainer, { height: 30, }]}
                                onPress={() => this.updateScroll(3)}
                            >
                                <Text style={[styles.droupDownLabelText, { fontSize: 11, lineHeight: 13 }]}>{this.state.droupDown3Selected}</Text>
                                <View
                                    style={{ marginRight: 20, marginBottom: 2 }}>
                                    <Image source={this.state.showDroupDown3 ? arrowUpImage : arrowDownImage} />
                                </View>
                            </TouchableOpacity>
                            {
                                this.state.showDroupDown3 &&
                                <View>
                                    <View style={[styles.droupDownFlatListContainer]}>
                                        <FlatList
                                            style={{ height: 100 }}
                                            data={this.state.droupDown3Options}
                                            renderItem={({ item }) => this._getDroupDownOptions(item)}
                                            numColumns={1}
                                        />
                                    </View>
                                </View>
                            }
                        </View>

                    </View>

                    <View style={[styles.containerRowCenter, { marginTop: 30, marginBottom: 30 }]}>
                        <TouchableOpacity
                            style={[styles.yellowButtonSmall, { width: "43%", marginTop: 5, marginRight: 5, height: 40 }]}
                            onPress={() => this.props.moveToMyFantasyTeam()} >
                            <Text style={[styles.yellowButtonSmallText, { color: "#0F1A38" }]}>Add to Fantasy Team</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.yellowButtonSmall, { width: "43%", backgroundColor: "#DEDEDE", borderWidth: 0, marginTop: 5, marginLeft: 5, height: 40 }]}
                            onPress={() => this.props.moveToPlayerComparaison()} >
                            <Text style={[styles.yellowButtonSmallText, { color: "#0F1A38" }]}>Compare Player</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    this.state.process == true &&
                    <View style={{ position: "absolute", flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%", }}>
                        <ActivityIndicator size="large" color="#2233aa" />
                    </View>
                }
            </ScrollView>

        );
    }
};

export default PD_Tab_ADV;
