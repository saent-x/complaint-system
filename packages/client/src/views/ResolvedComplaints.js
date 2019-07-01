import React from "react";
import {
  Col,
  Card,
  Input,
  Container,
  Row,
} from "reactstrap";
import moment from "moment";
import MaterialTable from "material-table";
import Logger from "../Logger";

class CompletedComplaints extends React.Component {
  auditLogs = [];
  systemLogs = [];

  constructor(props) {
    super(props);
    this.logger = new Logger();
    this.state = {
      data: [],
      view: "audit"
    };
  }

  fetchData = async () => {
    try {
      const data = (await this.logger.fetchLogs()).data;
      console.log(data);
      this.setState({data});
    }
    catch(ex){ console.log(ex); }
  }

  componentDidMount() {
    this.fetchData();
  }

  handleViewChange = e => {
    this.setState({view: e.target.value.toLowerCase()});
  };

  render() {
    const auditLogsTableHeader = [
      {
        title: "Date",
        field: "date",
        render: rowData => (rowData.date ? moment(rowData.date).format("MMM Do YYY, h:mm:ss a") : "never"),
        cellStyle: {
          /* hack */
          padding: "20px"
      }
    },
      { title: "Message", field: "message", type: "string" }
  ]

    const systemLogsTableHeader  =[
      {
        title: "Date",
        field: "date",
        cellStyle: {
          /* hack */
          padding: "20px"
        }
      },
      { title: "Action", field: "action", type: "string" },
      { title: "Description", field: "description", type: "string" }
    ]

    const tableHeaders = this.state.view === "audit" ? auditLogsTableHeader : systemLogsTableHeader;

    const iconFontStyle = {
      fontSize: 16,
      color: "black"
    }

    const leftTableActions =
      (<div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <Input
          style={{ maxWidth: "200px" }}
          type="select"
          name="view"
          id="view"
          onChange={this.handleViewChange}
        >
          <option>Audit</option>
          <option>System</option>
        </Input>
      </div>);

    // const tableActions = [
    //   {
    //     icon: "visibility",
    //     tooltip: "View",
    //     onClick: (event, rowData) => {
    //     },
    //     iconProps: {
    //       style: { ...iconFontStyle }
    //     }
    //   },
    //   {
    //     icon: "description",
    //     tooltip: "Copy",
    //     onClick: (event, rowData) => {},
    //     iconProps: {
    //       style: { ...iconFontStyle }
    //     }
    //   }
    // ]

    const localizationOptions = {
      header: {
        actions: "ACTIONS"
      }
    }

    return (
      <Container fluid>
        <Row>
          <Col>
            <Card className="shadow">
              <MaterialTable
                columns={tableHeaders}
                data={this.state.data.filter(x => x.type === this.state.view)}
                title={leftTableActions}
                localization={localizationOptions}
                options={{
                  columnsButton: true,
                  actionsColumnIndex: -1
                }}
                // actions={tableActions}
              />
            </Card>
            {/* <ScanDetails/> */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CompletedComplaints;
