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
<<<<<<< HEAD
const Resource = require("./resource.model");
const ResourceCategory = require("./resourceCategory.model"); 
=======
const Resource = require("./resource.model"); 
const ResourceCategory = require("./resourceCategory"); 
>>>>>>> 1bd9f8aaed83b1ca2e9e810027ac023d94e3205e

User.belongsToMany(EducationalCenter, { through: CourseRegistration });
EducationalCenter.belongsToMany(User, { through: CourseRegistration });

Profession.hasMany(StudyProgram, { foreignKey: "professionId" });
Subject.hasMany(StudyProgram, { foreignKey: "subjectId" });
StudyProgram.belongsTo(Profession, { foreignKey: "professionId" });
StudyProgram.belongsTo(Subject, { foreignKey: "subjectId" });

<<<<<<< HEAD
EducationalCenter.hasMany(Filial, { foreignKey: "educationalCenterId" });
Filial.belongsTo(EducationalCenter, { foreignKey: "educationalCenterId" });
=======
EducationalCenter.hasMany(Branch, { foreignKey: "educationalCenterId" });
Branch.belongsTo(EducationalCenter, { foreignKey: "educationalCenterId" });
>>>>>>> 1bd9f8aaed83b1ca2e9e810027ac023d94e3205e

EducationalCenter.hasMany(Comment, { foreignKey: "educationalCenterId" });
Comment.belongsTo(EducationalCenter, { foreignKey: "educationalCenterId" });

EducationalCenter.hasMany(Like, { foreignKey: "educationalCenterId" });
Like.belongsTo(EducationalCenter, { foreignKey: "educationalCenterId" });

<<<<<<< HEAD
Resource.belongsTo(ResourceCategory, { foreignKey: "categoryId" });
ResourceCategory.hasMany(Resource, { foreignKey: "categoryId" });
=======
Resource.belongsTo(ResourceCategory, { foreignKey: "categoryid" });
ResourceCategory.hasMany(Resource, { foreignKey: "categoryid" });
>>>>>>> 1bd9f8aaed83b1ca2e9e810027ac023d94e3205e

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