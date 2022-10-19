import TabChoice from '../TabChoice';
import { clickButton, render, TestComponent } from 'setupTests'

let root: TestComponent = null;

beforeEach(() => {
    root = null
})

interface Tab {
    id: number,
    label: string,
    Component: JSX.Element,
    onClick?: Function
}

describe('TabChoice', () => {
    it('should render empty div', () => {
        const tabs: Tab[] = []
        
        root = render(<TabChoice tabs={tabs} />);

        // @ts-ignore root should never be null
        expect(root.toJSON()).toMatchSnapshot();
    })

    it('should render TabChoice component', () => {
        const tabs = [{ id: 0, label: 'One', Component: <h1>Hello</h1> }]
        
        root = render(<TabChoice tabs={tabs} />);

        // @ts-ignore root should never be null
        expect(root.toJSON()).toMatchSnapshot();
    })
    
    describe('when tab is clicked', () => {
        it('should show the clicked tab component', () => {
            const tabs = [{ id: 0, label: 'One', Component: <h1>Hello</h1> }, { id: 1, label: 'Two', Component: <h1>World</h1> }]
        
            root = render(<TabChoice tabs={tabs} />);

            // @ts-ignore root should never be null
            expect(root.toJSON()).toMatchSnapshot();
            
            // @ts-ignore root should never be null
            clickButton(root, 1)
            
            // @ts-ignore root should never be null
            expect(root.toJSON()).toMatchSnapshot();
        })

        it('should call given onClick prop', () => {
            const onClick = jest.fn()
            const tabs = [{ id: 0, label: 'One', Component: <h1>Hello</h1>, onClick: onClick }]

            root = render(<TabChoice tabs={tabs} />);
            // @ts-ignore root should never be null
            clickButton(root, 0)
            
            expect(onClick).toBeCalledTimes(1);
        })
    })
})
