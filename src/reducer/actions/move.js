import actionTypes from "./actionTypes"

export const makeNewMove = () => {
    return{
        type: actionTypes.NEW_MOVE,
        payload: {newPosition}
    }
}