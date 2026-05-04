import { TAX_RATE, GROUP_DISCOUNT_RATE, COUPON_DISCOUNT_AMOUNT } from "../utils/pricingConstants";

const useAttendeesSpecificTicketTaxDiscountCalculate = ({ data }) => {
    console.log('useAttendeesSpecificTicketTaxDiscountCalculate======', data)

    let totalWithTax;
    let payAblePrice;
    let taxDiscount;

    // Add tax
    const taxAmount = parseFloat((data?.price * TAX_RATE).toFixed(2));
    totalWithTax = parseFloat((data?.price + taxAmount).toFixed(2));
    payAblePrice = totalWithTax;

    // Group Discount
    let discountAmount = 0;
    let totalAfterDiscount;

    if (data?.group > 1) {
        discountAmount = parseFloat((totalWithTax * GROUP_DISCOUNT_RATE).toFixed(2));
        totalAfterDiscount = totalWithTax - discountAmount;
        payAblePrice = totalAfterDiscount;
    }

    taxDiscount = {
        price: data?.price,
        tax: taxAmount,
        groupDiscount: discountAmount,
        total: payAblePrice,
        cupon: data?.cuponCode
    };

    // Coupon Logic
    if (data?.cuponCode) {

        console.log('yes');

        if (data?.group === 1) {

            const afterCouponDiscount = parseFloat(
                (payAblePrice - COUPON_DISCOUNT_AMOUNT).toFixed(2)
            );

            payAblePrice = afterCouponDiscount;

            taxDiscount = {
                price: data?.price,
                tax: taxAmount,
                groupDiscount: discountAmount,
                total: payAblePrice,
                cupon: data?.cuponCode,
                cuponPrice: COUPON_DISCOUNT_AMOUNT
            };
        }

        if (data?.group > 1) {

            taxDiscount = {
                price: data?.price,
                tax: taxAmount,
                groupDiscount: discountAmount,
                total: payAblePrice,
                cupon: data?.cuponCode,
                cuponPrice: COUPON_DISCOUNT_AMOUNT,
                cuponApplied: 'Coupon Applied with group Total'
            };
        }
    }

    return taxDiscount;
};

export default useAttendeesSpecificTicketTaxDiscountCalculate;