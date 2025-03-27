const User = require("./user.model");
const Filial = require("./filial.model");
const LearningCenter = require("./learningcenter.model");
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

Filial.belongsTo(LearningCenter, { foreignKey: "learningid" });
LearningCenter.hasMany(Filial, { foreignKey: "learningid" });

Filial.belongsTo(Region, { foreignKey: "region" });
Region.hasMany(Filial, { foreignKey: "region" });

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
