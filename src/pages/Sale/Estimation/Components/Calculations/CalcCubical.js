const calculateWeight = (
  thickness = 0,
  width = 0,
  length = 0,
  material = ""
) => {
  if (!thickness || !width || !length) {
    return 0;
  }

  const density = material === "ss304" || material === "ss316" ? 8 : 7.85;
  const result = (thickness * width * length * density) / 1000000;
  // console.log(`${thickness}x${width}x${length}x7.85`, result);
  return result;
};

export const cubicalWeight = (arr = [], height = 0, material, setWeights) => {
  let weights = [];
  arr?.map((p, key) => {
    if (p) {
      const front =
        calculateWeight(p.frontThick, arr[key].width, height, material) *
        p.frontQty;
      const plate =
        calculateWeight(p.plateThick, arr[key].width, height, material) *
        p.plateQty;
      const back =
        calculateWeight(p.backThick, arr[key].width, height, material) *
        p.backQty;
      const top =
        calculateWeight(p.topThick, arr[key].width, arr[key]?.depth, material) *
        p.topQty;
      const bottom =
        calculateWeight(
          p.bottomThick,
          arr[key].width,
          arr[key]?.depth,
          material
        ) * p.bottomQty;
      const left =
        calculateWeight(p.leftThick, arr[key].depth, height, material) *
        p.leftQty;
      const right =
        calculateWeight(p.rightThick, arr[key].depth, height, material) *
        p.rightQty;

      const subTotalWeight = front + back + top + bottom + left + right + plate;
      weights[key] = subTotalWeight;
    }
  });
  if (typeof setWeights === "function") {
    setWeights(weights);
  }
  return weights?.reduce((a, b) => a + b, 0);
};
