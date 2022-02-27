import ModalCom from "components/MDModal"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOrdersDetails } from "redux/reducers/App"
// import { CardActionArea, Typography, CardMedia, CardContent, Card } from '@mui/material';
import DataTable from "react-data-table-component";

export default (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (props?.id) {
            dispatch(getOrdersDetails(props?.id))
        }
    }, [props?.id])
    const { orderDetails } = useSelector(state => state.app)
    const total = orderDetails?.reduce((t, c) => t + parseInt(c?.products?.price), 0)
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
        },
        {
            name: "Nomi UZ",
            wrap: true,
            selector: (row) => row.products?.name_uz,
        },
        {
            name: "Nomi RU",
            wrap: true,
            selector: (row) => row.products?.name_ru,
        },
        {
            name: "Nomi EN",
            wrap: true,
            selector: (row) => row.products?.name_en,
        },
        {
            name: "Mahsulot kodi",
            wrap: true,
            selector: (row) => row.products?.code,
        },
        {
            name: "Mahsulot Narxi",
            wrap: true,
            selector: (row) => row.products?.price,
        }
    ];

    return (
        <ModalCom {...props} width={800}>
            <DataTable
                noHeader
                noDataComponent="Ma'lumot mavjud emas!"
                columns={columns}
                data={orderDetails}
            />
            <div className="d-flex align-items-center justify-content-end">
                <h4 className="text-end">Jami: {total} sum</h4>
            </div>
        </ModalCom >
    )
}