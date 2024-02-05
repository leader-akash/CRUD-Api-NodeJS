const User = require('../models/user')

async function handleGetAllUsers(req,res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers)
}

async function handleGetUserById(req,res) {
    const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ error: 'data not found' })
        return res.json(user)
}

async function handleUpdateUserById(req,res){
    const updateUser = async (id, newData) => {
        const updatedUser = await User.findByIdAndUpdate(id, newData, { new: true });
        return updatedUser;
    }

    const updatedUser = await updateUser(req.params.id, req.body);

    if (updatedUser) {
        return res.json({ status: 'Success', user: updatedUser });
    } else {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }
}

async function handleDeleteUserById(req,res) {

    const removedUser = await User.findByIdAndDelete(req.params.id);

    if (removedUser) {
        return res.json({ status: 'success', removedUser: { removedUser } });
    } else {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }
}

async function handleCreateNewUser(req,res) {
    
    const body = req.body;
    if (!body || !body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle) {
        return res.status(400).json({ msg: "All fields are required." })
    }

    const result = await User.create({
        firstName: body.firstName,
        lastName: body?.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle
    })
    console.log('result', result)
    return res.status(201).json({ message: 'Success', result })
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}