const User = require("./user.model");
const Filial = require("./filial.model");
const LearningCenter = require("./educationalcenter.model");
const UserEnrollment = require("./userenrolment.model");
const StudyProgram = require("./studyprogram.model");
const LC_Major = require("./educenterprogram.model");
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
  foreignKey: "userId",
});
LearningCenter.belongsToMany(User, {
  through: UserEnrollment,
  foreignKey: "educationalId",
});

User.belongsToMany(LearningCenter, { through: Like, foreignKey: "userId" });
LearningCenter.belongsToMany(User, { through: Like, foreignKey: "educationalId" });

Filial.belongsTo(LearningCenter, { foreignKey: "educationalId" });
LearningCenter.hasMany(Filial, { foreignKey: "educationalId" });

Filial.belongsTo(Region, { foreignKey: "region" });
Region.hasMany(Filial, { foreignKey: "region" });

LearningCenter.belongsToMany(StudyProgram, {
  through: LC_Major,
  foreignKey: "educationalId",
});
StudyProgram.belongsToMany(LearningCenter, {
  through: LC_Major,
  foreignKey: "majorid",
});

StudyProgram.belongsTo(Profession, { foreignKey: "profection" });
Profession.hasMany(StudyProgram, { foreignKey: "profection" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

LearningCenter.hasMany(Comment, { foreignKey: "educationalId" });
Comment.belongsTo(LearningCenter, { foreignKey: "educationalId" });

Resources.belongsTo(ResourceCategory, { foreignKey: "categoryId" });
ResourceCategory.hasMany(Resources, { foreignKey: "categoryId" });

Resources.belongsTo(User, { foreignKey: "createby" });
User.hasMany(Resources, { foreignKey: "createby" });

StudyProgram.belongsTo(Subjects, { foreignKey: "subjectId" });
Subjects.hasMany(StudyProgram, { foreignKey: "subjectId" });

module.exports = {
  User,
  Filial,
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
