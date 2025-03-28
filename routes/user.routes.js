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
 *     tags: [Auth]
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
 *     tags: [Auth]
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
 *     tags: [Auth]
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
 *     tags: [Auth]
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
 *               image:
 *                 type: string
 *                 example: "example.jpg"
 *               phone:
 *                 type: string
 *                 format: phone
 *                 example: "+998901234567"
 *               role:
 *                 type: string
 *                 example: "user"
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
 *                     image:
 *                       type: string
 *                       example: "example.jpg"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "example@gmail.com"
 *                     phone:
 *                       type: string
 *                       format: phone
 *                       example: "+998901234567"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     age:
 *                       type: integer
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
 * /login:
 *   post:
 *     summary: Foydalanuvchi tizimga kirish
 *     tags: [Auth]
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
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Foydalanuvchi tizimga kirdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User successfully logged in"
 *                 token:
 *                   type: string
 *                   example: "your-access-token"
 *       400:
 *         description: "Parol yoki telefon raqami xato"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password or phone number is incorrect"
 */
router.post("/login", userController.loginUser);

/**
 * @swagger
 * /allUser:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     tags: [Users]
 *     description: Foydalanuvchilarni roli, ismi, pagination va sort bo‘yicha filterlash
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: "Nechanchi sahifa (pagination uchun)"
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: "Bir sahifada nechta element bo‘lishi (pagination uchun)"
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: "createdAt"
 *         description: "Qaysi ustun bo‘yicha saralash"
 *
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: ["ASC", "DESC"]
 *           default: "DESC"
 *         description: "Saralash tartibi (o‘sish yoki kamayish)"
 *
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: "Foydalanuvchi ismi bo‘yicha qidirish (LIKE operatori bilan)"
 *
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: "Foydalanuvchi rolini filterlash"
 *
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro‘yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   firstName:
 *                     type: string
 *                     example: "Ali"
 *                   lastName:
 *                     type: string
 *                     example: "Valiyev"
 *                   role:
 *                     type: string
 *                     example: "Admin"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-03-26T12:00:00Z"
 *
 *       500:
 *         description: Server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Something went wrong"
 */
router.get(
  "/allUser",
  authenticate,
  authorize(["admin", "super-admin"]),
  userController.getAllUser
);
/**
 * @swagger
 * /getUserById/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User found
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
 *                   example: "Ali"
 *                 lastName:
 *                   type: string
 *                   example: "Valiyev"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "example@gmail.com"
 *                 phone:
 *                   type: string
 *                   format: phone
 *                   example: "+998901234567"
 *                 role:
 *                   type: string
 *                   example: "Admin"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 */
router.get("/getUserById/:id", authenticate, authorize(["admin", "super-admin"]), userController.getUserById);
/**
 * @swagger
 * /allCeo:
 *   get:
 *     summary: Get all CEOs
 *     description: Retrieve a list of all users with the role of "CEO". Only accessible by admins.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Field to sort by.
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *         description: Sorting order (ASC for ascending, DESC for descending).
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: Filter CEOs by first name.
 *     responses:
 *       200:
 *         description: List of CEOs retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   firstName:
 *                     type: string
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     example: Doe
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: john.doe@example.com
 *                   role:
 *                     type: string
 *                     example: ceo
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized, missing or invalid token.
 *       403:
 *         description: Forbidden, user does not have permission.
 *       500:
 *         description: Internal server error.
 */

router.get(
  "/allCeo",
  authenticate,
  authorize(["admin"]),
  userController.getAllCeo
);
/**
 * @swagger
 * /updateUser/{id}:
 *   patch:
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
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *                 format: phone
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Foydalanuvchi yangilandi
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
 *                     image:
 *                       type: string
 *                       example: "example.jpg"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "example@gmail.com"
 *                     phone:
 *                       type: string
 *                       format: phone
 *                       example: "+998901234567"
 */
router.patch(
  "/updateUser/:id",
  authenticate,
  authorize(["admin", "super-admin"]),
  userController.updateUser
);

/**
 * @swagger
 * /deleteUser/{id}:
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
router.delete(
  "/deleteUser/:id",
  authenticate,
  authorize(["admin"]),
  userController.deleteUser
);

/**
 * @swagger
 * /me:
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
 *     tags: [Auth]
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
