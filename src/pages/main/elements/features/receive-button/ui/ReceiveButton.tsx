import {Id} from "../../../../../../entities/id/model/Id.tsx";
import {useDispatch} from "react-redux";
import {setStatus} from "../../../../../../entities/status/model/StatusSlice.tsx";

interface LoginButtonProps {
    uuid: Id |null;
}

const ReceiveButton: React.FC<LoginButtonProps> = ({ uuid }) => {

    const dispatch = useDispatch();

    const handleLogin = () => {
        if (uuid)
        {
            getStatusCrackHash(uuid.value);
            console.log("Done");
        }
        else {
            console.log("Undone");
        }

    };

    const getStatusCrackHash = (requestId: string) => {
        fetch(`http://localhost:8080/api/hash/status?requestId=${encodeURIComponent(requestId)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Response:", data);

                dispatch(setStatus({status:data.status, text:data.data, progress:data.progress}));

            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };



    return (
        <button onClick={handleLogin}>
            <span className="log-in-text">
                {"Получить статус"}
            </span>
        </button>
    );
};

export default ReceiveButton;