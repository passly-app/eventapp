import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

export default class GoogleMaps {
  constructor() {
    setOptions({ key: "your-api-key-here" });
  }
}
