import { Table } from '../';
import { render, TestComponent } from '../../setupTests'

let root: TestComponent = null;

beforeEach(() => {
    root = null
})

describe('Table', () => {
    it('should render a scrollable table', () => {
        const data = [{ id: 1, props: { label: 'Label' } }]
        const columns = [{ id: 0, path: 'label'}]

        root = render(<Table data={data} columns={columns} scrollable />);

        // @ts-ignore root should never be null
        expect(root.toJSON()).toMatchSnapshot();
    })
    
    it('should render a styled table', () => {
        const data = [{ id: 1, props: { label: 'Label' } }]
        const columns = [{ id: 0, path: 'label'}]

        root = render(<Table data={data} columns={columns} className="bg-default" />)

        // @ts-ignore root should never be null
        expect(root.toJSON()).toMatchSnapshot();
    })

    it('should render a column by content callback', () => {
        const data = [{ id: 1, props: { label: 'Label' } }]
        const content = ({ label }: { [key: string]: string }) => (<h1>{label}</h1>)
        const columns = [{ id: 0, path: 'label', content: content}]

        root = render(<Table data={data} columns={columns} className="bg-default" />)

        // @ts-ignore root should never be null
        expect(root.toJSON()).toMatchSnapshot();
    })
})
