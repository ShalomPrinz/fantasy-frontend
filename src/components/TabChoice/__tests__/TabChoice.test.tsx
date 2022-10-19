import { clickButton, render, screen } from 'setupTests'

import TabChoice from '../TabChoice';

interface Tab {
    id: number,
    label: string,
    Component: JSX.Element,
    onClick?: Function
}

describe('TabChoice', () => {
    it('should render empty div', () => {
        const tabs: Tab[] = []
        
        const { asFragment } = render(<TabChoice tabs={tabs} />);

        expect(asFragment()).toMatchSnapshot();
    })

    it('should render TabChoice component', () => {
        const tabs = [{ id: 0, label: 'One', Component: <h1>Hello</h1> }]
        
        const { asFragment } = render(<TabChoice tabs={tabs} />);

        expect(asFragment()).toMatchSnapshot();
    })
    
    describe('when tab is clicked', () => {
        it('should show the clicked tab component', () => {
            const tabs = [{ id: 0, label: 'One', Component: <h1>Hello</h1> }, { id: 1, label: 'Two', Component: <h1>World</h1> }]
        
            const { asFragment } = render(<TabChoice tabs={tabs} />);

            expect(asFragment()).toMatchSnapshot();
        
            const element = screen.getByText('Two')
            clickButton(element)
            expect(asFragment()).toMatchSnapshot();
        })

        it('should call given onClick prop', () => {
            const onClick = jest.fn()
            const tabs = [{ id: 0, label: 'One', Component: <h1>Hello</h1>, onClick: onClick }]

            render(<TabChoice tabs={tabs} />);
            const element = screen.getByText('One')
            clickButton(element)
            
            expect(onClick).toBeCalledTimes(1);
        })
    })
})
