import {NextPage} from "next";
import styles from "../../styles/pages/Login.module.css";
import axios from "axios";
import {Notify} from "notiflix";

let username = "";
let password = "";

const LoginPage:NextPage = () => {
    const login = async () => {
        const response = await axios.post("/api/account", { order: "authentication", username, password }, { withCredentials: true });
        if (response.data.success) {
            window.location.href = "/internal";
        } else {
            Notify.failure("Failed to login! ", response.data.response);
        }
    }

    return <section className={`${styles.mainPane}`}>
        <div className={`d-flex flex-column justify-content-center align-items-center ${styles.contentBox}`}>
            <h2>Login</h2>

            <input onChange={e => username = e.currentTarget.value} type={"text"} placeholder={"Username"} className={"mt-3 clickable"} />
            <input onChange={e => password = e.currentTarget.value} type={"password"} placeholder={"Password"} className={"mt-3 clickable"} />
            <div onClick={login} className={"text-center clickable secondary mt-3 center"}>Login</div>

        </div>
    </section>
}

export default LoginPage;