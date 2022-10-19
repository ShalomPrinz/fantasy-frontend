import { BrowserRouter } from 'react-router-dom';

import App from '../App';
import { render, TestComponent } from '../setupTests'

let root: TestComponent = null;

beforeEach(() => {
    root = null
})

describe('App', () => {
    it('should render App component', () => {
        root = render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        // @ts-ignore root should never be null
        expect(root.toJSON()).toMatchSnapshot();
    })
})
