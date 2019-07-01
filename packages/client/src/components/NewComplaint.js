import React, { PureComponent } from "react";
import { Label, Modal, ModalBody, ModalHeader, ModalFooter, Button, Form, Input, FormGroup } from "reactstrap";

export default class NewComplaintModal extends PureComponent {
	state = {
		Subject: "",
		Message: "",
		ComplaintRegion: "Hostel"
	};

	handleChange = event => {
		console.log(event.target.id);
		this.setState({ [event.target.id]: event.target.value });
	};

	render() {
		const regions = ["Hostel", "Faculty", "Cafeteria", "Others"];
		return (
			<Modal isOpen={this.props.open} backdrop={true}>
				<ModalHeader toggle={this.toggle}>Create a new complaint</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for="Subject">Subject</Label>
							<Input type="text" name="Subject" id="Subject" value={this.state.Subject} onChange={this.handleChange} />
						</FormGroup>
						<FormGroup>
							<Label for="Message">Message</Label>
							<Input
								style={{ height: "150px" }}
								type="textarea"
								name="Message"
								id="Message"
								value={this.state.Message}
								onChange={this.handleChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="ComplaintRegion">Regions</Label>
							<Input style={{ maxWidth: "200px" }} type="select" name="ComplaintRegion" id="ComplaintRegion" onChange={this.handleChange}>
								{regions.map((value, key) => (
									<option value={value} key={key}>
										{value}
									</option>
								))}
							</Input>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="success" onClick={() => this.props.submit(this.state)}>
						Submit
					</Button>{" "}
					<Button color="secondary" onClick={this.props.close}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}
