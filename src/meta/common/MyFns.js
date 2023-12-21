import { message, Select } from "antd";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler2 from "meta/services/auth/successHandle2";
import successHandler from "meta/services/auth/successHandler";
import moment from "moment";

export const getFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  let k = 1024,
    dm = 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
export const getOptions = (Arr) => {
  let newArr = [];
  Arr?.map((p) => {
    let Obj = {
      label: p?.title,
      key: p._id,
      value: p._id,
    };
    newArr.push(Obj);
  });
  return newArr;
};
export const getStatusOption = (Arr) => {
  let newArr = [];
  Arr.map((p) => {
    let Obj = {
      label: p?.status,
      key: p._id,
      value: p.status,
    };
    newArr.push(Obj);
  });
  return newArr;
};
export const UserOptions = (Arr) => {
  let newArr = [];
  Arr.map((p) => {
    let Obj = {
      label: p?.name,
      key: p._id,
      value: p._id,
    };
    newArr.push(Obj);
  });
  return newArr;
};
export const OptionsWithNameProps = (Arr, name) => {
  let newArr = [];
  Arr.map((p) => {
    let Obj = {
      label: p[name],
      key: p._id,
      value: p._id,
    };
    newArr.push(Obj);
  });
  return newArr;
};
export const getCustomDateTime = (
  value = 0,
  unit = "days",
  format = "YYYY-MM-DD"
) => {
  if (value === 0) {
    return moment().format(format);
  } else {
    return moment().add(value, unit).format(format);
  }
};
export const getUserAvatar = (user) => {
  if (user?.name) {
    return user.name.charAt(0).toUpperCase();
  }
  if (user?.email) {
    return user.email.charAt(0).toUpperCase();
  }
};

export const timeFromNow = (date) => {
  const timestamp = moment(date).format("X");
  const newDate = moment.unix(timestamp);
  return moment(newDate).fromNow();
};

export const checkPermission = (routeAuth, userRole) => {
  if (routeAuth === null || routeAuth === undefined) {
    return true;
  }

  if (userRole && Array.isArray(userRole)) {
    return routeAuth.some((r) => userRole.indexOf(r) >= 0);
  }

  if (routeAuth.length === 0) {
    return !userRole || userRole.length === 0;
  }
  if (userRole && Array.isArray(userRole) && Array.isArray(routeAuth)) {
    return routeAuth.some((r) => userRole.indexOf(r) >= 0);
  }
  return routeAuth.indexOf(userRole) >= 0;
};

export const generateID = () => {
  return `v1-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
};

export const deleteDocuments = async (
  rotue,
  selectedArray,
  setLoading,
  data
) => {
  setLoading(true);
  let response;
  try {
    response = await jwtAxios.put(rotue, {
      ids: selectedArray,
      data,
    });
    successHandler(response);
  } catch (error) {
    errorHandler(error);
  }
  setLoading(false);
  return response;
};
export const updateAllDocuments = async (rotue, setLoading, data) => {
  setLoading(true);
  let response;
  try {
    response = await jwtAxios.put(rotue, {
      data,
    });
    successHandler(response);
  } catch (error) {
    errorHandler(error);
  }
  setLoading(false);
  return response;
};
export const handleValidate = async (
  form,
  id,
  postroute,
  putroute,
  additionalInfo = {}
) => {
  return form
    .validateFields()
    .then(async (values) => {
      const valuesWithAdditionalInfo = { ...values, ...additionalInfo };
      if (id) {
        try {
          const response = await jwtAxios.put(
            putroute,
            valuesWithAdditionalInfo
          );
          successHandler2(response);
          form.resetFields();
          return response;
        } catch (error) {
          errorHandler(error);
        }
      } else {
        try {
          const response = await jwtAxios.post(
            postroute,
            valuesWithAdditionalInfo
          );
          successHandler(response);
          form.resetFields();
          return response;
        } catch (error) {
          errorHandler(error);
        }
      }
    })
    .catch((info) => {
      console.log("Validate Failed:", info);
      info.errorFields.map((p) => message.info(p.errors[0]));
    });
};
export const handleValidateWithOutReset = async (
  form,
  id,
  postroute,
  putroute,
  additionalInfo = {},
  setLoading
) => {
  return form
    .validateFields()
    .then(async (values) => {
      setLoading(true);
      const valuesWithAdditionalInfo = { ...values, ...additionalInfo };
      if (id) {
        try {
          const response = await jwtAxios.put(
            putroute,
            valuesWithAdditionalInfo
          );
          successHandler2(response);
          setLoading(false);
          return response;
        } catch (error) {
          errorHandler(error);
          setLoading(false);
        }
      } else {
        try {
          const response = await jwtAxios.post(
            postroute,
            valuesWithAdditionalInfo
          );
          successHandler2(response);
          setLoading(false);
          return response;
        } catch (error) {
          errorHandler(error);
          setLoading(false);
        }
      }
    })
    .catch((info) => {
      console.log(info);
      info?.errorFields?.map((p) => message.info(p.errors[0]));
      return null;
    });
};
export const MySelect = ({ options, placeholder, value, onChange }) => {
  return (
    <Select
      showSearch
      allowClear
      optionFilterProp="children"
      placeholder={placeholder}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      value={value}
      onChange={onChange}
      options={options}
    />
  );
};
export const calculateTotalPrice = (record) => {
  if (record.section) {
    return {
      unitPrice: null,
      totalPrice: null,
      discountAmount: null,
      discountedTotalPrice: null,
      taxAmount: null,
      totalPriceWithTax: null,
    };
  }

  const totalPrice = record.price * record.qty;
  const discountAmount = (totalPrice * record.discount) / 100;
  const discountedTotalPrice = totalPrice - discountAmount;
  const taxAmount = (discountedTotalPrice * record.tax) / 100;
  const totalPriceWithTax = discountedTotalPrice + taxAmount;
  const unitPrice = totalPriceWithTax / record.qty;

  return {
    unitPrice,
    totalPrice,
    discountAmount,
    discountedTotalPrice,
    taxAmount,
    totalPriceWithTax,
  };
};

export const calculateSummary = (pageData) => {
  let totalDebit = 0;
  let totalCredit = 0;
  pageData.forEach(({ debit, price, qty, tax, discount }) => {
    const totalPrice = price * qty;
    const discountAmount = (totalPrice * discount) / 100;
    const discountedTotalPrice = totalPrice - discountAmount;
    const itemTax = (discountedTotalPrice * tax) / 100 || 0;
    totalDebit += debit || 0;
    totalCredit += discountedTotalPrice + itemTax || 0;
  });
  const formattedTotalDebit = totalDebit.toFixed(2).toLocaleString();
  const formattedTotalCredit = totalCredit.toFixed(2).toLocaleString();
  const balance = (totalDebit - totalCredit).toFixed(2).toLocaleString();
  const isZeroBalance = balance == 0;

  return {
    totalDebit,
    formattedTotalDebit,
    totalCredit,
    formattedTotalCredit,
    balance,
    isZeroBalance,
  };
};
export function calculateItemTotals(pageData) {
  let untaxedAmount = 0;
  let taxAmount = 0;
  let totalAmount = 0;
  pageData?.forEach(({ price, qty, tax, discount }) => {
    const itemPrice = price || 0;
    const itemQty = qty || 0;

    const discountedPrice = itemPrice - (itemPrice * discount) / 100;
    const itemTax = (discountedPrice * tax) / 100 || 0;
    untaxedAmount += discountedPrice * itemQty;
    taxAmount += itemTax * itemQty;
    totalAmount += (discountedPrice + itemTax) * itemQty;
  });

  return {
    untaxedAmount,
    taxAmount,
    totalAmount,
  };
}
export function calculateAmountDue(array, total) {
  let totalAmount = 0;
  array?.forEach((item) => {
    totalAmount += item.amount || 0;
  });
  return total - totalAmount;
}
export function calculateTotalAmount(array) {
  let totalAmount = 0;
  array?.forEach((item) => {
    totalAmount += item.amount || 0;
  });
  return totalAmount;
}
