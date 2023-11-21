import Navigation from '../Navigation/Navigation'
import './SucessfullShip.css'
import greenCheck from '../images/Eo_circle_green_checkmark.svg'
import {addDays} from '../ItemShowCart/ItemShowCart'

const SucessfullShip = () => {

    const givenDate = addDays(new Date(), 3)

    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };

    const dateFormatter = new Intl.DateTimeFormat('en-US', options);

    const formattedDate = dateFormatter.format(givenDate);

    return (
        <div className='shipping-home-page'>
        <Navigation/>
        <div className="shipping">
            <h2><img className='green-check' src={greenCheck} alt='green check'></img> <span className='order-placed'>Order placed, thanks!</span></h2>
            <p>Confirmation will be sent to your email.</p>
            <p className='delivery-time'><span className='bold-text'>{formattedDate}</span></p>
            <p className='estimated-delivery'>Estimated Delivery</p>
        </div>
        </div>
    )
}

export default SucessfullShip
