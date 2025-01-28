
const Announcement = require('../models/announcement.js');

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong while fetching announcements' });
  }
};
 
const createAnnouncement = async (req, res) => {
  const { title, description, semester, date } = req.body;
    
  if (!title || !description || !semester || !date)
    return res.status(400).json({ message: "please fill in all fields!" });
 
  try {
    const newAnnouncement = new Announcement({ title, description, semester, date });
    await newAnnouncement.save();
    res.status(201).json({ message: "announcement added successfully!" });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong while creating the announcement' });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(id, updatedData);
    if (!updatedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.status(201).json({ message: "Announcement Updated successfully!" });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong while updating the announcement' });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    await Announcement.findByIdAndDelete(id);
    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong while deleting the announcement' });
  }
};

module.exports = {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
