import React from "react";
import {
  BrowserRouter as Router,
  useRouteMatch, useParams
} from "react-router-dom";
import { useDataContext } from "../context/Context";
//components
import WizardIntro from "../components/WizardIntro";
import RememberSession from "../components/RememberSession";
import MemorizeSession from "../components/MemorizeSession";
import Conclusion from "../components/Conclusion";
import Overlay from "../components/Overlay";


export default function Wizard() {

  let match = useRouteMatch();
  let { slug } = useParams();
  console.log(match, slug );

  //context
  const {
    isRenderIntro,
    isRenderMemo,
    isRenderOverlay,
    isRenderRemem
    }=useDataContext()


  if (isRenderIntro)
    return (
      <WizardIntro />
    );
  else {
    if (isRenderMemo){
      return (
        <MemorizeSession />
      );}
    else {
      if (isRenderOverlay) {
        return (
          <Overlay />
        );
      } else {
        if (isRenderRemem) {
          return (
            <RememberSession />
          );
        }
        return (
          <Conclusion />
        );
      }
    }
  } 
}
