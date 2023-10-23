import React from "react";
import { Actions, Router, Scene } from "react-native-router-flux";
import Welcome from "../views/Welcome";
import CreatePassword from "../views/CreatePassword";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import ResetPassword from "../views/ResetPassword";
import NavBar from "../components/NavBar";
import Home from "../views/Home";
import Setting from "../views/Setting";
import AddTickers from "../views/AddTickers";
import MyFantasyTeam from "../views/MyFantasyTeam";
import Team from "../views/Team";
import TeamLineups from "../views/TeamLineups";
import ExpectedGoalies from "../views/ExpectedGoalies";
import PlayerLeaderboards from "../views/PlayerLeaderboards";
import PlayerComparison from "../views/PlayerComparison";
import CenterIcePlay from "../views/CenterIcePlay";
import PlayerDeatails from "../views/PlayerDeatails";
import DrawerContent from "../components/Drawer";
import MontlyLeaders from "../views/MonthlyLeaders";
import { Platform, View } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import PrivacyPolicy from "../views/PrivacyPolicy";
import TermOfUse from "../views/TermsOfServices";
import Restore from "../views/Restore";
import VerifyOTP from "../views/VerifyOTP";
import VerifyResetPassword from "../views/VerifyResetPassword";

class Routers extends React.PureComponent {
  componentDidMount() {
    Actions.reset("drawer");
  }
  render() {
    return (
      <View
        style={
          Platform.OS === "ios"
            ? {
                flex: 1,
                paddingTop: getStatusBarHeight(),
                backgroundColor: "#182955",
              }
            : { flex: 1, paddingTop: 0, backgroundColor: "#182955" }
        }
      >
        <Router navBar={NavBar}>
          <Scene key="root">
            <Scene key="Welcome" component={Welcome} hideNavBar />
            <Scene key="CreatePassword" component={CreatePassword} hideNavBar />
            <Scene key="Login" component={Login} hideNavBar />
            <Scene key="SignUp" component={SignUp} hideNavBar />
            <Scene key="PrivacyPolicy" component={PrivacyPolicy} hideNavBar />
            <Scene key="TermsOfUse" component={TermOfUse} hideNavBar />
            <Scene
              key="Setting"
              title="Setting"
              component={Setting}
              hideNavBar
            />
            <Scene
              key="AddTickers"
              title="Add New Ticker"
              component={AddTickers}
              hideNavBar
            />
            <Scene
              key="MyFantasyTeam"
              title="My Fantasy Team"
              component={MyFantasyTeam}
              hideNavBar
            />
            <Scene key="Team" title="Team" component={Team} hideNavBar />
            <Scene key="ResetPassword" component={ResetPassword} hideNavBar />
            <Scene key="VerifyOTP" component={VerifyOTP} hideNavBar />
            <Scene
              key="VerifyResetPassword"
              component={VerifyResetPassword}
              hideNavBar
            />
            <Scene
              key="PlayerStats"
              title="Player Stats"
              component={PlayerDeatails}
              hideNavBar
            />
            <Scene
              key="MontlyLeaders"
              title="Montly Leaders"
              component={MontlyLeaders}
              hideNavBar
            />
            <Scene
              key="drawer"
              drawer
              contentComponent={DrawerContent}
              drawerWidth={270}
              hideDrawerButton={true}
              hideNavBar={true}
              tabBarStyle={{ marginTop: 40 }}
            >
              <Scene key="Home" title="Center Ice Hub" component={Home} />
              <Scene
                key="TeamLineups"
                title="Teams Lineups"
                component={TeamLineups}
              />
              <Scene
                key="ExpectedGoalies"
                title="Primary Goalies"
                component={ExpectedGoalies}
              />
              <Scene
                key="PlayerLeaderboards"
                title="Player Leaderboards"
                component={PlayerLeaderboards}
              />
              <Scene
                key="PlayerComparison"
                title="NHL Player Comparisons"
                component={PlayerComparison}
              />
              <Scene
                key="CenterIcePlay"
                title="NHL Player Pick'ems"
                component={CenterIcePlay}
              />
              <Scene key="Restore" title="Setting" component={Restore} />
            </Scene>
          </Scene>
        </Router>
      </View>
    );
  }
}

export default Routers;
