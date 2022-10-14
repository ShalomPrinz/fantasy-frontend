import React from 'react';
import renderer from 'react-test-renderer';
import { Table } from '../';

let tree = null;

beforeEach(() => {
    tree = null
})

const getJSON = (Component) => renderer.create(Component).toJSON()

describe('render table without data', () => {
    it('should not render anything', () => {
        tree = getJSON(<Table />);

        expect(tree).toMatchSnapshot();
    })
})

describe('render table with missing data', () => {
    it('should not render table at all', () => {
        const columns = [{ path: 'label' }]

        tree = getJSON(<Table columns={columns} />)

        expect(tree).toMatchSnapshot();
    })
    
    it('should not render any data when no columns supplied', () => {
        const data = [{ id: 1, label: 'Label' }]

        tree = getJSON(<Table data={data} />)

        expect(tree).toMatchSnapshot();
    })
    
    it('should render data also for rows without the specified data path', () => {
        const data = [{ id: 1, label: 'Label' }, { id: 2 }]
        const columns = [{ path: 'label' }]

        tree = getJSON(<Table data={data} columns={columns} />)
        
        expect(tree).toMatchSnapshot();
    })
})

describe('render table with full data', () => {
    it('should render a scrollable table', () => {
        const data = [{ id: 1, label: 'Label' }]
        const columns = [{ path: 'label'}]

        tree = getJSON(<Table data={data} columns={columns} scrollable />)

        expect(tree).toMatchSnapshot();
    })
    
    it('should render a styled table', () => {
        const data = [{ id: 1, label: 'Label' }]
        const columns = [{ path: 'label'}]

        tree = getJSON(<Table data={data} columns={columns} className="bg-default" />)

        expect(tree).toMatchSnapshot();
    })
})