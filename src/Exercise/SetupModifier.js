import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PBold } from "../components/typographic";
import Modal from "../components/Modal";
import { VSpace } from "../components/layout";
import { ActionButton } from "../components/button";
import Select from "../components/select";

function SetupModifier() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Modal width={448} isOpen onClose={() => navigate(-1)}>
      <PBold style={{ textAlign: "center" }}>Добавить модификатор</PBold>
      <VSpace s={40} />

      <Select placeholder="Для кого" value="Для женщин" />
      <VSpace s={16} />

      <Select placeholder="Телосложение" value="Полное" />
      <VSpace s={16} />

      <Select placeholder="Тип модификатора" value="Упрощение" />
      <VSpace s={16} />

      <Select placeholder="Величина упрощения" value="20%" />
      <VSpace s={32} />

      <ActionButton>Добавить</ActionButton>
    </Modal>
  );
}

export default SetupModifier;
