// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { ReactElement } from 'react';

import { render as renderToScreen, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const render = (Component: ReactElement) => renderToScreen(Component)

const setProperty = (obj: Object, prop: string, value: number) =>
    Object.defineProperty(obj, prop, 
        { writable: true, configurable: true, value: value })

const clickButton = (element: HTMLElement) => {
    userEvent.click(element)
}

const typeElement = (element: HTMLElement, input: string) =>
    userEvent.type(element, input)

export { clickButton, render, setProperty, screen, typeElement }
