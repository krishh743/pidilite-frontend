// import React from "react";
// import "./AddUserByAdmin.css";


// const ConfirmDeleteDialog = ({ onClose, onDelete,Heading,ActionBtnText,cancelBtn }:any) => {
//   return (
//     <div className="confirmDeleteDialog">
//       <div className="confirmDeleteDialogContent">
//         <h2>{Heading}</h2>
//         <div className="dialogButtons">
//           <button className="deleteBtn" onClick={onDelete}>{ActionBtnText}</button>
//           <button className="cancelBtn" onClick={onClose}>{cancelBtn}</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmDeleteDialog;

import React from "react";
import { Modal, Button } from "antd";
// import "./AddUserByAdmin.css";

const ConfirmDeleteDialog = ({ onClose, onDelete, Heading, ActionBtnText, cancelBtn }: any) => {
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
