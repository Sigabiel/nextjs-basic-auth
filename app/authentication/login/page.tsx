"use client";

import {NextPage} from "next";
import styles from "../../../styles/pages/Login.module.css";

let username = "";
let password = "";

const LoginPage:NextPage = () => {
    return <section className={`${styles.mainPane}`}>
        <div className={`d-flex flex-column justify-content-center align-items-center ${styles.contentBox}`}>
            <h2>Login</h2>

            <input onChange={e => username = e.currentTarget.value} type={"text"} placeholder={"Username"} className={"mt-3 clickable"} />
            <input onChange={e => password = e.currentTarget.value} type={"password"} placeholder={"Password"} className={"mt-1 clickable"} />
            <div  className={"text-center clickable secondary mt-3 center"}>Login</div>

        </div>
    </section>
}

export default LoginPage;