import React, { PureComponent } from "react";
import {
  Label,
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Table
} from "reactstrap";

export default class ScanDetails extends PureComponent {
  handleChange = event => {
    console.log(event.target.id);
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    const data = this.props.data;
    const tableEntries = data
      ? data.map(row => (
          <tr>
            <td>{row.system}</td>
            <td>{row.progress}</td>
            <td>{row.found}</td>
          </tr>
        ))
      : null;
    return (
      <Modal isOpen={this.props.open} backdrop={true}>
        <ModalHeader toggle={this.toggle}>{`${this.props.scan ? this.props.scan.label : null} - ${"Running"}`}</ModalHeader>
        <ModalBody>
          <Card className="shadow">
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">System</th>
                  <th scope="col">Progress</th>
                  <th scope="col">Found</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>{tableEntries}</tbody>
            </Table>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.close}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
