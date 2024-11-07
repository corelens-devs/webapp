import React, { useState } from 'react'
import classes from "./Term.module.css"
import Navbar from '../../Components/Navbar/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const TermSales = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <>
      <Navbar onSearchChange={handleSearchChange} />
      <div className={classes.main_div}>
        <div className={classes.inn_div} onClick={handleNavigate}>
          <FaArrowLeft />
          <span>Back</span>
        </div>

        <h3 className='text-start mb-5'> Terms of Sale </h3>

        <h6 className='text-start my-3'>  EFFECTIVE DATE OF THE ONLINE TERMS: APRIL 2024 </h6>

        <p>Kindly examine these Terms of Sale thoroughly as they dictate your acquisition of the products in your order (referred to as the "System") from Corelens, Inc. ("Corelens"). These terms outline your rights and responsibilities regarding your purchases, including significant restrictions and exemptions, such as those specified in our product warranties. These Terms of Sale outline the conditions under which we offer to supply you with the System. It is necessary to employ binding arbitration to settle disputes, instead of resorting to jury trials or class actions (explained in full below). Ensure that you have a clear comprehension of them.

          By clicking the "Submit" button or making a purchase of the System, or by using the System, you acknowledge that you have read and accepted these Terms of Sale. This includes the disclaimers, limits of liability, and indemnification duties stated below, and you are legally obligated to abide by them. To get a physical copy of these Terms of Sale, just click the print button on your Internet browser.  You also recognise that these online conditions constitute the whole of the Sales Agreement.  The Complete Terms of Sale encompass provisions pertaining exclusively to our sales to end users. These provisions cover payment methods, pricing, sales tax, gift cards, promotions, shipping, services (including monitoring services), software licencing, camera usage, and detector installation. It is important to note that these provisions may not be included in any supplementary printed terms of sale.
        </p>

        <h5> Exclusive to sales in India</h5>

        <p>Corelens and authorised retailers only offer purchases inside India. You are prohibited from using or attempting to use any Corelens product or service outside of India or for any illicit or criminal intent.  You also agree to refrain from transferring or otherwise furnishing any Corelens product [or System components] to any external entity for use outside the borders of India.

          Subject to the limits imposed by relevant legislation, any transaction involving the sale, offer, transfer, or attempted transfer of any Corelens product or System components to a third party located outside India releases Corelens from any responsibilities outlined in these terms. In such cases, you, as the seller or transferor, assume liability for those obligations, as determined solely by Corelens.</p>

        <h5> Exclusively for direct customers</h5>

        <p> Only end user customers are eligible to make purchases via the Corelens website or from authorised merchants. Subject to the extent allowed by relevant legislation, the Limited Warranty specified below is rendered void by any attempts to transfer, sell, or resell the product to dealers, resellers, distributors, or any other third parties, regardless of location. This Limited Warranty is applicable only to sales made directly from Corelens or an authorised reseller to end user customers.</p>

        <h5> Payment Methods</h5>

        <p>Corelens accepts credit cards, debit cards, and Corelens Gift Cards as valid methods of payment. When a credit card is used for a transaction, Corelens has the ability to request a pre-approval from the credit card issuer for an amount equal to or less than the total order amount. Payment is charged to your credit card either at the time of purchase or upon shipment of the goods. When you use the balance from a Corelens Gift Card to make a purchase, the amount is subtracted from your Gift Card immediately. If the transaction amount exceeds the available balance on the Gift Card, the remaining money will be charged to your credit card.

          Corelens takes Visa, MasterCard, American Express, and Discover credit cards. Regrettably, we cannot process credit cards issued by foreign banks. Debit cards and cheque cards have daily spending restrictions that might potentially hinder the execution of your purchase.</p>

        <h5>  Prices</h5>
        <p>
          The final cost of your purchase will include the price of the items in your order, together with any relevant sales tax and shipping fees, after deducting any available discounts. Corelens has the authority to modify pricing for its goods at any given moment. However, it does not guarantee price protection or refunds if there is a decrease in price or a special offer. If a product is listed at an inaccurate price owing to a typographical mistake or an error in pricing information received from our suppliers, we have the right to decline or cancel any orders made for the product or service listed at the wrong price. We reserve the right to reject or annul any such orders, regardless of whether the purchase has been confirmed and your credit or debit card has been charged. If your credit or debit card has already been charged for the transaction and your order is cancelled, we will promptly refund the erroneous amount to your credit or debit card account.</p>

        <h5> Promotions</h5>

        <p> Occasionally, Corelens may provide promotional discounts, coupon codes, or other offers for free or reduced-price items or services, known as "Promo Offers".  The following regulations govern any promotional offers made by Corelens, whether via our website or any other form of direct connection with consumers, to the degree allowed by relevant laws.  The terms and conditions for each promotional offer may differ, but unless explicitly indicated differently, the following terms will be considered applicable, with any disagreements being regulated by the terms provided in the promotional offer.

          <ul>
            <li className='text-start'>Promo Offers are only applicable to purchases made directly from Corelens, namely via our website ("Promo Offer Sales").</li>
            <li className='text-start'>Promotional offers cannot be combined, are not transferable, and do not have any monetary value.  Promo Offers are not eligible for sale or exchange, and each registered household is restricted to one offer. These offers are invalid in locations where they are forbidden.</li>
            <li className='text-start'>Customers who use a Promo Offer are liable for all relevant taxes or fees related to the respective Promo Offer Sale.</li>
            <li className='text-start'>Promotional offers are available for a limited duration, contingent upon any explicit expiry date and/or restrictions on supply availability.  If an expiry date is not specified, the Promo Offer shall be considered expired either when Corelens terminates or removes the Promo Offer, or after a period of six (6) months from the day the Promo Offer was first notified to the receiver.  Promotional offers are not applicable to sales or orders that were made before.  Corelens has the authority to stop Promo Offers at any moment, within the limits allowed by the law.</li>
            <li className='text-start'>Corelens's usual Terms of Sale and Terms of Use also apply to any sales made via promotional offers.</li>
            <li className='text-start'>Product and service availability determine the applicability of any promotional sales offers.</li>
            <li className='text-start'>Corelens retains the authority to reject orders (whether they include a promotional offer or not) if there are grounds to suspect any fraudulent conduct associated with any aspect of the order.</li>
            <li className='text-start'>Unless otherwise stated, if any item included in a Promo Offer Sales order is returned, Corelens may, at its discretion, decide that only replacements are eligible for partial returns.  Corelens will only give a refund for an item(s) up to the price that was paid for it, taking into account any attached Promo Offer.</li>
            <li className='text-start'>The conditions of the promotional offer may differ depending on the specific product or service.</li>


          </ul>

        </p>

        <h5>  Sales Tax</h5>

        <p> Corelens internet purchases will include sales tax, which will be determined by the delivery address and the prevailing sales tax rate at the time of completing your order. The sales tax rate applicable to your purchase will be based on the rate in effect at the time your order was received, even if there are changes in the tax rate for the state to which your order is being sent before the goods is shipped. The user is accountable for all relevant sales taxes, and Corelens retains the authority to gather any tax it deems necessary to collect.</p>

        <h5> Corelens Gift Cards</h5>

        <p> Corelens Gift Cards can only be used for transactions only on the Corelens website. No sales tax will be applied to the purchase of the Gift Card. Upon redemption of the Gift Card, sales tax will be applied. The tax rate applied to the transaction depends on the delivery address of the person redeeming it. Gift Cards cannot be used for the purpose of acquiring further Gift Cards.</p>

        <h5> Shipping</h5>
        <ul>
          <li  className='text-start'>Processing Time: Orders are processed within 1-2 business days after payment is confirmed. You will receive a notification with a tracking number once your order has shipped.</li>
          <li className='text-start'>
          Shipping Duration: Delivery times vary based on your location. Standard delivery typically takes:
          <ul>
            <li className='text-start'>Metro Cities: 3-5 business days
            </li>
            <li className='text-start'>
            Non-Metro Cities and Rural Areas: 5-10 business days
            </li>
          </ul>
          </li>
          <li className='text-start'>
          Shipping Partners: We partner with reliable couriers to ensure timely delivery. Tracking information will be provided once the order is shipped.
          </li>
          <li className='text-start'>
          Shipping Fees: Shipping fees vary by location and order size. Charges will be displayed at checkout before finalizing your purchase.
          </li>
          <li className='text-start'>
          International Shipping: Currently, we only ship within India.
          </li>
        </ul>


        
        <h5>Turnaround Time</h5>
        <ul>
          <li className="text-start">Order Confirmation: After placing an order, you will receive a confirmation immediately. Processing starts within 24 hours of confirmation.</li>
          <li className="text-start">Estimated Delivery: Orders are generally delivered within 3-10 business days, depending on your location.</li>
          <li className="text-start">Delays: While we strive for timely deliveries, unexpected delays may occur. In such cases, please reach out to our support team for assistance.</li>
        </ul>
<h5>Payment Information</h5>
<ul>
  <li className="text-start">Payment Gateway: Corelens uses Razorpay for secure online payments. Accepted payment methods include UPI, Credit/Debit Cards, Net Banking, Wallets, and EMI options.</li>
  <li className="text-start">Secure Transactions: All transactions are securely encrypted to protect your data.</li>
  <li className="text-start">Billing Information: Please ensure that the billing information matches your bank records to avoid transaction issues. You will receive an invoice upon successful payment.</li>
</ul>
        {/* <p>
          The delivery will be made by a standard transportation company, with the responsibility for the goods transferring to the buyer once they leave Corelens's shipping location. You bear full responsibility for any loss or damage to the System during transportation.</p> */}

        <h5>Limited Warranty</h5>

        <p>  Corelens guarantees that the Corelens branded products you purchase directly from Corelens or an authorised retailer, which make up your Corelens System ("Covered Products"), will be free from any defects in materials and workmanship under normal use and service for a period of one (1) year. This warranty starts either from the date of purchase from an authorised reseller or from the date the Covered Products are delivered to your shipping address as per your online order.  This hardware warranty is not transferable. <strong>As a prerequisite for this warranty, Corelens may request that you submit evidence of purchase during the warranty period and/or send back the faulty Covered Product.</strong> Corelens will cover the return shipping charges for the damaged Covered Product, if it is required to be returned.

          Corelens may also provide supplementary hardware or subscription protection plans that are in addition to the initial limited hardware warranty.  Unless explicitly stated otherwise, these additional programmes will not take effect until after the original limited hardware warranty has expired. In cases where multiple programmes are running simultaneously, the initial limited hardware warranty will have priority over any other programmes during the initial limited hardware warranty period.  During the warranty period, Corelens is only obligated to accept the return of the faulty product or portion of the Covered Product and provide one or more of the following remedies, as decided solely by Corelens:
        </p>

        <p>      •	Replacement of Covered Products:
          During the warranty term, if you have a valid warranty claim for a Covered Product, Corelens may provide you a replacement product or component that is substantially functional and equal to the faulty item.</p>
        <p>
          Corelens has the exclusive discretion to supply replacement items under this Limited Warranty, which may be new, repaired, or reconditioned. Corelens provides a one-year limited guarantee for any replacement devices starting from the date of delivery to your shipping address.

          In addition, if a Covered Product is no longer being produced and/or if the available replacement product or part that would be provided under this warranty is no longer compatible with your System, Corelens may, at its own discretion, offer you alternative replacement product(s) that are substantially equivalent in functionality to resolve the compatibility problem. You acknowledge and consent that this proposal to substitute alternative System components in order to resolve compatibility problems will completely fulfil Corelens's recourse under this or any other relevant product warranty (provided that it does not contradict or clash with the conditions of such guarantee).  If your claim is denied, you will be considered to have voluntarily given up any additional entitlements or solutions provided by this Limited Warranty.  Corelens disclaims all responsibility for the installation of any replacement product or component, as well as the associated installation costs.</p>

        <p>•	Refund or Credit:
          Corelens has the choice and authority to either replace the damaged Covered Product or provide a refund for the original purchase price paid to Corelens or an authorised retailer. Corelens will calculate the purchase price of the faulty Covered Product by considering the entire purchase price of any system that it was a component of, if the defective product does not have a distinct purchase price.  Corelens has the only authority to make decisions about determination.  If available, Corelens may, at its discretion, offer you the choice of receiving a store credit of equal or greater value instead of a refund. The value of the store credit will be determined by Corelens. This store credit can be used towards the purchase of other Corelens products or services, as determined by Corelens. To clarify, if available, the store credit remedy would be provided as an alternative to the refund remedy. You would be able to choose either choice. Corelens has the exclusive decision and choice to provide the refund or credit remedy option.

          To get warranty service, kindly get in touch with Corelens Customer Support at 1800-313-4207 or visit the website www.Corelens.in/support and click on the "Contact Us" section. If Corelens is unable to resolve the problem you are experiencing, Corelens will, in its sole discretion, choose the proper warranty repair or choice, as mentioned above.

          As previously stated, Corelens has the authority to request the return of the Covered Product before deciding on the appropriate warranty repair choice.  Corelens will provide a prepaid return slip for you to send back your old product or component to them in this scenario.  If Corelens decides to provide you with a replacement product or part as a solution under this Limited Warranty and requires the return of the original product or part for warranty validation, they may choose to ship the replacement item along with a prepaid return slip. You will then use this slip to send back the old product or part to Corelens. Not returning your old product or component in this case may cancel any limited warranty on your replacement product or part, as decided solely by Corelens.

          This Limited Warranty is not applicable in the following circumstances: failure to adhere to installation or operating instructions, improper use (including, but not limited to, using products outdoors unless explicitly allowed, and even then, only as directed, and/or using them in unsuitable temperature, humidity, or other environmental conditions), modification, mistreatment, accidents, tampering, or damage or malfunction caused by using any item or repair services not provided by Corelens. Additionally, this warranty does not cover Systems or any of their components obtained from a third party other than Corelens or an authorised retailer.  This Limited Warranty is not applicable in cases where damage is caused by uncontrollable events such as Acts of God, natural disasters, labour disputes, war, terrorism, civil strife, or other causes beyond Corelens's control. This includes changes that affect the performance, operation, or sustainability of third-party communications and technology platforms, networks, and protocols. This Limited Warranty does not cover consumable items, such as batteries or battery replacement, as well as sticky tapes. This Limited Warranty does not cover products that have been evaluated and determined to be in satisfactory functioning condition, without any defects.

          If you buy Corelens items from an authorised merchant, you may have the option to purchase additional warranties or product protection plans.  Corelens does not provide these additional guarantees. To learn about the terms and protections of these warranties, please contact the authorised store where you made your purchase.

          THIS LIMITED WARRANTY IS THE ONLY WARRANTY AND REPLACES ALL OTHER WARRANTIES, OBLIGATIONS, OR LIABILITIES, WHETHER WRITTEN, SPOKEN, EXPLICIT, OR IMPLIED, INCLUDING ANY IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A SPECIFIC PURPOSE. CORELENS DISCLAIMS ALL STATUTORY AND IMPLIED WARRANTIES TO THE EXTENT ALLOWED BY LAW. IF THESE WARRANTIES CANNOT BE DISCLAIMED, CORELENS LIMITS THEIR DURATION AND REMEDIES TO THE DURATION OF THE LIMITED WARRANTY DESCRIBED ABOVE OR THE SHORTEST PERIOD ALLOWED BY LAW. IN NO CASE SHALL CORELENS OR ANY OF ITS AFFILIATES, DIRECTORS, OFFICERS, SHAREHOLDERS, EMPLOYEES, SUBCONTRACTORS, AGENTS, OR REPRESENTATIVES (REFERRED TO AS "CORELENS PARTIES") BE LIABLE TO YOU OR ANYONE ELSE FOR ANY CONSEQUENTIAL OR INCIDENTAL DAMAGES RESULTING FROM A BREACH OF THIS LIMITED WARRANTY OR ANY OTHER WARRANTIES. THIS WARRANTY GRANTS YOU SPECIFIC LEGAL RIGHTS.  ADDITIONALLY, IT IS POSSIBLE THAT YOU MAY OWN OTHER RIGHTS THAT DIFFER DEPENDING ON THE STATE YOU RESIDE IN. CERTAIN STATES MAY NOT PERMIT RESTRICTIONS ON THE DURATION OF AN IMPLIED WARRANTY, AS WELL AS THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES. CONSEQUENTLY, THE AFOREMENTIONED LIMITATIONS OR EXCLUSIONS MAY NOT BE APPLICABLE TO YOU.

          Corelens does not guarantee that the System cannot be hacked or bypassed, that the System will prevent any personal harm or property damage, or that the System will always give sufficient notice or protection.  You acknowledge that the System may experience interruptions, bypassing, unavailability (for a short or long duration), or other forms of compromise. This may occur due to the use of equipment by a third party with the intention of causing false alarms, gaining unauthorised access, or manipulating the System (including any Camera, Smart Lock, or other peripheral Corelens System component).

          CONSEQUENTLY, NO CORELENS PARTY, AS DEFINED ABOVE, SHALL HAVE ANY LIABILITY FOR ANY LOSS, DAMAGE OR EXPENSE (COLLECTIVELY, “LOSSES”), INCLUDING ANY PROPERTY DAMAGE, PERSONAL INJURY (INCLUDING DEATH), ECONOMIC LOSSES OR ANY OTHER FORM OF LOSS, DAMAGE OR EXPENSE ARISING OUT OF OR IN CONNECTION WITH, DUE TO, OR CAUSED IN WHOLE OR IN PART BY A CLAIM THE SYSTEM FAILED TO GIVE WARNING. HOWEVER, IF ANY CORELENS PARTY, AS DEFINED ABOVE, IS HELD LIABLE, WHETHER DIRECTLY OR INDIRECTLY, FOR ANY LOSS ARISING OUT OF OR IN CONNECTION WITH, DUE TO, OR CAUSED IN WHOLE OR IN PART BY THIS LIMITED WARRANTY OR OTHERWISE, THE AGGREGATE LIABILITY OF ALL CORELENS PARTIES, AS DEFINED ABOVE, SHALL BE LIMITED TO THE PURCHASE PRICE OF THE SYSTEM, WHICH SHALL BE THE COMPLETE AND EXCLUSIVE REMEDY AGAINST THE CORELENS PARTIES, AS DEFINED ABOVE. YOU ACKNOWLEDGE AND AGREE THAT IT IS IMPRACTICAL AND EXTREMELY DIFFICULT TO DETERMINE THE ACTUAL DAMAGES, IF ANY, THAT MAY RESULT FROM A FAILURE OF THE SYSTEM TO GIVE WARNING. THIS AGREED-UPON AMOUNT (THE PURCHASE PRICE OF THE SYSTEM) IS NOT A PENALTY, AND IS THE SOLE REMEDY.

          By making a purchase from Corelens, you confirm that you have had the chance to examine Corelens's warranty terms, have done so to the extent you believe is necessary to be acquainted with them, and you agree to abide by their terms and conditions, which include the restrictions, exclusions, and disclaimers.
        </p>

        <h5>Satisfaction Guarantee</h5>

        <p> Unless explicitly stated otherwise, any offers of satisfaction guarantee or money back guarantee are applicable to each individual item, regardless of whether the item is bought alone or as part of a larger order.  The phrase "satisfaction guarantee" is subject to limitations. For products obtained directly from Corelens, the start date of the guarantee is the day of delivery. For items purchased from an authorised retailer, the start date is the date of purchase.  The default time range for any satisfaction guarantee is 7 days, unless stated differently.

          Satisfaction Guarantees are applicable only to the original customer who buys directly from Corelens or an authorised merchant, and they cannot be transferred to another person.  Corelens may stipulate that the consumer provide evidence of purchase to validate the date of purchase as a prerequisite for this guarantee.

          When making online purchases without a definite Delivery Date, the Purchaser accepts that the warranty or guarantee shall commence 7 days from the date of the online purchase.

          Critical Product, Component and Software Updates & Replacements

          If, according to the Company's judgement, certain important updates or replacements of the Product, component, or Software are necessary to ensure the reliable performance of your system or any of its components while you own it, and the Company offers corresponding updates for the hardware or software (referred to as "Critical Updates & Replacements"), the Customer agrees to take reasonable actions and follow the given instructions to carry out these Critical Updates & Replacements. The Customer also agrees to cooperate as reasonably requested to schedule, coordinate, or arrange for the installation, delivery, or implementation of these Critical Updates & Replacements.  These Critical Updates & Replacements may include the implementation of updated labelling, the substitution of batteries, the replacement of wifi or cellular modules, and even the substitution of defunct items. By acquiring a System or its constituent components from Corelens, you agree to exert reasonable efforts in assisting with the implementation of essential updates. Furthermore, Corelens fulfils its responsibilities to you by ensuring that these updates are adequately accessible.
        </p>

        <h5>    Subscription Services</h5>

        <p> Camera-only services and monitoring services will not be given with your purchase of the System unless you activate these services online via Corelens.in, Corelens app, or by contacting Corelens Customer Support at 1800-313-4207. Monitoring Services are offered in compliance with Corelens's Terms of Service, which may be accessed on the website www.Corelens.in/terms-of-service. You acknowledge that Corelens may communicate with you by telephone, email, SMS/text, or postal mail in order to provide assistance with the setup of your System or the registration for any services that you may have included in your purchase.

          You comprehend and recognise that the use of monitoring services, which includes the inclusion of cellular backup functions, necessitates an ongoing subscription. If you do not maintain your membership, your paid subscription will be cancelled, along with all monitoring services. This includes the capacity of our Monitoring Staff to monitor and support your System. The termination of subscription services will take effect immediately upon the expiration of your subscription. Your system may still operate as a local home alarm with restricted internet functionality, such as system controls and connection via an app or web interface.
        </p>

        <h5> Services Offered Without a Monitoring Subscription</h5>

        <p> If you enable service offerings associated with a System that do not necessitate a monitoring subscription (e.g., motion-detected alerts, cloud-based video recording and storage, and video streaming services that may occasionally be provided in relation to a Corelens security camera without a monitoring subscription), these services will be provided in accordance with the applicable Terms of Service. These terms can be found at www.Corelens.in/terms-of-service. To clarify, these services will not be offered until you activate them online via the Corelens mobile app or by contacting Corelens Customer Support at 1800-313-4207.</p>

        <h5> INSURANCE</h5>
        <p>
          THE PRICE OF THE SYSTEM IS UNRELATED TO THE VALUE OF PROPERTY LOCATED ON OR NEAR THE PREMISES AT WHICH THE SYSTEM IS LOCATED. NO PORTION OF THE PURCHASE PRICE IS FOR INSURANCE OR SHALL BE DEEMED OR CONSIDERED INSURANCE PREMIUMS. YOU ACKNOWLEDGE AND AGREE THAT CORELENS IS NOT AN INSURER AND SHALL NOT PROVIDE INSURANCE COVERAGE AGAINST ANY LOSSES, AS DEFINED ABOVE. TO THE EXTENT YOU WISH TO HAVE ANY INSURANCE COVERAGE FOR LOSSES, AS DEFINED ABOVE, IT IS YOUR RESPONSIBILITY TO PROCURE AND MAINTAIN SEPARATE INSURANCE POLICIES FROM AN INSURANCE COMPANY OR COMPANIES, SOLELY AT YOUR COST AND EXPENSE, FOR COVERAGE AGAINST ALL LOSSES, AS DEFINED ABOVE, INCLUDING BUT NOT LIMITED TO THOSE ARISING OUT OF OR IN CONNECTION WITH, DUE TO, OR CAUSED IN WHOLE OR IN PART BY (I) THESE TERMS OF SALE, INCLUDING ANY BREACH OF ANY REPRESENTATION, WARRANTY, COVENANT OR OBLIGATION ARISING HEREUNDER (II) THE SYSTEM, (III) THE ACTIVE OR PASSIVE SOLE, JOINT OR SEVERAL NEGLIGENCE OF ANY KIND OR DEGREE, (IV) THE IMPROPER OPERATION OR NON-OPERATION OF THE SYSTEM, (V) BREACH OF CONTRACT, EXPRESS OR IMPLIED, WHICH OCCURS BEFORE OR AFTER THE SIGNING OF THIS AGREEMENT (VI) BREACH OF WARRANTY, EXPRESS OR IMPLIED, (VII) PRODUCT OR STRICT LIABILITY (VIII) LOSS OR DAMAGE TO OR MALFUNCTION OF FACILITIES NECESSARY TO OPERATE THE SYSTEM, TRANSMIT ANY SIGNAL TO OR RECEIVE SIGNALS AT ANY MONITORING FACILITY, (X) A CLAIM FOR SUBROGATION, INDEMNIFICATION OR CONTRIBUTION, OR (XI) A VIOLATION OF ANY APPLICABLE CONSUMER PROTECTION LAW OR ANY OTHER THEORY OF LIABILITY OR ALLEGED FAULT ON THE PART OF ANY CORELENS PARTY, AS DEFINED ABOVE (COLLECTIVELY, THE “COVERED CLAIMS”). The recovery for any loss, as previously defined, will be restricted to the insurance that you acquire independently from an insurance company, if applicable.</p>

        <h5> LIMITATIONS OF LIABILITY AND RELEASE</h5>

        <p> Corelens is not responsible for any liability related to Systems acquired via this agreement, other for the remedies specified in Corelens's Limited Warranty. Specifically, according to Corelens's Limited Warranty, Corelens does not guarantee that the System cannot be compromised or bypassed; that the System will prevent any personal damage or property loss; or that the System will always provide sufficient notice or protection.  You acknowledge that the System may experience interruptions, bypassing, unavailability (for a short or long duration), or other forms of compromise. This may occur due to the use of equipment by a third party with the intention of causing false alarms, gaining unauthorised access, or manipulating the System (including any Camera). You acknowledge that a correctly installed and well-maintained alarm system can only decrease the likelihood of a burglary, robbery, or other incidents happening without triggering an alarm. However, it does not serve as an insurance or a guarantee against such events or the absence of personal harm or property damage as a consequence.

          BY AGREEING TO THESE TERMS, YOU ARE RELEASING EACH CORELENS PARTY, AS DEFINED ABOVE, ON YOUR BEHALF AND ON BEHALF OF ALL OTHERS WHO MAKE CLAIMS UNDER THE TERMS OF SALE FROM ALL LOSSES, AS DEFINED ABOVE, ARISING OUT OF OR IN CONNECTION WITH, DUE TO, OR CAUSED IN WHOLE OR IN PART BY ANY COVERED CLAIM, AS DEFINED ABOVE. UNDER NO CIRCUMSTANCES WILL ANY CORELENS PARTY, AS DEFINED ABOVE, BE RESPONSIBLE OR LIABLE TO YOU FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES INCLUDING WITHOUT LIMITATION, DAMAGES FOR PERSONAL INJURY, DEATH OR DAMAGES TO PROPERTY. NOTWITHSTANDING THE FOREGOING, EVEN IF A CORELENS PARTY, AS DEFINED ABOVE, IS FOUND LIABLE FOR ANY LOSSES, AS DEFINED ABOVE, ARISING OUT OF OR IN CONNECTION WITH, DUE TO, OR CAUSED IN WHOLE OR IN PART BY ANY COVERED CLAIM, AS DEFINED ABOVE, ANY SUCH LIABILITY IN THE AGGREGATE OF ALL CORELENS PARTIES, AS DEFINED ABOVE, SHALL BE LIMITED TO THE PURCHASE PRICE OF THE SYSTEM, WHICH SHALL BE THE COMPLETE AND EXCLUSIVE REMEDY AGAINST ALL CORELENS PARTIES, AS DEFINED ABOVE. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.
        </p>

        <h5>     Release of Insured Losses; Waiver of Subrogation</h5>

        <p> You absolve all Corelens Parties from any liability for any damages that are covered by your insurance plans, including any insurance deductibles. Furthermore, you relinquish and renounce any subrogation and other entitlements that you or your insurance provider may possess against any Corelens Party for funds disbursed to you or on your behalf.</p>

        <h5>       INDEMNIFICATION</h5>

        <p> IF ANYONE OTHER THAN YOU (INCLUDING YOUR INSURANCE COMPANY) ASKS ANY CORELENS PARTY, AS DEFINED ABOVE, TO PAY FOR ANY LOSSES, AS DEFINED ABOVE, INCLUDING ATTORNEYS’ FEES ARISING OUT OF OR IN CONNECTION WITH, DUE TO, OR CAUSED IN WHOLE OR IN PART BY ANY COVERED CLAIM, AS DEFINED ABOVE, YOU SHALL INDEMNIFY, DEFEND AND HOLD EACH CORELENS PARTY, AS DEFINED ABOVE, HARMLESS (WITHOUT ANY CONDITION THAT ANY OF THEM FIRST PAY), FOR ALL LOSSES, AS DEFINED ABOVE, INCLUDING ATTORNEYS’ FEES, ASSERTED AGAINST OR INCURRED BY SUCH PARTIES. THE DUTY TO DEFEND ARISES UPON THE ASSERTION OF A CLAIM OR DEMAND AGAINST CORELENS AND DOES SO REGARDLESS OF WHETHER CORELENS HAS BEEN FOUND LIABLE OR WHETHER CORELENS HAS INCURRED ANY EXPENSE. THE FOREGOING INDEMNIFICATION OBLIGATIONS MAY NOT BE ENFORCEABLE IN SOME STATES, SO SUCH OBLIGATIONS MAY NOT APPLY TO YOU.</p>

        <h5> Software</h5>

        <p>  The software integrated into any Corelens System is licenced to you in accordance with this section on a non-exclusive and restricted basis, and not sold. You are only allowed to use this programme in conjunction with the product it is integrated into, and you are prohibited from altering, distributing, replicating, or reverse engineering the software. This programme may consist of or come with third-party software components, including software that is licenced under open source or equivalent licences (referred to as "Third-Party Components"). For more details on the Third-Party Components, please visit https://www.Corelens.com/legal. You may also refer to the programme documentation or the relevant help, notices, about, or source files for more information. The copyright holders specified in the open source software retain the copyrights. If the licence for any Third-Party Component mandates it, the terms of that licence will take precedence over the provisions of this Agreement. If the licence for a Third-Party Component includes any limitations that contradict the limits mentioned below, such restrictions will not be enforced for that specific Third-Party Component. If the conditions of the licence for any Third-Party Component compel Corelens to release source code or associated material, Corelens is making that offer now. Please focus all inquiries for source code or associated material exclusively to: connect@Corelens.in.  Corelens and/or its licensors retain full rights to any software not licenced to you under this agreement.
        </p>

        <h5>   Camera</h5>
        <p>If the System includes any camera or any other video-related equipment (collectively, the “Camera”), then with respect to the Camera, you acknowledge, understand and agree that (i) the Camera is intended to assist you, Corelens and the monitoring facility in the verification of alarm events at your premises, not to reduce or eliminate any risk of loss, (ii) the Camera is not intended to detect or prevent unauthorized intrusion onto the premises or any other emergency condition, including fire, smoke, carbon monoxide, medical emergencies or water damage, (iii) you will use the Camera solely in connection with lawful recording practices on or near your Premises that at all times comply with the Terms of Service which can be found at www.Corelens.in/terms-of-service, and no other purpose, (iv) you shall not use the Camera, or permit the use of the Camera, for any illegal or unlawful purpose, (v) you shall not use or permit the use of a Camera installed with a view where any person may have a reasonable expectation of privacy, including bedrooms, restrooms, dressing or changing areas, locker rooms or similar areas, (vi) you shall instruct all persons who may use the Camera of any limitations with respect to the Camera, (vii) you shall notify any person whose oral communication may be intercepted, recorded or transmitted by the Camera of any such interception, recording or transmission, and (viii) when and to the extent restricted or otherwise prohibited by applicable laws, YOU SHALL NOT INTERCEPT, RECORD OR TRANSMIT ANY ORAL COMMUNICATION OF ANY PERSON WITHOUT HAVING SUCH PERSON’S PERMISSION TO DO SO.   Kindly consult the Corelens Privacy Policy at www.Corelens.in/privacy-policy for crucial details about the capturing of audio or video.</p>

        <h5> Life Safety Notice</h5>

        <p>   If you buy a System that comes with smoke detectors or carbon monoxide detectors, or if you subsequently add smoke detectors or carbon monoxide detectors, there could be special installation and placement criteria or regulations for these devices. To ensure proper installation, maintenance, and placement of these detectors, it is advisable to reach out to your local authority with jurisdiction or seek guidance from a certified specialist. It is solely your duty to ensure that you comply with all applicable codes, regulations, and standards while installing, placing, and maintaining the System.
        </p>

        <h5>   Privacy</h5>

        <p> Kindly see Corelens's privacy policy at www.Corelens.in/privacy-policy for crucial details on the gathering, use, and dissemination of your personal data.

          YOU SHALL HAVE THE RIGHT TO OPT OUT OF THIS AGREEMENT TO ARBITRATE BY PROVIDING WRITTEN NOTICE OF YOUR INTENTION TO DO SO BY EMAILING TOS@CORELENS.IN WITHIN 60 DAYS OF THESE TERMS OF SALE BECOMING BINDING UPON YOU FOR THE FIRST TIME. OPTING OUT OF THIS AGREEMENT TO ARBITRATE HAS NO EFFECT ON ANY PREVIOUS, OTHER, OR FUTURE ARBITRATION AGREEMENT(S) THAT YOU MAY HAVE WITH CORELENS. IF THIS AGREEMENT TO ARBITRATE BECOMES BINDING, YOU CAN NOT CHANGE, MODIFY OR REVOKE IT (INCLUDING BY ATTEMPTING TO OPT OUT IN CONNECTION WITH ANY CONFIRMATION OF THE THESE TERMS OF SALE, AS AMENDED FROM TIME TO TIME) WITHOUT AN AGREEMENT IN WRITING SIGNED BY CORELENS. IN THE EVENT THAT YOU OPT OUT OF THIS AGREEMENT TO ARBITRATE IN ACCORDANCE WITH THIS SECTION: YOU AND CORELENS EACH HEREBY IRREVOCABLY AGREE THAT ANY SUIT, ACTION OR OTHER LEGAL PROCEEDING (&quot;SUIT&quot;) ARISING OUT OF OR IN CONNECTION WITH OR DUE TO ANY CLAIM OR DISPUTE THAT HAS ARISEN OR MAY ARISE BETWEEN YOU AND CORELENS MUST BE RESOLVED EXCLUSIVELY BY A STATE OR FEDERAL COURT LOCATED IN BOSTON, MASSACHUSETTS; YOU AND CORELENS EACH CONSENT TO THE EXCLUSIVE JURISDICTION AND VENUE OF EACH SUCH COURT IN ANY SUCH SUIT AND WAIVE ANY OBJECTION THAT YOU OR CORELENS MAY HAVE TO JURISDICTION OR VENUE OF ANY SUCH SUIT; YOU AND CORELENS EACH CONSENT TO SERVICE OF PROCESS IN ACCORDANCE WITH THE NOTICE PROVISIONS OF THIS AGREEMENT; AND YOU AND CORELENS EACH HEREBY WAIVE ANY RIGHT TO TRIAL BY JURY IN ANY SUCH SUIT.

          Periodically, we may modify and enhance this Agreement.  Subject to legal limitations, any modifications will take effect immediately upon being published on the Corelens Website. If you do not choose to decline the changes mentioned below, your ongoing use of any Corelens Services or Website implies that you acknowledge and consent to the modifications in relation to your use after the revision date. Your continuous use serves as your acceptance of the modified terms. Any changes made to this Agreement will not affect the agreed-upon dispute resolution arrangements for ongoing issues, unless the parties explicitly agree differently in writing.  To clarify, "then-pending disputes" refers to any legal action that has been brought before a court. You have the right to reject any modifications made to the updated Agreement posted on the Website within 30 days. To do so, you must provide writing notification expressing your intention to opt out of the revised Agreement.

          <strong> The parties recognise that the agreement was not made at the subscriber's home or via a face-to-face interaction, and as a result, no central or state right to cancel is intended to be applicable to this transaction.</strong>
        </p>

        <h5> Other Terms and Conditions</h5>

        <p>You acknowledge and consent that the Terms of Sale apply to sales conducted by Corelens-authorized distributors, resellers, or retailers, including but not limited to Amazon and their respective online e-commerce stores, even if the final sale was made by authorised distributors, resellers, or retailers. Furthermore, the first sales conducted by Corelens-authorized distributors, resellers, or retailers to you will be considered as the "initial sale" for the purpose of the Limited Warranty mentioned here. Consequently, the Limited Warranty stated here will also be applicable to products sold to you through this method.

          You acknowledge that Corelens offers monitoring services that include the needs for system hardware components, as well as the correct setup and placement of these components to ensure intended functioning. This also includes ensuring adequate connection and account maintenance.  It is your duty as the owner of the System to ensure that the setup, maintenance, and connection requirements are fulfilled at your premises in order to guarantee appropriate operation and compliance with all relevant state and federal laws and regulations.

          The Terms of Sale and all transactions on the Corelens website are regulated by Consumer Protection legislation, disregarding any conflicts of law laws. The interpretation of the Terms of Sale should not be interpreted unfavourably against the party that drafted them.

          If you buy this product directly from Corelens online, either from an online retail manufacturer company store or Corelens's website, any disagreement between the online Terms of Sale given at the time of your online purchase (available at www.Corelens.com/terms-sale) and any written Terms of Sale provided with the print copy Set-up Guide will be controlled by the online terms. If you buy this product from an authorised retailer in a physical store and then create an online account, agreeing to any relevant online terms, any disagreement between the online Terms of Sale given when you create your online account and the written Terms of Sale provided with the printed Set-up Guide will be controlled by the online terms, as long as it is allowed by law.

          Corelens will not be held responsible for any inability to fulfil its obligations as stated in the Terms of Sale due to factors such as strikes, accidents, fires, or shutdowns of its manufacturing plant or plants that supply it. This also includes other unforeseen circumstances that are beyond Corelens' control, including those that arise from emergency conditions.

          Any claims, actions, or proceedings against Corelens must be initiated in court within one year of the cause of action arising, without any extension of time granted by the court. Failure to do so will result in the claim, action, or proceeding being prohibited. The time frame mentioned in this paragraph must be adhered to rigorously.

          Unless stated otherwise, any notices to be sent to Corelens must be in writing and sent by regular mail with prepaid postage or by a reputable national overnight delivery service to Corelens's current main office. Similarly, any notices to be sent to the Subscriber must be in writing and sent to the email address provided by the Subscriber to Corelens.

          If any provision of the Terms of Sale (or a part of the Terms of Sale) or its application to any situation is deemed illegal, invalid, or unenforceable to any degree, the remaining part of the provision and the Terms of Sale, or those provisions as applied to any other situation, will not be affected. They will continue to be valid, binding, and enforceable. In the context of these Terms of Sale, the term "including" is defined as "including, but not limited to."
        </p>

      </div>
      <Footer />
    </>
  )
}

export default TermSales