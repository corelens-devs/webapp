 export const DiscountFunction = (props) => {
    // console.log(props)
    // Function to calculate the selling amount after discount
    // const calculateSellingAmount = (originalAmount, discountPercentage) => {
        const discountAmount = (props.actualAmount * props.discount) / 100;
        const sellingAmount = props.actualAmount - discountAmount;
        let floatData = sellingAmount.toFixed(0)
        // console.log(sellingAmount)
        return floatData;
    // }
    // return calculateSellingAmount
}
