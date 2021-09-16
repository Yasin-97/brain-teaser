import React from "react";
import { useDataContext } from "../context/Context";
//components
import PrivateRoute from "../components/PrivateRoute";
import WizardIntro from "../components/WizardIntro";
import RememberSession from "../components/RememberSession";
import MemorizeSession from "../components/MemorizeSession";
import Conclusion from "../components/Conclusion";
import Overlay from "../components/Overlay";

export default function Wizard() {
  //context
  const { phase, currentLevel } = useDataContext();

  return (
    <React.Fragment>
      <PrivateRoute
        path={`/wizard/${phase.route}/${currentLevel}/intro`}
        component={WizardIntro}
      />
      <PrivateRoute
        path={`/wizard/${phase.route}/${currentLevel}/memo`}
        component={MemorizeSession}
      />
      <PrivateRoute
        path={`/wizard/${phase.route}/${currentLevel}/overlay`}
        component={Overlay}
      />
      <PrivateRoute
        path={`/wizard/${phase.route}/${currentLevel}/remem`}
        component={RememberSession}
      />
      <PrivateRoute
        path={`/wizard/${phase.route}/${currentLevel}/conclusion`}
        component={Conclusion}
      />
    </React.Fragment>
  );
}
