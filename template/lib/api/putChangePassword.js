import axios from "axios";
var password = "";
export default async function putChangePassword(obj) {
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            if (!res.data.error) {
                token = res.data;
                console.log(password);
            } else {
                console.log(res.data.message);
            }
        })
        .catch(err => console.log(err));
    return password;
}