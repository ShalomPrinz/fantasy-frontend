import { TeamLayout } from '../';
import { FIELD_LAYOUT_MIN_WIDTH } from '../../constants';
import * as constants from '../../constants';
import { render, setProperty, TestComponent } from '../../setupTests'

let root: TestComponent = null;

beforeEach(() => {
    root = null
})

const setWindowSize = (value: number) => 
    setProperty(window, 'innerWidth', value)

describe('TeamLayout', () => {
    it('should render TeamList component', () => {
        const team = [{ id: 0, label: 'GK', players: [{id: 0, name: 'Ter Stegen', team: 'Barcelona'}] }]

        setWindowSize(FIELD_LAYOUT_MIN_WIDTH - 1)
        root = render(<TeamLayout team={team} />);

        // @ts-ignore root should never be null
        expect(root.toJSON()).toMatchSnapshot();
    })
    
    it('should render TeamLayout component', () => {
        const team = [{ id: 0, label: 'GK', players: [{id: 0, name: 'Ter Stegen', team: 'Barcelona'}] }]

        setWindowSize(FIELD_LAYOUT_MIN_WIDTH)
        root = render(<TeamLayout team={team} />);

        // @ts-ignore root should never be null
        expect(root.toJSON()).toMatchSnapshot();
    })
    
    it('should render bigger row margin if field width is higher than 600px', () => {
        const team = [{ id: 0, label: 'GK', players: [{id: 0, name: 'Ter Stegen', team: 'Barcelona'}] }]

        setWindowSize(FIELD_LAYOUT_MIN_WIDTH)
        setProperty(constants, 'FIELD_IMAGE_DEFAULT_WIDTH', 601)
        root = render(<TeamLayout team={team} />);

        // @ts-ignore root should never be null
        expect(root.toJSON()).toMatchSnapshot();
    })

    describe('when window resize', () => {
        it('should resize player image', () => {
            // TODO. I couldn't find any test library that support that
        })
    })
})
