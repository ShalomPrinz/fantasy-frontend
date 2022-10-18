import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Search } from '../';
import { getJSON, TestRendererJSON } from '../../setupTests'

let tree: TestRendererJSON = null;

beforeEach(() => {
    tree = null
})

describe('Search', () => {
    it('should render Search component', () => {
        const value = "";
        const onChange = () => {};
    
        tree = getJSON(<Search onChange={onChange} value={value} />);
    
        expect(tree).toMatchSnapshot();
    })

    describe('when input changes', () => {
        it('should call onChange with the new input as argument', () => {
            let value = ""
            const onChange = (v: string) => value += v
            render(<Search onChange={onChange} value={value} />)
            
            const Component = screen.getByRole('textbox')
            const input = "NEW INPUT"
            userEvent.type(Component, input)

            expect(value).toBe(input)
        })
    })
})
