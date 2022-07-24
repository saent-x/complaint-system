import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import {
	Collapse,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Media,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Container,
	Row,
	Col
} from "reactstrap";
import ProfileDropdownMenu from "../components/DropdownMenu";
import profileImg from "../assets/img/icons/common/profile.svg";
import "../styles/Sidebar.css";

class Sidebar extends React.Component {
	state = {
		collapseOpen: false
	};
	constructor(props) {
		super(props);
		this.activeRoute.bind(this);
	}
	// verifies if routeName is the one active (in browser input)
	activeRoute(routeName) {
		return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
	}
	// toggles collapse between opened and closed (true/false)
	toggleCollapse = () => {
		this.setState({
			collapseOpen: !this.state.collapseOpen
		});
	};
	// closes the collapse
	closeCollapse = () => {
		this.setState({
			collapseOpen: false
		});
	};
	// creates the links that appear in the left menu / Sidebar
	createLinks = routes => {
		return routes.map((prop, key) => {
			return (
				<NavItem key={key}>
					<NavLink to={prop.layout + prop.path} tag={NavLinkRRD} onClick={this.closeCollapse} activeClassName="active">
						<i className={prop.icon} />
						{prop.name}
					</NavLink>
				</NavItem>
			);
		});
	};
	render() {
		const { routes, logo } = this.props;
		let navbarBrandProps;
		if (logo && logo.innerLink) {
			navbarBrandProps = {
				to: logo.innerLink,
				tag: Link
			};
		} else if (logo && logo.outterLink) {
			navbarBrandProps = {
				href: logo.outterLink,
				target: "_blank"
			};
		}
		return (
			<Navbar className="navbar-vertical fixed-left navbar-dark bg-dark" expand="md" id="sidenav-main">
				<Container fluid>
					{/* Toggler */}
					<button className="navbar-toggler" type="button" onClick={this.toggleCollapse}>
						<span className="navbar-toggler-icon" />
					</button>
					{/* Brand Logo */}
					{logo ? (
						<NavbarBrand className="pt-2 nav-brand" {...navbarBrandProps}>
							<img alt={logo.imgAlt} className="navbar-brand-img img-brand" src={logo.imgSrc} />
							<span className="text-brand-hidden">CMS</span>
							<p className="text-brand">Complaint System</p>
						</NavbarBrand>
					) : null}
					{/* User */}
					<Nav className="align-items-center d-md-none">
						<UncontrolledDropdown nav>
							<DropdownToggle nav className="nav-link-icon">
								<i className="ni ni-bell-55" />
							</DropdownToggle>
							<DropdownMenu aria-labelledby="navbar-default_dropdown_1" className="dropdown-menu-arrow" right>
								<DropdownItem>Scan #1 complete!</DropdownItem>
								<DropdownItem>scan #3 complete!</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>Something else here</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>

						{/* Avatar (only on mobile view) */}
						<UncontrolledDropdown nav>
							<DropdownToggle nav>
								<Media className="align-items-center">
									<span className="avatar avatar-sm rounded-circle">
										<img alt="..." src={profileImg} />
									</span>
								</Media>
							</DropdownToggle>
							<ProfileDropdownMenu />
						</UncontrolledDropdown>
					</Nav>
					{/* Collapse */}
					<Collapse navbar isOpen={this.state.collapseOpen}>
						{/* Collapse header */}
						<div className="navbar-collapse-header d-md-none">
							<Row>
								{logo ? (
									<Col className="collapse-brand" xs="6">
										{logo.innerLink ? (
											<Link to={logo.innerLink}>
												<img alt={logo.imgAlt} src={logo.imgSrc} />
											</Link>
										) : (
											<a href={logo.outterLink}>
												<img alt={logo.imgAlt} src={logo.imgSrc} />
											</a>
										)}
									</Col>
								) : null}
								<Col className="collapse-close" xs="6">
									<button className="navbar-toggler" type="button" onClick={this.toggleCollapse}>
										<span />
										<span />
									</button>
								</Col>
							</Row>
						</div>
						{/* Navigation */}
						<Nav navbar>{this.createLinks(routes)}</Nav>
						{/* Divider */}
						<hr className="my-3" />
					</Collapse>
				</Container>
			</Navbar>
		);
	}
}

Sidebar.defaultProps = {
	routes: [{}]
};

Sidebar.propTypes = {
	// links that will be displayed inside the component
	routes: PropTypes.arrayOf(PropTypes.object),
	logo: PropTypes.shape({
		// innerLink is for links that will direct the user within the app
		// it will be rendered as <Link to="...">...</Link> tag
		innerLink: PropTypes.string,
		// outterLink is for links that will direct the user outside the app
		// it will be rendered as simple <a href="...">...</a> tag
		outterLink: PropTypes.string,
		// the image src of the logo
		imgSrc: PropTypes.string.isRequired,
		// the alt for the img
		imgAlt: PropTypes.string.isRequired
	})
};

export default Sidebar;
