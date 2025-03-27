const Comment = require("./comment.model");
const EducationalCenter = require("./educationalCenter.model");
const Filial = require("./filial.model");
const Like = require("./like.model");
const Profession = require("./profession.model");
const ProgramAssignment = require("./programassignment.model");
const StudyProgram = require("./studyprogram.model");
const Subject = require("./subject.model");
const User = require("./user.model");
const Resource = require("./resource.model");
const ResourceCategory = require("./resourceCategory.model");
const UserEnrolment = require("./userenrolment.model");
const LcMajors = require("./lcmajors.model");

User.belongsToMany(EducationalCenter, { through: UserEnrolment });
EducationalCenter.belongsToMany(User, { through: UserEnrolment });

Profession.hasMany(StudyProgram, { foreignKey: "professionId" });
StudyProgram.belongsTo(Profession, { foreignKey: "professionId" });

Subject.hasMany(StudyProgram, { foreignKey: "subjectId" });
StudyProgram.belongsTo(Subject, { foreignKey: "subjectId" });

EducationalCenter.hasMany(Filial, { foreignKey: "educationalCenterId" });
Filial.belongsTo(EducationalCenter, { foreignKey: "educationalCenterId" });

EducationalCenter.hasMany(Comment, { foreignKey: "educationalCenterId" });
Comment.belongsTo(EducationalCenter, { foreignKey: "educationalCenterId" });

EducationalCenter.hasMany(Like, { foreignKey: "educationalCenterId" });
Like.belongsTo(EducationalCenter, { foreignKey: "educationalCenterId" });

Resource.belongsTo(ResourceCategory, { foreignKey: "categoryId" });
ResourceCategory.hasMany(Resource, { foreignKey: "categoryId" });

module.exports = {
  User,
  Profession,
  Subject,
  StudyProgram,
  ProgramAssignment,
  EducationalCenter,
  UserEnrolment,
  Filial,
  Comment,
  Like,
  Resource,
  ResourceCategory,
  UserEnrolment,
  LcMajors,
};
