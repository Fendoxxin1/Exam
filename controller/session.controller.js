const Session = require("../models/session.model");
const getSessions = async (req, res) => {
  try {
    const userId = req.user.id;
    const sessions = await Session.findAll({ where: { user_id: userId } });

    if (sessions.length === 0)
      return res.status(404).json({ message: "No sessions found" });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const deleteSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const session = await Session.findOne({ where: { id: sessionId } });

    if (!session) return res.status(404).json({ message: "Session not found" });

    await Session.destroy({ where: { id: sessionId } });

    res.status(200).json({ message: "Session deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = { getSessions, deleteSession };
