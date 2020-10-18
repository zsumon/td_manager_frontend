import React, {useEffect, useState} from "react";
import styles from './Editor.module.css';

const Editor = ({text, visible, onEdit, close}) => {
  const [editedText, setEditedText] = useState(text);
  const [saving, setSaving] = useState(false);

  return <div className={styles.modal + " " + (visible ? "d-block" : "d-none")}>
    <div className={styles.modalContent + " text-center"}>
      <h5 className="pb-2 border-bottom">Edit todo</h5>
      <span onClick={() => close()} className={"close"} style={{cursor: "pointer"}}>&times;</span>
      <input
        className="mr-2 form-control-sm mt-3"
        type="text"
        style={{maxWidth: "12rem"}}
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}/>
      <button
        className="btn btn-primary"
        onClick={() => {
          setSaving(true);
          onEdit(editedText);
          setSaving(false);
        }}>Save
      </button>
    </div>
  </div>
}

export default Editor;
