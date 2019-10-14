import React from "react";
import Dashboard from "./Dashboard";
import { render, fireEvent } from "@testing-library/react";

test("Snapshot testing", () => {
    expect(render(<Dashboard />)).toMatchSnapshot()
})