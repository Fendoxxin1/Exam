const bcrypt = require("bcrypt");
const { totp, authenticator } = require("otplib");
const {
  User,
  Region,
  Resource,
  Comment,
  Like,
} = require("../models/association.model");
const sendSMS = require("../config/sendSMS");
const { sendEmail } = require("../config/sendEMAIL");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const {
  registerUserSchema,
  updateUserSchema,
} = require("../validation/user.validation");
const EducationalCenter = require("../models/educationalcenter.model");
totp.options = { step: 120 };
authenticator.options = { step: 120 };

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex =
    /^\+?\d{1,3}?[-.\s]?\(?\d{2,3}\)?[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2}$/;
  return phoneRegex.test(phone);
}

const sendOtpSMS = async (req, res) => {
  const { phone } = req.body;
  try {
    if (!isValidPhone(phone)) {
      return res.status(403).json({ message: "Invalid phone" });
    }
    const otptoken = totp.generate(phone + "sirlisoz");
    await sendSMS(phone, otptoken);
    res.send(otptoken);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sendOtpEmail = async (req, res) => {
  const { email } = req.body;
  try {
    if (!isValidEmail(email)) {
      return res.status(403).json({ message: "Invalid email" });
    }
    const secret = email + "sirlisoz";
    const otptoken = authenticator.generate(secret);
    await sendEmail(email, otptoken);
    res.send(otptoken);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  const { otp, phone, email } = req.body;
  try {
    const matchEmail = authenticator.check(otp, email + "sirlisoz");
    const matchSms = totp.check(otp, phone + "sirlisoz");

    if (matchEmail || matchSms) {
      return res.send("Verified");
    }
    return res.status(400).json({ message: "Otp yaroqsiz" });
  } catch (error) {
    res.status(400).json({ message: "Noto'g'ri ma'lumot yuborildi" });
  }
};
const loginUser = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ where: { phone } });
    if (!user) return res.status(404).json({ error: "User topilmadi" });
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return res.status(403).json({ error: "Parol xato" });
    const accessToken = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      "sirlisoz",
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      "refresh",
      { expiresIn: "7d" }
    );
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const registerUser = async (req, res) => {
  const { firstName, password, email, phone, lastName, image, ...rest } =
    req.body;
  try {
    const { error } = registerUserSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "validation error", error: error.details[0].message });
    }
    if (!isValidEmail(email))
      return res.status(403).json({ error: "Noto'g'ri email" });
    if (!isValidPhone(phone))
      return res.status(403).json({ error: "Noto'g'ri telefon raqam" });

    const findUser = await User.findOne({ where: { email, phone } });
    if (findUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      firstName,
      password: hashedPassword,
      email,
      phone,
      lastName,
      image,
      ...rest,
    });

    res.status(201).json({ message: "User successfully registered", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "DESC",
      firstName,
      role,
    } = req.query;
    const whereCondition = {};

    if (role) whereCondition.role = role;
    if (firstName) whereCondition.firstName = { [Op.like]: `%${firstName}%` };

    const users = await User.findAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [[sort, order]],
      include: [
        { model: Region, as: "Region" },
        {
          model: EducationalCenter,
          as: "EducationalCenters",
          through: { attributes: [] },
        },
        { model: Resource, as: "Resources" },
        { model: Comment, as: "Comments" },
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [
        { model: Region, as: "Region" },
        {
          model: EducationalCenter,
          as: "EducationalCenters",
          through: { attributes: [] },
        },
        { model: Resource, as: "Resources" },
        { model: Comment, as: "Comments" },
      ],
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCeo = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "DESC",
      firstName,
    } = req.query;
    const whereCondition = {};
    whereCondition.role = "ceo";
    if (firstName) whereCondition.firstName = { [Op.like]: `%${firstName}%` };

    const users = await User.findAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [[sort, order]],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const { error } = updateUserSchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ message: "validation error", error: error.details[0].message });
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User topilmadi" });
    const { ...rest } = user.dataValues;
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    await user.update({
      ...rest,
      password: hashedPassword,
      ...req.body,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User topilmadi" });

    await user.destroy();
    res.json({ message: "User o'chirildi", user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: "User topilmadi" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  try {
    const token = jwt.verify(refreshToken, "refresh");

    const accessToken = jwt.sign(
      { id: token.id, role: token.role, email: token.email },
      "sirlisoz"
    );
    res.status(201).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendOtpSMS,
  sendOtpEmail,
  verifyOtp,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getMe,
  refreshToken,
  getAllUser,
  getAllCeo,
  getUserById,
};
