
let accounts = [
    { id: 1, name: "testuser1", password: "testpwd1", role: "teacher" },
    { id: 2, name: "testuser2", password: "testpwd2", role: "student" }
]

let nextId = 3;

//Dev tool
export function getAllAccounts() {
  return accounts;
}

export function createAccount(data) {
  const account = { id: nextId++, ...data };
  accounts.push(account);
  return account;
}