const Comment = require("./comment.model");
const CourseRegistration = require("./courseregistration.model");
const EducationalCenter = require("./educationalcenter.model");
const Branch = require("./fillial.model");
const Like = require("./like.model");
const Profession = require("./profession.model");
const ProgramAssignment = require("./programassignment.model");
const StudyProgram = require("./studyprogram.model");
const Subject = require("./subject.model");
const User = require("./user.model");
const Resource = require("./resource.model"); 
const ResourceCategory = require("./resourceCategory"); 

User.belongsToMany(EducationalCenter, { through: CourseRegistration });
EducationalCenter.belongsToMany(User, { through: CourseRegistration });

Profession.hasMany(StudyProgram, { foreignKey: "professionId" });
Subject.hasMany(StudyProgram, { foreignKey: "subjectId" });
StudyProgram.belongsTo(Profession, { foreignKey: "professionId" });
StudyProgram.belongsTo(Subject, { foreignKey: "subjectId" });

EducationalCenter.hasMany(Branch, { foreignKey: "educationalCenterId" });
Branch.belongsTo(EducationalCenter, { foreignKey: "educationalCenterId" });

EducationalCenter.hasMany(Comment, { foreignKey: "educationalCenterId" });
Comment.belongsTo(EducationalCenter, { foreignKey: "educationalCenterId" });

EducationalCenter.hasMany(Like, { foreignKey: "educationalCenterId" });
Like.belongsTo(EducationalCenter, { foreignKey: "educationalCenterId" });

Resource.belongsTo(ResourceCategory, { foreignKey: "categoryid" });
ResourceCategory.hasMany(Resource, { foreignKey: "categoryid" });

module.exports = {
  User,
  Profession,
  Subject,
  StudyProgram,
  ProgramAssignment,
  EducationalCenter,
  CourseRegistration,
  Branch,
  Comment,
  Like,
  Resource, 
  ResourceCategory, 
};
