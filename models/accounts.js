import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const accountSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["teacher", "student"], default: "student" }
});

// Hash password before saving
accountSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords on login
accountSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

const Account = mongoose.model("Account", accountSchema);

async function seedAccounts() {
  const count = await Account.countDocuments();
  if (count === 0) {
    await Account.create([
      { name: "testteacher", password: "password1", role: "teacher" },
      { name: "teststudent", password: "password2", role: "student" }
    ]);
    console.log("Demo accounts seeded");
  }
}
seedAccounts();

export async function getAllAccounts() {
  return Account.find({}, { password: 0 }); // exclude password field
}

export async function getAccountByName(name) {
  return Account.findOne({ name });
}

export async function createAccount({ name, password, role }) {
  const existing = await getAccountByName(name);
  if (existing) return null;

  const account = new Account({ name, password, role: role || "student" });
  await account.save();
  return { id: account._id, name: account.name, role: account.role };
}

export default Account;
