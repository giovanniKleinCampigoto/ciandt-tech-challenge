export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...({
            background: "#f2f2f2",
            lowStat: "rgb(253 165 164)",
            mediumStat: "rgb(253 250 165)",
            highStat: "#ABFEA3",
            loading: "#D3D3D3"
        }),
    },
});
