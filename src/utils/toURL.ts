const toURL = (string : string) => {
    const lowercase = string.trim().toLowerCase();
    const url = lowercase.replace(/\s+/g, "-");
    return url;
};

export default toURL;