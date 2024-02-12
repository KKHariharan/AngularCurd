const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const List = require('../schemas/listSchema'); // Import your Mongoose model

// Route for adding an employee
router.post('/emp', async (req, res) => {
    try {
        // Assuming you have the employee data in the request body
        const { name, age, desigination, manager_id } = req.body;

        // Check if manager_id is a valid ObjectId
        if (manager_id && !mongoose.Types.ObjectId.isValid(manager_id)) {
            return res.status(400).json({ success: false, message: 'Invalid manager_id' });
        }

        // Create a new employee instance
        const newEmployee = new List({
            name,
            age,
            desigination,
            manager_id,
        });

        // Save the employee to the database
        const savedEmployee = await newEmployee.save();

        res.status(201).json({ success: true, message: 'Employee added successfully', data: savedEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Route for adding a manager
router.post('/man', async (req, res) => {
    try {
        // Assuming you have the manager data in the request body
        const { name, age, desigination } = req.body;

        // Create a new manager instance
        const newManager = new List({
            name,
            age,
            desigination,
        });

        // Save the manager to the database
        const savedManager = await newManager.save();

        res.status(201).json({ success: true, message: 'Manager added successfully', data: savedManager });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/list', async (req, res) => {
    try {
        const allData = await List.find({}).populate('manager_id'); // Use 'manager_id' instead of 'List'
        console.log('alldata', allData)
        res.status(200).json({data:allData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/man-list', async (req, res) => {
    try {
        const mangerData = await List.find({desigination : "Manager"}); // Use 'manager_id' instead of 'List'
        res.status(200).json({data:mangerData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/view/:id', async (req, res) => {
    const Result  = await List.findByIdAndUpdate({_id:req.params.id}).populate('manager_id');
    res.send({ data: Result });
});
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('------Delemployee----------',id);
        await List.findByIdAndDelete(id);
        res.status(200).json({ message: 'Document deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error deleting document' });
      }
});
// Route for editing an employee or manager
// router.put('/edit/:id', async (req, res) => {
//     try {
//         const itemId = req.params.id;
//         const { name, age, desigination, manager_id } = req.body;

//         // Check if the provided ID is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(itemId)) {
//             return res.status(400).json({ success: false, message: 'Invalid ID' });
//         }

//         // Find the item in the database by ID
//         const itemToUpdate = await List.findById(itemId);

//         // Check if the item with the provided ID exists
//         if (!itemToUpdate) {
//             return res.status(404).json({ success: false, message: 'Item not found' });
//         }

//         // Update the properties if they are provided in the request body
//         if (name) itemToUpdate.name = name;
//         if (age) itemToUpdate.age = age;
//         if (desigination) itemToUpdate.desigination = desigination;
//         if (manager_id) {
//             // Check if manager_id is a valid ObjectId
//             if (!mongoose.Types.ObjectId.isValid(manager_id)) {
//                 return res.status(400).json({ success: false, message: 'Invalid manager_id' });
//             }
//             itemToUpdate.manager_id = manager_id;
//         }

//         // Save the updated item to the database
//         const updatedItem = await itemToUpdate.save();

//         res.status(200).json({ success: true, message: 'Item updated successfully', data: updatedItem });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });

// Route for editing an employee or manager
router.put('/edit/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const { name, age, desigination, manager_id } = req.body;

        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({ success: false, message: 'Invalid ID' });
        }

        // Find the item in the database by ID
        const itemToUpdate = await List.findById(itemId);

        // Check if the item with the provided ID exists
        if (!itemToUpdate) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        // Update the properties if they are provided in the request body
        if (name) itemToUpdate.name = name;
        if (age) itemToUpdate.age = age;
        if (desigination) itemToUpdate.desigination = desigination;

        // Check if the designation is 'Manager' and remove manager_id
        if (desigination === 'Manager') {
            delete itemToUpdate.manager_id;
        } else if (manager_id) {
            // Check if manager_id is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(manager_id)) {
                return res.status(400).json({ success: false, message: 'Invalid manager_id' });
            }
            itemToUpdate.manager_id = manager_id;
        }

        // Save the updated item to the database
        const updatedItem = await itemToUpdate.save();

        res.status(200).json({ success: true, message: 'Item updated successfully', data: updatedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
