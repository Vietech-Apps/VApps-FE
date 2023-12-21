import React from "react";
import { RoutePermittedRole } from "shared/constants/AppEnums";
const Chart = React.lazy(() => import("./ChartOfAccounts"));
const ChartForm = React.lazy(() => import("./ChartOfAccounts/ReceiptForm"));
const BankStatement = React.lazy(() => import("./Reconcile"));
const Tax = React.lazy(() => import("./Tax"));
const TaxForm = React.lazy(() => import("./Tax/ReceiptForm"));
const Journal = React.lazy(() => import("./Journal"));
const Invoicing = React.lazy(() => import("./Invoicing"));
const CreditNote = React.lazy(() => import("./CreditNote"));
const Main = React.lazy(() => import("./Invoicing/Main"));
const Refund = React.lazy(() => import("./Refund"));
const MainRefund = React.lazy(() => import("./Refund/Main"));
const MainCreditNote = React.lazy(() => import("./CreditNote/Main"));
const JournalForm = React.lazy(() => import("./Journal/ReceiptForm"));
const ParterLedger = React.lazy(() => import("./Reporting/ParterLedger"));
const GeneralLedger = React.lazy(() => import("./Reporting/GeneralLedger"));
const Testing = React.lazy(() => import("./Testing"));
const JournalE = React.lazy(() => import("./JournalEntries"));
const JournalItems = React.lazy(() => import("./JournalItems"));
const JournalEForm = React.lazy(() => import("./JournalEntries/ReceiptForm"));

const BankAccounts = React.lazy(() => import("./BankAccounts"));
const CreateBankAccounts = React.lazy(() =>
  import("./BankAccounts/ReceiptForm")
);

const Bill = React.lazy(() => import("./Bill"));
const BillForm = React.lazy(() => import("./Bill/Main"));
const Payments = React.lazy(() => import("./Payments"));
const CreatePayments = React.lazy(() => import("./Payments/CreateForm"));
const VendorPayments = React.lazy(() => import("./VendorPayment"));
const CreateVendorPayments = React.lazy(() =>
  import("./VendorPayment/CreateForm")
);
const PaymentTerms = React.lazy(() => import("./PaymentTerms"));
const CreatePaymentTerms = React.lazy(() =>
  import("./PaymentTerms/CreateForm")
);
const AccountingSet = React.lazy(() => import("./Setting/Accounting"));
const ChartAccFlow = React.lazy(() => import("./ChartOfAccounts/FlowList"));

const TrailBalance = React.lazy(() => import("./Reporting/TrailBalance"));

export const accConfigs = [
  {
    permittedRole: RoutePermittedRole.user,
    path: "/reports/chartOfAccounts",
    element: <ChartAccFlow />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/reports/generalLedger",
    element: <GeneralLedger />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/reports/trailBalance",
    element: <TrailBalance />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/reports/partnerLedger",
    element: <ParterLedger />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/accounts/accounting",
    element: <AccountingSet />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/accounts/customer/payments",
    element: <Payments />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/accounts/vendor/payments",
    element: <VendorPayments />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/accounts/journalItems"],
    element: <JournalItems />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/accounts/customer/payments/workspace",
      "/accounts/customer/payments/workspace/:id",
    ],
    element: <CreatePayments />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/accounts/vendor/payments/workspace",
      "/accounts/vendor/payments/workspace/:id",
    ],
    element: <CreateVendorPayments />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/accounts/paymentTerms",
    element: <PaymentTerms />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/accounts/paymentTerms/workspace",
      "/accounts/paymentTerms/workspace/:id",
    ],
    element: <CreatePaymentTerms />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/accounts/vendorBill",
    element: <Bill />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/accounts/vendorBill/workspace",
      "/accounts/vendorBill/workspace/:id",
    ],
    element: <BillForm />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/accounts/bankAccounts",
    element: <BankAccounts />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/accounts/bankAccounts/workspace",
      "/accounts/bankAccounts/workspace/:id",
    ],
    element: <CreateBankAccounts />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/accounts/journalEntries",
    element: <JournalE />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/accounts/journalEntries/workspace",
      "/accounts/journalEntries/workspace/:id",
    ],
    element: <JournalEForm />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/accounts/reconcile/:id",
    element: <BankStatement />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/accounts/invoicing",
    element: <Invoicing />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/accounts/invoicing/workspace",
      "/accounts/invoicing/workspace/:id",
    ],
    element: <Main />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/accounts/creditNote",
    element: <CreditNote />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/accounts/refund/workspace", "/accounts/refund/workspace/:id"],
    element: <MainRefund />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/accounts/refund",
    element: <Refund />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/accounts/creditNote/workspace",
      "/accounts/creditNote/workspace/:id",
    ],
    element: <MainCreditNote />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/accounts/journal",
    element: <Journal />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/accounts/journal/workspace", "/accounts/journal/workspace/:id"],
    element: <JournalForm />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/accounts/chartOfAccounts",
    element: <Chart />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: [
      "/accounts/chartOfAccounts/workspace",
      "/accounts/chartOfAccounts/workspace/:id",
    ],
    element: <ChartForm />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: "/accounts/tax",
    element: <Tax />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/accounts/tax/workspace", "/accounts/tax/workspace/:id"],
    element: <TaxForm />,
  },
  {
    permittedRole: RoutePermittedRole.user,
    path: ["/accounts/testing", "/accounts/tax/workspace/:id"],
    element: <Testing />,
  },
];
