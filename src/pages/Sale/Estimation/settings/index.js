import { Form } from "antd";
import FormLayout from "meta/JLayouts/Layout";
import EstimationForm from "./SettingForm";

const Estimation = () => {
  const { form } = Form.useForm();

  const address = Form.useWatch("addrress", form);
  const handleSave = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values, "submit values");
      }
    });
  };

  const handleUpdate = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values, "update values");
      }
    });
  };

  return (
    <FormLayout title={"Estimation"} save={handleSave} update={handleUpdate}>
      <EstimationForm form={form} />
    </FormLayout>
  );
};

export default Estimation;
