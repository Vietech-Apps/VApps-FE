export const route2 = "accounts/StatementTransaction";
export const route3 = "/erp/jEntries";

const title = "Reconciliation";
const dataRoute = "accounts/BankStatement";
const navPath = "/accounts/reconciliation";

export const reconcileInfo = {
  formTitle: title,
  LogTitle: title,
  tableTitle: title,
  metaData: title,
  dataRoute,
  navPath,
  title,
  permission: "admin", //user //admin // moduleName
};

export const schemaFields = [
  { value: "date", label: "Transaction Date" },
  { value: "payee", label: "Payee" },
  { value: "description", label: "Description" },
  { value: "reference", label: "Reference" },
  { value: "checkNo", label: "Check No" },
  { value: "code", label: "Account Code" },
  { value: "transactionType", label: "Transaction Type" },
  { value: "debit", label: "Debit Amount" },
  { value: "credit", label: "Credit Amount" },
];
