import axios from "axios";
var cart = "";
export default async function postCartAdd(obj) {
    await axios
        .post(obj.url, obj.data)
        .then(res => {
            if (!res.data.error) {
                cart = res.data.carts;
                console.log(res.data.error);
            } else {
                console.log(res.data.message);
            }
        })
        .catch(err => console.log(err));
    return cart;
}