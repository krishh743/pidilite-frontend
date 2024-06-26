import React from "react";
import { Modal, Button } from "antd";

const ConfirmDeleteDialog = ({
  onClose,
  onDelete,
  Heading,
  ActionBtnText,
  cancelBtn,
}: any) => {
  return (
    <Modal
      title={Heading}
      visible={true}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          {cancelBtn}
        </Button>,
        <Button key="delete" type="primary" danger onClick={onDelete}>
          {ActionBtnText}
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this item?</p>
    </Modal>
  );
};

export default ConfirmDeleteDialog;
