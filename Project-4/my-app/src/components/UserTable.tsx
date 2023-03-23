import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonGroup, Form } from 'react-bootstrap';
import axios from 'axios';


interface UserTableProps {
    onBlock: (userIds: number[]) => void;
    onUnblock: (userIds: number[]) => void;
    onDelete: (userIds: number[]) => void;
  }
  
interface User {
  id: number;
  username: string;
  email: string;
  registrationDate: string;
  lastLogin: string;
  status: string;
}

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleSelectUser = (event: React.ChangeEvent<HTMLInputElement>, userId: number) => {
    if (event.target.checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const blockUsers = async () => {
    try {
      await axios.post('/api/users/block', { userIds: selectedUsers });
      const updatedUsers = users.map((user) =>
        selectedUsers.includes(user.id) ? { ...user, status: 'blocked' } : user
      );
      setUsers(updatedUsers);
      setSelectedUsers([]);
    } catch (error) {
      // Обработайте ошибки, возникшие при отправке данных на сервер
    }
  };

  const unblockUsers = async () => {
    try {
      await axios.post('/api/users/unblock', { userIds: selectedUsers });
      const updatedUsers = users.map((user) =>
        selectedUsers.includes(user.id) ? { ...user, status: 'active' } : user
      );
      setUsers(updatedUsers);
      setSelectedUsers([]);
    } catch (error) {
      // Обработайте ошибки, возникшие при отправке данных на сервер
    }
  };

  const deleteUsers = async () => {
    try {
      await axios.post('/api/users/delete', { userIds: selectedUsers });
      const updatedUsers = users.filter((user) => !selectedUsers.includes(user.id));
      setUsers(updatedUsers);
      setSelectedUsers([]);
    } catch (error) {
      // Обработайте ошибки, возникшие при отправке данных на сервер
    }
  };

  return (
    <>
      <ButtonGroup className="mb-3">
        <Button onClick={blockUsers}>Block</Button>
        <Button onClick={unblockUsers}>Unblock</Button>
        <Button onClick={deleteUsers}>Delete</Button>
      </ButtonGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={handleSelectAll}
                checked={users.length > 0 && selectedUsers.length === users.length}
              />
            </th>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Registration Date</th>
            <th>Last Login</th>
            <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
            <tr key={user.id}>
            <td>
            <Form.Check
            type="checkbox"
            onChange={(event) => handleSelectUser(event, user.id)}
            checked={selectedUsers.includes(user.id)}
            />
            </td>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.registrationDate}</td>
            <td>{user.lastLogin}</td>
            <td>{user.status}</td>
            </tr>
            ))}
            </tbody>
            </Table>
            </>
            );
            };

            export default UserTable;
