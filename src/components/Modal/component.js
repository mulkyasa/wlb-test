import React from "react";

export default function Component(props) {
  const { isOpen, children } = props;

  if (isOpen) {
    return (
      <div className="modal">
        <div className="modal__body">{children}</div>
      </div>
    );
  } else {
    return <></>;
  }
}
