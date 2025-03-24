import {IInputField} from "../../input";
import { useDispatch } from "react-redux";
import {setId} from "../../../../../../entities/id/model/IdSlice.tsx";

interface LoginButtonProps {
    inputText: React.RefObject<IInputField |null>;
    maxLenght: React.RefObject<IInputField |null>;
}

const SendButton: React.FC<LoginButtonProps> = ({ inputText,maxLenght }) => {


    const dispatch = useDispatch();

    const handleLogin = () =>
    {
        const hash = inputText?.current?.getValue() || "";
        const maxLenghtTmp = maxLenght?.current?.getValue() || "";

        crackHash(hash,maxLenghtTmp);
    };

    const crackHash = (hash:string,maxLenght:string)  => {

        if (/\d/.test(maxLenght))
        {
            const body = {
                hash: hash,
                maxLength: maxLenght,
            };

            console.log("body: ", body);

            fetch(`http://localhost:8080/api/hash/crack`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then((response) => {
                    if (response.headers.get("Content-Length") === "0") {
                        return null;
                    }
                    return response.json();
                })
                .then((data) => {


                    const id: string = data.requestId;

                    dispatch(setId({value: id}));

                    console.log(id);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
        else
        {
            console.error("maxLength not number");
        }
    }


    return (
        <button onClick={handleLogin}>
            <span className="log-in-text">
                {"Взломать"}
            </span>
        </button>
    );
};

export default SendButton;