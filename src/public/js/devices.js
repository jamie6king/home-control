//
// ~~~ device config
//

// toggle device
function toggleDevice(e, id) {
    fetch(`/api/device/${id}/toggle`)
}
