const express = require('express');
const {connectMongoDb} = require('./connection')
const{logReqRes} = require('./middlewares')
const userRouter = require('./routes/user')
const app = express();
const PORT = 5000;

//connection
connectMongoDb('mongodb://127.0.0.1:27017/classy-cars')

//connecting
// mongoose.connect('mongodb://127.0.0.1:27017/classy-cars')
//     .then(() => console.log('mongodb connected'))
//     .catch((err) => console.log('mongo error', err))


// const User = mongoose.model('user', userScehema)

//*****middleware plugins */
app.use(express.urlencoded({extended: false}))
app.use(logReqRes('log.txt'))


//Routes
app.use('/user', userRouter)

app.listen(PORT, () => console.log('server started at port 5000'));


//middleware - plugins
// app.use(express.urlencoded({ extended: false }))


// app.use((req, res) => {
//     fs.appendFile(
//         'log.txt',
//         `\n${Date.now()}:${req.ip} ${req.method} : ${req.path}\n`,
//         (err, data) => {
//             nextTick();
//         }
//     )
// })





// routes
// app.get('/users', async (req, res) => {
//     const allDbUsers = await User.find({})
//     const html = `
//     <ul> 
//     ${allDbUsers.map((user) => (
//         `<li>${user.firstName}- ${user.email}</li>`
//     ))}
//     </ul>
//     `;
//     res.send(html)
// })

// app.get('/api/users', async (req, res) => {
//     const allDbUsers = await User.find({})

//     return res.json(allDbUsers);
// })

// //delete user funtion
// // const deleteUser = (id) => {
// //     const userIndex = users.findIndex(user => user.id === id);

// //     if (userIndex !== -1) {
// //         const removedUser = users.splice(userIndex, 1)[0];
// //         return removedUser;
// //     } else {
// //         return null; // User not found
// //     }
// // };

// // update user function  from fs or mock data

// // const updateUser = (id, newData) => {
// //     const user = users.find(user => user?.id === id);

// //     if (user) {
// //         Object.assign(user, newData)
// //         return user;
// //     }
// //     else {
// //         return null // user not found
// //     }

// // }

// // updated user from mongo db

// // const updateUser = async (id, newData) => {
// //     const user = await User.findById(id);

// //     if (user) {
// //         Object.assign(user, newData)
// //         await user.save(); // Save the changes to the database
// //         return user;
// //     }
// //     else {
// //         return null // user not found
// //     }

// // }



// // single route 
// app.route('/api/users/:id')
//     .get(async (req, res) => {

//         const id = Number(req.params.id);

//         // from Mongo db databse
//         const user = await User.findById(req.params.id)

//         // it is from mock data
//         // const user = users.find(user => user.id === id)
//         if (!user) return res.status(404).json({ error: 'data not found' })
//         return res.json(user)
//     })

//     // .patch(async(req, res) => {
//     //     const id = Number(req.params.id);

//     //     // from mock data
//     //     // const updatedUser = updateUser(id, req.body)

//     //     //  from mongo db

//     //     const updatedUser = await User.findByIdAndUpdate

//     //     if (updatedUser) {
//     //         fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
//     //             if (err) {

//     //                 return res.status(500).json({ status: 'error' })
//     //             }
//     //             return res.json({ status: 'success', id: users.length })

//     //         })
//     //     } else {
//     //         return res.status(404).json({ status: 'error', message: 'User not found' });
//     //     }
//     // })

//     // .put(async (req, res) => {

//     //     const updatedUser = updateUser(req.params.id, req.body)

//     //     if (updatedUser) {
//     //         return res.json({ status: 'Success' });
//     //     } else {
//     //         return res.status(404).json({ status: 'error', message: 'User not found' });
//     //     }

//     //     // return res.json({ status: 'Success' });
//     // })

//     .put(async (req, res) => {

//         const updateUser = async (id, newData) => {
//             const updatedUser = await User.findByIdAndUpdate(id, newData, { new: true });
//             return updatedUser;
//         }

//         const updatedUser = await updateUser(req.params.id, req.body);

//         if (updatedUser) {
//             return res.json({ status: 'Success', user: updatedUser });
//         } else {
//             return res.status(404).json({ status: 'error', message: 'User not found' });
//         }
//     })

//     // .put(async (req, res) => {
//     //     await User.findByIdAndUpdate(req.params.id, { lastName: 'Changed' })
//     //     return res.json({ status: 'Success' });
//     // })
//     .delete(async (req, res) => {

//         const removedUser = await User.findByIdAndDelete(req.params.id);

//         if (removedUser) {
//             return res.json({ status: 'success', removedUser: { removedUser } });
//         } else {
//             return res.status(404).json({ status: 'error', message: 'User not found' });
//         }

//         // if (removedUser) {
//         //     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
//         //         if (err) {
//         //             return res.status(500).json({ status: 'error', message: 'Internal server error' });
//         //         }
//         //         return res.json({ status: 'success', removedUser, remainingUsers: users.length });
//         //     });
//         // } else {
//         //     return res.status(404).json({ status: 'error', message: 'User not found' });
//         // }
//     })

// app.post('/api/users', async (req, res) => {

//     const body = req.body;
//     if (!body || !body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle) {
//         return res.status(400).json({ msg: "All fields are required." })
//     }

//     const result = await User.create({
//         firstName: body.firstName,
//         lastName: body?.lastName,
//         email: body.email,
//         gender: body.gender,
//         jobTitle: body.jobTitle
//     })
//     console.log('result', result)
//     return res.status(201).json({ message: 'Success', result })

//     //***** using fs   */
//     // users.push({ ...body, id: users.length + 1 })
//     // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
//     //     return res.status(201).json({ status: 'success', id: users.length })
//     // })
// })


// common api route /api/users/:id // we can made single one

// app.get('/api/users/:id', (req,res)=>{
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id)
//     return res.json(user)
// })

// app.post('/api/users', (req, res)=>{
//     return res.json({status: 'pending'})
// })

// app.patch('/api/users/:id', (req, res)=>{
//     return res.json({status: 'pending'})
// })

// app.delete('/api/users/:id', (req, res)=>{
//     return res.json({status: 'pending'})
// })

// app.listen(PORT, () => console.log('server started at port 5000'));