const title = "Products";
const dataRoute = "/erp/product";
const navPath = "/inventory/products";

export const pInfo = {
  formTitle: title,
  LogTitle: title,
  tableTitle: title,
  metaData: title,
  dataRoute,
  navPath,
  title,
  permission: "admin", //user //admin // moduleName
};

export const route = "accounts/BankStatement";

export const path = "/accounts/reconciliation";

export function validateData(data, schemaFields) {
  const validData = [];
  const invalidData = [];

  data.forEach((item, index) => {
    const modifiedItem = {};
    const itemInvalidFields = [];

    for (let key in item) {
      const fieldValue = item[key];
      const schemaField = schemaFields.find((field) => field.value === key);

      // Check if the field exists in the schemaFields
      if (!schemaField) {
       // itemInvalidFields.push(key);
        continue;
      }

      let modifiedValue = fieldValue;

      // Convert field value based on the schemaField type
      if (schemaField.type === "String") {
        if (typeof fieldValue !== "string") {
          itemInvalidFields.push(key);
        }
      } else if (schemaField.type === "Number") {
        const numericValue = Number(fieldValue);
        if (isNaN(numericValue) || typeof numericValue !== "number") {
          itemInvalidFields.push(key);
        } else {
          modifiedValue = numericValue;
        }
      } else if (schemaField.type === "Boolean") {
        if (typeof fieldValue === "string") {
          const lowercasedValue = fieldValue.toLowerCase();
          if (lowercasedValue === "true") {
            modifiedValue = true;
          } else if (lowercasedValue === "false") {
            modifiedValue = false;
          } else {
            itemInvalidFields.push(key);
          }
        } else if (typeof fieldValue !== "boolean") {
          itemInvalidFields.push(key);
        }
      }

      // Check if the field has valueEnums and if the value is within them
      if (
        schemaField.mode === "Selection" &&
        !schemaField.valueEnums.includes(fieldValue)
      ) {
        itemInvalidFields.push(key);
      }

      // Additional check for mode "ObjectId"
      if (schemaField.mode === "ObjectId") {
        const valueEnums = schemaField.valueEnums;
        const matchField = schemaField.matchField;

        const matchedItems = valueEnums.filter(
          (enumItem) => enumItem[matchField] === fieldValue
        );
        if (matchedItems.length === 0) {
          itemInvalidFields.push(key);
        }
      }

      modifiedItem[key] = modifiedValue;
    }

    if (itemInvalidFields.length > 0) {
      const invalidItem = {
        index,
        invalidfields: itemInvalidFields,
        ...modifiedItem,
      };
      invalidData.push(invalidItem);
    } else {
      const validItem = {
        index,
        ...modifiedItem,
      };
      validData.push(validItem);
    }
  });

  return { validData, invalidData };
}
