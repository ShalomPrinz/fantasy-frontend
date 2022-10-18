import { BrowserRouter } from 'react-router-dom';

import App from '../App';
import { getJSON, TestRendererJSON } from '../setupTests';

let tree: TestRendererJSON = null;

beforeEach(() => {
    tree = null
})

describe('App', () => {
    it('should render app component', () => {
        tree = getJSON(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        expect(tree).toMatchSnapshot();
    });
})