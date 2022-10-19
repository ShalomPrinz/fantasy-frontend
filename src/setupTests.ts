// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { ReactElement } from 'react';

import { act, create, ReactTestRenderer } from 'react-test-renderer';

type TestComponent = ReactTestRenderer | null

const render = (Component: ReactElement) => {
    let root: TestComponent = null
    act(() => { root = create(Component) })
    return root
}

const setProperty = (obj: Object, prop: string, value: number) =>
    Object.defineProperty(obj, prop, 
        { writable: true, configurable: true, value: value })

const clickButton = (root: TestComponent, index: number) => 
    act(root?.root.findAllByType('button')[index].props.onClick)

export { clickButton, render, setProperty, TestComponent }
