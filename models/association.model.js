const User = require("./user.model");
const Filial = require("./filial.model");
const educationalcenter = require("./educationalcenter.model");
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

User.belongsToMany(educationalcenter, {
  through: UserEnrollment,
  foreignKey: "userId",
});
educationalcenter.belongsToMany(User, {
  through: UserEnrollment,
  foreignKey: "educationalId",
});

User.belongsToMany(educationalcenter, { through: Like, foreignKey: "userId" });
educationalcenter.belongsToMany(User, {
  through: Like,
  foreignKey: "educationalId",
});

Filial.belongsTo(educationalcenter, { foreignKey: "educationalId" });
educationalcenter.hasMany(Filial, { foreignKey: "educationalId" });

Filial.belongsTo(Region, { foreignKey: "region" });
Region.hasMany(Filial, { foreignKey: "region" });

educationalcenter.belongsToMany(StudyProgram, {
  through: LC_Major,
  foreignKey: "educationalId",
});
StudyProgram.belongsToMany(educationalcenter, {
  through: LC_Major,
  foreignKey: "majorid",
});

StudyProgram.belongsTo(Profession, { foreignKey: "profection" });
Profession.hasMany(StudyProgram, { foreignKey: "profection" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

educationalcenter.hasMany(Comment, { foreignKey: "educationalId" });
Comment.belongsTo(educationalcenter, { foreignKey: "educationalId" });

Resources.belongsTo(ResourceCategory, { foreignKey: "categoryId" });
ResourceCategory.hasMany(Resources, { foreignKey: "categoryId" });

Resources.belongsTo(User, { foreignKey: "createby" });
User.hasMany(Resources, { foreignKey: "createby" });

StudyProgram.belongsTo(Subjects, { foreignKey: "subjectId" });
Subjects.hasMany(StudyProgram, { foreignKey: "subjectId" });

module.exports = {
  User,
  Filial,
  educationalcenter,
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
