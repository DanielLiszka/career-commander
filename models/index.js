const User = require('./User.js');
const Resume = require('./Resume.js');
const Application = require('./Application.js');
const Position = require('./Position.js');
const Company = require('./Company.js');
const Manager = require('./Manager.js');

// create associations

// One(User) to Many(Resumes)
User.hasMany(Resume);

// Many(Resumes) to One(User)
Resume.belongsTo(User);

//One(User) to Many(Applications)
User.hasMany(Application);

//Many(Applications) to one(User)
Application.belongsTo(User);

//One(Postion) to One(Application)
Position.hasOne(Application);

//One(Application) to One(Position)
Application.belongsTo(Position);

//One (Application) to One (Resume)
Resume.hasOne(Application);

//One (Application) to One (Resume)
Application.belongsTo(Resume);

//One (Company) to Many (Postions)
Company.hasMany(Position);

//Many (Positions) to One (Company)
Position.belongsTo(Company);

//One (Company) to Many (Mangers)
Company.hasMany(Manager);

//Many (Managers) to One (Company)
Manager.belongsTo(Company);

//One(Manager) to Many(Positions)
Manager.hasMany(Position);

//Many(Positions) to One(Manager)
Position.belongsTo(Manager);

//Many(Applications) to One(Company)
Application.belongsTo(Company);

//One(Company) to Many(Applications)
Company.hasMany(Application);

//Many(Applications) to One(Manager)
Application.belongsTo(Manager);

//One(Manager) to Many (Applications)
Manager.hasMany(Application);

module.exports = { User, Resume, Application, Position, Company, Manager };
