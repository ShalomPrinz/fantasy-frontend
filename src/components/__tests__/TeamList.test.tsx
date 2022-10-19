import { TeamList } from '../';
import { render, TestComponent } from '../../setupTests'

let root: TestComponent = null;

beforeEach(() => {
    root = null
})

describe('TeamList', () => {
    it('should render TeamList component', () => {
        const team = [{ id: 0, label: 'GK', players: [{id: 0, name: 'Ter Stegen', team: 'Barcelona'}] }]

        root = render(<TeamList team={team} />);

        // @ts-ignore root should never be null
        expect(root.toJSON()).toMatchSnapshot();
    })
})
