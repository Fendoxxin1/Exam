const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const { authorize } = require("../middleware/role");
const userController = require("../controller/user.controller");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Foydalanuvchilarni boshqarish
 */

/**
 * @swagger
 * /send-otp-sms:
 *   post:
 *     summary: Telefon raqamga OTP jo'natish
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 format: phone
 *                 example: "+998901234567"
 *     responses:
 *       200:
 *         description: OTP jo'natildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 otp:
 *                   type: string
 *                   example: "123456"
 *       400:
 *         description: "Noto'g'ri telefon raqam"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Noto'g'ri telefon raqam"
 */
router.post("/send-otp-sms", userController.sendOtpSMS);

/**
 * @swagger
 * /send-otp-email:
 *   post:
 *     summary: Emailga OTP jo'natish
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "example@gmail.com"
 *     responses:
 *       200:
 *         description: OTP jo'natildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 otp:
 *                   type: string
 *                   example: "123456"
 *       400:
 *         description: "Noto'g'ri email"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Noto'g'ri email"
 */
router.post("/send-otp-email", userController.sendOtpEmail);

/**
 * @swagger
 * /verify-otp:
 *   post:
 *     summary: OTPni tekshirish
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               phone:
 *                 type: string
 *                 format: phone
 *                 example: "+998901234567"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "example@gmail.com"
 *     responses:
 *       200:
 *         description: OTP to'g'ri
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Verified"
 *       400:
 *         description: "Noto'g'ri OTP"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Noto'g'ri OTP"
 */
router.post("/verify-otp", userController.verifyOtp);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Yangi foydalanuvchi ro'yxatdan o'tkazish
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Firdavs"
 *               lastName:
 *                 type: string
 *                 example: "Xolmatov"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "example@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               phoneNumber:
 *                 type: string
 *                 format: phone
 *                 example: "+998901234567"
 *     responses:
 *       201:
 *         description: Yangi foydalanuvchi yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User successfully registered"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     firstName:
 *                       type: string
 *                       example: "Firdavs"
 *                     lastName:
 *                       type: string
 *                       example: "Xolmatov"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "example@gmail.com"
 *                     phoneNumber:
 *                       type: string
 *                       format: phone
 *                       example: "+998901234567"
 *       400:
 *         description: "Foydalanuvchi ro'yxatdan o'tkazilmadi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User already exists"
 */
router.post("/register", userController.registerUser);

/**
 * @swagger
 * /api/user/updateUser/{id}:
 *   put:
 *     summary: Foydalanuvchini yangilash
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Firdavs"
 *               lastName:
 *                 type: string
 *                 example: "Xolmatov"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "example@gmail.com"
 *               phoneNumber:
 *                 type: string
 *                 format: phone
 *                 example: "+998901234567"
 *     responses:
 *       200:
 *         description: Yangilangan foydalanuvchi ma'lumotlari
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User successfully updated"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     firstName:
 *                       type: string
 *                       example: "Firdavs"
 *                     lastName:
 *                       type: string
 *                       example: "Xolmatov"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "example@gmail.com"
 *                     phoneNumber:
 *                       type: string
 *                       format: phone
 *                       example: "+998901234567"
 *       400:
 *         description: "Foydalanuvchi yangilanmadi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */
router.put("/updateUser/:id", userController.updateUser);

/**
 * @swagger
 * /api/user/deleteUser/{id}:
 *   delete:
 *     summary: Foydalanuvchini o'chirish
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Foydalanuvchi o'chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User successfully deleted"
 *       400:
 *         description: "Foydalanuvchi o'chirilmadi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */
router.delete("/deleteUser/:id", userController.deleteUser);

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Joriy foydalanuvchi ma'lumotlarini olish
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Foydalanuvchi ma'lumotlari qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 firstName:
 *                   type: string
 *                   example: "Firdavs"
 *                 lastName:
 *                   type: string
 *                   example: "Xolmatov"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "example@gmail.com"
 *                 phoneNumber:
 *                   type: string
 *                   format: phone
 *                   example: "+998901234567"
 *       401:
 *         description: "Foydalanuvchi topilmadi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */
router.get("/me", authenticate, userController.getMe);

/**
 * @swagger
 * /refreshToken:
 *   post:
 *     summary: Access tokenni yangilash
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "your-refresh-token"
 *     responses:
 *       201:
 *         description: Yangi access token yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "new-access-token"
 *       400:
 *         description: "Refresh token required"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Refresh token is required"
 *       500:
 *         description: "Server error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post("/refreshToken", userController.refreshToken);

module.exports = router;
