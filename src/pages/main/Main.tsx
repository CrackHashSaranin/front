import { useRef } from "react";
import {InputField, IInputField} from "./elements/features/input";
import {SendButton} from "./elements/features/send-button";
import {ReceiveButton} from "./elements/features/receive-button";
import {useSelector} from "react-redux";
import {RootState} from "../../entities/store.ts";
import "./Main.css";

function Main() {

    const id = useSelector((state: RootState) => state.id.value);
    const status = useSelector((state: RootState) => state.status.value);

    const inputText = useRef<IInputField>(null);
    const maxLenght = useRef<IInputField>(null);

    return (
        <div className="main-container">
            <h1 className="title">Взломщик паролей</h1>

            <div className="form">
                <InputField ref={inputText} placeholder="Хэш" />
                <InputField ref={maxLenght} placeholder="Максимальное количество символов в пароле" />
                <SendButton inputText={inputText} maxLenght={maxLenght} />
                <ReceiveButton uuid={id} />
            </div>

            {status && (
                <div className="status-card">
                    <p><strong>Статус:</strong> {status.status}</p>
                    <p><strong>Прогресс:</strong> {status.progress}%</p>
                    <p><strong>Расшифрованный текст:</strong> {status.text}</p>
                </div>
            )}
        </div>
    );
}

export default Main;