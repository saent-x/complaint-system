import React from "react";
import MaterialTable from "material-table";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import { IconButton } from "@material-ui/core";
import { Badge, Col, Card, Input, Table, Button, Container, Progress, Row } from "reactstrap";
import NewComplaint from "../components/NewComplaint";
import { $axios, GetTokenInfo, DeleteToken, TransformData, handleError } from "../utilities/helper";
import ViewComplaint from "../components/ViewComplaint";
import "../styles/index.css";
import ComplaintServices from "../services/complaintservices";

class Complaints extends React.Component {
	constructor() {
		super();
		this.state = {
			open: false,
			openview: false,
			update: false,
			data: [],
			filteredData: [],
			followups: [],
			complaint: {
				Subject: "",
				Message: "",
				ComplaintRegion: "Hostel"
			},
			followup: {
				Message: "",
				DateAndTime: null
			},
			selected_complaint: null,
			updating: false
		};

		// Initializing services
		this.complaintServices = new ComplaintServices(this);
	}

	componentDidMount() {
		this.fetchComplaintData();
	}

	/** API Functions */

	fetchComplaintData() {
		$axios()
			.get(`/api/comp/all?id=${GetTokenInfo().id}`)
			.then(res => {
				const transformedData = TransformData(res.data);
				if (res.data) this.setState({ data: transformedData, filteredData: transformedData });
			})
			.catch(error => handleError(error));
	}

	createNewComplaint() {
		if (!this.state.complaint) alert("Fill the textboxes!");
		const obj = {
			Subject: this.state.complaint.Subject,
			Message: this.state.complaint.Message,
			ComplaintRegion: this.state.complaint.ComplaintRegion
		};
		console.log(obj);
		$axios()
			.post("/api/comp/add", {
				...obj,
				DateAndTime: new Date().toUTCString()
			})
			.then(res => {
				alert("Complaint Successfully Lodged!");
				this.fetchComplaintData();
				this.closeDialog(false);
			})
			.catch(error => handleError(error));
	}

	handleDeleteComplaint(complaint_id) {
		$axios()
			.delete(`/api/comp?id=${complaint_id}`)
			.then(res => {
				alert(res.data);
				this.fetchComplaintData();
			})
			.catch(error => handleError(error));
	}

	updateComplaint() {
		this.setState({ updating: true });
		const obj = {
			Subject: this.state.complaint.Subject,
			Message: this.state.complaint.Message
		};
		$axios()
			.put(`/api/comp?id=${this.state.complaint._id}`, obj)
			.then(res => {
				alert("Updated Successfully!");
				this.setState({ updating: false });
				this.fetchComplaintData();
				this.closeDialog(true);
			})
			.catch(error => {
				this.setState({ updating: false });
				handleError(error);
			});
	}

	getFollowUps(complaint_id) {
		$axios()
			.get(`/api/foll?id=${complaint_id}`)
			.then(res => {
				this.setState({ followups: res.data });
				console.log(this.state.followups.length);
				if (this.state.followups.length > 0) {
					// Scroll to bottom
					let element = document.getElementById("followup-container");
					element.scrollTop = element.scrollHeight;
				}
			})
			.catch(error => alert(error));
	}

	addFollowup(complaint_id) {
		const obj = { ...this.state };
		obj.followup.DateAndTime = new Date().toUTCString();
		this.setState(obj);

		$axios()
			.post(`/api/foll?complaint_id=${complaint_id}`, obj.followup)
			.then(() => {
				this.setState({ followup: { ...this.state.followup, Message: "" } });
				this.getFollowUps(complaint_id);
			})
			.catch(error => handleError(error));
	}

	deleteFollowup(followup_id) {
		$axios()
			.delete(`/api/foll?id=${followup_id}`)
			.then(() => {
				const obj = { ...this.state };
				const index = obj.followups.findIndex(followup => followup._id === followup_id);
				obj.followups.splice(index, 1);
				this.setState(obj);
			})
			.catch(error => handleError(error));
	}

	/** Event Handlers for view */

	handleChange(event, reply = false) {
		if (!reply) {
			const obj = { ...this.state };
			obj.complaint[event.target.id] = event.target.value;
			this.setState(obj);
			return;
		}
		const obj = { ...this.state };
		obj.followup[event.target.id] = event.target.value;
		this.setState(obj);
		return;
	}

	closeDialog(view) {
		const obj = { ...this.state };
		obj[view ? "openview" : "open"] = false;
		obj.update = false;
		obj.complaint.Subject = "";
		obj.complaint.Message = "";
		obj.complaint.ComplaintRegion = "Hostel";
		this.setState(obj);
	}

	handleComplaintClick(complaint) {
		this.setState({ selected_complaint: complaint, openview: true });
		this.complaintServices.getComplaint(complaint._id);
		this.getFollowUps(complaint._id);
	}

	handleComplaintUpdate(complaint) {
		this.setState({ update: true });
		this.setState({ selected_complaint: complaint, openview: true });
		this.complaintServices.getComplaint(complaint._id);
	}

	handleViewChange(event) {
		const obj = { ...this.state };
		if (event.target.value === "all") obj.filteredData = obj.data;
		else obj.filteredData = obj.data.filter(complaint => complaint.Status === event.target.value);

		this.setState(obj);
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

		const leftTableActions = (
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					alignItems: "center"
				}}
			>
				{GetTokenInfo().type === "student" ? (<IconButton className="mr-2" onClick={() => this.setState({ open: true })}>
					<AddIcon />
				</IconButton>) : null}


				<Input
					style={{ maxWidth: "200px" }}
					type="select"
					name="view"
					id="view"
					onChange={event => this.handleViewChange(event)}
				>
					<option>all</option>
					<option>pending</option>
				</Input>
			</div>
		);

		const iconFontStyle = {
			fontSize: 16,
			color: "white"
		};

		const tableActions = [
			{
				icon: "visibility",
				tooltip: "View",
				onClick: (event, rowData) => {
					this.handleComplaintClick(rowData);
				},
				iconProps: {
					style: { ...iconFontStyle, backgroundColor: "black", borderRadius: "100px" }
				}
			}
		];

		const editAction = {
			icon: "edit",
			tooltip: "Update Complaint",
			onClick: (event, rowData) => {
				this.handleComplaintUpdate(rowData);
			},
			iconProps: {
				style: { ...iconFontStyle, backgroundColor: "blue", borderRadius: "100px" }
			}
		};

		const deleteAction = {
			icon: "close",
			tooltip: "Delete Complaint",
			onClick: (event, rowData) => {
				this.handleDeleteComplaint(rowData._id);
			},
			iconProps: {
				style: { ...iconFontStyle, backgroundColor: "red", borderRadius: "100px" }
			}
		};

		if (GetTokenInfo().type === "student") {
			tableActions.push(editAction, deleteAction);
		} else {
			tableActions.push(deleteAction);
		}
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
							<NewComplaint
								open={this.state.open}
								close={() => this.closeDialog(false)}
								submit={obj => this.createNewComplaint(obj)}
								OnChange={event => this.handleChange(event)}
								complaint={this.state.complaint}
							/>
							<ViewComplaint
								open={this.state.openview}
								close={() => this.closeDialog(true)}
								update={this.state.update}
								complaint={this.state.complaint}
								valueChanged={(event, reply = false) => this.handleChange(event, reply)}
								Update={() => this.updateComplaint()}
								updating={this.state.updating}
								followups={this.state.followups}
								followup={this.state.followup}
								addFollowup={() => this.addFollowup(this.state.complaint._id)}
								deleteFollowup={followup_id => this.deleteFollowup(followup_id)}
							/>
							<MaterialTable
								columns={tableHeaders}
								data={this.state.filteredData}
								title={leftTableActions}
								localization={localizationOptions}
								options={{
									columnsButton: true,
									actionsColumnIndex: -1,
									rowStyle: rowData => ({
										backgroundColor:
											this.state.selected_complaint &&
												this.state.selected_complaint._id === rowData._id
												? "#EEE"
												: "#FFF"
									})
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
