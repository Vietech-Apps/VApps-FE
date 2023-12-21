import React, { useState } from "react";
import jsPDF from "jspdf";
import PrintModal from "./PrintModal";
import Draggable from "react-draggable";

const DraggableField = ({ name, onDragStop }) => (
  <Draggable bounds="parent" onStop={onDragStop}>
    <div
      style={{
        display: "flex",
        width: "300px",
        border: "1px solid black",
        padding: "0px 2px",
        margin: "2.5px",
      }}
    >
      {name}
    </div>
  </Draggable>
);

const Check = ({ fields, onFieldMove }) => {
  const [pdfSrc, setPdfSrc] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handlePrint = async (xOffsetInput, yOffsetInput) => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [610, 280],
    });

    pdf.setFontSize(12);
    const txt = "A/C Payee Only";
    const xOffset = 10;
    const yOffset = 55;
    const angle = 45;
    pdf.text(txt, xOffset, yOffset, { angle });

    const x1OffsetAbove = 2; //fix
    const y1OffsetAbove = 45;
    const x2OffsetAbove = 45;
    const y2OffsetAbove = 3; //fix
    const x1OffsetBelow = 2; //fix
    const y1OffsetBelow = 70;
    const x2OffsetBelow = 70;
    const y2OffsetBelow = 3; //fix

    // Draw the lines
    pdf.line(x1OffsetAbove, y1OffsetAbove, x2OffsetAbove, y2OffsetAbove); // Line above
    pdf.line(x1OffsetBelow, y1OffsetBelow, x2OffsetBelow, y2OffsetBelow); // Line below

    fields.forEach((field) => {
      const x = (field.position.x / 610) * 610;
      const y = (field.position.y / 280) * 280;
      pdf.text(field.name, x, y);
    });

    const pdfData = pdf.output("datauristring");
    setPdfSrc(pdfData);
    setModalVisible(true);
  };

  return (
    <div
      style={{
        width: "610px", // 50% of 14.67 inches
        height: "280px", // 50% of 11.33 inches
        position: "relative",
        border: "1px solid black",
        background: `
          linear-gradient(90deg, rgba(144,238,144,0.6) 1px, transparent 1px),
          linear-gradient(0deg, rgba(144,238,144,0.6) 1px, transparent 1px),
          linear-gradient(90deg, rgba(144,238,144,0.3) 1px, transparent 1px),
          linear-gradient(0deg, rgba(144,238,144,0.3) 1px, transparent 1px)`,
        backgroundSize: `25px 25px, 25px 25px, 3.125px 3.125px, 3.125px 3.125px`,
      }}
    >
      {fields.map(({ name, position }, index) => (
        <DraggableField
          key={index}
          name={name}
          onDragStop={(e, data) => onFieldMove(name, data)}
        />
      ))}
      <button onClick={handlePrint}>Print this out!</button>
      <PrintModal
        title="Check Preview"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        src={pdfSrc}
      />
    </div>
  );
};

const PrintCheck = () => {
  const [payeeName, setPayeeName] = useState("John Doe");
  const [amount, setAmount] = useState("100");
  const [amountInWords, setAmountInWords] = useState(
    "One hundred dollars only"
  );
  const [date, setDate] = useState("2023-05-31");

  const [fields, setFields] = useState([
    {
      name: `Date: ${date}`,
      position: { x: 0, y: 0 },
    },
    {
      name: `Amoun: $${amount}`,
      position: { x: 0, y: 0 },
    },
    {
      name: `Payee: ${payeeName}`,
      position: { x: 0, y: 0 },
    },
    {
      name: `Amount In Word: ${amountInWords}`,
      position: { x: 0, y: 0 },
    },
  ]);
  const handleFieldMove = async (name, data) => {
    const updatedFields = fields.map((field) => {
      if (field.name === name) {
        field.position = { x: data.x, y: data.y };
      }
      return field;
    });
    setFields(updatedFields);
  };

  return (
    <div>
      <Check fields={fields} onFieldMove={handleFieldMove} />
    </div>
  );
};

export default PrintCheck;
