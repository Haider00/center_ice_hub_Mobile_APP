import React from "react";
import axios from "axios";

class Service extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // apiUrlCIL: 'http://centericelineups.com/ciladmin/api/web/v1/user/',
      // apiUrlCIL: 'http://centericehub.com/ciladmin/api/web/v1/user/',
      // apiUrlNHL: 'https://statsapi.web.nhl.com/api/v1/'

      apiUrlCILLocal: "http://192.168.1.7:3000/api/",
      apiUrlCIL: "https://centericehub.com/ciladmin/api/web/v1/user/",
      apiUrlNHL: "https://statsapi.web.nhl.com/api/v1/",
    };
  }

  async login(userName, password) {
    const data = {
      email: userName,
      password_hash: password,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var res = null;

    // url = 'http://centericehub.com/ciladmin/api/web/v1/user/login'
    await axios
      .post(this.state.apiUrlCILLocal + "login", data, { headers: headers })
      .then((response) => {
        res = response;
      })
      .catch((e) => {
        console.log("e", e);
      });
    console.log("res", res);
    return res;
  }

  async forget(email) {
    const data = {
      email_address: email,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var res = null;

    // url = 'http://centericehub.com/ciladmin/api/web/v1/user/login'
    await axios
      .post(this.state.apiUrlCILLocal + "forgetPassword", data, {
        headers: headers,
      })
      .then((response) => {
        res = response;
      });
    console.log("ForgetPasswordResponse", res.data);
    return res;
  }

  async updatePassword(email, password) {
    const data = {
      email: email,
      password: password,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var res = null;

    await axios
      .post(this.state.apiUrlCILLocal + "updatePass", data, {
        headers: headers,
      })
      .then((response) => {
        res = response;
      });
    return res;
  }

  async resendOtp(email) {
    const data = {
      email: email,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    var res = null;

    await axios
      .post(this.state.apiUrlCILLocal + "resend/otp", data, {
        headers: headers,
      })
      .then((response) => {
        res = response;
      });
    return res;
  }

  async verifyOtp(email, otp) {
    const data = {
      email_address: email,
      otp,
    };
    console.log("<><><><>", email, otp);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    // url = 'http://centericehub.com/ciladmin/api/web/v1/user/login'
    const res = await axios.post(
      this.state.apiUrlCILLocal + "verify/otp",
      data,
      {
        headers: headers,
      }
    );
    console.log("verifyOtpRes", res.data);
    return res;
  }

  // async signUp(Fullname, Dateofbirth, Country, Email, Password, Newsletter) {
  //   const data = {
  //     full_name: Fullname,
  //     date_of_birth: Dateofbirth,
  //     country: Country,
  //     email: Email,
  //     password_hash: Password,
  //     newsletter: Newsletter,
  //     admob_status: 0,
  //   };
  //   const headers = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   };

  //   var res = null;

  //   await axios
  //     .post(this.state.apiUrlCIL + "create", data, { headers: headers })
  //     .then((response) => {
  //       res = response;
  //     });
  //   return res;
  // }

  async signUp(Fullname, Dateofbirth, Country, Email, Password, Newsletter) {
    const data = {
      full_name: Fullname,
      date_of_birth: Dateofbirth,
      country: Country,
      email: Email,
      password_hash: Password,
      newsletter: Newsletter,
      admob_status: 0,
    };
    console.log("Data coming from front-end", data);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const res = await axios.post(this.state.apiUrlCILLocal + "signup", data, {
      headers: headers,
    });
    return res;
  }

  async removeAds(userId, token) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    var res = null;

    await axios
      .post(
        this.state.apiUrlCIL + `update?id=${userId}&admob_status=1`,
        {},
        { headers: headers }
      )
      .then((response) => {
        console.log("response>>>", response.data);
        alert("Testinghhhh");
        res = response;
      });
    return res;
  }

  async getGamesOnDate(date) {
    var res = null;

    var url =
      this.state.apiUrlNHL + "schedule?startDate=" + date + "&endDate=" + date;
    //var url = this.state.apiUrlNHL + "schedule?date=2020-09-03";
    await axios.get(url).then((response) => {
      res = response;
    });

    return res;
  }

  async getGameDetails(team) {
    var res = null;
    var url = this.state.apiUrlCIL + "dailylineups?team=" + team;
    await axios.get(url).then((response) => {
      res = response;
    });
    return res;
  }

  async getCurrentSeason() {
    var res = null;
    var url = this.state.apiUrlNHL + "seasons/current";
    await axios.get(url).then((response) => {
      res = response;
    });
    return res;
  }

  // async getTeams() {
  //   var res = null;
  //   await axios.get(this.state.apiUrlCIL + "teams").then((response) => {
  //     res = response;
  //   });
  //   alert("api called");
  //   console.log("res", res);
  //   return res;
  // }

  async getTeamsLocal() {
    var res = null;
    await axios
      .get(this.state.apiUrlCILLocal + "all_teams")
      .then((response) => {
        res = response;
      });
    return res;
  }

  async getTeams2() {
    var res = null;
    await axios.get(this.state.apiUrlNHL + "teams").then((response) => {
      res = response;
    });
    const teamNames = res.data.teams.map((team) => team.teamName);
    console.log("getTeams2", teamNames);
    return res;
  }

  async getTeamPlayers(code) {
    var res = null;
    var url = this.state.apiUrlNHL + "teams/" + code + "/roster";
    await axios.get(url).then((response) => {
      res = response;
    });
    return res;
  }

  // async getMyFantasyTeam(id) {
  //   var res = null;
  //   var url = this.state.apiUrlCIL + "fetchlines?id=" + id;
  //   await axios.get(url).then((response) => {
  //     res = response;
  //   });
  //   alert("api called");
  //   console.log("resposeCode", JSON.stringify(res.data));
  //   return res;
  // }

  async getMyFantasyTeamLocal(id) {
    var res = null;
    var url = this.state.apiUrlCILLocal + "lines/" + id;
    await axios.get(url).then((response) => {
      res = response;
    });
    return res;
  }

  // async setMyFantasyTeam(id, team) {
  //   console.log("id>>", id);
  //   var res = null;
  //   var url = this.state.apiUrlCIL + "lines?id=" + id;

  //   const data = {
  //     Lines: team,
  //   };
  //   const headers = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   };
  //   var res = null;
  //   await axios.post(url, data, { headers: headers }).then((response) => {
  //     res = response;
  //   });
  //   alert("api called");
  //   console.log("resposeCode", JSON.stringify(res.data));
  //   return res;
  // }

  async setMyFantasyTeamLocal(id, team) {
    var res = null;
    var url = this.state.apiUrlCILLocal + "lines?id=" + id;

    const data = {
      Lines: team,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var res = null;
    await axios.post(url, data, { headers: headers }).then((response) => {
      res = response;
    });
    return res;
  }

  // async resetMyFantasyTeam(id) {
  //   var res = null;
  //   var url = this.state.apiUrlCIL + "removeall?id=" + id;

  //   const headers = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   };

  //   var res = null;
  //   await axios.post(url, "", { headers: headers }).then((response) => {
  //     res = response;
  //   });
  //   return res;
  // }

  // async resetMyFantasyTeamByTab(id, tab) {
  //   var res = null;
  //   var url = this.state.apiUrlCIL + "resetfantasylines";

  //   const headers = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   };

  //   const data = {
  //     id: id,
  //     line: tab,
  //   };

  //   var res = null;
  //   await axios.post(url, data, { headers: headers }).then((response) => {
  //     res = response;
  //   });
  //   alert("api called");
  //   console.log("res><", res.data);
  //   return res;
  // }

  async resetMyFantasyTeamByTabLocal(id, tab) {
    var res = null;
    var url = this.state.apiUrlCILLocal + "lines/remove";

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const data = {
      id: id,
      line: tab,
    };
    console.log("data", data);
    var res = null;
    await axios
      .post(url, data, { headers: headers })
      .then((response) => {
        res = response;
      })
      .catch((error) => {
        console.log(error);
      });
    return res;
  }

  // async getTeamsLineUp(teamName) {anaheim-ducks
  //   var res = null;

  //   var url = this.state.apiUrlCIL + "dailylineups?team=" + teamName;
  //   await axios.get(url).then((response) => {
  //     res = response;
  //   });
  //   alert("api called");
  //   console.log("resposeCode", JSON.stringify(res.data));
  //   return res;
  // }

  async getTeamsLineUpLocal(teamName) {
    var res = null;

    var url = this.state.apiUrlCILLocal + "daily_lineups/" + teamName;
    await axios.get(url).then((response) => {
      res = response;
    });
    return res;
  }

  async getFacebookUserInfo({ token = "", userId = "" }) {
    const data = await axios.get(
      `https://graph.facebook.com/${userId}?fields=id,name,email,picture&access_token=${token}`
    );
    return data;
  }

  async getPlayerDetails(playerLink, filter) {
    var res = null;
    var myFilter = filter != undefined ? filter : "yearByYear";
    var url =
      "http://statsapi.web.nhl.com" +
      playerLink +
      "/?expand=person.stats&stats=" +
      myFilter;
    await axios.get(url).then((response) => {
      res = response;
    });

    return res;
  }

  async getGameLogs(playerLink, filter, year) {
    var res = null;
    var url =
      "http://statsapi.web.nhl.com" +
      playerLink +
      "/stats?stats=" +
      filter +
      "&expand=yearByYear&season=" +
      year;
    //var url = "http://statsapi.web.nhl.com" + playerLink + "/stats";

    await axios.get(url).then((response) => {
      res = response;
    });
    return res;
  }

  async getADVSplitsRegular(playerLink, year) {
    var res = null;
    var url =
      "http://statsapi.web.nhl.com" +
      playerLink +
      "/stats?stats=vsTeam,vsDivision,vsConference,byMonth,byDayOfWeek,homeAndAway,onPaceRegularSeason,yearByYearRank&season=" +
      year;
    url =
      "https://statsapi.web.nhl.com/" +
      playerLink +
      "/stats?stats=homeAndAway,winLoss,byMonth,byDayOfWeek,vsDivision,vsConference,vsTeam,regularSeasonStatRankings,goalsByGameSituation,statsSingleSeason,onPaceRegularSeason&expand=stats.team&season=" +
      year +
      "&site=en_nh";

    await axios.get(url).then((response) => {
      res = response;
    });
    return res;
  }

  async getADVSplitsPlayOffs(playerLink, year) {
    var res = null;
    var url =
      "http://statsapi.web.nhl.com" +
      playerLink +
      "/stats?stats=vsTeamPlayoffs,vsDivisionPlayoffs,vsConferencePlayoffs,byMonthPlayoffs,byDayOfWeekPlayoffs,homeAndAwayPlayoffs&season=" +
      year;

    await axios.get(url).then((response) => {
      res = response;
    });
    return res;
  }

  async getExpectedGoalies(playerLink, filter) {
    var res = null;
    var url =
      "http://statsapi.web.nhl.com" +
      playerLink +
      "/?expand=person.stats&stats=" +
      filter;
    await axios.get(url).then((response) => {
      res = response;
    });
    return res;
  }

  async getCareerRegularSeason(playerLink, filter) {
    var res = null;
    var url =
      "http://statsapi.web.nhl.com" + playerLink + "/stats?stats=" + filter;
    await axios.get(url).then((response) => {
      res = response;
    });
    return res;
  }

  async getRemainingGames(startDate, endDate, teamId) {
    var res = null;
    var url =
      "https://statsapi.web.nhl.com/api/v1/schedule?startDate=" +
      startDate +
      "&endDate=" +
      endDate +
      "&site=en_nhl";

    //var url = "https://statsapi.web.nhl.com/api/v1/schedule?startDate=2020-08-28&endDate=2020-09-03&site=en_nhl";
    if (teamId != undefined)
      url =
        "https://statsapi.web.nhl.com/api/v1/schedule?startDate=" +
        startDate +
        "&endDate=" +
        endDate +
        "&site=en_nhl&teamId=" +
        teamId;
    //var url = "https://statsapi.web.nhl.com/api/v1/schedule?startDate=2020-08-28&endDate=2020-09-03&site=en_nhl&teamId="+teamId;
    await axios.get(url).then((response) => {
      res = response;
    });

    return res;
  }

  async getDrafted(playerId) {
    var res = null;
    var url =
      "https://api.nhle.com/stats/rest/en/skater/bios?cayenneExp=playerId=" +
      playerId;
    await axios.get(url).then((response) => {
      res = response;
    });
    return res;
  }

  async getGameData(gameLink) {
    var res = null;
    var url = "https://statsapi.web.nhl.com" + gameLink;
    await axios.get(url).then((response) => {
      res = response;
    });

    return res;
  }
}

export default Service;
