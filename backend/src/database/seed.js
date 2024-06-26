import { SALT_ROUNDS } from "@/utils/config";
import { genSaltSync, hashSync } from "bcrypt";

const { default: User } = require("@/models/user");

const seedDB = async () => {
  const adminAcc = await User.findOne({ username: "superadmin" });

  const salt = genSaltSync(SALT_ROUNDS);
  const hash = hashSync("supersecret", salt);

  if (!adminAcc) {
    try {
      await User.create({
        name: "Super Admin",
        username: "superadmin",
        email: "superadmin@vannievents.lk",
        password: hash,
        role: "superadmin",
      });

      console.log("Admin account created successfully");
    } catch (error) {
      console.log(error);
    }
  }
};

export default seedDB;
