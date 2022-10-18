// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { ReactElement } from 'react';

import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

export type TestRendererJSON = null | ReactTestRendererJSON | ReactTestRendererJSON[];
export const getJSON = (Component: ReactElement) => renderer.create(Component).toJSON()
