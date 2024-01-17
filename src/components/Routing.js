import React, { memo } from "react";
import { Switch } from "react-router-dom";
import PropsRoute from "../shared/components/PropsRoute";
import HeadSection from "./home/HeadSection"
import useLocationBlocker from "../shared/functions/useLocationBlocker";

function Routing(props) {
  useLocationBlocker();
  return (
    <Switch>
      <PropsRoute path="/" component={HeadSection} />
    </Switch>
  );
}

export default memo(Routing);
