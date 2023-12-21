import { AddPercentage } from "meta/Reusable/CalcData";

export const Sum2Arrays = (arr1, arr2) => {
  var total1 = 0;
  var total2 = 0;
  if (arr1) total1 = arr1?.reduce((a, b) => a + b, 0);
  if (arr2) total2 = arr2?.reduce((a, b) => a + b, 0);

  return total1 + total2;
};

const calculateWeight = (
  copperType = "",
  phaseSum = 0,
  run = 0,
  length = 0
) => {
  if (!copperType || !phaseSum || !run || !length) {
    return 0;
  }

  const density = 0.00896;
  let [a, b] = copperType.split("x");
  a = Number(a);
  b = Number(b);
  const result = a * b * run * (length / 1000) * density * phaseSum;
  // console.log(
  //   `${a} * ${b} * ${run} * ${length} * ${density} * ${phaseSum}`,
  //   result
  // );
  return result;
};

export const CopperWeight = (arr, waste = 0, setWeight, type) => {
  var newArray = [];
  arr?.map((p) => {
    var total = 0;
    if (p && type == "busbar") {
      const { copperType, phase, neutral, run, earth, length } = p;
      const phaseSum = (phase || 0) + (neutral || 0) + (earth || 0);
      if (copperType && run && length && phaseSum) {
        total = calculateWeight(copperType, phaseSum, run, length);
        total = AddPercentage(total, waste);
      }
    }
    if (p && type == "drop") {
      const { copperType, TP, FPHN, FPFN, run, length } = p;
      var TpValue = 0;
      var FPFNValue = 0;
      var FPHNValue = 0;
      var phaseSum = 0;
      if (TP) {
        TpValue = 3;
      }
      if (FPHN) {
        FPFNValue = 3.5;
      }
      if (FPFN) {
        FPHNValue = 4;
      }
      phaseSum = TpValue + FPFNValue + FPHNValue;

      if (copperType && run && length && phaseSum) {
        total = calculateWeight(copperType, phaseSum, run, length);
      }
    }

    newArray.push(total);
  });

  setWeight(newArray);

  return newArray;
};

export const CopperTypeWeight = [
  { value: "200x10", Copper: "200x10" },
  { value: "160x10", Copper: "160x10" },
  { value: "120x10", Copper: "120x10" },
  { value: "100x10", Copper: "100x10" },
  { value: "100x5", Copper: "100x5" },
  { value: "80x10", Copper: "80x10" },
  { value: "80x5", Copper: "80x5" },
  { value: "60x10", Copper: "60x10" },
  { value: "60x5", Copper: "60x5" },
  { value: "50x10", Copper: "50x10" },
  { value: "50x5", Copper: "50x5" },
  { value: "40x10", Copper: "40x10" },
  { value: "40x5", Copper: "40x5" },
  { value: "30x10", Copper: "30x10" },
  { value: "30x5", Copper: "30x5" },
  { value: "20x10", Copper: "20x10" },
  { value: "20x5", Copper: "20x5" },
  { value: "12x10", Copper: "12x10" },
  { value: "12x5", Copper: "12x5" },
];

export const Breakers = [
  {
    Value: 0,
    Breaker: "E6.2 6300A(BTD)",
    Run: 5,
    Copper: "120x10",
    length: 2850,
  },
  {
    Value: 1,
    Breaker: "E6.2 6300A (Cable)",
    Run: 5,
    Copper: "120x10",
    length: 1850,
  },
  {
    Value: 2,
    Breaker: "E6.2 5000A (BTD)",
    Run: 4,
    Copper: "120x10",
    length: 2850,
  },
  {
    Value: 3,
    Breaker: "E6.2 5000A (Cable)",
    Run: 4,
    Copper: "120x10",
    length: 1850,
  },
  {
    Value: 4,
    Breaker: "E4.2 4000A (BTD)",
    Run: 4,
    Copper: "80x10",
    length: 2700,
  },
  {
    Value: 5,
    Breaker: "E4.2 4000A (Cable)",
    Run: 4,
    Copper: "80x10",
    length: 1750,
  },
  {
    Value: 6,
    Breaker: "E4.2 3200A (BTD)",
    Run: 3,
    Copper: "100x10",
    length: 2700,
  },
  {
    Value: 7,
    Breaker: "E4.2 3200A (Cable)",
    Run: 3,
    Copper: "100x10",
    length: 1750,
  },
  {
    Value: 8,
    Breaker: "E2.2 2500A (BTD)",
    Run: 3,
    Copper: "60x10",
    length: 2650,
  },
  {
    Value: 9,
    Breaker: "E2.2 2500A(Cable)",
    Run: 3,
    Copper: "60x10",
    length: 1750,
  },
  {
    Value: 10,
    Breaker: "E2.2 2000A (BTD)",
    Run: 4,
    Copper: "60x5",
    length: 2650,
  },
  {
    Value: 11,
    Breaker: "E2.2 2000A (Cable)",
    Run: 4,
    Copper: "60x5",
    length: 1750,
  },
  {
    Value: 12,
    Breaker: "E2.2 1600A (BTD)",
    Run: 2,
    Copper: "60x10",
    length: 2650,
  },
  {
    Value: 13,
    Breaker: "E2.2 1600A (Cable)",
    Run: 2,
    Copper: "60x10",
    length: 1750,
  },
  {
    Value: 14,
    Breaker: "E2.2 1250A (BTD)",
    Run: 2,
    Copper: "60x5",
    length: 2650,
  },
  {
    Value: 15,
    Breaker: "E2.2 1250A (Cable)",
    Run: 2,
    Copper: "60x5",
    length: 1750,
  },
  { Value: 16, Breaker: "E1.2 1600A", Run: 2, Copper: "50x10", length: 1650 },
  { Value: 17, Breaker: "E1.2 1250A", Run: 3, Copper: "50x5", length: 1650 },
  {
    Value: 18,
    Breaker: "E1.2 1000/800A",
    Run: 2,
    Copper: "50x5",
    length: 1650,
  },
  { Value: 19, Breaker: "T7 1600A", Run: 3, Copper: "50x5", length: 1400 },
  { Value: 20, Breaker: "T7 1250A", Run: 3, Copper: "50x5", length: 1400 },
  { Value: 21, Breaker: "T6 1000A", Run: 2, Copper: "50x5", length: 1200 },
  { Value: 22, Breaker: "T6 800A", Run: 1, Copper: "50x10", length: 1200 },
  { Value: 23, Breaker: "T5 630A", Run: 2, Copper: "30x5", length: 1200 },
  { Value: 24, Breaker: "T5 400A", Run: 1, Copper: "30x5", length: 1200 },
  { Value: 25, Breaker: "XT4 250/200A", Run: 1, Copper: "20x5", length: 1200 },
  { Value: 26, Breaker: "XT2/XT1 150A", Run: 1, Copper: "20x5", length: 800 },
  { Value: 27, Breaker: "XT2/XT1 100A", Run: 1, Copper: "20x5", length: 600 },
];
