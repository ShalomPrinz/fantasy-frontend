import { BrowserRouter } from 'react-router-dom';
import { render } from 'setupTests'

import App from '../App';

describe('App', () => {
    it('should render App component', () => {
        const { asFragment } = render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    })
})
