/**
 * Request ready state handling
 * @param {XMLHttpRequest} httpRequest : XMLHTTPRequest
 * @param {Function}       callback    : callback function
 */
const handleReadyState = (httpRequest, callback) => {
    try {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200)
                callback(httpRequest.responseText);
            else
                throw new Error("The request failed !");
        }
    }
    catch (error) {
        throw error;
    }
};
/**
 * Creates a new XMLHTTP POST request
 * @param   {string}          url      : POST url
 * @param   {HttpRequestData} data     : data to send
 * @param   {Function}        callback : callback function
 * @returns {void}
 */
const post = (url, data, callback) => {
    const httpRequest = new XMLHttpRequest();
    if (!httpRequest)
        throw new Error("The XMLHttpRequest instance could not be created !");
    httpRequest.onreadystatechange = () => handleReadyState(httpRequest, callback);
    httpRequest.open('POST', url);
    httpRequest.send(data);
};
export { handleReadyState, post, };
