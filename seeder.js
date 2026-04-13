const User = require("./models/users");
const Task = require("./models/task");
const Submission = require("./models/submission");

const seedTrainer = async () => {
  try {
    console.log("Cleaning database...");

    await Submission.deleteMany();
    await Task.deleteMany();
    await User.deleteMany();

    console.log("Old users, tasks, and submissions deleted ✅");

    await User.create({
      name: "Sivion Trainer",
      email: "sivionglobaltechnologies@gmail.com",
      password: "Sivion@123",
      role: "trainer",
    });

    console.log("New default trainer created ✅");
    console.log("Email: sivionglobaltechnologies@gmail.com");
    console.log("Password: Sivion@123");
  } catch (error) {
    console.log("Seeder error:", error.message);
  }
};

module.exports = seedTrainer;