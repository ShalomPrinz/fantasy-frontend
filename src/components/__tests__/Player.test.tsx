import { getJSON, TestRendererJSON } from 'setupTests';

import { Player } from '../';

let tree: TestRendererJSON = null;

beforeEach(() => {
    tree = null
})

describe('Player', () => {
    it ('should render Player component', () => {
        tree = getJSON(<Player name="Shalom" team="Dortmund" width={10} widthUnits="px" />);

        expect(tree).toMatchSnapshot();
    })
})
