import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ActionButton } from "../components/button";
import { PBold } from "../components/typographic";
import { Input } from "../components/input";
import { VSpace } from "../components/layout";
import Modal from "../components/Modal";

function CreateCourse() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  return (
    <Modal width={448} isOpen onClose={() => navigate("/courses")}>
      <PBold style={{ textAlign: "center" }}>Создать курс</PBold>
      <VSpace s={40} />
      <Input
        value={name}
        placeholder="Название курса"
        onChange={(e) => setName(e.target.value)}
      />
      <VSpace s={24} />
      <ActionButton disabled={name.length === 0}>Продолжить</ActionButton>
    </Modal>
  );
}

export default CreateCourse;
