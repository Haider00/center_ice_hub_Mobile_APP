import React from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from '../assets/css/styles';
import BackgroundImage from '../assets/img/Group.png';
import { Actions } from 'react-native-router-flux';

class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.moveToSplashScreen = this.moveToSplashScreen.bind(this);
  }

  moveToMainIndex() {
    Actions.pop();
  }
  moveToSignUp() {
    Actions.SignUp();
  }
  moveToSplashScreen() {
    Actions.SplashScreen();
  }
  moveToCreatePassword() {
    Actions.CreatePassword();
  }
  moveToLogin() {
    Actions.Login();
  }
  moveToResetPassword() {
    Actions.ResetPassword();
  }
  moveToHome() {
    Actions.Home();
  }
  moveToSetting() {
    Actions.Setting();
  }
  moveToAddTickers() {
    Actions.AddTickers();
  }
  moveToMyFantasyTeam() {
    Actions.MyFantasyTeam();
  }
  moveToTeam() {
    Actions.Team();
  }

  moveToTeamLineups() {
    Actions.TeamLineups();
  }

  moveToExpectedGoalies() {
    Actions.ExpectedGoalies();
  }

  moveToPlayerLeaderboards() {
    Actions.PlayerLeaderboards();
  }

  moveToPlayerComparison() {
    Actions.PlayerComparison();
  }

  moveToPlayerStats() {
    Actions.PlayerStats();
  }

  moveToMonthlyLeaders() {
    Actions.MontlyLeaders();
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.body}>
          <ImageBackground
            source={BackgroundImage}
            style={styles.backgroundImage}>
            <View style={{ width: '80%', height: '100%', margin: '5%' }}>
              <TouchableOpacity
                style={styles.yellowButton}
                onPress={this.moveToSplashScreen}>
                <Text style={styles.yellowButtonText}>SplashScreen</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yellowButton}
                onPress={this.moveToCreatePassword}>
                <Text style={styles.yellowButtonText}>CreatePassword</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yellowButton}
                onPress={this.moveToResetPassword}>
                <Text style={styles.yellowButtonText}>ResetPassword</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yellowButton}
                onPress={this.moveToLogin}>
                <Text style={styles.yellowButtonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yellowButton}
                onPress={this.moveToSignUp}>
                <Text style={styles.yellowButtonText}>SignUp</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yellowButton}
                onPress={this.moveToHome}>
                <Text style={styles.yellowButtonText}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yellowButton}
                onPress={this.moveToSetting}>
                <Text style={styles.yellowButtonText}>Setting</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yellowButton}
                onPress={this.moveToAddTickers}>
                <Text style={styles.yellowButtonText}>Add Tickers</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yellowButton}
                onPress={this.moveToMyFantasyTeam}>
                <Text style={styles.yellowButtonText}>My Fantasy Team</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yellowButton}
                onPress={this.moveToAnaheimDucks}>
                <Text style={styles.yellowButtonText}>Anaheim Ducks</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yellowButton}
                onPress={this.moveToTeamLineups}>
                <Text style={styles.yellowButtonText}>Team Lineups</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yellowButton}
                onPress={this.moveToExpectedGoalies}>
                <Text style={styles.yellowButtonText}>Primary Goalies</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yellowButton}
                onPress={this.moveToPlayerLeaderboards}>
                <Text style={styles.yellowButtonText}>Player Leaderboards</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yellowButton}
                onPress={this.moveToPlayerComparison}>
                <Text style={styles.yellowButtonText}>Player Comparison</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yellowButton}
                onPress={this.moveToPlayerStats}>
                <Text style={styles.yellowButtonText}>Player Stats</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.yellowButton}
                onPress={this.moveToMonthlyLeaders}>
                <Text style={styles.yellowButtonText}>Montly Leaders</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}

export default Welcome;
