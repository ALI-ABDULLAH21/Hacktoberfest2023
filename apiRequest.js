const apiRequest = async (url = '', optionsobj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optionsobj); // Fix this line
        if (!response.ok) throw Error("please reload the page");
    } catch (err) {
        const errMsg = err.message;
    } finally {
        return errMsg;
    }
}
export default apiRequest;
