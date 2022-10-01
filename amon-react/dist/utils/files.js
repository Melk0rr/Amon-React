/**
 * Returns the extension of a file
 * @param  {File} f : file from which retrieve the extension
 * @return {string} : file extension
 */
const getExtension = (f) => f.name.substring(f.name.lastIndexOf(".") + 1);
/**
 * Reads file data and executes given onload operations
 * @param   {File} f  : file to read
 * @returns {Promise} : Promise object
 */
const loadFile = (f) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onerror = (e) => reject(e);
        reader.onload = () => resolve(reader.result);
        reader.readAsText(f);
    });
};
export { getExtension, loadFile, };
