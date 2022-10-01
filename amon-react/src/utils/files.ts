/**
 * Returns the extension of a file
 * @param  {File} f : file from which retrieve the extension
 * @return {string} : file extension
 */
const getExtension = (f: File): string => f.name.substring(f.name.lastIndexOf(".") + 1)

/**
 * Reads file data and executes given onload operations
 * @param   {File} f  : file to read
 * @returns {Promise} : Promise object
 */
const loadFile = (f: File): Promise<any> => {
  const reader = new FileReader()
  return new Promise((resolve, reject): void => {
    reader.onerror = (e: Event) => reject(e)
    reader.onload = () => resolve(reader.result)
    reader.readAsText(f)
  })
}

export {
  getExtension,
  loadFile,
}