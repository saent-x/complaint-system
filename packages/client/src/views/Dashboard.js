import React from "react";
import Chart from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Input,
  Row,
  Col
} from "reactstrap";

import {
  chartOptions,
  parseOptions,
  scanTrendChart,
  cardIndexChart
} from "variables/charts";

import ConnectFailed from "../components/ConnectFailed";
import StatCards from "../components/StatCards";

class Dashboard extends React.PureComponent {
  state = {
    serverUnavailable: false,
    activeNav: 1,
    scanTrendChartDataView: "year",
    scanTrendYearData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    scanTrendWeekData: [0, 0, 0, 0, 0, 0, 0],
    indexedCardData: [0, 0, 0, 0],
    scansDone: 0,
    filesIndexed: 0,
    users: 0,
    cardsFound: 0
  };

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      scanTrendChartDataView:
        this.state.scanTrendChartDataView === "year" ? "month" : "year"
    });
  };

  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  componentDidMount() {
    this.fetchStats();
  }

  fetchStats() {
    // console.log("stats fetched");
    // createInstance()
    //   .get("/stats")
    //   .then(res => {
    //     this.setState({ ...res.data });
    //   })
    //   .catch(error => {
    //     if (!error.response) console.log(error.message);
    //     else console.log(error.response.data);
    //     this.setState({ serverUnavailable: true });
    //   });
  }

  render() {
    console.log("Dashboard rendered");

    /**** Initialize Charts ****/
    const yearData = canvas => {
      return {
        labels: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        datasets: [
          {
            label: "Performance",
            data: this.state.scanTrendYearData
          }
        ]
      };
    };

    const weekData = canvas => {
      return {
        labels: ["Mon", "Tue", "Wed", "Thur", "Friday", "Sat", "Sunday"],
        datasets: [
          {
            label: "Scan Trend",
            data: this.state.scanTrendWeekData
          }
        ]
      };
    };

    const indexedCardData = {
      labels: ["Visa", "Master", "Verve", "American Expresss"],
      datasets: [
        {
          label: "cards",
          backgroundColor: ["#34495e", "#e84118", "#95a5a6", "#7f8c8d"],
          data: this.state.indexedCardData
        }
      ]
    };
    return (
      <>
        {this.state.serverUnavailable ? <ConnectFailed /> : null}

        <StatCards
          scansDone={this.state.scansDone}
          filesIndexed={this.state.filesIndexed}
          users={this.state.users}
          cardsFound={this.state.cardsFound}
        />

        <Container className="mt-md-5 mt-xs-8" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" md="12" xl="7">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-right">
                    <div className="col">
                      <h6 className="text-uppercase text-dark ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-black mb-0">Scan Summary</h2>
                    </div>
                    <div className="col">
                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Input
                          style={{ maxWidth: "200px" }}
                          type="select"
                          name="view"
                          id="view"
                          onChange={this.handleViewChange}
                        >
                          <option>Today</option>
                          <option>Past week</option>
                          <option>Past Month</option>
                          <option>Past Year</option>
                        </Input>
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      data={
                        this.state.scanTrendChartDataView === "year"
                          ? yearData
                          : weekData
                      }
                      options={scanTrendChart.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="5">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Scanned Cards
                      </h6>
                      <h2 className="mb-0">Card Types</h2>
                    </div>
                    <div className="col">
                      <Input
                        style={{ maxWidth: "200px" }}
                        type="select"
                        name="view"
                        id="view"
                        onChange={this.handleViewChange}
                      >
                        <option>Today</option>
                        <option>Past week</option>
                        <option>Past Month</option>
                        <option>Past Year</option>
                      </Input>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Pie
                      data={indexedCardData}
                      options={cardIndexChart.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Dashboard;
