const Comment = require("./comment.model");
const CourseRegistration = require("./courseregistration.model");
const EducationalCenter = require("./educationalcenter.model");
const Filial = require("./fillial.model");
const Like = require("./like.model");
const Profession = require("./profession.model");
const ProgramAssignment = require("./programassignment.model");
const StudyProgram = require("./studyprogram.model");
const Subject = require("./subject.model");
const User = require("./user.model");
const Resource = require("./resource.model"); // Yangi model
const ResourceCategory = require("./ResourceCategory"); // Yangi model

// User va EducationalCenter o'rtasidagi M:N bog'liqlik
User.belongsToMany(EducationalCenter, { through: CourseRegistration });
EducationalCenter.belongsToMany(User, { through: CourseRegistration });

// Profession va StudyProgram o'rtasidagi 1:M bog'liqlik
Profession.hasMany(StudyProgram, { foreignKey: "professionId" });
Subject.hasMany(StudyProgram, { foreignKey: "subjectId" });
StudyProgram.belongsTo(Profession, { foreignKey: "professionId" });
StudyProgram.belongsTo(Subject, { foreignKey: "subjectId" });

// EducationalCenter va Filial o'rtasidagi 1:M bog'liqlik
EducationalCenter.hasMany(Filial, { foreignKey: "educationalCenterId" });
Filial.belongsTo(EducationalCenter, { foreignKey: "educationalCenterId" });

// EducationalCenter va Comment o'rtasidagi 1:M bog'liqlik
EducationalCenter.hasMany(Comment, { foreignKey: "educationalCenterId" });
Comment.belongsTo(EducationalCenter, { foreignKey: "educationalCenterId" });

// EducationalCenter va Like o'rtasidagi 1:M bog'liqlik
EducationalCenter.hasMany(Like, { foreignKey: "educationalCenterId" });
Like.belongsTo(EducationalCenter, { foreignKey: "educationalCenterId" });

// Resource va ResourceCategory o'rtasidagi 1:M bog'liqlik
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
  Filial,
  Comment,
  Like,
  Resource, 
  ResourceCategory, 
};
