import {NextPage} from "next";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Notify} from "notiflix";

const MainPage:NextPage = () => {
    const router = useRouter();

    const updateAuthentication = async () => {
        const res = await axios.post("/api/account", {order: "logout"}, {withCredentials: true});
        console.log(res);
        if (res.data.success) {
            router.push("/authentication/login");
        } else {
            Notify.failure("Failed to logout");
        }
    }

    return <section className={"container"}>
        <div onClick={updateAuthentication} className={"clickable primary text-center"}>Logout</div>
    </section>
}

export default MainPage;