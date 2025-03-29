const User = require("./user.model");
const Filial = require("./filial.model");
const LearningCenter = require("./educationalcenter.model");
const CourseRegistration = require("./CourseRegistration.model");
const StudyProgram = require("./studyprogram.model");
const EducenterProgram = require("./educenterprogram.model");
const Profession = require("./profession.model");
const Like = require("./like.model");
const Region = require("./regions.model");
const Subjects = require("./subject.model");
const Resource = require("./resource.model");
const ResourceCategory = require("./resourceCategory.model");
const Comment = require("./comment.model");
const UserEnrollment = require("./CourseRegistration.model");

User.belongsTo(Region, { foreignKey: "region" });
Region.hasMany(User, { foreignKey: "region" });

User.belongsToMany(LearningCenter, {
  through: CourseRegistration,
  foreignKey: "userId",
});
LearningCenter.belongsToMany(User, {
  through: CourseRegistration,
  foreignKey: "educationalId",
});

User.belongsToMany(LearningCenter, { through: Like, foreignKey: "userId" });
LearningCenter.belongsToMany(User, {
  through: Like,
  foreignKey: "educationalId",
});

Filial.belongsTo(LearningCenter, { foreignKey: "educationalId" });
LearningCenter.hasMany(Filial, { foreignKey: "educationalId" });

Filial.belongsTo(Region, { foreignKey: "region" });
Region.hasMany(Filial, { foreignKey: "region" });

LearningCenter.belongsToMany(StudyProgram, {
  through: EducenterProgram,
  foreignKey: "educationalId",
});
StudyProgram.belongsToMany(LearningCenter, {
  through: EducenterProgram,
  foreignKey: "majorid",
});

StudyProgram.belongsTo(Profession, { foreignKey: "profession" });
Profession.hasMany(StudyProgram, { foreignKey: "profession" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

LearningCenter.hasMany(Comment, { foreignKey: "educationalId" });
Comment.belongsTo(LearningCenter, { foreignKey: "educationalId" });

Resource.belongsTo(ResourceCategory, { foreignKey: "categoryId" });
ResourceCategory.hasMany(Resource, { foreignKey: "categoryId" });

Resource.belongsTo(User, { foreignKey: "createby" });
User.hasMany(Resource, { foreignKey: "createby" });

StudyProgram.belongsTo(Subjects, { foreignKey: "subjectId" });
Subjects.hasMany(StudyProgram, { foreignKey: "subjectId" });

module.exports = {
  User,
  Filial,
  LearningCenter,
  UserEnrollment,
  StudyProgram,
  EducenterProgram,
  Profession,
  Like,
  Region,
  Subjects,
  Resource,
  ResourceCategory,
  Comment,
};
