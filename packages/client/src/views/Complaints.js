import React from "react";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import { IconButton } from "@material-ui/core";
import { Badge, Col, Card, Input, Table, Button, Container, Progress, Row } from "reactstrap";
import NewComplaint from "../components/NewComplaint";
import { $axios, GetTokenInfo } from "../utilities/helper";

class Complaints extends React.Component {
	constructor() {
		super();
		this.state = {
			open: false,
			view: "active",
			data: []
		};
	}

	fetchComplaintData() {
		$axios()
			.get(`/api/comp/all?id=${GetTokenInfo().id}`)
			.then(res => {
				if (res.data) this.setState({ data: this.TransformData(res.data) });
			})
			.catch(error => {
				if (error.response) alert(error.response.data);
			});
	}

	TransformData(data) {
		const arr = [];
		data.forEach(complaint => {
			const StaffName = complaint.Staff.Name;
			delete complaint.Staff;
			arr.push({
				...complaint,
				Staff: StaffName
			});
		});

		return arr;
	}

	componentDidMount() {
		this.fetchComplaintData();
	}

	handleViewChange = e => {
		this.setState({ view: e.target.value });
	};

	createNewComplaint(obj) {
		if (!obj) alert("Fill the textboxes!");
		$axios()
			.post("/api/comp/add", {
				...obj,
				DateAndTime: Date.now()
			})
			.then(res => {
				alert("Complaint Successfully Lodged!");
				this.fetchComplaintData();
			})
			.catch(err => console.log(err));
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
			}
		];

		const leftTableActions = (
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					alignItems: "center"
				}}
			>
				<IconButton className="mr-2" onClick={() => this.setState({ open: true })}>
					<AddIcon />
				</IconButton>
				<Input style={{ maxWidth: "200px" }} type="select" name="view" id="view" onChange={this.handleViewChange}>
					<option>Active</option>
					<option>Completed</option>
				</Input>
			</div>
		);

		const iconFontStyle = {
			fontSize: 16,
			color: "black"
		};

		const tableActions = [
			{
				icon: "pause",
				tooltip: "Pause scan",
				onClick: (event, rowData) => {
					this.toggleUserStatus(rowData.username, rowData.active);
				},
				iconProps: {
					style: { ...iconFontStyle }
				}
			},
			{
				icon: "close",
				tooltip: "Cancel scan",
				onClick: (event, rowData) => {
					this.handleDeleteUser(rowData.username);
				},
				iconProps: {
					style: { ...iconFontStyle }
				}
			}
		];
		const localizationOptions = {
			header: {
				actions: "ACTIONS"
			}
		};

		return (
			<Container fluid>
				<Row>
					<Col>
						<Card className="shadow">
							<NewComplaint
								open={this.state.open}
								close={() => this.setState({ open: false })}
								submit={obj => this.createNewComplaint(obj)}
							/>
							<MaterialTable
								columns={tableHeaders}
								data={this.state.data}
								title={leftTableActions}
								localization={localizationOptions}
								detailPanel={rowData => {
									return (
										<div className="ml-4" style={{ display: "flex" }}>
											<p>{rowData.label}</p>
										</div>
									);
								}}
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

export default Complaints;
