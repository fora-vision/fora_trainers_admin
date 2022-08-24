import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { action } from "mobx";

import { ReactComponent as IconTrash } from "../components/icons/trash.svg";
import { ReactComponent as IconEdit } from "../components/icons/edit.svg";
import { ReactComponent as ArrowDown } from "../components/icons/arrow-down.svg";

import useBreadcrumbs from "../components/useBreadcrumbs";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ActionButton, PureButton, StrokeButton } from "../components/button";
import { Container, SpaceBetween, VSpace } from "../components/layout";
import { H1, H2, H3, P, PSmall } from "../components/typographic";
import { Input } from "../components/input";
import store from "../store";
import * as S from "./styled";

import { Droppable, SortableItem } from "./dnd";

const SetupWorkout = () => {
  const { isLoading, course, workout } = useBreadcrumbs();
  const [activeId, setActiveId] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  if (isLoading) return null;
  if (!course) return <Navigate to="/courses" replace />;
  if (!workout) return <Navigate to={course.path} replace />;

  const title = workout.isDraft ? "Создать тренировку" : "Редактировать тренировку";
  const saveWorkout = async () => {
    if (workout.isDraft) await course.saveDraftWorkout();
    else await course.save();
    navigate(course.path, { replace: true });
  };

  const handleDragOver = action((event) => {
    const { active, over } = event;
    const activeSetId = active.data.current.sortable.containerId;
    const activeSet = workout.sets.find((v) => v.id === activeSetId);

    const activeExIndex = active.data.current.sortable.index;
    const activeEx = activeSet.exercises[activeExIndex];

    activeSet.exercises.splice(activeExIndex, 1);
    setActiveId(null);

    if (over.data.current == null) {
      const overSet = workout.sets.find((v) => v.id === over.id);
      overSet.exercises.push(activeEx);
      return;
    }

    const overSetId = over.data.current.sortable.containerId;
    const overExIndex = over.data.current.sortable.index;
    const overSet = workout.sets.find((v) => v.id === overSetId);
    overSet.exercises.splice(overExIndex, 0, activeEx);
  });

  function handleDragStart(event) {
    const { active } = event;
    const setId = active.data.current.sortable.containerId;
    const ex = workout.sets.find((v) => v.id === setId).exercises.find((ex) => ex.id === active.id);
    setActiveId(ex);
  }

  return (
    <Container>
      <VSpace s={56} />

      <Breadcrumbs>
        <Link to="/courses">Курсы тренировок</Link>
        <Link to={course.path}>{course.name}</Link>
      </Breadcrumbs>

      <H1>{course.isEditable ? title : "Посмотреть тренировку"}</H1>
      <VSpace s={40} />

      <H2>Общая информация</H2>
      <VSpace s={24} />

      <Input
        style={{ width: 448 }}
        placeholder="Название тренировки"
        onChange={(e) => workout.setName(e.target.value)}
        disabled={course.isEditable === false}
        value={workout.name}
      />
      <VSpace s={40} />

      <H2>Сеты</H2>
      <VSpace s={24} />

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragOver} sensors={sensors}>
        {workout.sets.map((set, setIndex) => (
          <SortableContext id={set.id} items={set.exercises.map((ex) => ex.id)} key={set.id}>
            <Droppable id={set.id}>
              <S.SetCard>
                <SpaceBetween>
                  <SpaceBetween>
                    <H3>СЕТ {setIndex + 1}</H3>
                    {setIndex > 0 && course.isEditable && (
                      <PureButton style={{ marginLeft: 16 }} onClick={() => workout.moveSet(setIndex, -1)}>
                        <ArrowDown style={{ transform: "rotate(-180deg)" }} />
                      </PureButton>
                    )}

                    {setIndex < workout.sets.length - 1 && course.isEditable && (
                      <PureButton style={{ marginLeft: 8 }} onClick={() => workout.moveSet(setIndex, 1)}>
                        <ArrowDown />
                      </PureButton>
                    )}

                    {course.isEditable && (
                      <PureButton style={{ marginLeft: 16 }} onClick={() => workout.removeSet(setIndex)}>
                        <IconTrash />
                      </PureButton>
                    )}
                  </SpaceBetween>

                  <SpaceBetween>
                    <PSmall>Количество повторов сета:</PSmall>
                    <S.RepeatsSelect
                      value={set.repeats}
                      disabled={course.isEditable === false}
                      items={[
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3", label: "3" },
                        { value: "4", label: "4" },
                        { value: "5", label: "5" },
                      ]}
                      onChange={(e) => workout.changeSetRepeats(setIndex, e.target.value)}
                    />
                  </SpaceBetween>
                </SpaceBetween>
                <VSpace s={36} />

                <S.HeaderRow>
                  <PSmall>Упражнение</PSmall>
                  <PSmall>Количество повторов/минут</PSmall>
                  <PSmall>Модификаторы</PSmall>
                  {course.isEditable && <PSmall>Действия</PSmall>}
                </S.HeaderRow>

                {set.exercises.map((ex, exIndex) => (
                  <SortableItem id={ex.id} key={ex.id} disabled={!course.isEditable}>
                    <ExerciseCard setIndex={setIndex} exIndex={exIndex} course={course} workout={workout} ex={ex} />
                  </SortableItem>
                ))}

                {course.isEditable && (
                  <Link to={`${pathname}/${setIndex}/create`}>
                    <StrokeButton style={{ height: 40 }}>+ Добавить упражнение</StrokeButton>
                  </Link>
                )}
              </S.SetCard>
            </Droppable>
          </SortableContext>
        ))}

        <DragOverlay>
          {activeId ? <ExerciseCard ex={activeId} setIndex={0} exIndex={0} course={course} workout={workout} /> : null}
        </DragOverlay>
      </DndContext>

      {course.isEditable && (
        <>
          <StrokeButton style={{ width: 904, height: 80 }} onClick={() => workout.addSet()}>
            + Добавить сет
          </StrokeButton>
          <VSpace s={40} />
          <ActionButton style={{ width: 343 }} onClick={saveWorkout}>
            {workout.isDraft ? "Создать тренировку" : "Сохранить изменения"}
          </ActionButton>
        </>
      )}
    </Container>
  );
};

const ExerciseCard = ({ ex, course, workout, setIndex, exIndex }) => {
  const { pathname } = useLocation();

  return (
    <S.Row style={{ background: "#fff" }}>
      <P>{store.getExerciseName(ex.label)}</P>
      <P>{ex.getExecuteValue()}</P>

      {course.isEditable ? (
        <Link to={`${pathname}/${setIndex}/${exIndex}/modifiers`}>
          <PureButton>
            <P style={{ color: "#7933D2" }}>
              {ex.modificators.length ? `${ex.modificators.length} модификатора` : "Добавить модификатор"}
            </P>
          </PureButton>
        </Link>
      ) : (
        <P>-</P>
      )}

      <div style={{ display: course.isEditable ? "flex" : "none", alignItems: "center" }}>
        <Link to={`${pathname}/${setIndex}/${exIndex}`}>
          <PureButton>
            <IconEdit />
          </PureButton>
        </Link>

        <PureButton style={{ marginLeft: 16 }} onClick={() => workout.removeExercise(setIndex, exIndex)}>
          <IconTrash />
        </PureButton>
      </div>
    </S.Row>
  );
};

export default observer(SetupWorkout);
