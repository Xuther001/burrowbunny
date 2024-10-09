import models from '../index.js';
import { generateToken } from '../util/JwtUtil.js';

const { User } = models;

const createUser = async (userData) => {
    try {
        const newUser = await User.create(userData);
        const token = generateToken(newUser);
        return { user: newUser, token };
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.findAll({ 
            attributes: ['username', 'email']
        });
        return users;
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};

const getUserById = async (userId) => {
    try {
        const user = await User.findByPk(userId, {
            attributes: ['username', 'email']
        });
        return user;
    } catch (error) {
        throw new Error('Error fetching user by ID: ' + error.message);
    }
};

const updateUser = async (userId, updateData) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return null;
        }
        const updatedUser = await user.update(updateData);
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

const patchUser = async (userId, patchData) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return null;
        }
        const patchedUser = await user.update(patchData, { fields: Object.keys(patchData) });
        return patchedUser;
    } catch (error) {
        throw new Error('Error patching user: ' + error.message);
    }
};

const deleteUser = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return null;
        }
        await user.destroy();
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    patchUser,
    deleteUser
};