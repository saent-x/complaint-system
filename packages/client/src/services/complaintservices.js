import { $axios, GetTokenInfo, DeleteToken, TransformData, handleError } from "../utilities/helper";

class ComplaintServices{
    constructor(self) {
        this.self = self;
    }

    getComplaint(complaint_id) {
        $axios()
            .get(`/api/comp?id=${complaint_id}`)
            .then(res => {
                const obj = { ...this.self.state };
                obj.complaint = { ...res.data };
                this.self.setState(obj);
            })
            .catch(error => handleError(error, this.self.props));
    }
}

export default ComplaintServices;