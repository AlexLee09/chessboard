import './Pieces.css'
import Piece from './Piece'
import { useState, useRef } from 'react'
import { createPosition, copyPosition } from '../../../helper'
import { useAppContext } from '../../../contexts/Context'
import { makeNewMove } from '../../../reducer/actions/move'


const Pieces = () => {

    const ref = useRef()

    const {appState,dispatch} = useAppContext()

    const currentPosition = appState.position[appState.position.length-1 ]

    const calculateCoords = e => {
        const {width, left, top} = ref.current.getBoundingClientRect()
        const size = width / 8
        const y = Math.floor((e.clientX - left)/size)
        const x = 7 - Math.floor((e.clientY - top)/size)
        return {x,y}
    }

    const onDrop = e => {
        const newPosition = copyPosition (currentPosition)

        console.log ("NEW POSITION:")
        console.log (newPosition)

        const {x,y} = calculateCoords(e)

        console.log ("DATA TRANSFER:")
        console.log (e.dataTransfer)
        const [p, rank, file] = e.dataTransfer.getData('text').split(',')

        console.log (p)
        console.log (rank)
        console.log (file)

        console.log (x)
        console.log(y)

        newPosition[rank][file] = ''    
        newPosition[x][y] = p
        
        dispatch(makeNewMove({newPosition}))

    }

    const onDragOver = e => e.preventDefault()
    
    

    return <div 
        ref = {ref}
        onDrop = {onDrop}
        onDragOver = {onDragOver}
        className = 'pieces'
    
    >
        
        { currentPosition.map((r,rank) =>
            r.map((f,file) => currentPosition[rank][file] 
            ? <Piece
                key = {rank+'-'+file}
                rank={rank}
                file={file}
                piece={currentPosition[rank][file]}
              />
            : null
        )
    )}
        
    </div>
}

export default Pieces