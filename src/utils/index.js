export const filterSearchParams = (params) => {
    return Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== "") {
            if (key === "category_id" || key === "source_id") {
                acc[key] = parseInt(value);
            } else {
                acc[key] = value;
            }
        }
        return acc;
    }, {});
};
