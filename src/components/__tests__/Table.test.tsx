import { getJSON, TestRendererJSON } from 'setupTests';

import { Table } from '../';

let tree: TestRendererJSON = null;

beforeEach(() => {
    tree = null
})

describe('Table', () => {
    it('should render a scrollable table', () => {
        const data = [{ id: 1, props: { label: 'Label' } }]
        const columns = [{ id: 0, path: 'label'}]

        tree = getJSON(<Table data={data} columns={columns} scrollable />)

        expect(tree).toMatchSnapshot();
    })
    
    it('should render a styled table', () => {
        const data = [{ id: 1, props: { label: 'Label' } }]
        const columns = [{ id: 0, path: 'label'}]

        tree = getJSON(<Table data={data} columns={columns} className="bg-default" />)

        expect(tree).toMatchSnapshot();
    })

    it('should render a column by content callback', () => {
        const data = [{ id: 1, props: { label: 'Label' } }]
        const content = ({ label }: { [key: string]: string }) => (<h1>{label}</h1>)
        const columns = [{ id: 0, path: 'label', content: content}]

        tree = getJSON(<Table data={data} columns={columns} className="bg-default" />)

        expect(tree).toMatchSnapshot();
    })
})
