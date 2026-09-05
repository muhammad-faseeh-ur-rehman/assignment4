let accounts = [
    { accountNumber: "PK001", name: "Ali", balance: 50000, transactions: [] },
    { accountNumber: "PK002", name: "Ahmed", balance: 100000, transactions: [] }
];

let nextTransactionId = 1;

function findAccount(accountNumber) {
    return accounts.find(account => account.accountNumber === accountNumber);
}

function createTransaction(type, amount, extra = {}) {
    return {
        transactionId: nextTransactionId++,
        type,
        amount,
        date: new Date().toLocaleString(),
        ...extra
    };
}

function deposit(accountNumber, amount) {
    const account = findAccount(accountNumber);

    if (!account) return "Account not found.";
    if (amount <= 0) return "Deposit amount must be greater than 0.";

    account.balance += amount;
    account.transactions.push(createTransaction("deposit", amount));

    return `Rs. ${amount} deposited successfully.`;
}

function withdraw(accountNumber, amount) {
    const account = findAccount(accountNumber);

    if (!account) return "Account not found.";
    if (amount <= 0) return "Withdrawal amount must be greater than 0.";
    if (amount > account.balance) return "Insufficient balance.";

    account.balance -= amount;
    account.transactions.push(createTransaction("withdraw", amount));

    return `Rs. ${amount} withdrawn successfully.`;
}

function transfer(fromAccountNumber, toAccountNumber, amount) {
    const from = findAccount(fromAccountNumber);
    const to = findAccount(toAccountNumber);

    if (!from || !to) return "Both accounts must exist.";
    if (from.accountNumber === to.accountNumber) return "Cannot transfer to the same account.";
    if (amount <= 0) return "Transfer amount must be greater than 0.";
    if (amount > from.balance) return "Insufficient balance.";

    from.balance -= amount;
    to.balance += amount;

    from.transactions.push(
        createTransaction("transfer", amount, { to: to.accountNumber })
    );

    to.transactions.push(
        createTransaction("transfer", amount, { from: from.accountNumber })
    );

    return `Rs. ${amount} transferred successfully.`;
}

function checkBalance(accountNumber) {
    const account = findAccount(accountNumber);

    if (!account) return "Account not found.";

    return account.balance;
}

function getTransactions(accountNumber) {
    const account = findAccount(accountNumber);

    if (!account) return "Account not found.";

    return account.transactions;
}

// Account number must be unique
function createAccount(accountNumber, name, initialBalance = 0) {
    if (findAccount(accountNumber)) return "Account number already exists.";
    if (initialBalance < 0) return "Initial balance cannot be negative.";

    accounts.push({
        accountNumber,
        name,
        balance: initialBalance,
        transactions: []
    });

    return "Account created successfully.";
}
console.log(deposit("PK001", 5000));
console.log(withdraw("PK001", 2000));
console.log(transfer("PK001", "PK002", 10000));
console.log("Balance:", checkBalance("PK001"));
console.log("Transactions:", getTransactions("PK001"));
console.log(accounts);
