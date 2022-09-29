const filterProperties = (base, keys) => Object.keys(base)
    .filter((key) => keys.includes(key))
    .reduce((obj, key) => {
    return Object.assign(obj, {
        [key]: base[key]
    });
}, {});
export { filterProperties };
