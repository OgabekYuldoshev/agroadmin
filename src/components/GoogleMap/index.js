import GoogleMapReact from "google-map-react";
import { Chip } from "@mui/material";

const AnyReactComponent = () => <Chip label="Sizning tanlagan joy!" color="info" size="small" />;

const GoogleMap = ({ w = "100%", h = "200px", onClick = () => null, value }) => {
  const selected = value?.split(",");
  const defaultProps = {
    center: {
      lat: 39.6406042,
      lng: 66.8278027,
    },
    zoom: 8,
  };
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: h, width: w }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
        onClick={onClick}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={selected[0]} lng={selected[1]} />
      </GoogleMapReact>
    </div>
  );
};
export default GoogleMap;
