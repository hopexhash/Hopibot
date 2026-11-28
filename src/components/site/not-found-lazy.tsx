"use client";

import dynamic from "next/dynamic";

/**
 * The 404 stage, loaded only when a 404 is actually shown. Every page carries its layout's
 * not-found boundary; importing the stage directly would make every page download the 404
 * animation and its stylesheet. On a real 404 the server still renders it in full.
 */
export const NotFoundStageLazy = dynamic(() => import("./not-found-stage").then((m) => m.NotFoundStage));
