import React from "react";
import { Label, Modal, ModalBody, ModalHeader, ModalFooter, Button, Form, Input, FormGroup } from "reactstrap";
import "../styles/ViewComplaint.css";
import { $axios, handleError } from "../utilities/helper";

class ViewComplaint extends React.Component {
	render() {
		const modal_class = this.props.update ? "" : "modal-responsive";
		const marginFix = { marginBottom: "0" };
		const divAlign = { marginBottom: "10px" };
		const lineStyle = { marginTop: "20px", marginBottom: "10px" };

		return (
			<Modal className={modal_class} isOpen={this.props.open} backdrop={true}>
				<ModalHeader>Complaint Details</ModalHeader>
				<ModalBody>
					{!this.props.update ? (
						<div>
							<div style={divAlign}>
								<Label style={marginFix} for="Subject">
									Subject
								</Label>
								<h5>{this.props.complaint.Subject}</h5>
							</div>
							<div style={divAlign}>
								<Label style={marginFix} for="Message">
									Message
								</Label>
								<h5>{this.props.complaint.Message}</h5>
							</div>
							<div style={divAlign}>
								<Label style={marginFix} for="ComplaintRegion">
									ComplaintRegion
								</Label>
								<h5>{this.props.complaint.ComplaintRegion}</h5>
							</div>
						</div>
					) : (
						<Form>
							<FormGroup>
								<Label for="Subject">Subject</Label>
								<Input
									onChange={event => this.props.valueChanged(event)}
									value={this.props.complaint.Subject}
									id="Subject"
									name="Subject"
								/>
							</FormGroup>
							<FormGroup>
								<Label for="Message">Message</Label>
								<Input
									style={{ height: "150px" }}
									onChange={event => this.props.valueChanged(event)}
									value={this.props.complaint.Message}
									type="textarea"
									id="Message"
									name="Message"
								/>
							</FormGroup>
						</Form>
					)}
					{!this.props.update && this.props.followups.length > 0 ? (
						<>
							<hr style={lineStyle} />
							<Label>Follow Ups</Label>
							<div id="followup-container" className="followup-container">
								{this.props.followups.map((followup, key) => (
									<div className="followup-card" key={key}>
										<p className="followup-acc">{followup.Name}</p>
										<p className="followup-mess">{followup.Message}</p>
										<p className="followup-date">{followup.DateAndTime}</p>
										{followup.canDelete ? (
											<a
												className="followup-delete"
												onClick={() => this.props.deleteFollowup(followup._id)}
											>
												delete
											</a>
										) : null}
									</div>
								))}
							</div>
							<br />
						</>
					) : null}
					{!this.props.update ? (
						<div>
							<FormGroup>
								<Label for="Reply">Reply</Label>
								<Input
									onChange={event => this.props.valueChanged(event, true)}
									value={this.props.followup.Message}
									id="Message"
									name="Message"
								/>
							</FormGroup>
						</div>
					) : null}
				</ModalBody>
				<ModalFooter>
					{this.props.update ? (
						<Button disabled={this.props.updating} color="info" onClick={() => this.props.Update()}>
							{this.props.updating ? "Updating" : "Update"}
						</Button>
					) : (
						<Button color="success" onClick={() => this.props.addFollowup(this.props.complaint._id)}>
							Reply
						</Button>
					)}
					<Button disabled={this.props.updating} onClick={() => this.props.close()} color="secondary">
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

export default ViewComplaint;
