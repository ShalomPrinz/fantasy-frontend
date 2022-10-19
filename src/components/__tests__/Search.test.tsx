import { render as renderToScreen, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Search } from '../';
import { render, TestComponent } from '../../setupTests'

let root: TestComponent = null;

beforeEach(() => {
    root = null
})

describe('Search', () => {
    it('should render Search component', () => {
        const value = "";
        const onChange = () => {};
    
        root = render(<Search onChange={onChange} value={value} />);
    
        // @ts-ignore root should never be null
        expect(root.toJSON()).toMatchSnapshot();
    })

    describe('when input changes', () => {
        it('should call onChange with the new input as argument', () => {
            let value = ""
            const onChange = (v: string) => value += v
            renderToScreen(<Search onChange={onChange} value={value} />)
            
            const Component = screen.getByRole('textbox')
            const input = "NEW INPUT"
            userEvent.type(Component, input)

            expect(value).toBe(input)
        })
    })
})
