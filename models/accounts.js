import bcrypt from "bcrypt";

let accounts = [
  { id: 1, name: "testteacher", password: await bcrypt.hash("password1", 10), role: "teacher" },
  { id: 2, name: "teststudent", password: await bcrypt.hash("password2", 10), role: "student" }
];
let nextId = 3;

export async function getAllAccounts() {
    return accounts.map(({ password, ...safe}) => safe);
}

export async function getAccountByName(name) {
    return accounts.find(a => a.name === name);
}

export async function createAccount({ name, password, role}) {
    const existing = await getAccountByName(name);
    if (existing) return null;

    const account = {
        id: nextId++,
        name,
        password: await bcrypt.hash(password, 10),
        role: role || "student"
    };
    accounts.push(account);
    return { id: account.id, name: account.name, role: account.role };
}