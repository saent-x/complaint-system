import React from "react";
import { Row, Col } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-dark">
              © {(new Date()).getFullYear()}{" "}
              <a
                style={{ color: "#000"}}
                className="font-weight-bold ml-1"
                href="https://www.esentry.xyz"
                rel="noopener noreferrer"
                target="_blank"
              >
                esentry
              </a>
            </div>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
