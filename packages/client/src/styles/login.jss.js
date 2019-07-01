export const LoginStyle = theme => ({
	loginContainer: {
		width: "25%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		minWidth: "300px",
		minHeight: "400px",
		margin: "auto",
		marginTop: "50px",
		justifyContent: "center"
	},
	inputBox: {
		marginTop: "10px",
		width: "250px",
		marginBottom: "10px",
		height: "50px",
		alignSelf: "center"
	},
	typeSelect: {
        width: "150px",
        marginBottom: "10px"
	},
	leveler: {
		maxWidth: "300px",
		height: "auto",
		display: "flex",
		flexDirection: "column"
	},
	loginBtn: {
		width: "100px",
		height: "50px",
		backgroundColor: "black",
		color: "white",
		marginTop: "10px",

		"&:hover": {
			backgroundColor: "black"
		}
	}
});
