import React, { useEffect, useContext } from "react";
import styled from "styled-components";

import { arrayForSorting } from "../core/config";
import { SortManager } from "./SortManager";
import { BubbleSort } from "../sortFunctions/BubbleSort";
import { SelectionSort } from "../sortFunctions/SelectionSort";
import { InsertionSort } from "../sortFunctions/InsertionSort";
import { QuickSort } from "../sortFunctions/QuickSort";
import { HeapSort } from "../sortFunctions/HeapSort.js";
import { MergeSort } from "../sortFunctions/MergeSort";
import { ProgressContext } from "../App";

const sortingAlgorithms = [
  { component: BubbleSort, name: "BubbleSort" },
  { component: SelectionSort, name: "SelectionSort" },
  { component: InsertionSort, name: "InsertionSort" },
  { component: HeapSort, name: "HeapSort" },
  { component: MergeSort, name: "MergeSort" },
  { component: QuickSort, name: "QuickSort" },
];

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;

  & > div {
    max-width: 100%;
  }
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
      style={{ maxWidth: "100%" }}
    >
      {value === index && children}
    </div>
  );
}

export function Home({ progress, value }) {
  const context = useContext(ProgressContext);

  useEffect(() => {
    context.setProgress("reset");
  }, [value]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {sortingAlgorithms.map((algoInfo, idx) => (
        <TabPanel value={value} index={idx}>
          <SortManager
            array={arrayForSorting}
            progressStatus={progress}
            sortFunction={algoInfo.component}
            sortingAlgorithmName={algoInfo.name}
          />
        </TabPanel>
      ))}
      <TabPanel value={value} index={6}>
        <FlexWrap>
          {sortingAlgorithms.map((algoInfo) => (
            <SortManager
              array={arrayForSorting}
              progressStatus={progress}
              sortFunction={algoInfo.component}
              sortingAlgorithmName={algoInfo.name}
            />
          ))}
        </FlexWrap>
      </TabPanel>
    </div>
  );
}