export const productUnit = (p, estimation) => {
  let cost = p.price - (p.price * p.discount) / 100;

  if (p.currency == "USD") return cost * estimation.usd || 0;
  else if (p.currency == "EURO") return cost * estimation.euro || 0;
  else return cost || 0;
};
export const productTotal = (p, estimation) => {
  let cost = (p.price - (p.price * p.discount) / 100) * p.qty;

  if (p.currency == "USD") return cost * estimation.usd || 0;
  else if (p.currency == "EURO") return cost * estimation.euro || 0;
  else return cost || 0;
};

export const inWords = (num = 0) => {
  if (num == 0) return "Zero";
  num = Math.floor(num);
  num = ("0".repeat((2 * (num += "").length) % 3) + num).match(/.{3}/g);
  let out = "",
    T1 = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ],
    T2 = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ],
    SC = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion"];
  return (
    num.forEach((n, i) => {
      if (+n) {
        let h = +n[0],
          t = +n.substring(1),
          S = SC[num.length - i - 1];
        out +=
          (out ? " " : "") +
          (h ? T1[h] + " Hundred" : "") +
          (h && t ? " " : "") +
          (t < 20 ? T1[t] : T2[+n[1]] + (+n[2] ? "-" : "") + T1[+n[2]]);
        out += (out && S ? " " : "") + S;
      }
    }),
    out
  );
};
export const inShort = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + " million";
  } else if (num >= 100) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};

export const productCost = (products, estimation) => {
  if (!estimation || !products) return 0;
  let cost = products?.reduce((prev, p) => {
    return prev + +productTotal(p, estimation);
  }, 0);
  return cost || 0;
};

export const AddPercentage = (value = 0, percentage = 0) => {
  if (percentage <= 0) {
    return value;
  }
  var percentageOfvalue = value * (percentage / 100);
  var net = value + percentageOfvalue;
  return net;
};
export const Percentage = (value = 0, percentage = 0) => {
  if (percentage <= 0) {
    return value;
  }
  var percentageOfvalue = value * (percentage / 100);
  return percentageOfvalue;
};

export const calculateCosts = (panels) => {
  const pTotal = panels ? panels.reduce((n, p) => n + p.pCost * p.qty, 0) : 0;
  const sTotal = panels
    ? panels.reduce((n, p) => n + p.sheetCost * p.qty, 0)
    : 0;
  const trayTotal = panels
    ? panels.reduce((n, p) => n + p.cableTrayCost * p.qty, 0)
    : 0;
  const copperTotal =
    (panels ? panels.reduce((n, p) => n + p.copperCost * p.qty, 0) : 0) || 0;
  const aTotal = panels ? panels.reduce((n, p) => n + p.aCost * p.qty, 0) : 0;
  const wiringTotal =
    (panels ? panels.reduce((n, { wCost, qty }) => n + wCost * qty, 0) : 0) ||
    0;

  const sheetCost = (sTotal || 0 + trayTotal || 0).toFixed(0);
  const productsCost = (pTotal || 0 + aTotal || 0).toFixed(0);

  return {
    pTotal,
    sTotal,
    trayTotal,
    copperTotal,
    wiringTotal,
    sheetCost,
    productsCost,
  };
};
export const copperPrice = (localRate = 0, lmeRate = 0, usd = 0, type = "") => {
  const localGstAdjustment = 1.085;
  const localTransportation = 10;
  const localTin = 100;
  const localSleeveAdd = 60;
  const impDuties = 1.04;
  const impTransportation = 20;
  const impSleeveAdd = 60;

  let localRateTin =
    localRate / localGstAdjustment + localTransportation + localTin;
  let localSleeveRate =
    localRate / localGstAdjustment + localTransportation + localSleeveAdd;
  let localBothRate = localRateTin + localSleeveAdd;

  let impTinRate =
    (((lmeRate + 1450) * impDuties) / 1000) * usd + impTransportation;
  let impSleeveRate = impTinRate + impSleeveAdd;
  if (type == "localTin") return localRateTin;
  if (type == "localSleeve") return localSleeveRate;
  if (type == "localBoth") return localBothRate;
  if (type == "impTin") return impTinRate;
  if (type == "impSleeve") return impSleeveRate;
};

export const PriceOrWeight = (weight, enqData, isCopper, panel, type) => {
  if (!enqData || !panel) return 0;

  let percentage = 0;
  let price = 0;
  if (isCopper) {
    price = copperPrice(
      enqData.loCuPrice,
      enqData.lmeRate,
      enqData.usd,
      panel.copperType
    );
  } else {
    percentage = enqData.sheetWaste || 0;
    if (panel.sheetType === "GIPowderCoated") price = enqData?.giPrice || 0;
    if (panel.sheetType === "GISheet") price = enqData?.giPrice || 0;
    if (panel.sheetType === "MSPowderCoated") price = enqData?.sPrice || 0;
    if (panel.sheetType === "HotDipGalvanized")
      price = enqData?.sPrice + enqData?.hotDip || 0;
    if (panel.sheetType === "ss304") price = enqData?.ss304 || 0;
    if (panel.sheetType === "ss316") price = enqData?.ss316 || 0;
  }
  let weightWithWaste = AddPercentage(weight, percentage);
  let totalCost = weightWithWaste * price;
  if (type == "weight") return weightWithWaste?.toFixed(2) || 0;
  else return totalCost;
};

export const PanelSum = (panel) => {
  if (panel == undefined || panel == null) return 0;
  var wiringCost = panel.wCost || 0;
  var copperCost = panel.copperCost || 0;
  var sheetCost = panel.sheetCost || 0;
  var cableTrayCost = panel.cableTrayCost || 0;
  var productCost = panel.pCost || 0;
  var accessoriesCost = panel.aCost || 0;
  var Total =
    wiringCost +
    copperCost +
    sheetCost +
    cableTrayCost +
    productCost +
    accessoriesCost;
  return Total;
};
export const NetPanel = (enqData, panel) => {
  if (
    enqData == undefined ||
    enqData == null ||
    panel == undefined ||
    panel == null
  )
    return 0;

  var wiringCost = panel.wCost || 0;
  var trayWeight = panel.ctWeight || 0;
  var sheetWeight = panel.sWeight || 0;
  var copperWeight = panel.cWeight || 0;
  var qty = panel.qty || 0;
  var Total =
    productCost(panel?.products, enqData) +
    productCost(panel?.accessories, enqData) +
    wiringCost +
    PriceOrWeight(copperWeight, enqData, true, panel, "price") +
    PriceOrWeight(trayWeight, enqData, false, panel, "price") +
    PriceOrWeight(sheetWeight, enqData, false, panel, "price");
  return Total * qty;
};

export const GrandTotal = (enqData, panels, type) => {
  if (
    enqData == undefined ||
    enqData == null ||
    panels == undefined ||
    panels == null
  )
    return 0;
  var AllPanelTotal = 0;
  var PanelGrandMargin = 0;
  var PanelGrandOH = 0;

  if (panels)
    panels?.map((p) => {
      var PanelGrandTotal = 0;
      var NetTotal = p.panelCost * p.qty || 0;
      var PanelOH = 0;
      var PanelMargin = 0;
      if (p.type == "Cable Tray") {
        PanelOH = Percentage(NetTotal, enqData.cableOH);
        PanelMargin = Percentage(NetTotal + PanelOH, enqData.cableMargin);
        PanelGrandTotal = NetTotal + PanelOH + PanelMargin;
      } else {
        PanelOH = Percentage(NetTotal, enqData.overhead);
        PanelMargin = Percentage(NetTotal + PanelOH, enqData.margin);

        PanelGrandTotal = NetTotal + PanelOH + PanelMargin;
      }
      AllPanelTotal += PanelGrandTotal;
      PanelGrandMargin += PanelMargin;
      PanelGrandOH += PanelOH;
    });

  if (type == undefined || type == null)
    return Number(AllPanelTotal)?.toFixed(0) || 0;
  if (type == "oh") return Number(PanelGrandOH)?.toFixed(0) || 0;
  if (type == "margin") return Number(PanelGrandMargin)?.toFixed(0) || 0;
};

export const getUniqueBrands = (products) => {
  const make = products?.map((p) => p.make);
  const uniqueMakeSet = new Set(make);
  const uniqueMakeArray = Array.from(uniqueMakeSet, (make) => ({
    title: make,
  }));
  return uniqueMakeArray;
};
export const getUniquness = (products, name) => {
  const make = products?.map((p) => ({ _id: p._id, title: p[name] || "" }));
  const uniqueMakeSet = new Set(make);
  const uniqueMakeArray = Array.from(uniqueMakeSet);
  return uniqueMakeArray;
};
export const mergeProducts = (products) => {
  const map = new Map();
  products?.forEach((product) => {
    const key = product.productId + product.currency;
    if (map.has(key)) {
      const existingProduct = map.get(key);
      existingProduct.qty += product.qty;
      existingProduct.price += product.price;
    } else {
      map.set(key, { ...product });
    }
  });
  return Array.from(map.values());
};

export const GrandPanelTotal = (estimation, p) => {
  if (
    estimation == undefined ||
    estimation == null ||
    p == undefined ||
    p == null
  )
    return 0;
  var PanelTotal = 0;
  var total = 0;
  var PanelOH = 0;
  var PanelMargin;
  if (p) {
    if (p.type == "Cable Tray") {
      total = p.panelCost;
      PanelOH = Percentage(total, estimation.cableOH);
      PanelMargin = Percentage(total + PanelOH, estimation.cableMargin);
      PanelTotal = total + PanelOH + PanelMargin;
    } else {
      total = p.panelCost;
      PanelOH = Percentage(total, estimation.overhead);
      PanelMargin = Percentage(total + PanelOH, estimation.margin);
      PanelTotal = total + PanelOH + PanelMargin;
    }
  }
  return Number(PanelTotal)?.toFixed(0) || 0;
};

export const Rs = (value, fraction = 0) => {
  if (value === null || value === undefined || isNaN(value)) {
    return "Rs. 0.00";
  }
  return (
    "Rs. " +
    Number(value)?.toLocaleString("en-IN", { maximumFractionDigits: fraction })
  );
};
export const Formate = (value, fraction = 0) => {
  if (value === null || value === undefined || isNaN(value)) {
    return "0";
  }
  return Number(value)?.toLocaleString("en-IN", {
    maximumFractionDigits: fraction,
  });
};

export const TotalValue = (array) => {
  var total = array?.reduce((a, b) => a + b, 0);
  return total;
};

export const wiringCost = (wirings) => {
  let cost = wirings?.reduce((prev, p) => {
    let value = p.value || 0;
    let qty = p.qty || 0;
    return prev + +(value * qty);
  }, 0);
  return cost || 0;
};
