 export const DiscountFunction = (props) => {
    
        const discountAmount = (props?.actualAmount * props?.discount) / 100;
        const sellingAmount = props?.actualAmount - discountAmount;
        let floatData = sellingAmount.toFixed(0)
        return floatData;
}
