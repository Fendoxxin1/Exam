const User = require("./user.model");
const Filial = require("./filial.model");
const educationalcenter = require("./educationalcenter.model");
const UserEnrollment = require("./userenrolment.model");
const StudyProgram = require("./studyprogram.model");
const LC_Major = require("./educenterprogram.model");
const Profession = require("./profession.model");
const Subject = require("./subject.model");
const Like = require("./like.model");
const Region = require("./regions.model");
const Subjects = require("./subject.model");
const Resource = require("./resource.model");
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

StudyProgram.belongsTo(Profession, { foreignKey: "professionId" }); // profection -> professionId
Profession.hasMany(StudyProgram, { foreignKey: "professionId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

educationalcenter.hasMany(Comment, { foreignKey: "educationalId" });
Comment.belongsTo(educationalcenter, { foreignKey: "educationalId" });

Resource.belongsTo(ResourceCategory, { foreignKey: "categoryId" });
ResourceCategory.hasMany(Resource, { foreignKey: "categoryId" });

Resource.belongsTo(User, { foreignKey: "createby" });
User.hasMany(Resource, { foreignKey: "createby" });

StudyProgram.belongsTo(Subject, { foreignKey: "subjectId" });
Subject.hasMany(StudyProgram, { foreignKey: "subjectId" });

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
  Resource,
  ResourceCategory,
  Comment,
};
