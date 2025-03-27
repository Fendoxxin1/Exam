const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

const User = require("./user.model");
const Branch = require("./filial.model");
const LearningCenter = require("./educationalcenter.model");
const UserEnrollment = require("./userenrolment.model");
const StudyProgram = require("./studyprogram.model");
const LC_Major = require("./lcmajors.model");
const Profession = require("./profession.model");
const Like = require("./like.model");
const Region = require("./regions.model");
const Subjects = require("./subject.model");
const Resources = require("./resource.model");
const ResourceCategory = require("./resourceCategory.model");
const Comment = require("./comment.model");

User.belongsTo(Region, { foreignKey: "region" });
Region.hasMany(User, { foreignKey: "region" });

User.belongsToMany(LearningCenter, {
  through: UserEnrollment,
  foreignKey: "userID",
});
LearningCenter.belongsToMany(User, {
  through: UserEnrollment,
  foreignKey: "learningid",
});

User.belongsToMany(LearningCenter, { through: Like, foreignKey: "userID" });
LearningCenter.belongsToMany(User, { through: Like, foreignKey: "learningid" });

Branch.belongsTo(LearningCenter, { foreignKey: "learningid" });
LearningCenter.hasMany(Branch, { foreignKey: "learningid" });

Branch.belongsTo(Region, { foreignKey: "region" });
Region.hasMany(Branch, { foreignKey: "region" });

LearningCenter.belongsToMany(StudyProgram, {
  through: LC_Major,
  foreignKey: "learningid",
});
StudyProgram.belongsToMany(LearningCenter, {
  through: LC_Major,
  foreignKey: "majorid",
});

StudyProgram.belongsTo(Profession, { foreignKey: "profection" });
Profession.hasMany(StudyProgram, { foreignKey: "profection" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

LearningCenter.hasMany(Comment, { foreignKey: "learningid" });
Comment.belongsTo(LearningCenter, { foreignKey: "learningid" });

Resources.belongsTo(ResourceCategory, { foreignKey: "categoryid" });
ResourceCategory.hasMany(Resources, { foreignKey: "categoryid" });

Resources.belongsTo(User, { foreignKey: "createby" });
User.hasMany(Resources, { foreignKey: "createby" });

StudyProgram.belongsTo(Subjects, { foreignKey: "subjectid" });
Subjects.hasMany(StudyProgram, { foreignKey: "subjectid" });

module.exports = {
  User,
  Branch,
  LearningCenter,
  UserEnrollment,
  StudyProgram,
  LC_Major,
  Profession,
  Like,
  Region,
  Subjects,
  Resources,
  ResourceCategory,
  Comment,
};
