import { Player } from '../';
import { render, TestComponent } from '../../setupTests'

let root: TestComponent = null;

beforeEach(() => {
    root = null
})

describe('Player', () => {
    it ('should render Player component', () => {
        root = render(<Player name="Shalom" team="Dortmund" width={10} widthUnits="px" />);

        // @ts-ignore root should never be null
        expect(root.toJSON()).toMatchSnapshot();
    })
})
