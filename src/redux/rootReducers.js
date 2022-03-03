import app from "./reducers/App"
import auth from "./reducers/Auth"
import category from "./reducers/Category"
import partner from "./reducers/Partners"
import products from "./reducers/Products"
import units from "./reducers/Units"
import media from "./reducers/Media"

const rootReducer = {
    app,
    auth,
    media,
    category,
    partner,
    products,
    units
}

export default rootReducer
