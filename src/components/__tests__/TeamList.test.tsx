import { TeamList } from '../';
import { getJSON, TestRendererJSON } from '../../setupTests'

let tree: TestRendererJSON = null;

beforeEach(() => {
    tree = null
})

describe('TeamList', () => {
    it('should render TeamList component', () => {
        const team = [{ id: 0, label: 'GK', players: [{id: 0, name: 'Ter Stegen', team: 'Barcelona'}] }]

        tree = getJSON(<TeamList team={team} />);

        expect(tree).toMatchSnapshot();
    })
})
