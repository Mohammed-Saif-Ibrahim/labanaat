"use client";

import * as React from "react";
import * as UI from "@labanaat/ui";

/**
 * Everything a live-editable demo's code string is allowed to reference.
 * react-live evaluates code against this object instead of real ES
 * imports, so every component + the hooks the stateful demos need
 * (useState, for Slider/FileUpload/Pagination) has to be listed here
 * explicitly.
 */
export const liveScope = {
  ...UI,
  React,
  useState: React.useState,
  useEffect: React.useEffect,
};
