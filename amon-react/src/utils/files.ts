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

/**
 * Checks if the imported is valid
 * @param  {File}     upl            : upload input
 * @param  {string[]} validExtension : expected extensions in order
 * @return {void}
 */
const checkImport = (upl: File, validExtension: string[]): void => {
  const ext = getExtension(upl)
  if (!validExtension.includes(ext)) throw new TypeError("File should be a ." + validExtension + " file !")
}

export {
  getExtension,
  loadFile,
  checkImport,
}