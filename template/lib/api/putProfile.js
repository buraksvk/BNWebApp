import axios from "axios";
var profile = "";
export default async function putProfile(obj) {
    await axios
        .put(obj.url, obj.data)
        .then(res => {
            if (!res.data.error) {
                token = res.data;
                console.log(profile);
            } else {
                console.log(res.data.message);
            }
        })
        .catch(err => console.log(err));
    return profile;
}