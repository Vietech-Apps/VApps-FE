import React, { useEffect, useState } from "react";
import { useGetData } from "meta/services/auth/ezAPI";

const ProductDBFields = () => {
  const [productFields, setProductFields] = useState([]);
  const [{ apiData: make }] = useGetData(`erp/make/list`, []);
  const [{ apiData: categories }] = useGetData(
    `erp/category/list?type=product`,
    []
  );
  const [{ apiData: taxes }] = useGetData(`erp/tax/list`, []);
  const [{ apiData: tags }] = useGetData(
    `meta/label/list?type=productTags`,
    []
  );
  const [{ apiData: UOM }] = useGetData(`erp/UOM/list`, []);
  const [{ apiData: IncomeAcc }] = useGetData(
    `erp/chartOfAccounts/list?accountType=Income`,
    []
  );
  const [{ apiData: ExpenseAcc }] = useGetData(
    `erp/chartOfAccounts/list?accountType=Expense`,
    []
  );
  console.log(taxes, IncomeAcc);
  useEffect(() => {
    const schemaFields = [
      { label: "Product Name", value: "name", type: "String" },
      { label: "Barcode", value: "barcode", type: "String" },
      { label: "Details", value: "detail", type: "String" },
      { label: "Purchase Eligibility", value: "isPurchased", type: "Boolean" },
      { label: "Sale Eligibility", value: "isSold", type: "Boolean" },
      { label: "Expensable", value: "isExpensed", type: "Boolean" },
      {
        label: "Product Type",
        value: "type",
        mode: "Selection",
        valueEnums: ["Storable", "Consumable", "Service"],
      },
      { label: "Sale Price", value: "salePrice", type: "Number" },
      { label: "Purchase Price", value: "purchasePrice", type: "Number" },
      {
        label: "Sale Tax",
        value: "tax",
        mode: "ObjectId",
        matchField: "taxName",
        valueEnums: taxes,
      },
      {
        matchField: "taxName",
        label: "Purchase Tax",
        value: "purchaseTax",
        mode: "ObjectId",
        valueEnums: taxes,
      },
      {
        label: "Tags",
        value: "tags",
        mode: "ObjectId",
        matchField: "title",
        valueEnums: tags,
      },
      {
        label: "Make",
        value: "make",
        mode: "ObjectId",
        matchField: "title",
        valueEnums: make,
      },
      { label: "Model", value: "model", type: "String" },
      {
        label: "Category",
        value: "category",
        mode: "ObjectId",
        matchField: "title",
        valueEnums: categories,
      },
      { label: "Vendor Code", value: "code", type: "String" },
      {
        label: "UOM",
        value: "uom",
        mode: "ObjectId",
        matchField: "name",
        valueEnums: UOM,
      },
      {
        label: "Purchase UOM",
        value: "purchaseUom",
        mode: "ObjectId",
        matchField: "name",
        valueEnums: UOM,
      },
      { label: "Sale Discount%", value: "saleDiscount", type: "Number" },
      { label: "Sale Information", value: "saleInformation", type: "String" },
      {
        label: "Purchase Discount%",
        value: "purchaseDiscount",
        type: "Number",
      },
      {
        label: "Purchase Information",
        value: "purchaseInformation",
        type: "String",
      },
      {
        label: "Income Account",
        value: "incomeAccount",
        matchField: "name",
        mode: "ObjectId",
        valueEnums: IncomeAcc,
      },
      {
        label: "Expense Account",
        value: "expenseAccount",
        mode: "ObjectId",
        matchField: "name",
        valueEnums: ExpenseAcc,
      },
      { value: "minStock", label: "Min stock level", type: "Number" },
      { value: "maxStock", label: "Max stock level", type: "Number" },
    ];

    setProductFields(schemaFields);
  }, [make, categories, taxes, tags, UOM, ExpenseAcc, IncomeAcc]);

  return productFields;
};

export default ProductDBFields;
