import React from 'react'

import { TeamLayout } from '../'
import { FIELD_LAYOUT_MIN_WIDTH } from '../../constants'
import useWindowSize from '../../hooks/useWindowSize'
import { getJSON, TestRendererJSON } from '../../setupTests'

let tree: TestRendererJSON = null;

beforeEach(() => {
    tree = null
})

jest.mock('hooks/useWindowSize')

const mockWindowSize = (width: number) =>
    // @ts-ignore: This is a mocked version of useWindowSize
    useWindowSize.mockReturnValue({ width: width })

describe('TeamLayout', () => {
    it('should render TeamList component', () => {
        const team = [{ id: 0, label: 'GK', players: [{id: 0, name: 'Ter Stegen', team: 'Barcelona'}] }]
    
        mockWindowSize(FIELD_LAYOUT_MIN_WIDTH)
        tree = getJSON(<TeamLayout team={team} />)
        
        expect(tree).toMatchSnapshot()
    })
    
    it('should render TeamLayout component', () => {
        const team = [{ id: 0, label: 'GK', players: [{id: 0, name: 'Ter Stegen', team: 'Barcelona'}] }]
        
        mockWindowSize(FIELD_LAYOUT_MIN_WIDTH + 1)
        tree = getJSON(<TeamLayout team={team} />)
        
        expect(tree).toMatchSnapshot()
    })
    
    it('should render bigger row margin if field width is higher than 600px', () => {
        const team = [{ id: 0, label: 'GK', players: [{id: 0, name: 'Ter Stegen', team: 'Barcelona'}] }]
        
        mockWindowSize(FIELD_LAYOUT_MIN_WIDTH + 1)
        React.useState = jest.fn(() => [601 , () => {}])
        tree = getJSON(<TeamLayout team={team} />)
        
        expect(tree).toMatchSnapshot()
    })
})
