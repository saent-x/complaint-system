
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
        padding: theme.spacing.unit,
        justifyContent: "center"
    },
    inputBox: {
        marginTop: "10px",
        marginBottom: "10px",
        height: "50px",
        alignSelf: "center"
    },
    leveler: {
        maxWidth: "300px",
        height: "300px"
    },
    loginBtn: {
        width: "100px",
        height: "50px",
        backgroundColor: "black",
        color: "white",
        marginTop: "10px",
        marginBottom: "10px",

        '&:hover': {
            backgroundColor: "black"
        }
    }
});