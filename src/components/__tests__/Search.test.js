import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderer from 'react-test-renderer';
import { Search } from '../';

let tree = null;

beforeEach(() => {
    tree = null
})

const getJSON = (Component) => renderer.create(Component).toJSON()

describe('render', () => {
    describe('without props', () => {
        it('should not render anything', () => {
            tree = getJSON(<Search />);
        
            expect(tree).toMatchSnapshot();
        })    
    })

    describe('partial props', () => {
        it('should not render anything when not getting onChange', () => {
            const value = "";
        
            tree = getJSON(<Search value={value} />);
        
            expect(tree).toMatchSnapshot();
        })
        
        it('should not render anything when not getting value', () => {
            const onChange = () => {};
        
            tree = getJSON(<Search onChange={onChange} />);
        
            expect(tree).toMatchSnapshot();
        })
    })

    describe('with props', () => {
        it('should not accept onChange if it\' not a function', () => {
            const value = "";
            const onChange = "";
        
            tree = getJSON(<Search onChange={onChange} value={value} />);
        
            expect(tree).toMatchSnapshot();
        })
        
        it('should not accept value if it\' not a string', () => {
            const value = 1;
            const onChange = () => {};
        
            tree = getJSON(<Search onChange={onChange} value={value} />);
        
            expect(tree).toMatchSnapshot();
        })
        
        it('should render Search component', () => {
            const value = "";
            const onChange = () => {};
        
            tree = getJSON(<Search onChange={onChange} value={value} />);
        
            expect(tree).toMatchSnapshot();
        })
    })
})

describe('behavior', () => {
    describe('input change', () => {
        it('should call onChange with the new input as argument', () => {
            let value = ""
            const onChange = v => value += v
            const { getByPlaceholderText } = render(<Search onChange={onChange} value={value} />)
            
            const Component = getByPlaceholderText('Search...')
            const input = "NEW INPUT"
            userEvent.type(Component, input)

            expect(value).toBe(input)
        })
    })
})
