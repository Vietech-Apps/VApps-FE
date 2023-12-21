export const CTWeight = (cTray, cLadder) => {
  let cTrayWeight = 0;
  let cLadderWeight = 0;
  cTray?.map((item) => (cTrayWeight += CTray(item)));
  cLadder?.map((item) => (cLadderWeight += CLadder(item)));
  return cTrayWeight + cLadderWeight;
};
export const CLadder = ({
  qty = 0,
  h = 0,
  w = 0,
  t = 0,
  l = 0,
  unitLength = "",
  unit = "",
  tC,
  hasCover,
}) => {
  //tary
  let height = 0;
  let width = 0;
  let length = 0;
  var LadderTotal = 0;
  var LadderWidth = 0;
  var jPlate = 0;
  var LadderWeight = 0;
  var RungsWeight = 0;
  var CoverTotal = 0;
  var CoverWidth = 0;

  if (unit == "in.") {
    height = h * 25.4;
    width = w * 25.4;
  }
  if (unitLength == "ft") length = l * 304.8;
  else length = l * 1000;

  LadderWidth = (height + 50) * 2;
  LadderWeight = LadderWidth * length * t * 0.00000785;
  jPlate = ((height + 10) * 480 * t * 0.00000785) / (2400 / length);
  LadderTotal = (LadderWeight + jPlate) * 1.04;
  RungsWeight = width * t * 144 * 3 * 0.00000785 * 1.1;
  //Cover
  CoverWidth = width + 5 + 24;
  CoverTotal = CoverWidth * length * tC * 0.00000785 * 1.05;

  if (!hasCover && LadderTotal > 0) return (LadderTotal + RungsWeight) * qty;
  if (hasCover && LadderTotal > 0)
    return (CoverTotal + LadderTotal + RungsWeight) * qty;
  return 0;
};
export const CTray = ({
  qty = 0,
  h = 0,
  w = 0,
  t = 0,
  l = 0,
  unitLength = "",
  unit = "",
  tC,
  hasCover,
}) => {
  let height = 0;
  let width = 0;
  let length = 0;

  var TrayTotal = 0;
  var TrayWidth = 0;
  var jPlate = 0;
  var TrayWeight = 0;

  var CoverTotal = 0;
  var CoverWidth = 0;

  if (unit == "in.") {
    height = h * 25.4;
    width = w * 25.4;
  }
  if (unitLength == "ft") length = l * 304.8;
  else length = l * 1000;

  TrayWidth = height * 2 + width + 24; //height*2+width+edge*2
  TrayWeight = TrayWidth * length * t * 0.00000785;
  jPlate = ((height + 10) * 480 * t * 0.00000785) / (2400 / length);
  TrayTotal = (TrayWeight + jPlate) * 1.04; //add waste 0.04
  //Cover
  CoverWidth = width + 29;
  CoverTotal = CoverWidth * l * tC * 0.00000785 * 1.05; //add waste 0.05
  //without cover,
  if (!hasCover && TrayTotal > 0) return TrayTotal * qty;
  //with cover,
  if (hasCover && TrayTotal > 0) return (CoverTotal + TrayTotal) * qty;
  return 0;
};
export const CTBend = ({ qty, h, wIn, wOut, t, unit, tC, hasCover }) => {
  let height = 0;
  let widthIn = 0;
  let widthOut = 0;

  var TrayTotal = 0;
  var TrayWidth = 0;
  var BendLength = 0;
  var jPlate = 0;
  var TrayWeight = 0;

  var CoverTotal = 0;
  var CoverWidth = 0;

  if (unit == "in.") {
    height = h * 25.4;
    widthIn = wIn * 25.4;
    widthOut = wOut * 25.4;
  }
  TrayWidth = height + widthOut + 12 + 215;
  BendLength = height + widthIn + 12 + 215;

  TrayWeight = TrayWidth * BendLength * 1000 * t * 0.00000785;
  jPlate = ((height + 10) * 480 * t * 0.00000785 * 2) / ((2400 / 1000) * 2);
  TrayTotal = (TrayWeight + jPlate) * 1.1; //add waste 0.04
  //Cover
  CoverWidth = widthIn + 220 + 12;
  CoverTotal = CoverWidth * (widthOut + 220 + 12) * tC * 0.00000785 * 1.05; //ads waste 0.05
  //without cover,
  if (!hasCover && TrayTotal > 0) return TrayTotal * qty;
  //with cover,
  if (hasCover && TrayTotal > 0) return (CoverTotal + TrayTotal) * qty;
  return 0;
};
export const CTEE = ({ qty, h, wIn, wOut, wExit, t, unit, tC, hasCover }) => {
  let height = 0;
  let widthIn = 0;
  let widthOut = 0;
  let widthExit = 0;

  var TrayTotal = 0;
  var TrayWidth = 0;
  var TeeLength = 0;
  var jPlate = 0;
  var TrayWeight = 0;

  var CoverTotal = 0;
  var CoverWidth = 0;

  if (unit == "in.") {
    height = h * 25.4;
    widthIn = wIn * 25.4;
    widthOut = wOut * 25.4;
    widthExit = wExit * 25.4;
  }
  TrayWidth = widthExit + 430;
  TeeLength = height + Math.max(widthIn, widthOut) + 12 + 215;

  TrayWeight = TrayWidth * TeeLength * t * 0.00000785 * 1.15;
  jPlate = ((height + 10) * 480 * t * 0.00000785 * 2) / ((2400 / 1000) * 3);
  TrayTotal = (TrayWeight + jPlate) * 1.1; //add waste 0.04
  //Cover
  CoverWidth = TrayWidth + 220 + 12;
  CoverTotal = CoverWidth * (widthOut + 220 + 12) * tC * 0.00000785 * 1.05; //ads waste 0.05
  //without cover,
  if (!hasCover && TrayTotal > 0) return TrayTotal * qty;
  //with cover,
  if (hasCover && TrayTotal > 0) return (CoverTotal + TrayTotal) * qty;
  return 0;
};
