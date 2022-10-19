import { render, setProperty } from 'setupTests'

import { TeamLayout } from '../';
import { FIELD_LAYOUT_MIN_WIDTH } from '../../constants';
import * as constants from '../../constants';

const setWindowSize = (value: number) => 
    setProperty(window, 'innerWidth', value)

describe('TeamLayout', () => {
    it('should render TeamList component', () => {
        const team = [{ id: 0, label: 'GK', players: [{id: 0, name: 'Ter Stegen', team: 'Barcelona'}] }]

        setWindowSize(FIELD_LAYOUT_MIN_WIDTH - 1)
        const { asFragment } = render(<TeamLayout team={team} />);

        expect(asFragment()).toMatchSnapshot();
    })
    
    it('should render TeamLayout component', () => {
        const team = [{ id: 0, label: 'GK', players: [{id: 0, name: 'Ter Stegen', team: 'Barcelona'}] }]

        setWindowSize(FIELD_LAYOUT_MIN_WIDTH)
        const { asFragment } = render(<TeamLayout team={team} />);

        expect(asFragment()).toMatchSnapshot();
    })
    
    it('should render bigger row margin if field width is higher than 600px', () => {
        const team = [{ id: 0, label: 'GK', players: [{id: 0, name: 'Ter Stegen', team: 'Barcelona'}] }]

        setWindowSize(FIELD_LAYOUT_MIN_WIDTH)
        setProperty(constants, 'FIELD_IMAGE_DEFAULT_WIDTH', 601)
        const { asFragment } = render(<TeamLayout team={team} />);

        expect(asFragment()).toMatchSnapshot();
    })

    describe('when window resize', () => {
        it('should resize player image', () => {
            // TODO. I couldn't find any test library that support that
        })
    })
})
