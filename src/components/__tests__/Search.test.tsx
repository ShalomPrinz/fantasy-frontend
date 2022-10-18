import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Search } from '../';
import { getJSON, TestRendererJSON } from '../../setupTests'

let tree: TestRendererJSON = null;

beforeEach(() => {
    tree = null
})

describe('render', () => {
    it('should render Search component', () => {
            const value = "";
            const onChange = () => {};
        
            tree = getJSON(<Search onChange={onChange} value={value} />);
        
            expect(tree).toMatchSnapshot();
    })
})

describe('behavior', () => {
    describe('input change', () => {
        it('should call onChange with the new input as argument', () => {
            let value = ""
            const onChange = (v: string) => value += v
            const { getByPlaceholderText } = render(<Search onChange={onChange} value={value} />)
            
            const Component = getByPlaceholderText('Search...')
            const input = "NEW INPUT"
            userEvent.type(Component, input)

            expect(value).toBe(input)
        })
    })
})
