import React from "react";
import Display from "./Display";
import { render, fireEvent } from "@testing-library/react";

test("Snapshot testing", () => {
    expect(render(<Display />)).toMatchSnapshot();
});

test("Default: <Display /> is open and unlocked, with 'green-led' className", () => {
    const { getByText } = render(<Display />);

    // Looking for an element with this name AND className
    getByText((content, element) => {
        return (
            content.startsWith("Open") &&
            element.className.includes("green-led")
        );
    });
    getByText((content, element) => {
        return (
            content.startsWith("Unlocked") &&
            element.className.includes("green-led")
        );
    });
});

test("<Display /> says closed and locked, with 'red-led' className", () => {
    const { getByText } = render(<Display closed={true} locked={true} />);

    //Looking for an element with this name AND className
    getByText((content, element) => {
        return (
            content.startsWith("Closed") &&
            element.className.includes("red-led")
        );
    });
    getByText((content, element) => {
        return (
            content.startsWith("Locked") &&
            element.className.includes("red-led")
        );
    });
});
