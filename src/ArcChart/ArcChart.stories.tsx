import * as React from "react";
import { ArcChart } from "./ArcChart";

export const story = () => {
  return <ArcChart goalUnit={14.0} currentUnit={11.0} />;
};

export default {
  title: "ArcCharts/sample",
};
