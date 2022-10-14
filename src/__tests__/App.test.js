import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

let tree = null;

beforeEach(() => {
    tree = null
})

const getJSON = (Component) => renderer.create(Component).toJSON()

it('should render app component', () => {
    tree = getJSON(<BrowserRouter><App /></BrowserRouter>);
    expect(tree).toMatchSnapshot();
});