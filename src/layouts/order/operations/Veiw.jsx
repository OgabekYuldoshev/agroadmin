import ModalCom from "components/MDModal"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOrdersDetails } from "redux/reducers/App"

export default (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrdersDetails(props?.id))
    }, [props?.id])
    const { orderDetails } = useSelector(state => state.app)
    console.log(orderDetails)
    return (
        <ModalCom {...props} width={800}>
            hello
        </ModalCom >
    )
}