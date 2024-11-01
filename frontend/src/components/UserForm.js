import React, { useEffect, useState } from 'react';
import styles from './userForm.module.css';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';

const UserForm = () => {
    const [userList, setUserList] = useState([]);
    const [formData, setFormData] = useState({ id: '', name: '', email: '', password: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const users = await getUsers();
            setUserList(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateUser(formData.id, formData);
                setIsEditing(false);
            } else {
                await createUser(formData);
            }
            setFormData({ id: '', name: '', email: '', password: '' });
            fetchUsers();
        } catch (error) {
            console.error('Error in form submission:', error);
        }
    };

    const handleEdit = (user) => {
        setFormData(user);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Flask Application for CRUD Operations on MongoDB and React</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    placeholder="ID"
                    required
                />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">{isEditing ? 'Update' : 'Create'} User</button>
            </form>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        {/* <th>Password</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            {/* <td>{user.password}</td> */}
                            <td className={styles.actionButtons}>
                                <button
                                    className={`${styles.deleteBtn} ${styles.button}`}
                                    onClick={() => handleEdit(user)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={`${styles.deleteBtn} ${styles.button}`}
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserForm;
