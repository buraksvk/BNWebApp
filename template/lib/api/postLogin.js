import axios from "axios";
var token = "";
export default async function postLogin(obj) {
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            if (!res.data.error) {
                token = res.data.user_token;
                console.log(token);
                console.log(res.config);
            } else {
                console.log(res.data.message);
            }
        })
        .catch(err => console.log(err));
    return token;
}