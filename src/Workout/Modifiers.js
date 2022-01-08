import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ReactComponent as IconTrash } from "../components/icons/trash.svg";
import { ReactComponent as IconEdit } from "../components/icons/edit.svg";

import Modal from "../components/Modal";
import { SpaceBetween, VSpace } from "../components/layout";
import { P, PBold } from "../components/typographic";
import { ActionButton, PureButton } from "../components/button";

function Modifiers() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Modal width={448} isOpen onClose={() => navigate(-1)}>
      <PBold style={{ textAlign: "center" }}>Модификаторы</PBold>
      <VSpace s={40} />

      <SpaceBetween
        style={{
          padding: "12px 12px 12px 16px",
          background: "#F4F3F6",
          borderRadius: 16,
          marginBottom: 16,
        }}
      >
        <P>Упрощение 20% для женщин</P>
        <SpaceBetween>
          <Link to={`0`}>
            <PureButton>
              <IconEdit />
            </PureButton>
          </Link>

          <PureButton style={{ marginLeft: 16 }}>
            <IconTrash />
          </PureButton>
        </SpaceBetween>
      </SpaceBetween>

      <VSpace s={8} />

      <Link to="new">
        <ActionButton>Добавить</ActionButton>
      </Link>
    </Modal>
  );
}

export default Modifiers;
