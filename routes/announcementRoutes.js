const express = require("express");
const {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementControllers.js");

const router = express.Router();

router.get('/getAnnouncement', getAnnouncements);
router.post("/createAnnouncement", createAnnouncement);
router.put('/updateAnnouncement/:id', updateAnnouncement);
router.delete("/deleteAnnouncement/:id", deleteAnnouncement);

module.exports = router;