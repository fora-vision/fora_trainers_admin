import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next'
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { Link, Navigate } from "react-router-dom";

import { H1 } from "../components/typographic";
import { Container } from "../components/layout";
import { Breadcrumbs } from "../components/Breadcrumbs";
import useBreadcrumbs from "../components/useBreadcrumbs";
import { PureButton, StrokeButton } from "../components/button";
import { ReactComponent as CloseIcon } from "../components/icons/close.svg";

import { getColumns, workoutColumns } from "./columns";
import WorkoutsChart from "./Chart";
import Table from "./Table";
import * as S from "./styled";

const WorkoutTable = ({ row }) => {
  const [selected, setSelected] = useState(null);

  return (
    <S.Workouts isOpen={row.isExpanded}>
      <Table
        selected={selected?.id}
        columns={workoutColumns}
        data={row.original.workouts}
        onSelect={(workoutRow) => setSelected(workoutRow)}
      />

      {selected == null ? (
        <S.Chart>
          <WorkoutsChart user={row.original} />
        </S.Chart>
      ) : (
        <S.Video>
          <video controls src={selected.original.video_url} />
          <PureButton onClick={() => setSelected(null)}>
            <CloseIcon />
          </PureButton>
        </S.Video>
      )}
    </S.Workouts>
  );
};

const Users = () => {
  const { t } = useTranslation();
  const { isLoading, course } = useBreadcrumbs();

  useEffect(() => {
    void course?.loadUsers();
  }, [course]);

  if (isLoading || !course.users.length) return null;
  if (!course) return <Navigate to="/courses" replace />;

  return (
    <Container>
      <S.Header>
        <div>
          <Breadcrumbs>
            <Link to="/courses">{t("users.index.course")}</Link>
            <Link to={course.path}>{course.name}</Link>
          </Breadcrumbs>
          <H1>{t("users.index.courseUsers")} ({course.users.length})</H1>
        </div>
        <StrokeButton onClick={() => course.downloadXlsx()} disabled={course.isExporting}>
          {course.isExporting ? t("users.index.exporting") : t("users.index.export")}
        </StrokeButton>
      </S.Header>

      <Table data={toJS(course.users)} columns={getColumns(course)} SubComponent={WorkoutTable} />
    </Container>
  );
};

export default observer(Users);
