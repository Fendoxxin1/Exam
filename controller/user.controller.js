const bcrypt = require("bcrypt");
const { totp, authenticator } = require("otplib");
const { User } = require("../models/association.model");
const sendSMS = require("../config/sendSMS");
const { sendEmail } = require("../config/sendEMAIL");
const jwt = require("jsonwebtoken");

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

const registerUser = async (req, res) => {
  const { name, password, email, phone, ...rest } = req.body;
  try {
    if (!isValidEmail(email))
      return res.status(403).json({ error: "Noto'g'ri email" });
    if (!isValidPhone(phone))
      return res.status(403).json({ error: "Noto'g'ri telefon raqam" });

    const existingUser = await User.findOne({ where: { email, phone } });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      password: hashedPassword,
      email,
      phone,
      ...rest,
    });

    res.status(201).json({ message: "User successfully registered", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User topilmadi" });

    await user.update(req.body);
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
    const token = await jwt.verify(refreshToken, "secret_key");

    const accessToken = jwt.sign(
      { id: token.id, role: token.role },
      "secret_key",
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  sendOtpSMS,
  sendOtpEmail,
  verifyOtp,
  registerUser,
  updateUser,
  deleteUser,
  getMe,
  refreshToken,
};
