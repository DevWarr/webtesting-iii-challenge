import React from "react";
import Controls from "./Controls";
import { render, fireEvent } from "@testing-library/react";

test("Snapshot testing", () => {
    expect(render(<Controls />)).toMatchSnapshot()
})