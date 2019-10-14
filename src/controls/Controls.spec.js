import React from "react";
import Controls from "./Controls";
import { render, fireEvent } from "@testing-library/react";

test("Snapshot testing", () => {
    expect(render(<Controls />)).toMatchSnapshot();
});

test("Default <Controls /> - buttons exist and say 'Lock' and 'Close'", () => {
    const { getByText, queryByText } = render(<Controls />);

    getByText(/close/i);
    getByText(/lock/i);

    // If the button says "unlock", it technically still says "lock"
    // So lets add an extra test, to make sure the button DOESN'T say "unlocked"
    const notButton = queryByText(/unlock/i);
    expect(notButton).toBeNull();
});

test("If gate is locked and closed, button text says 'Unlock' and 'Open'", () => {
    const { getByText } = render(<Controls locked={true} closed={true} />);

    getByText(/open/i);
    getByText(/unlock/i);
});

test("If gate is open, the lock button does not function", () => {
    // Create mock functions
    const closeMock = jest.fn();
    const lockMock = jest.fn();

    // Pass mock functions into component
    const { getByText } = render(
        <Controls toggleLocked={lockMock} toggleClosed={closeMock} />
    );

    //Click the buttons
    fireEvent.click(getByText(/close/i));
    fireEvent.click(getByText(/lock/i));

    // Close button should work, but lock button should not work
    expect(closeMock).toHaveBeenCalled();
    expect(lockMock).not.toHaveBeenCalled();
});

test("If gate is locked, the open button does not function", () => {
    const closeMock = jest.fn();
    const lockMock = jest.fn();

    const { getByText } = render(
        <Controls
            toggleLocked={lockMock}
            toggleClosed={closeMock}
            locked={true}
            closed={true}
        />
    );

    fireEvent.click(getByText(/open/i))
    fireEvent.click(getByText(/unlock/i))

    expect(closeMock).not.toHaveBeenCalled()
    expect(lockMock).toHaveBeenCalled()
});
