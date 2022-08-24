import React, { useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import { useTable, useFlexLayout, useSortBy, useExpanded } from "react-table";
import { ReactComponent as ArrowDownIcon } from "../components/icons/arrow-down.svg";
import * as S from "./styled";

const Styles = styled.div`
  table {
    border-spacing: 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 18px;
    width: 100%;

    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      text-align: left;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const expandCell = {
  Header: () => null,
  id: "expander",
  width: 38,
  Cell: ({ row }) => (
    <S.ExpandButton {...row.getToggleRowExpandedProps()} isExpanded={row.isExpanded}>
      <ArrowDownIcon />
    </S.ExpandButton>
  ),
};

const AnimatedSubRow = ({ row, visibleColumns, SubComponent }) => {
  const [isMount, setMount] = useState(false);
  useEffect(() => {
    if (row.isExpanded) return setMount(true);
    const timer = setTimeout(() => setMount(false), 500);
    return () => clearTimeout(timer);
  }, [row.isExpanded]);

  if (!isMount) return null;
  return (
    <tr>
      <td style={{ padding: 0 }} colSpan={visibleColumns.length}>
        <SubComponent row={row} />
      </td>
    </tr>
  );
};

const initialState = { sortBy: [{ id: "ФИО", desc: false }, { id: "Дата", desc: true }] };

const Table = ({ columns, data, SubComponent, selected, onSelect }) => {
  const userColumns = useMemo(() => {
    if (!SubComponent) return columns;
    return [expandCell].concat(columns);
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, visibleColumns } = useTable(
    { columns: userColumns, data, initialState },
    useFlexLayout,
    useSortBy,
    useExpanded
  );

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <S.HeaderColumn {...column.getHeaderProps(column.getSortByToggleProps())} isSorted={column.isSorted}>
                  {column.render("Header")}
                  <S.SortButton isDesc={column.isSortedDesc}>
                    <ArrowDownIcon />
                  </S.SortButton>
                </S.HeaderColumn>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);

            const cells = row.cells.map((cell) => {
              return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
            });

            const selectableRow = (
              <S.TableRow
                {...row.getRowProps()}
                isSelected={selected === row.id}
                onClick={() => onSelect(selected === row.id ? null : row)}
              >
                {cells}
              </S.TableRow>
            );

            return (
              <React.Fragment key={row.id}>
                {onSelect ? selectableRow : <tr {...row.getRowProps()}>{cells}</tr>}
                <AnimatedSubRow row={row} visibleColumns={visibleColumns} SubComponent={SubComponent} />
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
};

export default Table;
