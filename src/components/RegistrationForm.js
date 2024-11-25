import React, { useState } from "react";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password, confirmPassword } = formData;

        // Проверяем, что все поля заполнены
        if (!username || !password || !confirmPassword) {
            setError("Все поля должны быть заполнены.");
            setSuccessMessage("");
            return;
        }

        // Проверяем, что пароли совпадают
        if (password !== confirmPassword) {
            setError("Пароли не совпадают.");
            setSuccessMessage("");
            return;
        }

        // Проверяем, что пользователь уже зарегистрирован
        if (registeredUsers.includes(username)) {
            setError("Такой пользователь уже существует.");
            setSuccessMessage("");
            return;
        }

        // Добавляем пользователя в список зарегистрированных
        setRegisteredUsers((prev) => [...prev, username]);
        setFormData({ username: "", password: "", confirmPassword: "" });
        setError("");
        setSuccessMessage("Регистрация прошла успешно!");
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Имя пользователя:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Подтвердите пароль:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Зарегистрироваться</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </div>
    );
};

export default RegistrationForm;
