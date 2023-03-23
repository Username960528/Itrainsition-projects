import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/register', { username, email, password });
            // Обработайте успешный результат, например, перенаправление на страницу аутентификации
        } catch (error) {
            // Обработайте ошибки, возникшие при отправке данных на сервер
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Имя пользователя</Form.Label>
                <Form.Control type="text" placeholder="Введите имя пользователя" value={username} onChange={handleUsernameChange} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Введите email" value={email} onChange={handleEmailChange} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={handlePasswordChange} />
            </Form.Group>

            <Button variant="primary" type="submit">Зарегистрироваться</Button>
        </Form>
    );
};

export default Register;
