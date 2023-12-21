import React, { useEffect, useState } from "react";
import { Checkbox, Col, Divider, Row } from "antd";
import { permissionOptions } from "./Code";
import { myModules } from "shared/constants/AppEnums";

const Permissions = ({
  permissions,
  setPermissions,
  company,
  selectedData,
}) => {
  const [modulePermissions, setModulePermissions] = useState({});

  const findPermissions = (companyId, arr) => {
    const branch = arr?.find((obj) => obj.companyId === companyId);
    if (branch) {
      return branch.permissions;
    } else {
      return {};
    }
  };

  useEffect(() => {
    setModulePermissions(findPermissions(company._id, selectedData?.powers));
  }, [selectedData]);

  const [selectAll, setSelectAll] = useState(false);
  const handleModuleChange = (module) => {
    setModulePermissions((prevState) => {
      const selectedModule = myModules?.find((item) => item.value === module);
      const extraOptions = selectedModule?.extraOptions || [];
      const totalOptions = permissionOptions?.length + extraOptions.length;

      if (prevState[module]?.length === totalOptions) {
        return { ...prevState, [module]: [] };
      }

      return {
        ...prevState,
        [module]: [
          ...(permissionOptions?.map((permission) => permission.value) || []),
          ...(extraOptions.map((option) => option.value) || []),
        ],
      };
    });
  };

  const handlePermissionChange = (module, value) => {
    setModulePermissions((prevState) => {
      return { ...prevState, [module]: value };
    });
  };
  const canUpdates = (modulePermissions) => {
    if (!Object.keys(modulePermissions).length) return;
    let found = false;
    let newArr = permissions?.map((obj) => {
      if (obj.companyId === company._id) {
        found = true;
        return { companyId: obj.companyId, permissions: modulePermissions };
      } else {
        return obj;
      }
    });
    if (!found) {
      newArr.push({ companyId: company._id, permissions: modulePermissions });
    }
    setPermissions(newArr);
  };
  useEffect(() => {
    canUpdates(modulePermissions);
  }, [modulePermissions]);

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    setModulePermissions(() => {
      const updatedState = {};
      myModules?.forEach((module) => {
        updatedState[module.value] = e.target.checked
          ? [
              ...permissionOptions.map((permission) => permission.value),
              ...(module.extraOptions?.map((option) => option.value) || []),
            ]
          : [];
      });
      return updatedState;
    });
  };

  return (
    <div>
      <Checkbox onChange={handleSelectAll} checked={selectAll}>
        Select All
      </Checkbox>
      <Divider />
      {myModules?.map((module) => (
        <div key={module.value}>
          <Row>
            <Col md={8} xs={8}>
              <h3>
                <Checkbox
                  indeterminate={
                    modulePermissions[module.value]?.length > 0 &&
                    modulePermissions[module.value]?.length <
                      permissionOptions?.length +
                        (module.extraOptions?.length || 0)
                  }
                  onChange={() => handleModuleChange(module.value)}
                  checked={
                    modulePermissions[module.value]?.length ===
                    permissionOptions?.length +
                      (module.extraOptions?.length || 0)
                  }
                >
                  {module.label}
                </Checkbox>
              </h3>
            </Col>
            <Col md={16} xs={16}>
              <Checkbox.Group
                options={[
                  ...permissionOptions,
                  ...(module.extraOptions || []).map((option) => option),
                ]}
                value={modulePermissions[module.value]}
                onChange={(value) =>
                  handlePermissionChange(module.value, value)
                }
              />
            </Col>
            <Divider />
          </Row>
        </div>
      ))}
    </div>
  );
};

export default Permissions;
