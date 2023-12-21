const title = "Chart Of Accounts";
const dataRoute = "erp/chartOfAccounts";
const navPath = "/accounts/chartOfAccounts";
export const Max_Level = 10;
export const dataInfo = {
  formTitle: title,
  LogTitle: title,
  tableTitle: title,
  metaData: title,
  permission: "admin",
  dataRoute,
  navPath,
  title,
};

export const staticAccounts = [
  {
    label: "Assets",
    options: [
      {
        label: "Receivable",
        value: "11",
      },
      {
        label: "Bank & Cash",
        value: "12",
      },
      {
        label: "Current Assets",
        value: "13",
      },
      {
        label: "Non-current Assets",
        value: "14",
      },
      {
        label: "Fixed Assets",
        value: "15",
      },
      {
        label: "Prepayments",
        value: "16",
      },
    ],
  },
  {
    label: "Liabilities",
    options: [
      {
        label: "Payable",
        value: "21",
      },
      {
        label: "Current Liabilities",
        value: "22",
      },
      {
        label: "Non-current Liabilities",
        value: "23",
      },
    ],
  },
  {
    label: "Equity",
    options: [
      {
        label: "Equity",
        value: "31",
      },
      {
        label: "Accumulated Profit",
        value: "32",
      },
      {
        label: "Share Capital",
        value: "33",
      },
    ],
  },
  {
    label: "Income",
    options: [
      {
        label: "Income",
        value: "41",
      },
      {
        label: "Other Income",
        value: "42",
      },
    ],
  },
  {
    label: "Expense",
    options: [
      {
        label: "Expenses",
        value: "51",
      },
      {
        label: "Depreciation",
        value: "52",
      },
      {
        label: "Cost Of Revenue",
        value: "53",
      },
    ],
  },
];

export function getLabelFromCode(code) {
  for (let i = 0; i < staticAccounts.length; i++) {
    const group = staticAccounts[i];
    for (let j = 0; j < group.options.length; j++) {
      const option = group.options[j];
      if (option.value === code) {
        return option.label;
      }
    }
  }
  return null; 
}
