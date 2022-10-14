import React from 'react';
import renderer from 'react-test-renderer';
import { Player } from '../';

let tree = null;

beforeEach(() => {
    tree = null
})

const getJSON = (Component) => renderer.create(Component).toJSON()

describe('render', () => {
    describe('without props', () => {
        it('should not render anything', () => {
            tree = getJSON(<Player />);
        
            expect(tree).toMatchSnapshot();
        })
    })

    describe('partial props', () => {
        it('should not render anything when not getting widthUnits', () => {
            tree = getJSON(<Player width={10} />);
        
            expect(tree).toMatchSnapshot();
        })
        
        
        it('should not render anything when not getting width', () => {
            tree = getJSON(<Player widthUnits="px" />);
        
            expect(tree).toMatchSnapshot();
        })
        
        
        it('should render Player with default Jersey and without name label', () => {
            tree = getJSON(<Player width={10} widthUnits="px" />);
        
            expect(tree).toMatchSnapshot();
        })
    })

    describe('with props', () => {
        it ('should render full Player component', () => {
            tree = getJSON(<Player name="Shalom" team="Dortmund" width={10} widthUnits="px" />);
    
            expect(tree).toMatchSnapshot();
        })
    })
})
