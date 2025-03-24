import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import "./InputField.css";

// Описываем интерфейс методов, которые можно вызвать извне
export interface IInputField {
    getValue: () => string;
    setPlaceholder: (newPlaceholder: string) => void;
}

interface InputFieldProps {
    placeholder?: string;
}

// Используем forwardRef для создания ссылки на внутренние методы
const InputField = forwardRef<IInputField, InputFieldProps>(({ placeholder }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder);

    // Позволяем родителю вызвать getValue()
    useImperativeHandle(ref, () => ({
        getValue: () => inputRef.current?.value || "",
        setPlaceholder: (newPlaceholder: string) => setCurrentPlaceholder(newPlaceholder),
    }));

    return (
        <div className="input-container">
            <input
                ref={inputRef}
                type="text"
                className="input-field"
                placeholder={currentPlaceholder || "Введите текст..."}
            />
        </div>
    );
});

export default InputField;