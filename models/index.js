const User = require('./User.js');
const Resume = require('./Resume.js');
const Application = require('./Application.js');
const Position = require('./Position.js');
const Company = require('./Company.js');
const Manager = require('./Manager.js');

// create associations

// One(User) to Many(Resumes) - fk on hasMany
User.hasMany(Resume, {
  foreignKey: 'user_id',
});

// Many(Resumes) to One(User)
Resume.belongsTo(User);

//One(User) to Many(Applications) - fk on hasMany
User.hasMany(Application, {
  foreignKey: 'user_id',
});

//Many(Applications) to one(User)
Application.belongsTo(User);

//One(Postion) to One(Application) - fk on hasOne
Position.hasOne(Application, {
  foreignKey: 'position_id',
});

//One(Application) to One(Position)
Application.belongsTo(Position);

//One (Application) to One (Resume) - fk on hasOne
Resume.hasOne(Application, {
  foreignKey: 'resume_id',
});

//One (Application) to One (Resume)
Application.belongsTo(Resume);

//One (Company) to Many (Postions) - fk on hasMany
Company.hasMany(Position, {
  foreignKey: 'company_id',
});

//Many (Positions) to One (Company)
Position.belongsTo(Company);

//One (Company) to Many (Mangers) - fk on hasMany
Company.hasMany(Manager, {
  foreignKey: 'company_id',
});

//Many (Managers) to One (Company)
Manager.belongsTo(Company);

//One(Manager) to Many(Positions) - fk on hasMany
Manager.hasMany(Position, {
  foreignKey: 'manager_id',
});

//Many(Positions) to One(Manager)
Position.belongsTo(Manager);

module.exports = { User, Resume, Application, Position, Company, Manager };
