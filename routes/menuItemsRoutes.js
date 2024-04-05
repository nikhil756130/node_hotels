const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menuItem");
const Person = require("../models/person");

// POST method for MenuItem
router.post("/", async (req, res) => {
  try {
    // Assuming the request body contains the menu item's data
    const data = req.body;

    // Create a new MenuItem document using the Mongoose Model
    const newMenuItem = new MenuItem(data);

    // Save the new menu item to the database
    const response = await newMenuItem.save();
    console.log("Menu Item saved");
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET method for MenuItem
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Menu Items fetched:", data); // Log fetched data
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType; // Corrected parameter name
    if (
      tasteType === "spice" ||
      tasteType === "sweet" ||
      tasteType === "sour"
    ) {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("Menu Items fetched for taste type:", tasteType);
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updateMenuData = req.body; // Corrected from req.boby to req.body

    const response = await MenuItem.findByIdAndUpdate(menuId, updateMenuData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "Menu item not found" }); // Corrected error message
    }
    console.log("Menu Data Updated"); // Corrected log message
    res.status(200).json(response);
  } catch (err) {
    console.error(err); // Changed console.log to console.error for error logging
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete('/:id', async (req, res) =>{
  try {
    const menuId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(menuId); // Changed from Person to MenuItem

    if (!response) {
      return res.status(404).json({ error: "Menu item not found" }); // Corrected error message
    }
    console.log("Menu Data Deleted"); // Corrected log message
    res.status(200).json({ message: 'Menu item deleted successfully' }); // Corrected response message
  } catch(err) {
    console.error(err); // Changed console.log to console.error for error logging
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//comment added for testing purposes
module.exports = router;
