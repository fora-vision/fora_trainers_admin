import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  ActionButton,
  Group,
  GroupButton,
  PureButton,
} from "../components/button";
import { P, PBold } from "../components/typographic";
import { SpaceBetween, VSpace } from "../components/layout";
import Modal from "../components/Modal";
import Select from "../components/select";

function SetupSet() {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  return (
    <Modal width={448} isOpen onClose={() => navigate(-1)}>
      <PBold style={{ textAlign: "center" }}>Добавить упражнение</PBold>
      <VSpace s={40} />

      <Select placeholder="Название упражнения" value="Ажимацца" />
      <VSpace s={16} />

      <Group>
        <GroupButton isSelected>
          <P>Повторы</P>
        </GroupButton>
        <GroupButton>
          <P>Минуты</P>
        </GroupButton>
      </Group>
      <VSpace s={16} />

      <Select placeholder="Количество повторов" value="15" />
      <VSpace s={24} />

      <SpaceBetween>
        <P>Модификаторы</P>
        <Link to="modifiers">
          <PureButton>
            <P>Добавить</P>
          </PureButton>
        </Link>
      </SpaceBetween>

      <VSpace s={32} />

      <ActionButton>Добавить</ActionButton>
    </Modal>
  );
}

export default SetupSet;
