import React from "react";
import { Col, Card, Input, Container, Row, Badge } from "reactstrap";
import MaterialTable from "material-table";
import { GetTokenInfo, TransformData, $axios, DeleteToken, handleError } from "../utilities/helper";

class CompletedComplaints extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
	}

	fetchResolvedComplaint() {
		$axios()
			.get(`/api/comp/all?id=${GetTokenInfo().id}&status=resolved`)
			.then(res => {
				const transformedData = TransformData(res.data);
				if (res.data) this.setState({ data: transformedData });
			})
			.catch(error => {
				if (error.response) {
					if (error.response.status === 401) {
						DeleteToken();
						this.props.history.push("/login");
					} else alert(error.response.data);
				}
			});
	}

	handleDeleteComplaint(complaint_id) {
		$axios()
			.delete(`/api/comp?id=${complaint_id}`)
			.then(res => {
				alert(res.data);
				this.fetchResolvedComplaint();
			})
			.catch(error => handleError(error));
	}

	componentDidMount() {
		this.fetchResolvedComplaint();
	}

	render() {
		const statusIndicatorMap = {
			pending: "bg-warning",
			resolved: "bg-success"
		};

		const renderStatus = rowData => {
			return (
				<Badge color="" className="badge-dot mr-4">
					<i className={statusIndicatorMap[rowData.Status.toLowerCase()]} />
					{rowData.Status}
				</Badge>
			);
		};

		const tableHeaders = [
			{
				title: "SUBJECT",
				field: "Subject",
				cellStyle: {
					/* hack */
					padding: "20px"
				}
			},
			{ title: "STAFF", field: "Staff", type: "string" },
			{ title: "REGION", field: "ComplaintRegion", type: "string" },
			{
				title: "STATUS",
				field: "Status ",
				render: rowData => renderStatus(rowData)
			},
			{
				title: "DATE", field: "DateAndTime", type: "string", render: rowData => {
					var d = new Date(rowData.DateAndTime),
						month = '' + (d.getMonth() + 1),
						day = '' + d.getDate(),
						year = d.getFullYear();

					if (month.length < 2)
						month = '0' + month;
					if (day.length < 2)
						day = '0' + day;

					return [year, month, day].join('-');
				} }
		];

		const iconFontStyle = {
			fontSize: 16,
			color: "white"
		};

		const tableActions = [
			{
				icon: "close",
				tooltip: "Delete Complaint",
				onClick: (event, rowData) => {
					this.handleDeleteComplaint(rowData._id);
				},
				iconProps: {
					style: { ...iconFontStyle, backgroundColor: "red", borderRadius: "100px" }
				}
			}
		]

		const localizationOptions = {
			header: {
				actions: "ACTIONS"
			}
		};

		return (
			<Container>
				<Row>
					<Col>
						<Card className="shadow">
							<MaterialTable
								title={""}
								columns={tableHeaders}
								data={this.state.data}
								localization={localizationOptions}
								options={{
									columnsButton: true,
									actionsColumnIndex: -1
								}}
								actions={tableActions}
							/>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default CompletedComplaints;
