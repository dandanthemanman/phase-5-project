import React from "react"
// Calculates beeline distance between 2 points along geodesic surface:
const calcDistance = (
  { lat: fromLat, lng: fronLng },
  { lat: toLat, lng: toLng }
) => {
  // Assumes google is available on the window object
  // (we’ll talk about how to handle this later):
  return window.google.maps.geometry.spherical.computeDistanceBetween(
    new window.google.maps.LatLng(fromLat, fromLng),
    new window.google.maps.LatLng(toLat, toLng)
  )
}
export default class ChartWrapper extends React.Component {
  state = {
    distances: [],
    elevations: [],
    markers: []
  }
  // componentDidMount() { ... }
  // componentDidUpdate(prevProps, prevState) { ... }
  // Returns a bunch of elevation samples along the path we provide it:
  getElevationsAlongPath = () => {
    // Check if we have enough markers to make a path (2+):
    if (this.state.markers.length > 1) {
      const elevator = new window.google.maps.ElevationService()
      const latLngs = this.state.markers.map(marker => ({
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
      }))
      // We can also use the Distance API to calculate distance btwn Markers:
      const { distances } = latLngs.reduce(
        (acc, curr, i, arr) => {
          if (i === arr.length - 1) return acc
          const distances = acc.distances.concat(
            // Use the helper function we defined above:
            calcDistance(
              { lat: curr.lat, lng: curr.lng },
              { lat: arr[i + 1].lat, lng: arr[i + 1].lng }
            )
          )
          return distances
        },
        { distances: [] }
      )
      // API request to get our elevation samples:
      elevator.getElevationAlongPath(
        {
          path: latLngs,
          samples: 100
        },
        results => {
          this.setState({
            distances,
            // We’ll probably want to massage the data shape later:
            elevations: results.map(result => result)
          })
        }
      )
    }
  }
  render() {
    /* ... */
  }
}