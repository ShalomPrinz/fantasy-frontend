import React from 'react';
import renderer, {ReactTestRendererJSON} from 'react-test-renderer';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

let tree: null | ReactTestRendererJSON | ReactTestRendererJSON[] = null;

beforeEach(() => {
    tree = null
})

const getJSON = (Component: React.ReactElement) => renderer.create(Component).toJSON()

it('should render app component', () => {
    tree = getJSON(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
    expect(tree).toMatchSnapshot();
});