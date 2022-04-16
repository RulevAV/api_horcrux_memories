import { useHistory } from "react-router-dom";
import { registrationAPI } from "../../http/endpoints/user";
import { useModalAlert } from "../../providers/Alert/modal";
import Registration from "./Registration";

const RegistrationContainer = () => {
    const history = useHistory();
    const { show } = useModalAlert();

    const alertModal = async (username: string, firstName: string, lastName: string, password: string, email: string) => {
        try {
            const res = await registrationAPI(username, firstName, lastName, password, email);
            show({
                title: "Успех",
                variant: "success",
                dialogText: res
            });
            history.push("/login");
        } catch (error: any) {
            show({
                title: "Ошибка регистрации",
                variant: "danger",
                dialogText: error.response.data
            });
        }
    }

    return <Registration alertModal={alertModal} />
}

export default RegistrationContainer;
