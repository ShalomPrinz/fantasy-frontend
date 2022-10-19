import { render } from 'setupTests'

import { Table } from '../';

describe('Table', () => {
    it('should render a scrollable table', () => {
        const data = [{ id: 1, props: { label: 'Label' } }]
        const columns = [{ id: 0, path: 'label'}]

        const { asFragment } = render(<Table data={data} columns={columns} scrollable />);

        expect(asFragment()).toMatchSnapshot();
    })
    
    it('should render a styled table', () => {
        const data = [{ id: 1, props: { label: 'Label' } }]
        const columns = [{ id: 0, path: 'label'}]

        const { asFragment } = render(<Table data={data} columns={columns} className="bg-default" />)

        expect(asFragment()).toMatchSnapshot();
    })

    it('should render a column by content callback', () => {
        const data = [{ id: 1, props: { label: 'Label' } }]
        const content = ({ label }: { [key: string]: string }) => (<h1>{label}</h1>)
        const columns = [{ id: 0, path: 'label', content: content}]

        const { asFragment } = render(<Table data={data} columns={columns} className="bg-default" />)

        expect(asFragment()).toMatchSnapshot();
    })
})
