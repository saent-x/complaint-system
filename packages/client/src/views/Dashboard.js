import React from "react";
import ConnectFailed from "../components/ConnectFailed";
import StatCards from "../components/StatCards";
import { GetTokenInfo, TransformData, $axios, DeleteToken, handleError } from "../utilities/helper";

class Dashboard extends React.PureComponent {
  state = {
    serverUnavailable: false,
    activeNav: 1,
    complaints: 0,
    pending: 0,
    resolved: 0,
  };

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
    });
  };

  componentDidMount() {
    this.fetchStats();
  }

  fetchStats() {
    var action;

    if (GetTokenInfo().type === "student") {
      action = $axios()
        .get(`api/comp/stats?id=${GetTokenInfo().id}`);
    } else {
      action = $axios()
        .get(`api/comp/stats`)
    }
    
      action.then(res => {
        console.log(res)
        this.setState({ ...res.data });
      })
      .catch(error => {
        if (!error.response) console.log(error.message);
        else console.log(error.response.data);
        this.setState({ serverUnavailable: true });
      });
  }

  render() {

    return (
      <>
        {this.state.serverUnavailable ? <ConnectFailed /> : null}

        <StatCards
          complaints={this.state.complaints}
          pendingComplaints={this.state.pending}
          resolvedComplaints={this.state.resolved}
        />
      </>
    );
  }
}

export default Dashboard;
