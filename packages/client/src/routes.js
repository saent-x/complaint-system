import Dashboard from "views/Dashboard";
// import Icons from "views/Icons.jsx";
import InProgress from "./components/InProgress";
import Complaints from "./views/Complaints";
import PendingComplaints from "./views/PendingComplaints";
import ResolvedComplaints from "./views/ResolvedComplaints";

var routes = {
	studentportal: [
		{
			path: "/index",
			name: "Dashboard",
			icon: "ni ni-tv-2 text-blue",
			component: Dashboard,
			layout: "/portal"
		},
		{
			path: "/complaints",
			name: "Complaints",
			icon: "ni ni-sound-wave text-red",
			component: Complaints,
			layout: "/portal"
		},
		{
			path: "/pendingcomplaints",
			name: "Pending Complaints",
			icon: "ni ni-key-25 text-green",
			component: PendingComplaints,
			layout: "/portal"
		},
		{
			path: "/resolvedcomplaints",
			name: "Resolved Complaints",
			icon: "ni ni-planet text-blue",
			component: ResolvedComplaints,
			layout: "/portal"
		}
	],
	staffportal: [
		{
			path: "/index",
			name: "Dashboard",
			icon: "ni ni-tv-2 text-blue",
			component: Dashboard,
			layout: "/portal"
		}
	]
};
export default routes;
