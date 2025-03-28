const { Like } = require("../models/association.model");

exports.createLike = async (req, res) => {
  try {
    let { userId, educationalCenterId } = req.body;

    userId = parseInt(userId);
    educationalCenterId = parseInt(educationalCenterId);

    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: "Valid userId is required" });
    }
    if (!educationalCenterId || isNaN(educationalCenterId)) {
      return res.status(400).json({ error: "Valid educationalCenterId is required" });
    }

    const like = await Like.create({
      userId,
      educationalcenterId: educationalCenterId,  
    });

    res.status(201).json({ message: "Like added successfully", like });
  } catch (err) {
    console.error("Error creating like:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteLike = async (req, res) => {
  try {
    const likeId = parseInt(req.params.id);

    if (!likeId || isNaN(likeId)) {
      return res.status(400).json({ error: "Invalid like ID" });
    }

    const like = await Like.findByPk(likeId);
    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    await like.destroy();
    res.json({ message: "Like removed successfully" });
  } catch (err) {
    console.error("Error deleting like:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
